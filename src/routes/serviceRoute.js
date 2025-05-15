// routes/services.js
const express = require('express');
const router = express.Router();
const Service = require('../models/serviceModel');
const auth = require('../middlewares/authMiddleware');

// Crear un nuevo servicio
router.post('/service', auth, async (req, res) => {
    try {
        const service = new Service(req.body);
        await service.save();
        res.status(201).json({ message: 'Servicio creado exitosamente', service });
    } catch (error) {
        res.status(400).json({ message: 'Error al crear el servicio', error });
    }
});

// Obtener todos los servicios
router.get('/service', async (req, res) => {
    try {
        const services = await Service.find();
        res.status(200).json(services);
    } catch (error) {
        res.status(500).json({ message: 'Error al obtener los servicios', error });
    }
});

// Obtener un servicio por ID
router.get('/service/:id', async (req, res) => {
    try {
        const service = await Service.findById(req.params.id);
        if (!service) return res.status(404).json({ message: 'Servicio no encontrado' });
        res.status(200).json(service);
    } catch (error) {
        res.status(500).json({ message: 'Error al obtener el servicio', error });
    }
});

// Actualizar un servicio
router.put('/service/:id', auth, async (req, res) => {
    try {
        const service = await Service.findByIdAndUpdate(req.params.id, req.body, { new: true });
        if (!service) return res.status(404).json({ message: 'Servicio no encontrado' });
        res.status(200).json({ message: 'Servicio actualizado exitosamente', service });
    } catch (error) {
        res.status(400).json({ message: 'Error al actualizar el servicio', error });
    }
});

// Eliminar un servicio
router.delete('/service/:id', async (req, res) => {
    try {
        const service = await Service.findByIdAndDelete(req.params.id);
        if (!service) return res.status(404).json({ message: 'Servicio no encontrado' });
        res.status(200).json({ message: 'Servicio eliminado exitosamente' });
    } catch (error) {
        res.status(500).json({ message: 'Error al eliminar el servicio', error });
    }
});

module.exports = router;