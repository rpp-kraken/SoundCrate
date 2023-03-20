const models = require('../server/models/index.js');
const { Client } = require('pg');
const { secrets } = require('docker-secret');
const path = require('path');
const fs = require('fs');
require('dotenv').config();

describe('models functions', () => {

  const songsTable = 'temp_songs';
  const tagsTable = 'temp_tags';
  const usersTable = 'temp_users';

  // TODO: Change this after refactoring to pass a db instance directly into models
  process.env.NODE_ENV = 'test';

  jest.setTimeout(10000);
  let client;

  //Mocking db connection and loading app
  beforeAll(async () => {
    client = new Client({
      host: secrets.DB_HOST || process.env.DB_HOST,
      port: 5432,
      database: 'soundcrate',
      user: secrets.DB_USER || process.env.DB_USER,
      password: secrets.DB_PASSWORD || process.env.DB_PASSWORD,
      max: 20,
      idleTimeoutMillis: 1000
    });

    await client.connect();
    global.client = client;
  }, 10000);

  //Creating temp tables and insert fake data to test routes
  beforeEach(async () => {
    await global.client.query('BEGIN');
    await global.client.query('CREATE TEMPORARY TABLE IF NOT EXISTS temp_users (LIKE users INCLUDING ALL) ON COMMIT PRESERVE ROWS');
    await global.client.query('CREATE TEMPORARY TABLE IF NOT EXISTS temp_songs (LIKE songs INCLUDING ALL) ON COMMIT PRESERVE ROWS');
    await global.client.query('CREATE TEMPORARY TABLE IF NOT EXISTS temp_tags (LIKE song_tags INCLUDING ALL) ON COMMIT PRESERVE ROWS');
    await global.client.query(`INSERT INTO temp_users (id, name, email, bio, path_to_pic, username)
      VALUES (1, 'calpal', 'cp@gmail.com', 'cool guy', 'path', 'cp')`);
    await global.client.query(`INSERT INTO temp_songs (id, title, created_at, path_to_song, play_count, fav_count, path_to_artwork, user_id)
      VALUES (1, 'yum', '2023-03-11T19:43:02+00:00', 'https://google.com', 1, 1, 'https://google.com', 1)`);
  }, 10000);

  afterEach(async () => {
    await global.client.query('ROLLBACK');
    await global.client.query('DROP TABLE IF EXISTS temp_users');
    await global.client.query('DROP TABLE IF EXISTS temp_songs');
    await global.client.query('DROP TABLE IF EXISTS temp_tags');
  });

  afterAll(async () => {
    await global.client.end();
    await client.end();
  });

  describe('getAllSongs', () => {
    it('should get all songs from a specific user', async () => {
      const user = 'calpal'
      const result = await models.getAllSongs(user);
      const expected = [{
        id: 1,
        title: 'yum',
        created_at: '2023-03-11T19:43:02+00:00',
        path_to_song: 'https://google.com',
        play_count: 1,
        fav_count: 1,
        path_to_artwork: 'https://google.com',
        user_id: 1
      }]
      // console.log(JSON.stringify(result));
      await expect(result.length).not.toBe(0);
      await expect(result.length).toBe(expected.length);
    });

    it('should return an empty array if a userId is not in the database', async () => {
      const user = 'fakeUser';
      const result = await models.getAllSongs(user);
      await expect(result).toEqual([]);
    });
  });

  describe.skip('addUser', () => {
    it.todo('should add a user to the database with full info filled out');
    it.todo('should add a user to the database with just the name');
    it.todo('should not be able to add a user if user already exists');
  });

  describe('addSong', () => {
    const song = {
      title: "New Song",
      created_at: (new Date).toISOString(),
      path_to_song: "",
      play_count: 0,
      fav_count: 0,
      path_to_artwork: '',
      user: 'someguy'
    }

    it('should add a song to the database for an existing user', async () => {
      const user = { name: 'someguy' };
      await models.addUser(user);
      const userIds = await global.client.query(`SELECT id FROM ${usersTable} WHERE name = '${user.name}'`);

      // check that user was inserted into the database
      expect(userIds.rows.length).not.toBe(0);

      // check that initial songCount for this user is 0
      const initialSongs = await global.client.query(`SELECT id FROM ${songsTable} WHERE user_id = $1`, [userIds.rows[0].id]);
      expect(initialSongs.rows.length).toBe(0);

      await models.addSong(song);
      const results = await global.client.query(`SELECT id, title FROM ${songsTable} WHERE title = '${song.title}'`);
      expect(results.rows).toHaveLength(1);
      expect(results.rows[0].title).toBe(song.title);

    });

    it('should add a song to the database for a first time user', () => {

    });

    it('should throw an error if song is not added', () => {

    });
  });


  describe.skip('addTags', () => {
    it.todo('should add tags to a song');
    it.todo('should do nothing, and log an error if a song does not exist');
  });

  describe.skip('getSong', () => {
    it.todo('should get a song for a given songId');
    it.todo('should return null for an invalid songId');
  });

  describe.skip('deleteSong', () => {
    it.todo('should delete a song for a given userId');
    it.todo('should handle error properly for nonexistent userId');
  })
});

