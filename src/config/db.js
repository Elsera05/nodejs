const pg = require('pg');
const { Pool } = pg;

const {
    DB_PASS,
    DB_USER,
    DB_PORT,
    DB_HOST,
    DB,

} = process.env;

const pool = new Pool({
    user: DB_USER,
    password: DB_PASS,
    host: DB_HOST,
    database: DB,
    port: DB_PORT
});

//buat koneksinya 
pool.on("error", (err, client) => {
    console.error('Unexpected error on idle client', err)
    process.exit(-1)
})

pool.connect((err, connection) => {
    if (err) throw err;
    console.log("Connected to database");
    connection.release();
});

module.exports = pool;