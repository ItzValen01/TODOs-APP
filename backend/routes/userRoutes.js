require('dotenv').config();
const express = require('express');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const { body, validationResult } = require('express-validator');
const { User, Config } = require('../models/User');
const router = express.Router();

// Registro de usuario
router.post('/register', [
    body('username').isString().notEmpty(),
    body('password').isLength({ min: 6 })
], async (req, res) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
        return res.status(400).json({ errors: errors.array() });
    }

    const { username, password } = req.body;

    try {
        let user = await User.findOne({ where: { username } });
        if (user) {
            return res.status(400).json({ msg: 'El usuario ya existe' });
        }

        user = await User.create({
            username,
            password: await bcrypt.hash(password, 10)
        });

        await Config.create({
            userId: user.id
        });

        return res.status(201).json({ msg: 'Usuario registrado con éxito' });
    } catch (error) {
        console.error(error);
        req.status(500).send('Error en el servidor');
    }
});

router.post('/login', [
    body('username').isString().notEmpty(),
    body('password').isString().notEmpty(),
], async (req, res) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
        return res.status(400).json({ errors: errors.array() });
    }

    const { username, password } = req.body;

    try {
        const user = await User.findOne({ where: { username } });
        if (!user) {
            return res.status(400).json({ msg: 'Usuario o contraseña incorrectos' });
        }

        const isMatch = await bcrypt.compare(password, user.password);
        if (!isMatch) {
            return res.status(400).json({ msg: 'Usuario o contraseña incorrectos' });
        }

        const token = jwt.sign({ id: user.id }, process.env.SECRET_KEY, { expiresIn: '1h' });

        return res.json({ token });
    } catch (error) {  
        console.error(error);  
        res.status(500).send('Error en el servidor');  
    }
});

module.exports = router;