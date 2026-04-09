const express = require('express');
const router = express.Router();
const Product = require('../models/Product');
const auth = require('../middleware/auth');

// GET: Obtener todos los productos para el inventario
router.get('/', async (req, res) => {
  try {
    const productos = await Product.find();
    res.json(productos);
  } catch (error) {
    res.status(500).send("Error al obtener productos");
  }
});

// PATCH: Actualizar stock de un producto (Solo Admin)
router.patch('/:id', auth, async (req, res) => {
  try {
    const { stock } = req.body;
    const productoActualizado = await Product.findByIdAndUpdate(
      req.params.id, 
      { stock }, 
      { returnDocument: 'after' }
    );
    res.json(productoActualizado);
  } catch (error) {
    res.status(500).send("Error al actualizar stock");
  }
});

module.exports = router;