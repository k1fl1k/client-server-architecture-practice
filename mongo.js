const { MongoClient } = require('mongodb');

const uri = 'mongodb://root:example@mongo:27017';
const client = new MongoClient(uri, { useNewUrlParser: true, useUnifiedTopology: true });

async function connect() {
    try {
        await client.connect();
        console.log('Connected to MongoDB');
        return client.db('mydb');  // Повертає об'єкт бази даних
    } catch (err) {
        console.error('Connection error', err);
    }
}

module.exports = connect;