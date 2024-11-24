const client = require('../db');

class UserRepository {
    async create(data) {
        const { name, email } = data;
        const query = 'INSERT INTO users (name, email) VALUES ($1, $2) RETURNING *';
        const values = [name, email];
        const res = await client.query(query, values);
        return res.rows[0];
    }

    async findAll() {
        const res = await client.query('SELECT * FROM users');
        return res.rows;
    }

    async findById(id) {
        const res = await client.query('SELECT * FROM users WHERE id = $1', [id]);
        return res.rows[0];
    }

    async update(id, data) {
        const { name, email } = data;
        const query = 'UPDATE users SET name = $1, email = $2, updated_at = NOW() WHERE id = $3 RETURNING *';
        const values = [name, email, id];
        const res = await client.query(query, values);
        return res.rows[0];
    }

    async delete(id) {
        const res = await client.query('DELETE FROM users WHERE id = $1 RETURNING *', [id]);
        return res.rows[0];
    }
}

module.exports.userRepository = new UserRepository();