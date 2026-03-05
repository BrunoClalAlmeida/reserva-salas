const request = require('supertest');
const app = require('../src/app');
const mongoose = require('mongoose');
const User = require('../src/models/User');
const Room = require('../src/models/Room');

let adminToken;

beforeAll(async () => {
    const dns = require('dns');
    dns.setServers(['8.8.8.8', '8.8.4.4']);
    await mongoose.connect(process.env.MONGO_URI || 'mongodb://localhost:27017/reserva-salas-test');

    await User.deleteMany({ email: 'admin@jest.com' });
    const user = await User.create({ name: 'Admin Jest', email: 'admin@jest.com', password: '123456', role: 'admin' });
    const res = await request(app).post('/api/auth/login').send({ email: 'admin@jest.com', password: '123456' });
    adminToken = res.body.token;
});

afterAll(async () => {
    await User.deleteMany({ email: 'admin@jest.com' });
    await Room.deleteMany({ name: 'Sala Teste Jest' });
    await mongoose.connection.close();
});

describe('Rooms API', () => {
    test('POST /api/rooms - admin deve criar sala', async () => {
        const res = await request(app)
            .post('/api/rooms')
            .set('Authorization', `Bearer ${adminToken}`)
            .send({ name: 'Sala Teste Jest', capacity: 15, description: 'Sala de teste' });
        expect(res.statusCode).toBe(201);
        expect(res.body.name).toBe('Sala Teste Jest');
    });

    test('GET /api/rooms - deve listar salas', async () => {
        const res = await request(app).get('/api/rooms');
        expect(res.statusCode).toBe(200);
        expect(Array.isArray(res.body)).toBe(true);
    });

    test('POST /api/rooms - sem token deve ser negado', async () => {
        const res = await request(app)
            .post('/api/rooms')
            .send({ name: 'Sala Sem Auth', capacity: 10 });
        expect(res.statusCode).toBe(401);
    });
});
