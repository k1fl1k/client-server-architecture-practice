const client = require('../db');

class ResourceRepository {
    async create(data) {
        const { name, type, amount, price } = data;
        const query = 'INSERT INTO resources (name, type, amount, price) VALUES ($1, $2, $3, $4) RETURNING *';
        const values = [name, type, amount, price];
        const res = await client.query(query, values);
        return res.rows[0];
    }

    async findAll() {
        const res = await client.query('SELECT * FROM resources');
        return res.rows;
    }

    async findById(id) {
        const res = await client.query('SELECT * FROM resources WHERE id = $1', [id]);
        return res.rows[0];
    }

    async update(id, data) {
        const { name, type, amount, price } = data;
        const query = 'UPDATE resources SET name = $1, type = $2, amount = $3, price = $4, updated_at = NOW() WHERE id = $5 RETURNING *';
        const values = [name, type, amount, price, id];
        const res = await client.query(query, values);
        return res.rows[0];
    }

    async delete(id) {
        const res = await client.query('DELETE FROM resources WHERE id = $1 RETURNING *', [id]);
        return res.rows[0];
    }
}

module.exports.resourceRepository = new ResourceRepository();

// Type definitions

/**
 * @typedef {{
 *  name: string,
 *  type: string,
 *  amount: number,
 *  price: number,
 * }} ResourceShape
 */

/**
 * @typedef { ResourceShape & {
 *  id: string,
 *  createdAt: Date,
 *  updatedAt: Date
 * }} ResourceInstance
 */