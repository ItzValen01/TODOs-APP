const jwt = require('jsonwebtoken');

const authMiddleware = (req, res, next) => {
    const token = req.header('authorization');

    if (!token || !token.startsWith('Bearer ')) {
        return res.status(401).json({ msg: 'Acceso denegado. No se proporcionó un token.' });
    }

    const jwtToken = token.split(' ')[1];

    try {
        const decoded = jwt.verify(jwtToken, process.env.SECRET_KEY);

        req.user = decoded;

        next();
    } catch (error) {
        if (error.name === 'TokenExpiredError') {
            return res.status(401).json({ msg: 'Token expired.' });
        }

        console.error(error);
        res.status(401).json({ msg: 'Token invalido.' });
    }
};

module.exports = { authMiddleware };