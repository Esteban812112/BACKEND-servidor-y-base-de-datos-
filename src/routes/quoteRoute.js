// routes/quotes.js
const express = require('express');
const router = express.Router();
const Quote = require('../models/quoteModel');
const auth = require('../middlewares/authMiddleware');

// Crear una nueva solicitud
router.post('/quote', auth, async (req, res) => {
    try {
        const quote = new Quote(req.body);
        await quote.save();
        res.status(201).json({ message: 'solicitud de libro exitosa', quote });
    } catch (error) {
        res.status(400).json({ message: 'Error al crear solicitud', error });
    }
});

// Obtener todas las solicitudes
router.get('/quote', async (req, res) => {
    try {
        const quotes = await Quote.find()
            .populate('userId', 'name email') // Limitar campos del usuario
            .populate('serviceId', 'type description price'); // Limitar campos del servicio
        res.status(200).json(quotes);
    } catch (error) {
        res.status(500).json({ message: 'Error al obtener las solicitudes', error });
    }
});

// Obtener una cotización por ID
router.get('/quote/:id', async (req, res) => {
    try {
        const quote = await Quote.findById(req.params.id)
            .populate('userId', 'name email') // Limitar campos del usuario
            .populate('serviceId', 'type description price'); // Limitar campos del servicio
        if (!quote) return res.status(404).json({ message: 'solicitud no encontrada' });
        res.status(200).json(quote);
    } catch (error) {
        res.status(500).json({ message: 'Error al obtener la solicitud', error });
    }
});

// Actualizar una solicitud
router.put('/quote/:id', auth, async (req, res) => {
    try {
        const quote = await Quote.findByIdAndUpdate(req.params.id, req.body, { new: true });
        if (!quote) return res.status(404).json({ message: 'solicitud no encontrada' });
        res.status(200).json({ message: 'solicitud actualizada exitosamente', quote });
    } catch (error) {
        res.status(400).json({ message: 'Error al actualizar la solicitud', error });
    }
});

// Eliminar una solicitud
router.delete('/quote/:id', async (req, res) => {
    try {
        const quote = await Quote.findByIdAndDelete(req.params.id);
        if (!quote) return res.status(404).json({ message: 'solicitud no encontrada' });
        res.status(200).json({ message: 'solicitud eliminada exitosamente' });
    } catch (error) {
        res.status(500).json({ message: 'Error al eliminar la solicitud', error });
    }
});

module.exports = router;