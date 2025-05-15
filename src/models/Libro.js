// src/models/Libro.js
const mongoose = require('mongoose');

const libroSchema = new mongoose.Schema({
  titulo: { type: String, required: true },
  autor: { type: String, required: true },
  editorial: String,
  isbn: String,
  descripcion: String,
  categoria: String,
  portadaUrl: String,
  archivoUrl: String,
  calificacion: { type: Number, default: 0 },
  creadoPor: { type: mongoose.Schema.Types.ObjectId, ref: 'Usuario' },
}, {
  timestamps: true
});

module.exports = mongoose.model('Libro', libroSchema);
