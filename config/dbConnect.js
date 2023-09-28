const { Pool } = require('pg');

const pool = new Pool({
    user: 'postgres',
    host: 'localhost',
    database: 'app',
    password: 'admin',
    port: 5432, 
});

// Check database connection

const dbConnect = async () => {
    const connect = pool.connect((err, client, done) => {
        if (err) {
            console.error('Error connecting to the database:', err);
        } else {
            console.log('Connected to the database');
            done();
        }
    });
}

module.exports = dbConnect;
