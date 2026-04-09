const mongoose = require('mongoose');

const ConfigSchema = new mongoose.Schema({
  key: { type: String, default: "tienda_config" }, // Para encontrarlo fácil
  ventaActiva: { type: Boolean, default: false },
  mensajeAdmin: { type: String, default: "¡Bienvenidos!" }
});

module.exports = mongoose.model('Config', ConfigSchema);