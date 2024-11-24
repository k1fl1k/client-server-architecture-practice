const client = require('../db');

class AuthorRepository {
    async create(data) {
        const { name } = data;
        const query = 'INSERT INTO authors (name) VALUES ($1) RETURNING *';
        const values = [name];
        const res = await client.query(query, values);
        return res.rows[0];
    }

    async findAll() {
        const res = await client.query('SELECT * FROM authors');
        return res.rows;
    }

    async findById(id) {
        const res = await client.query('SELECT * FROM authors WHERE id = $1', [id]);
        return res.rows[0];
    }

    async update(id, data) {
        const { name } = data;
        const query = 'UPDATE authors SET name = $1, updated_at = NOW() WHERE id = $2 RETURNING *';
        const values = [name, id];
        const res = await client.query(query, values);
        return res.rows[0];
    }

    async delete(id) {
        const res = await client.query('DELETE FROM authors WHERE id = $1 RETURNING *', [id]);
        return res.rows[0];
    }
}

module.exports.authorRepository = new AuthorRepository();