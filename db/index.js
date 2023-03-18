// use docker secrets instead of .env for production
const { secrets } = require('docker-secret');
require('dotenv').config();
const Pool = require('pg-pool');
const pool = new Pool ({
  host: secrets.DB_HOST || process.env.DB_HOST,
  port: 5432,
  database: 'soundcrate',
  user: secrets.DB_USER || process.env.DB_USER,
  password: secrets.DB_PASSWORD || process.env.DB_PASSWORD,
  max: 20,
  idleTimeoutMillis: 1000
});

module.exports = {
  query: (text, values) => {
    return pool.query(text, values);
  }
}