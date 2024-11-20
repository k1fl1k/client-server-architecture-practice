const { Client } = require('pg');

class PostgresAdapter {
    constructor(config) {
        this.client = new Client(config);
    }

    async connect() {
        await this.client.connect();
    }

    async disconnect() {
        await this.client.end();
    }

    async query(query, params) {
        return this.client.query(query, params);
    }
}

module.exports = PostgresAdapter;