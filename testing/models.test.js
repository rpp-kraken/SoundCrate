const { addSong, addTags, getAllSongs } = require('../server/models/index.js');
const { Client } = require('pg');
const { secrets } = require('docker-secret');
require('dotenv').config();

describe('models functions', () => {

  // const songsTable = 'temp_songs';
  // const tagsTable = 'temp_tags';
  // const usersTable = 'temp_users';

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
      const result = await getAllSongs(user);
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
      console.log(JSON.stringify(result));
      await expect(result.length).not.toBe(0);
      await expect(result.length).toBe(expected.length);
    });
  });

//   describe.skip('addSong', () => {
//     it.todo('should add a song to the database');
//   });

//   describe.skip('addTags', () => {
//     it.todo('should add tags to a song');
//   });
});
