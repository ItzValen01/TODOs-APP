const express = require('express');
const { body, validationResult } = require('express-validator');
const { Todo } = require('../models/User');
const { authMiddleware } = require('../middlewares/authMiddleware');

const router = express.Router();

// Obtener todos los TODOs del usuario
router.get('/', authMiddleware, async (req, res) => {
    try {
        const todos = await Todo.findAll({ where: { userId: req.user.id } });
        res.json(todos);
    } catch (error) {
        console.error(error);
        res.status(500).json({ error: 'Error al obtener los TODOs' });
    }
});

// Crear un nuevo TODO
router.post('/', [
    authMiddleware,
    body('text').isString().notEmpty(),
], async (req, res) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
        return res.status(400).json({ errors: errors.array() });
    }

    try {
        const newTodo = await Todo.create({
            text: req.body.text,
            completed: false,
            userId: req.user.id
        });

        res.status(201).json(newTodo);
    } catch (error) {
        console.error(error);
        res.status(500).json({ error: 'Error al crear el TODO' });
    }
});

// Eliminar un TODO
router.delete('/:id', authMiddleware, async (req, res) => {
    try {
        const todo = await Todo.findOne({ where: { id: req.params.id, userId: req.user.id } });

        if (!todo) {
            return res.status(404).json({ error: 'TODO no encontrado' });
        }

        await todo.destroy();
        res.json({ message: 'TODO eliminado con éxito' });
    } catch (error) {
        console.error(error);
        res.status(500).json({ error: 'Error al eliminar el TODO' });
    }
});

// Toggle (alternar) el estado de un TODO (completado/no completado)
router.post('/:id', [
    authMiddleware
], async (req, res) => {
    try {
        // Buscar el TODO por su ID y el usuario actual
        const todo = await Todo.findOne({ where: { id: req.params.id, userId: req.user.id } });

        if (!todo) {
            return res.status(404).json({ error: 'TODO no encontrado' });
        }

        // Alternar el valor de 'completed' (true/false)
        const updatedTodo = await todo.update({
            completed: !todo.completed
        });

        res.json(updatedTodo);
    } catch (error) {
        console.error(error);
        res.status(500).json({ error: 'Error al actualizar el TODO' });
    }
});

module.exports = router;