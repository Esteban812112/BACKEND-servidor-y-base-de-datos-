// routes/reviews.js
const express = require('express');
const router = express.Router();
const Review = require('../models/reviewModel');
const auth = require('../middlewares/authMiddleware');

// Crear una nueva reseña
router.post('/review', auth, async (req, res) => {
    try {
        const review = new Review(req.body);
        await review.save();
        res.status(201).json({ message: 'Reseña creada exitosamente', review });
    } catch (error) {
        res.status(400).json({ message: 'Error al crear la reseña', error });
    }
});

// Obtener todas las reseñas
router.get('/review', async (req, res) => {
    try {
        const reviews = await Review.find()
            .populate('userId', 'name email') // Limitar campos de userId
            .populate('serviceId', 'type description price'); // Limitar campos de serviceId
        res.status(200).json(reviews);
    } catch (error) {
        res.status(500).json({ message: 'Error al obtener las reseñas', error });
    }
});

// Obtener una reseña por ID
router.get('/review/:id', async (req, res) => {
    try {
        const review = await Review.findById(req.params.id)
            .populate('userId', 'name email') // Limitar campos de userId
            .populate('serviceId', 'type description price'); // Limitar campos de serviceId
        if (!review) return res.status(404).json({ message: 'Reseña no encontrada' });
        res.status(200).json(review);
    } catch (error) {
        res.status(500).json({ message: 'Error al obtener la reseña', error });
    }
});

// Obtener las reseñas para la gráfica
router.get('/review/graph', async (req, res) => {
    try {
        // Agregación para obtener el promedio de las calificaciones por servicio
        const reviewsData = await Review.aggregate([
            {
                $group: {
                    _id: "$serviceId", // Agrupar por el ID del servicio
                    averageRating: { $avg: "$rating" }, // Calcular el promedio de calificaciones
                    totalReviews: { $sum: 1 }, // Contar la cantidad de reseñas por servicio
                },
            },
            {
                $lookup: {
                    from: "services", // Nombre de la colección de servicios (asegúrate de que sea correcta)
                    localField: "_id", // ID de servicio
                    foreignField: "_id", // ID de servicio en la colección "services"
                    as: "serviceDetails", // Almacenar los detalles del servicio
                },
            },
            {
                $unwind: "$serviceDetails", // Desempaquetar el array "serviceDetails"
            },
            {
                $project: {
                    _id: 0,
                    serviceId: "$_id",
                    serviceName: "$serviceDetails.type", // Nombre del servicio
                    averageRating: 1,
                    totalReviews: 1,
                },
            },
        ]);

        // Si no hay reseñas
        if (reviewsData.length === 0) {
            return res.status(404).json({ message: 'No hay datos para graficar' });
        }

        // Responder con los datos procesados para el gráfico
        const labels = reviewsData.map(item => item.serviceName); // Obtener nombres de los servicios
        const dataValues = reviewsData.map(item => item.averageRating); // Obtener promedios de calificación

        res.status(200).json({
            labels,
            dataValues
        });
    } catch (error) {
        res.status(500).json({ message: 'Error al obtener los datos para la gráfica', error });
    }
});

// Actualizar una reseña
router.put('/review/:id', auth, async (req, res) => {
    try {
        const review = await Review.findByIdAndUpdate(req.params.id, req.body, { new: true });
        if (!review) return res.status(404).json({ message: 'Reseña no encontrada' });
        res.status(200).json({ message: 'Reseña actualizada exitosamente', review });
    } catch (error) {
        res.status(400).json({ message: 'Error al actualizar la reseña', error });
    }
});

// Eliminar una reseña
router.delete('/review/:id', async (req, res) => {
    try {
        const review = await Review.findByIdAndDelete(req.params.id);
        if (!review) return res.status(404).json({ message: 'Reseña no encontrada' });
        res.status(200).json({ message: 'Reseña eliminada exitosamente' });
    } catch (error) {
        res.status(500).json({ message: 'Error al eliminar la reseña', error });
    }
});

module.exports = router;
