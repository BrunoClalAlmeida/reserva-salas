const express = require('express');
const router = express.Router();
const {
    createReservation, getMyReservations, getAllReservations,
    updateStatus, cancelReservation
} = require('../controllers/reservationController');
const auth = require('../middlewares/auth');
const isAdmin = require('../middlewares/isAdmin');
const { body } = require('express-validator');
const validate = require('../middlewares/validate');

/**
 * @swagger
 * /api/reservations:
 *   post:
 *     summary: Criar nova reserva
 *     tags: [Reservations]
 *     security:
 *       - bearerAuth: []
 */
router.post('/', auth, [
    body('room').notEmpty().withMessage('Sala é obrigatória'),
    body('date').notEmpty().withMessage('Data é obrigatória'),
    body('startTime').notEmpty().withMessage('Horário de início é obrigatório'),
    body('endTime').notEmpty().withMessage('Horário de término é obrigatório')
], validate, createReservation);

/**
 * @swagger
 * /api/reservations/my:
 *   get:
 *     summary: Minhas reservas
 *     tags: [Reservations]
 *     security:
 *       - bearerAuth: []
 */
router.get('/my', auth, getMyReservations);

/**
 * @swagger
 * /api/reservations:
 *   get:
 *     summary: Todas as reservas (Admin)
 *     tags: [Reservations]
 *     security:
 *       - bearerAuth: []
 */
router.get('/', auth, isAdmin, getAllReservations);

/**
 * @swagger
 * /api/reservations/{id}/status:
 *   patch:
 *     summary: Aprovar/Recusar reserva (Admin)
 *     tags: [Reservations]
 *     security:
 *       - bearerAuth: []
 */
router.patch('/:id/status', auth, isAdmin, [
    body('status').isIn(['aprovada', 'recusada']).withMessage('Status inválido')
], validate, updateStatus);

/**
 * @swagger
 * /api/reservations/{id}/cancel:
 *   patch:
 *     summary: Cancelar minha reserva
 *     tags: [Reservations]
 *     security:
 *       - bearerAuth: []
 */
router.patch('/:id/cancel', auth, cancelReservation);

module.exports = router;
