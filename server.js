const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
require('dotenv').config();
const helmet = require('helmet');

const app = express();


app.use(helmet()); // uso de helmet
// Middlewares
/*app.use(cors());*/
app.use(express.json()); // Permite recibir datos JSON en el cuerpo de las peticiones

app.use((req, res, next) => {
  res.removeHeader('Access-Control-Allow-Origin');
  res.removeHeader('Access-Control-Allow-Methods');
  res.removeHeader('Access-Control-Allow-Headers');
  next();
});
//Importar Rutas
app.use('/api/auth', require('./src/routes/auth.js'));
app.use('/api/orders', require('./src/routes/orders.js'));
app.use('/api/config', require('./src/routes/config.js'));
app.use('/api/routes/mispedidos', require('./src/routes/orders.js'));
app.use('/api/products', require('./src/routes/products.js'));
const rutaComentarios = require('./src/routes/comentarios.js');
app.use('/api', rutaComentarios);

helmet({
    contentSecurityPolicy: {
      directives: {
        "default-src": ["'self'"], // Permite recursos del mismo dominio
        "connect-src": ["'self'", "https://back-lenos.onrender.com", "https://front-lenos.vercel.app"], // Permite Axios/Fetch
        "script-src": ["'self'", "'unsafe-inline'"], // Permite scripts de React
        "style-src": ["'self'", "'unsafe-inline'"],
        "img-src": ["'self'", "data:"],
      },
    },
  })
  
/*app.use(cors({
  origin: 'https://front-lenos.vercel.app', // La URL de tu Vite
  methods: ['GET', 'POST', 'PATCH', 'DELETE', 'OPTIONS'],
  allowedHeaders: ['Content-Type', 'x-auth-token'] // ¡ESTO ES VITAL!
})); */

// Conexión a MongoDB
mongoose.connect(process.env.MONGO_URI)
  .then(() => console.log("🔥 Conectado a MongoDB Atlas"))
  .catch(err => console.error("❌ Error de conexión:", err));

// Rutas de prueba
app.get('/', (req, res) => res.send("API de Leños Rellenos funcionando"));

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`🚀 Servidor en puerto ${PORT}`));