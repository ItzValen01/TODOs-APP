const express = require('express');
const { body, validationResult } = require('express-validator');
const { Config } = require('../models/User');
const { authMiddleware } = require('../middlewares/authMiddleware');

const router = express.Router();

// Obtener la configuración
router.get('/', authMiddleware, async (req, res) => {
    try {
        const config = await Config.findOne({ where: { userId: req.user.id } });

        if (!config) {
            return res.status(404).json({ error: 'Configuración no encontrada' });
        }

        res.json(config);
    } catch (error) {
        console.error(error);
        res.status(500).json({ error: 'Error al obtener la configuración' });
    }
});

// Actualizar la configuración
router.put('/', [
    authMiddleware,
    body('darkmode').isBoolean().optional(),
    body('reset_config').isObject().optional(),
    body('reset_config.activado').isBoolean().optional(),
    body('reset_config.reset_mode').isString().optional()
], async (req, res) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
        return res.status(400).json({ errors: errors.array() });
    }

    try {
        const config = await Config.findOne({ where: { userId: req.user.id } });

        if (!config) {
            return res.status(404).json({ error: 'Configuración no encontrada' });
        }

        const updatedConfig = await config.update(req.body);
        res.json(updatedConfig);
    } catch (error) {
        console.error(error);
        res.status(500).json({ error: 'Error al actualizar la configuración' });
    }
});

module.exports = router;