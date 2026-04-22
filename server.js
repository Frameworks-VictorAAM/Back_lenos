const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
require('dotenv').config();
const helmet = require('helmet');

const app = express();

const corsOptions = {
  origin: 'https://front-lenos.vercel.app',
  methods: ['GET', 'POST', 'PUT', 'DELETE', 'OPTIONS'],
  allowedHeaders: ['Content-Type', 'Authorization', 'x-auth-token'],
  credentials: true,
  optionsSuccessStatus: 200 // Responde 200 a la petición OPTIONS
};
app.use(cors(corsOptions));
app.options('*', cors(corsOptions));

// Middlewares

app.use(express.json()); // Permite recibir datos JSON en el cuerpo de las peticiones

app.use(helmet({
  contentSecurityPolicy: {
    directives: {
      "default-src": ["'self'"],
      "connect-src": ["'self'", "https://back-lenos.onrender.com", "https://front-lenos.vercel.app"],
      "script-src": ["'self'", "'unsafe-inline'"],
      "style-src": ["'self'", "'unsafe-inline'"],
    },
  },
}));

//Importar Rutas
app.use('/api/auth', require('./src/routes/auth.js'));
app.use('/api/orders', require('./src/routes/orders.js'));
app.use('/api/config', require('./src/routes/config.js'));
app.use('/api/routes/mispedidos', require('./src/routes/orders.js'));
app.use('/api/products', require('./src/routes/products.js'));
const rutaComentarios = require('./src/routes/comentarios.js');
app.use('/api', rutaComentarios);


// Conexión a MongoDB
mongoose.connect(process.env.MONGO_URI)
  .then(() => console.log("🔥 Conectado a MongoDB Atlas"))
  .catch(err => console.error("❌ Error de conexión:", err));

// Rutas de prueba
app.get('/', (req, res) => res.send("API de Leños Rellenos funcionando"));

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`🚀 Servidor en puerto ${PORT}`));