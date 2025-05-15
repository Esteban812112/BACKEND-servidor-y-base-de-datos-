const jwt = require('jsonwebtoken');

const authMiddleware = (req, res, next) => {
    const token = req.header('Authorization')?.replace('Bearer ', '');
    if (!token) return res.status(401).json({ message: 'Acceso denegado, no se proporcionó token' });

    try {
        const verified = jwt.verify(token, process.env.JWT_SECRET);
        req.user = verified; // Adjuntar datos del token al objeto req
        next();
    } catch (error) {
        res.status(400).json({ message: 'Token no válido' });
    }
};

module.exports = authMiddleware;
