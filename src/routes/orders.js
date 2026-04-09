const express = require('express');
const router = express.Router();
const Order = require('../models/Order');
const auth = require('../middleware/auth'); // Si usas protección por token

// POST: Crear un nuevo pedido
router.post('/', async (req, res) => {
  try {
    const { cliente, telefono, direccion, items, total, metodoPago } = req.body;

    // Creamos la nueva orden
    const nuevaOrden = new Order({
      cliente,
      telefono,
      direccion,
      items,
      total
    });

    const ordenGuardada = await nuevaOrden.save();
    res.status(201).json(ordenGuardada);
  } catch (error) {
    console.error(error);
    res.status(500).send('Error al guardar el pedido');
  }
});

// GET: Obtener pedidos del usuario logueado (Para MisPedidos.jsx)
router.get('/mispedidos', auth, async (req, res) => {
  try {
    // Buscamos órdenes donde el nombre del cliente coincida con el usuario del token
    const misPedidos = await Order.find({ cliente: req.user.username }).sort({ fecha: -1 });
    console.log("Pedidos encontrados para:", req.user.username, pedidos.length);
    res.json(pedidos);
  } catch (error) {
    res.status(500).send("Error al obtener tu historial");
  }
});


// --- RUTAS PARA EL ADMIN ---

// GET: Obtener TODOS los pedidos (Panel Admin)
router.get('/', auth, async (req, res) => {
  try {
    // Aquí podrías validar: if (req.user.role !== 'admin') return res.status(403)...
    const pedidos = await Order.find().sort({ fecha: -1 });
    res.json(pedidos);
  } catch (error) {
    res.status(500).send('Error al obtener pedidos');
  }
});

// PATCH: Actualizar solo el ESTADO de un pedido (Panel Admin)
router.patch('/:id', auth, async (req, res) => {
  try {
    const { estado } = req.body; // Recibe "En elaboración", "Enviado", etc.
    const ordenActualizada = await Order.findByIdAndUpdate(
      req.params.id,
      { estado },
      { new: true }
    );
    res.json(ordenActualizada);
  } catch (error) {
    res.status(500).send('Error al actualizar el estado');
  }
});

module.exports = router;