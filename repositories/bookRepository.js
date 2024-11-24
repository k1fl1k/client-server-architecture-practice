const client = require('../db');

class BookRepository {
    async create(data) {
        const { title, authorId } = data;
        const query = 'INSERT INTO books (title, author_id) VALUES ($1, $2) RETURNING *';
        const values = [title, authorId];
        const res = await client.query(query, values);
        return res.rows[0];
    }

    async findAll() {
        const res = await client.query('SELECT * FROM books');
        return res.rows;
    }

    async findById(id) {
        const res = await client.query('SELECT * FROM books WHERE id = $1', [id]);
        return res.rows[0];
    }

    async update(id, data) {
        const { title, authorId } = data;
        const query = 'UPDATE books SET title = $1, author_id = $2, updated_at = NOW() WHERE id = $3 RETURNING *';
        const values = [title, authorId, id];
        const res = await client.query(query, values);
        return res.rows[0];
    }

    async delete(id) {
        const res = await client.query('DELETE FROM books WHERE id = $1 RETURNING *', [id]);
        return res.rows[0];
    }
}

module.exports.bookRepository = new BookRepository();