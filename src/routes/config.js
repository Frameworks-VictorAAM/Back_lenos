const express = require('express');
const router = express.Router();
const Config = require('../models/Config');

// Obtener configuración (Pública para el Home)
router.get('/', async (req, res) => {
  let config = await Config.findOne({ key: "tienda_config" });
  if (!config) config = await Config.create({ key: "tienda_config" }); // Crea una si no existe
  res.json(config);
});

// Actualizar configuración (Solo Admin)
router.patch('/', async (req, res) => {
  const { ventaActiva, mensajeAdmin } = req.body;
  const config = await Config.findOneAndUpdate(
    { key: "tienda_config" },
    { ventaActiva, mensajeAdmin },
    { new: true, upsert: true }
  );
  res.json(config);
});

module.exports = router;