const knex = require('knex');

let conn = null;

if(!conn) {
    const db = knex({
        client: 'postgresql',
        connection: process.env.POSTGRES_URL,
        searchPath: 'public',
    });

    conn = db;
}

module.exports = conn;