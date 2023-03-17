/**
 * @jest-environment node
 */
require('dotenv').config();
const { expect } = require('chai');
const request = require('supertest');
const fs = require('fs');
const { Client } = require('pg');
// const client = require('../db/index');
const app = require('../server/index');
process.env.NODE_ENV = 'test';

describe('Reviews route', () => {

  //Mocking db connection and loading app
  before(async () => {
    const client = new Client({
    host: 'localhost',
    port: 5432,
    database: 'soundcrate-test',
    user: 'postgres',
    password: 'password',
    max: 20,
    idleTimeoutMillis: 1000
    });

    await client.connect();
    global.client = client;
  });

  //Creating temp tables and insert fake data to test routes
  beforeEach(async () => {
    await global.client.query('BEGIN');
    await global.client.query('CREATE TEMPORARY TABLE temp_users (LIKE users INCLUDING ALL) ON COMMIT PRESERVE ROWS');
    await global.client.query('CREATE TEMPORARY TABLE temp_songs (LIKE songs INCLUDING ALL) ON COMMIT PRESERVE ROWS');
    await global.client.query('CREATE TEMPORARY TABLE temp_tags (LIKE tags INCLUDING ALL) ON COMMIT PRESERVE ROWS');
    await global.client.query(`INSERT INTO temp_users (id, name, email, bio, path_to_pic, username)
      VALUES (1, 'calpal', 'cp@gmail.com', 'cool guy', 'path', 'cp')`)
  });

  after(async () => {
    await global.client.end();
  });

  describe('POST /upload', () => {
    it('Should create a new song', async () => {
      const req = {
        audioFile: fs.readFileSync('/Users/seanmcdaniel/hack-reactor-rpp2207/audio-test/audio-test/__tests__/mocks/audio.m4a'),
        title: 'yum',
        created_at: '2023-03-11T19:43:02+00:00',
        play_count: 0,
        fav_count: 1,
        user: 'calpal',
        imageFile: fs.readFileSync('/Users/seanmcdaniel/hack-reactor-rpp2207/audio-test/audio-test/__tests__/mocks/aaron.jpeg'),
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
    });
  });

  const postSong = async (req, status = 201) => {
    const { body } = await request(app)
      .post('/upload')
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