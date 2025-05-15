const express = require('express');
const router = express.Router();
const Review = require('../models/reviewModel'); // Asegúrate de que este modelo exista

// Ruta para obtener reviews con título y calificación
router.get('/reviews', async (req, res) => {
  try {
    const reviews = await Review.find({}, 'title rating'); // Solo trae título y rating
    res.json(reviews);
  } catch (error) {
    console.error('Error al obtener reviews:', error);
    res.status(500).json({ error: 'Error al obtener las calificaciones de los libros' });
  }
});

module.exports = router;
