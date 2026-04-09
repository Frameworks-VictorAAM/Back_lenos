const mongoose = require('mongoose');

const OrderSchema = new mongoose.Schema({
  cliente: { type: String, required: true },
  telefono: { type: String, required: true },
  direccion: { type: String, required: true },
  items: [
    {
      nombre: String,
      cantidad: Number,
      precio: Number
    }
  ],
  total: { type: Number, required: true },
  estado: { type: String, default: 'Pendiente' }, // Pendiente, En elaboración, Entregado
  fecha: { type: Date, default: Date.now }
});

module.exports = mongoose.model('Order', OrderSchema);