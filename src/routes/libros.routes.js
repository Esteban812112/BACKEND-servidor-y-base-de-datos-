// src/routes/libros.routes.js
const express = require('express');
const router = express.Router();
const Libro = require('../models/Libro');

// Crear libro
router.post('/', async (req, res) => {
  try {
    const libro = new Libro(req.body);
    await libro.save();
    res.status(201).json(libro);
  } catch (err) {
    res.status(500).json({ error: 'Error al crear el libro' });
  }
});

// Obtener todos los libros
router.get('/', async (req, res) => {
  try {
    const libros = await Libro.find();
    res.json(libros);
  } catch (err) {
    res.status(500).json({ error: 'Error al obtener libros' });
  }
});

// Buscar por ID
router.get('/:id', async (req, res) => {
  try {
    const libro = await Libro.findById(req.params.id);
    res.json(libro);
  } catch (err) {
    res.status(404).json({ error: 'Libro no encontrado' });
  }
});

// Actualizar libro
router.put('/:id', async (req, res) => {
  try {
    const libro = await Libro.findByIdAndUpdate(req.params.id, req.body, { new: true });
    res.json(libro);
  } catch (err) {
    res.status(500).json({ error: 'Error al actualizar el libro' });
  }
});

// Eliminar libro
router.delete('/:id', async (req, res) => {
  try {
    await Libro.findByIdAndDelete(req.params.id);
    res.json({ mensaje: 'Libro eliminado' });
  } catch (err) {
    res.status(500).json({ error: 'Error al eliminar el libro' });
  }
});

module.exports = router;
