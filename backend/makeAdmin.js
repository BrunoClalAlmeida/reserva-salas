require('dotenv').config();
const mongoose = require('mongoose');
const dns = require('dns');

dns.setServers(['8.8.8.8', '8.8.4.4']);

mongoose.connect(process.env.MONGO_URI).then(async () => {
    await mongoose.connection.db.collection('users').updateOne(
        { email: 'admin@teste.com' },
        { $set: { role: 'admin' } }
    );
    console.log('Usuario atualizado para admin!');
    process.exit();
}).catch((err) => {
    console.error('Erro:', err.message);
    process.exit(1);
});