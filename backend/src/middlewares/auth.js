const jwt = require('jsonwebtoken');
const User = require('../models/User');

const auth = async (req, res, next) => {
    try {
        const token = req.header('Authorization')?.replace('Bearer ', '');

        if (!token) {
            return res.status(401).json({ message: 'Acesso negado. Token não fornecido.' });
        }

        const decoded = jwt.verify(token, process.env.JWT_SECRET);
        const user = await User.findById(decoded.id).select('-password');

        if (!user) {
            return res.status(401).json({ message: 'Token inválido.' });
        }

        req.user = user;
        next();
    } catch (error) {
        console.error('Erro na autenticação:', error.message);
        res.status(401).json({ message: 'Token inválido ou expirado.' });
    }
};

module.exports = auth;
