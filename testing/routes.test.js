/**
 * @jest-environment node
 */
require('dotenv').config();
const { expect } = require('chai');
const request = require('supertest');
const fs = require('fs');
const { Client } = require('pg');
const app = require('../server/index');
const path = require('path');
process.env.NODE_ENV = 'test';

describe('Reviews route', function () {
  this.timeout(10000);
  //Mocking db connection and loading app
  before(async function () {
    const client = new Client({
    host: process.env.DB_HOST,
    port: 5432,
    database: 'soundcrate',
    user: process.env.DB_USER,
    password: process.env.DB_PASSWORD,
    max: 20,
    idleTimeoutMillis: 1000
    });

    await client.connect();
    global.client = client;
  }, 10000);

  //Creating temp tables and insert fake data to test routes
  beforeEach(async function () {
    await global.client.query('BEGIN');
    await global.client.query('CREATE TEMPORARY TABLE temp_users (LIKE users INCLUDING ALL) ON COMMIT PRESERVE ROWS');
    await global.client.query('CREATE TEMPORARY TABLE temp_songs (LIKE songs INCLUDING ALL) ON COMMIT PRESERVE ROWS');
    await global.client.query('CREATE TEMPORARY TABLE temp_tags (LIKE song_tags INCLUDING ALL) ON COMMIT PRESERVE ROWS');
    await global.client.query(`INSERT INTO temp_users (id, name, email, bio, path_to_pic, username)
      VALUES (1, 'calpal', 'cp@gmail.com', 'cool guy', 'path', 'cp')`)
  }, 10000);

  after(async function () {
    await global.client.end();
  });

  describe('POST /api/uploadSong', function () {
    it('Should create a new song', async function () {
      const audioFilePath = path.join(__dirname, 'mocks', 'audio.m4a');
      const imageFilePath = path.join(__dirname, 'mocks', 'aaron.jpeg');
      const req = {
        audioFile: fs.readFileSync(audioFilePath),
        title: 'yum',
        created_at: '2023-03-11T19:43:02+00:00',
        play_count: 0,
        fav_count: 1,
        user: 'calpal',
        imageFile: fs.readFileSync(imageFilePath),
        tags: 'tag1,tag2,tag3'
      };

      const response = {
        title: 'yum',
        play_count: 0,
        fav_count: 1,
      };

      await postSong(req);

      const { rows } = await global.client.query(`SELECT title, play_count, fav_count
        FROM temp_songs WHERE title = $1`, [req.title]);

      expect(rows).lengthOf(1);
      expect(rows[0]).to.deep.equal(response);
    }, 10000);
  });

  const postSong = async (req, status = 201) => {
    const { body } = await request(app)
      .post('/api/uploadSong')
      .field('audioFile', req.audioFile, 'audio.m4a')
      .field('title', req.title)
      .field('created_at', req.created_at)
      .field('play_count', req.play_count)
      .field('fav_count', req.fav_count)
      .field('user', req.user)
      .field('imageFile', req.imageFile, 'aaron.jpeg')
      .field('tags', req.tags)
      .expect(status);
    return body;
  }
});