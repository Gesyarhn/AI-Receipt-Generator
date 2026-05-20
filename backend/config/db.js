import dotenv from 'dotenv';
dotenv.config();

import pkg from 'pg';
const { Pool } = pkg;

const pool = new Pool({
    connectionString: process.env.DATABASE_URL,
    ssl: process.env.DATABASE_URL ? { rejectUnauthorized: false } : false
})

pool.on('error', (err) => {
    console.error('Unexpected database error', err);
    process.exit(-1);
});

export default pool;