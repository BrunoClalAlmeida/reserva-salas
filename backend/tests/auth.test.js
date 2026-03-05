const request = require('supertest');
const app = require('../src/app');
const mongoose = require('mongoose');
const User = require('../src/models/User');

beforeAll(async () => {
    const dns = require('dns');
    dns.setServers(['8.8.8.8', '8.8.4.4']);
    await mongoose.connect(process.env.MONGO_URI || 'mongodb://localhost:27017/reserva-salas-test');
});

afterAll(async () => {
    await User.deleteMany({ email: 'teste@jest.com' });
    await mongoose.connection.close();
});

describe('Auth API', () => {
    test('POST /api/auth/register - deve registrar usuario', async () => {
        const res = await request(app)
            .post('/api/auth/register')
            .send({ name: 'Teste Jest', email: 'teste@jest.com', password: '123456' });
        expect(res.statusCode).toBe(201);
        expect(res.body).toHaveProperty('token');
        expect(res.body.name).toBe('Teste Jest');
    });

    test('POST /api/auth/register - deve rejeitar email duplicado', async () => {
        const res = await request(app)
            .post('/api/auth/register')
            .send({ name: 'Teste Jest', email: 'teste@jest.com', password: '123456' });
        expect(res.statusCode).toBe(400);
    });

    test('POST /api/auth/login - deve fazer login', async () => {
        const res = await request(app)
            .post('/api/auth/login')
            .send({ email: 'teste@jest.com', password: '123456' });
        expect(res.statusCode).toBe(200);
        expect(res.body).toHaveProperty('token');
    });

    test('POST /api/auth/login - deve rejeitar senha errada', async () => {
        const res = await request(app)
            .post('/api/auth/login')
            .send({ email: 'teste@jest.com', password: 'senhaerrada' });
        expect(res.statusCode).toBe(401);
    });

    test('GET /api/health - deve retornar status OK', async () => {
        const res = await request(app).get('/api/health');
        expect(res.statusCode).toBe(200);
        expect(res.body.status).toBe('OK');
    });
});
