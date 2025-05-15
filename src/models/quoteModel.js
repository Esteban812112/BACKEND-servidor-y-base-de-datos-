const mongoose = require('mongoose');

const quoteSchema = new mongoose.Schema({
    userId: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: false }, 
    serviceId: { type: mongoose.Schema.Types.ObjectId, ref: 'Service', required: false },
    details: { type: String, required: true }, 
    estimatedPrice: { type: Number, required: false }, 
    status: { type: String, default: 'Pendiente' },
    cellphone: { type: String, required: false },
    createdAt: { type: Date, default: Date.now }
});

module.exports = mongoose.model('Quote', quoteSchema);
