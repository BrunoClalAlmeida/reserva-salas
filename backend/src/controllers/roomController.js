const Room = require('../models/Room');

exports.getRooms = async (req, res) => {
    try {
        const rooms = await Room.find().sort({ createdAt: -1 });
        res.json(rooms);
    } catch (error) {
        console.error('Erro ao buscar salas:', error.message);
        res.status(500).json({ message: 'Erro interno do servidor.' });
    }
};

exports.getRoomById = async (req, res) => {
    try {
        const room = await Room.findById(req.params.id);
        if (!room) {
            return res.status(404).json({ message: 'Sala não encontrada.' });
        }
        res.json(room);
    } catch (error) {
        console.error('Erro ao buscar sala:', error.message);
        res.status(500).json({ message: 'Erro interno do servidor.' });
    }
};

exports.createRoom = async (req, res) => {
    try {
        const { name, capacity, description, image } = req.body;
        const room = await Room.create({ name, capacity, description, image });
        res.status(201).json(room);
    } catch (error) {
        console.error('Erro ao criar sala:', error.message);
        res.status(500).json({ message: 'Erro interno do servidor.' });
    }
};

exports.updateRoom = async (req, res) => {
    try {
        const room = await Room.findByIdAndUpdate(req.params.id, req.body, {
            new: true,
            runValidators: true
        });
        if (!room) {
            return res.status(404).json({ message: 'Sala não encontrada.' });
        }
        res.json(room);
    } catch (error) {
        console.error('Erro ao atualizar sala:', error.message);
        res.status(500).json({ message: 'Erro interno do servidor.' });
    }
};

exports.deleteRoom = async (req, res) => {
    try {
        const room = await Room.findByIdAndDelete(req.params.id);
        if (!room) {
            return res.status(404).json({ message: 'Sala não encontrada.' });
        }
        res.json({ message: 'Sala removida com sucesso.' });
    } catch (error) {
        console.error('Erro ao deletar sala:', error.message);
        res.status(500).json({ message: 'Erro interno do servidor.' });
    }
};
