const express = require('express');
const router = express.Router();
const {
    getRooms, getRoomById, createRoom, updateRoom, deleteRoom
} = require('../controllers/roomController');
const auth = require('../middlewares/auth');
const isAdmin = require('../middlewares/isAdmin');
const { body } = require('express-validator');
const validate = require('../middlewares/validate');

/**
 * @swagger
 * /api/rooms:
 *   get:
 *     summary: Listar todas as salas
 *     tags: [Rooms]
 *     responses:
 *       200:
 *         description: Lista de salas
 */
router.get('/', getRooms);

/**
 * @swagger
 * /api/rooms/{id}:
 *   get:
 *     summary: Buscar sala por ID
 *     tags: [Rooms]
 */
router.get('/:id', getRoomById);

/**
 * @swagger
 * /api/rooms:
 *   post:
 *     summary: Criar sala (Admin)
 *     tags: [Rooms]
 *     security:
 *       - bearerAuth: []
 */
router.post('/', auth, isAdmin, [
    body('name').notEmpty().withMessage('Nome é obrigatório'),
    body('capacity').isInt({ min: 1 }).withMessage('Capacidade deve ser no mínimo 1')
], validate, createRoom);

/**
 * @swagger
 * /api/rooms/{id}:
 *   put:
 *     summary: Atualizar sala (Admin)
 *     tags: [Rooms]
 *     security:
 *       - bearerAuth: []
 */
router.put('/:id', auth, isAdmin, updateRoom);

/**
 * @swagger
 * /api/rooms/{id}:
 *   delete:
 *     summary: Deletar sala (Admin)
 *     tags: [Rooms]
 *     security:
 *       - bearerAuth: []
 */
router.delete('/:id', auth, isAdmin, deleteRoom);

module.exports = router;
