const PostgresAdapter = require('./postgresAdapter');

class PostgresProvider {
    constructor() {
        this.postgresAdapter = null;
    }

    async init(config) {
        this.postgresAdapter = new PostgresAdapter(config);
        await this.postgresAdapter.connect();
    }

    getAdapter() {
        if (!this.postgresAdapter) {
            throw new Error('PostgresAdapter is not initialized');
        }
        return this.postgresAdapter;
    }
}

module.exports = new PostgresProvider();