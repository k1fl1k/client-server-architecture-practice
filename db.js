const { Client } = require('pg');

const client = new Client({
    user: 'node',
    host: 'db',
    database: 'mydb',
    password: 'password',
    port: 5432,
});

client.connect()
    .then(() => {
        console.log('Connected to PostgreSQL');
        return client.query(`
            CREATE TABLE IF NOT EXISTS resources (
                id SERIAL PRIMARY KEY,
                name VARCHAR(255) NOT NULL,
                type VARCHAR(255) NOT NULL,
                amount INTEGER NOT NULL,
                price NUMERIC(10, 2) NOT NULL,
                created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
                updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
            );
        `);
    })
    .then(() => console.log('Table "resources" is ready'))
    .catch(err => console.error('Connection error', err.stack));

module.exports = client;