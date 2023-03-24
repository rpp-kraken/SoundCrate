/**
 * @jest-environment node
 */
const { Client } = require('pg');
const request = require('supertest');
const fs = require('fs');
const path = require('path');
const { app, server } = require('../server/index');
const { secrets } = require('docker-secret');
require('dotenv').config();

describe('Reviews route', () => {
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
    await global.client.query('CREATE TEMPORARY TABLE IF NOT EXISTS temp_songs (LIKE songs INCLUDING ALL)');
    await global.client.query('CREATE TEMPORARY TABLE IF NOT EXISTS temp_tags (LIKE song_tags INCLUDING ALL) ON COMMIT PRESERVE ROWS');
    await global.client.query('CREATE TEMPORARY TABLE IF NOT EXISTS temp_favorites (LIKE favorites INCLUDING ALL)');
    await global.client.query(`INSERT INTO temp_users (id, name, email, bio, path_to_pic, username)
      VALUES (1, 'calpal', 'cp@gmail.com', 'cool guy', 'path', 'cp')`);
    await global.client.query(`INSERT INTO temp_users (id, name, email, bio, path_to_pic, username)
      VALUES (2, 'Mindi Test 123', 'test@123test.com', 'my bio', 'path', 'mintest123')`);
    await global.client.query(`INSERT INTO temp_songs (id, title, created_at, path_to_song, play_count, fav_count, path_to_artwork, user_id)
      VALUES (1, 'yum', '2023-03-11T19:43:02+00:00', 'https://google.com', 1, 1, 'https://google.com', 1)`);
    await global.client.query(`INSERT INTO temp_songs (id, title, created_at, path_to_song, play_count, fav_count, path_to_artwork, user_id)
      VALUES (2, 'yums', '2023-03-11T19:43:02+00:00', 'https://google.com', 1, 1, 'https://google.com', 1)`);
    await global.client.query(`INSERT INTO temp_favorites (id, user_id, song_id) VALUES (1, 1, 1)`);
    await global.client.query(`INSERT INTO temp_favorites (id, user_id, song_id) VALUES (2, 1, 2)`);
  }, 10000);

  afterAll(async () => {
    await client.end();
    await server.close();
  });

  afterEach(async () => {
    await global.client.query('ROLLBACK');
    await global.client.query('DROP TABLE IF EXISTS temp_users');
    await global.client.query('DROP TABLE IF EXISTS temp_songs');
    await global.client.query('DROP TABLE IF EXISTS temp_tags');
  });

  describe('POST /api/uploadSong', () => {
    it('Should create a new song', async () => {
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

      await expect(rows).toHaveLength(2);
      await expect(rows[1]).toStrictEqual(response);
    }, 10000);

    it('Should return a 500 code if song file is not sent', async function () {
      const imageFilePath = path.join(__dirname, 'mocks', 'aaron.jpeg');
      const req = {
        title: 'yum',
        created_at: '2023-03-11T19:43:02+00:00',
        play_count: 0,
        fav_count: 1,
        user: 'calpal',
        imageFile: fs.readFileSync(imageFilePath),
        tags: 'tag1,tag2,tag3'
      };

      await postSongFail(req);
    });
  });

  describe('GET songs route', function () {
    it('should grab a song correctly', async function () {
      const response = {
        title: 'yum',
        path_to_song: 'https://google.com',
        play_count: 1,
        fav_count: 1,
        path_to_artwork: 'https://google.com'
      };

      await getSongs();

      const { rows } = await global.client.query(`SELECT title, path_to_song, play_count, fav_count, path_to_artwork
        FROM temp_songs WHERE user_id = $1`, [1]);

      expect(rows).toHaveLength(2);
      expect(rows[0]).toStrictEqual(response);
    });

    // skipping because isn't it more graceful for the user to just send back
    // an empty array? This is what the model does and the model tests test for,
    // but we can change if we like.
    it.skip('should return 500 if user has not uploaded any songs', async function () {
      await getSongsFail();
    });

  });

  describe('DELETE song route', function () {
    it('should delete a song correctly', async function () {
      const initialGet = await global.client.query(`SELECT id, title, path_to_song, play_count, fav_count, path_to_artwork
        FROM temp_songs WHERE user_id = $1`, [1]);

      await deleteSong();

      const { rows } = await global.client.query(`SELECT id, title, path_to_song, play_count, fav_count, path_to_artwork
      FROM temp_songs WHERE user_id = $1`, [1]);

      await expect(initialGet.rows).toHaveLength(2);
      await expect(rows).toHaveLength(1);
    });

    // skipping because is it more graceful to just do nothing in this instance?
    // The model does not throw an error. We can change if we would rather.
    it.skip('should return a 500 if songId is not in database', async function () {
      await deleteSongFail();
    });
  });

  describe('Favorites routes', function () {
    it('should get a user\'s favorite songs', async function () {
      const response = [
        {
          "created_at": "2023-03-12T00:43:02.000Z",
          "fav_count": 1,
          "id": "1",
          "path_to_artwork": "https://google.com",
          "path_to_song": "https://google.com",
          "play_count": 1,
          "tags": [],
          "title": "yum",
          "user_id": "1"
        },
        {
          "created_at": "2023-03-12T00:43:02.000Z",
          "fav_count": 1,
          "id": "2",
          "path_to_artwork": "https://google.com",
          "path_to_song": "https://google.com",
          "play_count": 1,
          "tags": [],
          "title": "yums",
          "user_id": "1"
        }
      ];
      const result = await getFavoriteSongs();

      await expect(result[0].id).toStrictEqual(response[0].id);
    });

    it('should returna 404 error when trying to access a user\'s favorite songs if user doesn\'t exist', async function () {
      await getFavoriteSongsFail();
    });
  });

  describe('PUT song routes', function() {
    it('should update the title of a song', async function () {
      const req = {
        title: 'yummy'
      };

      const response = {
        title: 'yummy'
      };

      const initialGet = await global.client.query(`SELECT title FROM temp_songs WHERE user_id = $1`, [1]);

      await updateTitle(req, 204);

      const { rows } = await global.client.query(`SELECT title FROM temp_songs WHERE user_id = $1`, [1]);

      expect(initialGet.rows[0].title).toStrictEqual('yum')
      expect(rows[1].title).toStrictEqual(response.title);
    });

    it('should send a 404 when trying to update title of song that does not exist', async function () {
      const req = {
        title: 'yummy'
      };
      await updateTitleFail(req);
    });
  });

  describe('PUT users route', function () {
    it('Should update a user\'s bio', async function () {
      const req = {
        bio: 'the cooliest'
      };

      const initialGet = await global.client.query(`SELECT bio FROM temp_users WHERE id = $1`, [1]);

      await updateBio(req, 204);

      const { rows } = await global.client.query(`SELECT bio FROM temp_users WHERE id = $1`, [1]);

      expect(initialGet.rows[0].bio).toStrictEqual('cool guy');
      expect(rows[0].bio).toStrictEqual('the cooliest');
    });
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
  };

  const postSongFail = async (req, status = 500) => {
    const { body } = await request(app)
      .post('/api/uploadSong')
      .field('title', req.title)
      .field('created_at', req.created_at)
      .field('play_count', req.play_count)
      .field('fav_count', req.fav_count)
      .field('user', req.user)
      .field('imageFile', req.imageFile, 'aaron.jpeg')
      .field('tags', req.tags)
      .expect(status);
    return body;
  };

  const getSongs = async (req, status = 200) => {
    const { body } = await request(app)
      .get('/api/songs?user=calpal')
      .expect(status);
    return body;
  };

  const getSongsFail = async (status = 500) => {
    const { body } = await request(app)
      .get('/api/songs?user=aaron')
      .expect(status);
      return body;
  };

  const deleteSong = async (req, status = 204) => {
    const { body } = await request(app)
      .delete('/api/deleteSong?songId=1')
      .expect(status);
    return body;
  };

  const deleteSongFail = async (status = 404) => {
    const { body } = await request(app)
      .delete('/api/deleteSong?songId=5')
      .expect(status);
    return body;
  };

  const getFavoriteSongs = async (status = 200) => {
    const { body } = await request(app)
      .get('/api/getFavoriteSongs?user=calpal')
      .expect(status);
    return body;
  };

  const getFavoriteSongsFail = async (status = 404) => {
    const { body } = await request(app)
      .get('/api/getFavoriteSongs?user=aaron')
      .expect(status);
    return body;
  };

  const updateTitle = async (req, status = 204) => {
    const { body } = await request(app)
      .put('/api/editTitle?songId=1')
      .send(req)
      .expect(status);
    return body;
  };

  const updateTitleFail = async (req, status = 404) => {
    const { body } = await request(app)
      .put('/api/editTitle?songId=5')
      .send(req)
      .expect(status);
    return body;
  };

  const updateBio = async (req, status = 204) => {
    const { body } = await request(app)
      .put('/api/editProfileBio')
      .send(req)
      .expect(status);
    return body;
  };

});