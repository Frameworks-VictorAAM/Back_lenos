const express = require('express');
const router = express.Router();
const rateLimit = require('express-rate-limit');
const { body, validationResult } = require('express-validator');

// 1. Configuración de Rate Limiting (Fase 4: El Guardián)
const limiter = rateLimit({
  windowMs: 1 * 60 * 1000, // 1 minuto
  max: 10, // Máximo 10 peticiones
  message: { error: "Demasiadas peticiones. Intenta en un minuto." }
});

// 2. Middleware de Validación y Saneamiento
const validarComentario = [
  body('puntuacion').isInt().withMessage('La puntuación debe ser un entero'),
  body('texto')
    .isLength({ max: 200 }).withMessage('Máximo 200 caracteres')
    .trim()
    .escape() // Evita XSS
];

// 3. Definición de la Ruta (Usando 'router', no 'app')
router.post('/comentarios', limiter, validarComentario, (req, res) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return res.status(400).json({ errors: errors.array() });
  }
  
  const { puntuacion, texto } = req.body;
  res.status(201).json({ 
    mensaje: "Comentario seguro guardado en Leños Rellenos",
    data: { puntuacion, texto }
  });
});

module.exports = router;