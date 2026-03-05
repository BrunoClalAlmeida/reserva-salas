const mongoose = require('mongoose');

const roomSchema = new mongoose.Schema({
    name: {
        type: String,
        required: [true, 'Nome da sala é obrigatório'],
        trim: true
    },
    capacity: {
        type: Number,
        required: [true, 'Capacidade é obrigatória'],
        min: 1
    },
    description: {
        type: String,
        trim: true,
        default: ''
    },
    image: {
        type: String,
        default: ''
    },
    available: {
        type: Boolean,
        default: true
    }
}, {
    timestamps: true
});

module.exports = mongoose.model('Room', roomSchema);
