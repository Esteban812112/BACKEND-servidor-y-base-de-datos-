// index.js
require('dotenv').config();
const express = require('express');
const mongoose = require('mongoose');
const quoteRoutes = require('./routes/quoteRoute');
const reviewRoutes = require('./routes/reviewRoute');
const serviceRoutes = require('./routes/serviceRoute');
const authRoutes = require('./routes/authRoute'); // Importar rutas de autenticación
const cors = require('cors');

const app = express();

app.use (cors());
app.use(express.json());

app.use(
    cors({
        origin: 'http://localhost:5173',
        methods: ['GET', 'POST', 'PUT', 'DELETE'],
        allowedHeaders: ['Content-Type', 'Authorization'],
    })
);
// Conexión a la base de datos
// index.js
mongoose.connect(process.env.MONGO_URI)
    .then(() => console.log('Conectado a la base de datos'))
    .catch((error) => console.error('Error de conexión a la base de datos:', error));


// Rutas
app.use('/api/auth', authRoutes);        
app.use('/api', quoteRoutes);
app.use('/api', reviewRoutes);
app.use('/api', serviceRoutes);

// Configuración del puerto
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
    console.log(`Servidor corriendo en el puerto ${PORT}`);
});
