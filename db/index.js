require('dotenv').config();
const Pool = require('pg-pool');
const pool = new Pool ({
  host: process.env.DB_HOST,
  port: 5432,
  database: 'soundcrate',
  user: process.env.DB_USER,
  password: process.env.DB_PASSWORD,
  max: 20,
  idleTimeoutMillis: 1000
});

module.exports = {
  query: (text, values) => {
    return pool.query(text, values);
  }
}