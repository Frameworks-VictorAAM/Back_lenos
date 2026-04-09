const express = require('express');
const router = express.Router();
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const User = require('../models/User');

// --- REGISTRO ---
router.post('/register', async (req, res) => {
  try {
    const { username, phone, password } = req.body;

    // Verificar si ya existe
    let user = await User.findOne({ username });
    if (user) return res.status(400).json({ msg: "El usuario ya existe" });

    // Encriptar contraseña
    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash(password, salt);

    user = new User({ username, phone, password: hashedPassword });
    await user.save();

    res.json({ msg: "Usuario registrado con éxito" });
  } catch (err) {
    res.status(500).send("Error en el servidor");
  }
});

// --- LOGIN ---
router.post('/login', async (req, res) => {
  const { username, password } = req.body;
  try {
    const user = await User.findOne({ username });
    if (!user) return res.status(400).json({ msg: "Credenciales inválidas" });

    // Comparar contraseña encriptada
    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) return res.status(400).json({ msg: "Credenciales inválidas" });

    // Crear el Token

    const token = jwt.sign({ id: user._id, role: user.role }, process.env.JWT_SECRET);
   res.json({
      token,
      user: { 
        username: user.username, 
        role: user.role,
        phone: user.phone // <--- Agregamos esto para que el carrito lo reciba
      }
    });
  } catch (err) {
    res.status(500).send("Error en el servidor");
  }
});


module.exports = router;