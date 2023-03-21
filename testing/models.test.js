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

    it('should add a song to the database for a first time user', async () => {
      await models.addSong(song);
      const results = await global.client.query(`SELECT id, title FROM ${songsTable} WHERE title = '${song.title}'`);
      const user = await global.client.query(`SELECT name FROM ${usersTable} WHERE name = '${song.user}'`);
      expect(user.rows.length).not.toBe(0);
      expect(user.rows[0].name).toBe(song.user);
      expect(results.rows).toHaveLength(1);
      expect(results.rows[0].title).toBe(song.title);
    });
  });

  describe('addTags', () => {
    const song = {
      title: "New Song",
      created_at: (new Date).toISOString(),
      path_to_song: "",
      play_count: 0,
      fav_count: 0,
      path_to_artwork: '',
      user: 'someguy'
    };

    it('should add tags to a song', async () => {
      await models.addSong(song);
      const songIdQuery = await global.client.query(`SELECT id FROM ${songsTable} WHERE title = $1`, [song.title]);
      const songId = songIdQuery.rows.length ? songIdQuery.rows[0].id : undefined;

      const addedSong = await models.getSong(songId);
      expect(addedSong.id).toBe(songId);

      const emptyTags = await global.client.query(`SELECT * FROM ${tagsTable} WHERE song_id = $1`, [songId]);
      expect(emptyTags.rows.length).toBe(0);

      const tagsToAdd = "coolsong, awesome, emo";
      await models.addTags(tagsToAdd, addedSong.title);

      const result = await global.client.query(`SELECT * FROM ${tagsTable} WHERE song_id = $1`, [songId]);
      expect(result.rows.length).toBe(tagsToAdd.split(',').length);
      expect(result.rows.map(row => row.name)).toEqual(tagsToAdd.split(','));
    });

    it('should do nothing if a song does not exist', async () => {
      const nonExistent = "not a real song";

      const tagsToAdd = "coolsong, awesome, emo";
      await models.addTags(tagsToAdd, nonExistent);

      const result = await global.client.query(`SELECT * FROM ${tagsTable} WHERE name = $1`, [tagsToAdd.split(',')[0]]);
      expect(result.rows.length).toBe(0);
    });
  });

  describe('getSong', () => {
    it('should get a song for a given songId', async () => {
      const song = await models.getSong(1);
      expect(song.title).toBe('yum');
    });
    it('should return an empty object for an invalid songId', async () => {
      const song = await models.getSong(1000);
      expect(song).toEqual({});
    });
  });

  describe.skip('deleteSong', () => {
    it.todo('should delete a song for a given userId');
    it.todo('should handle error properly for nonexistent userId');
  })
});

