const mongoose = require('mongoose');

const reservationSchema = new mongoose.Schema({
    user: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User',
        required: true
    },
    room: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Room',
        required: true
    },
    date: {
        type: String,
        required: [true, 'Data é obrigatória']
    },
    startTime: {
        type: String,
        required: [true, 'Horário de início é obrigatório']
    },
    endTime: {
        type: String,
        required: [true, 'Horário de término é obrigatório']
    },
    status: {
        type: String,
        enum: ['pendente', 'aprovada', 'recusada', 'cancelada'],
        default: 'pendente'
    },
    reason: {
        type: String,
        trim: true,
        default: ''
    }
}, {
    timestamps: true
});

module.exports = mongoose.model('Reservation', reservationSchema);
