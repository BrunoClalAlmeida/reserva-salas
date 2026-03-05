const Reservation = require('../models/Reservation');

exports.createReservation = async (req, res) => {
    try {
        const { room, date, startTime, endTime, reason } = req.body;

        const conflict = await Reservation.findOne({
            room,
            date,
            status: { $in: ['pendente', 'aprovada'] },
            $or: [
                { startTime: { $lt: endTime }, endTime: { $gt: startTime } }
            ]
        });

        if (conflict) {
            return res.status(400).json({ message: 'Já existe uma reserva nesse horário.' });
        }

        const reservation = await Reservation.create({
            user: req.user._id,
            room,
            date,
            startTime,
            endTime,
            reason
        });

        await reservation.populate(['user', 'room']);
        res.status(201).json(reservation);
    } catch (error) {
        console.error('Erro ao criar reserva:', error.message);
        res.status(500).json({ message: 'Erro interno do servidor.' });
    }
};

exports.getMyReservations = async (req, res) => {
    try {
        const reservations = await Reservation.find({ user: req.user._id })
            .populate('room')
            .sort({ createdAt: -1 });
        res.json(reservations);
    } catch (error) {
        console.error('Erro ao buscar reservas:', error.message);
        res.status(500).json({ message: 'Erro interno do servidor.' });
    }
};

exports.getAllReservations = async (req, res) => {
    try {
        const reservations = await Reservation.find()
            .populate(['user', 'room'])
            .sort({ createdAt: -1 });
        res.json(reservations);
    } catch (error) {
        console.error('Erro ao buscar reservas:', error.message);
        res.status(500).json({ message: 'Erro interno do servidor.' });
    }
};

exports.updateStatus = async (req, res) => {
    try {
        const { status } = req.body;
        const allowed = ['aprovada', 'recusada'];

        if (!allowed.includes(status)) {
            return res.status(400).json({ message: 'Status inválido.' });
        }

        const reservation = await Reservation.findByIdAndUpdate(
            req.params.id,
            { status },
            { new: true }
        ).populate(['user', 'room']);

        if (!reservation) {
            return res.status(404).json({ message: 'Reserva não encontrada.' });
        }

        res.json(reservation);
    } catch (error) {
        console.error('Erro ao atualizar status:', error.message);
        res.status(500).json({ message: 'Erro interno do servidor.' });
    }
};

exports.cancelReservation = async (req, res) => {
    try {
        const reservation = await Reservation.findOne({
            _id: req.params.id,
            user: req.user._id
        });

        if (!reservation) {
            return res.status(404).json({ message: 'Reserva não encontrada.' });
        }

        if (reservation.status === 'cancelada') {
            return res.status(400).json({ message: 'Reserva já está cancelada.' });
        }

        reservation.status = 'cancelada';
        await reservation.save();
        await reservation.populate(['user', 'room']);

        res.json(reservation);
    } catch (error) {
        console.error('Erro ao cancelar reserva:', error.message);
        res.status(500).json({ message: 'Erro interno do servidor.' });
    }
};
