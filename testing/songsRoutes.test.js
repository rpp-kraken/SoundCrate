/**
 * @jest-environment node
 */

// const { expect } = require('chai');
// const request = require('supertest');
// const Pool = require('pg-pool');
// const client = require('../db/index');
// const app = require('../server/index');

// describe('Songs upload route', () => {

//   //Mocking db connection and loading app
//   before(async () => {
//     const pool = new Pool({
//       host: '127.0.0.1',
//     port: 5432,
//     database: 'soundcrate',
//     user: 'postgres',
//     password: '',
//     max: 1,
//     idleTimeoutMillis: 0
//     });

//     client.query = (text, values) => {
//       return pool.query(text, values);
//     }
//   });
// });