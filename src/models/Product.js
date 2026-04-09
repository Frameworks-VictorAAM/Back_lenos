const mongoose = require('mongoose');

const ProductSchema = new mongoose.Schema({
  nombre: String,
  stock: { type: Number, default: 0 },
  precio: Number,
  categoria: String
});

module.exports = mongoose.model('Product', ProductSchema);