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
    await global.client.query(`INSERT INTO temp_tags (id, name, song_id)
      VALUES (1, 'tag1', 1)`);

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

  describe('getAllSongsHome', () => {

    it('should get all songs for home tab', async () => {

      const result = await models.getAllSongsHome();

      await expect(result.length).not.toBe(0);
      await expect(result.length).toBe(1);
    });
  });

  describe('getSongsByUser', () => {
    it('should get all songs from a specific user', async () => {
      const user = 'calpal'
      const result = await models.getSongsByUser(user);
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
      const result = await models.getSongsByUser(user);
      await expect(result).toEqual([]);
    });
  });

  describe('getSongsByUserId', () => {
    it('should get all songs from a specific user for a userId', async () => {
      const userId = 1;
      const result = await models.getSongsByUserId(userId);
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
      const userId = 700;
      const result = await models.getSongsByUserId(userId);
      await expect(result).toEqual([]);
    })
  })

  describe('addUser', () => {
    it('should add a user to the database with full info filled out', async () => {
      const user = {
        name: 'Nate',
        email: 'nate@nate.com',
        bio: 'Hi, my name is Nate',
        path_to_pic: 'www.google.com',
        username: 'we should delete this field',
        tier1: true,
        tier2: false,
        tier3: false
      }
      await models.addUser(user);
      const userInDB = await global.client.query(`SELECT * FROM ${usersTable} WHERE name = $1`, [user.name]);
      expect(userInDB.rows.length).not.toBe(0);
      expect(userInDB.rows[0].name).toEqual(user.name);
    });
    it('should add a user to the database with just the name', async () => {
      const user = { name: 'Sean' };
      await models.addUser(user);
      const userInDB = await global.client.query(`SELECT * FROM ${usersTable} WHERE name = $1`, [user.name]);
      expect(userInDB.rows.length).not.toBe(0);
      expect(userInDB.rows[0].name).toEqual(user.name);
    });
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

    //   it('should add a song to the database for a first time user', async () => {
    //     await models.addSong(song);
    //     const results = await global.client.query(`SELECT id, title FROM ${songsTable} WHERE title = '${song.title}'`);
    //     const user = await global.client.query(`SELECT name FROM ${usersTable} WHERE name = '${song.user}'`);
    //     expect(user.rows.length).not.toBe(0);
    //     expect(user.rows[0].name).toBe(song.user);
    //     expect(results.rows).toHaveLength(1);
    //     expect(results.rows[0].title).toBe(song.title);
    //   });
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

  describe('deleteSong', () => {
    const song = {
      title: "New Song",
      created_at: (new Date).toISOString(),
      path_to_song: "",
      play_count: 0,
      fav_count: 0,
      path_to_artwork: '',
      user: 'someguy'
    };

    it('should delete a song for a given userId', async () => {
      await models.addSong(song);
      const songId = await global.client.query(`SELECT id FROM ${songsTable} WHERE title = $1`, [song.title]);
      expect(songId.rows.length).not.toBe(0);

      await models.deleteSong(songId.rows[0].id);
      const deletedSong = await global.client.query(`SELECT * FROM ${songsTable} WHERE id = $1`, [songId]);
      expect(deletedSong.rows.length).toBe(0);
    });
    it('should handle error properly for nonexistent songId', async () => {
      const deletedSong = await models.deleteSong(1000);
      expect(deletedSong).not.toBe(null);
    });
    it('should delete all entries for that song in the song_tags table', async () => {
      await models.addSong(song);
      const songId = await global.client.query(`SELECT id FROM ${songsTable} WHERE title = $1`, [song.title]);
      expect(songId.rows.length).not.toBe(0);

      await models.addTags('tag1, tag2, tag3', song.title);
      const tagsQuery = await global.client.query(`SELECT * FROM ${tagsTable} WHERE song_id = $1`, [songId.rows[0].id]);
      expect(tagsQuery.rows.length).toBe(3);

      await models.deleteSong(songId.rows[0].id);
      const emptyTags = await global.client.query(`SELECT * FROM ${tagsTable} WHERE song_id = $1`, [songId.rows[0].id]);
      expect(emptyTags.rows.length).toBe(0);
    });
  });

  describe('deleteTagsByUser', () => {
    it('should delete all tags associated with a given user', async () => {
      const user = 'calpal';

      // add a second song for 'calpal'
      await global.client.query(`INSERT INTO temp_songs (id, title, created_at, path_to_song, play_count, fav_count, path_to_artwork, user_id)
      VALUES (2, 'yum2', '2023-03-11T19:43:02+00:00', 'https://google.com', 1, 1, 'https://google.com', 1)`);

      // and one for a different user
      await global.client.query(`INSERT INTO temp_songs (id, title, created_at, path_to_song, play_count, fav_count, path_to_artwork, user_id)
      VALUES (3, 'yum3', '2023-03-11T19:43:02+00:00', 'https://google.com', 1, 1, 'https://google.com', 2)`);

      const songs = await models.getSongsByUser(user);
      expect(songs.length).toBe(2);

      // one tag already exists for user #1 from the beforeEach block
      await global.client.query(`INSERT INTO ${tagsTable} (id, name, song_id) VALUES (1000, 'tag1', 1)`);
      await global.client.query(`INSERT INTO ${tagsTable} (id, name, song_id) VALUES (1001, 'tag2', 1)`);
      await global.client.query(`INSERT INTO ${tagsTable} (id, name, song_id) VALUES (2000, 'tag1ForSong2', 2)`);

      // add one tag for song 3 that belongs to user 2
      await global.client.query(`INSERT INTO ${tagsTable} (id, name, song_id) VALUES (3000, 'tag1ForSong3', 3)`);

      // there should be 5 tags total
      const { rows, rowCount: tagsCount } = await global.client.query(`SELECT * FROM ${tagsTable}`);
      expect(tagsCount).toBe(5);

      // there should be 4 tags for user1
      let user1TagsCount = 0;
      songs.forEach(song => {
        user1TagsCount += rows.filter(row => row.song_id === song.id).length;
      });
      expect(user1TagsCount).toBe(4);

      // delete all tags associated with user1
      await models.deleteTagsByUser(1);

      // there should be 1 tag remaining (associated with a different user)
      const { rows: updatedRows, rowCount: updatedTagsCount } = await global.client.query(`SELECT * FROM ${tagsTable}`);
      expect(updatedTagsCount).toBe(1);

      // user1 tags should be 0
      let updatedUser1TagsCount = 0;
      songs.forEach(song => {
        updatedUser1TagsCount += updatedRows.filter(row => row.song_id === song.id).length;
      });
      expect(updatedUser1TagsCount).toBe(0);
    });
  });

  describe('deleteUser', () => {
    const newUser = { name: "Carl C" };

    it('should delete the user for a given user_id', async () => {
      await models.addUser(newUser);

      // check that the user exists
      const userIdResponse = await global.client.query(`SELECT id FROM ${usersTable} WHERE name = $1`, [newUser.name]);
      expect(userIdResponse.rows.length).not.toBe(0);

      const userId = userIdResponse.rows[0].id;

      // delete user
      await models.deleteUser(userId);

      // check that the user was deleted
      const deletedUser = await global.client.query(`SELECT * FROM ${usersTable} WHERE id = $1`, [userId]);
      expect(deletedUser.rows.length).toBe(0);
    });
    it('should do nothing if the user_id does not exist', async () => {
      // check row count in usertable
      const { rows } = await global.client.query(`SELECT * FROM ${usersTable}`);
      const rowCount = rows.length ? rows.length : 0;

      // choose a userId that is not in the user table
      const userIds = rows.length ? rows.map(row => row.id) : [];
      let randomId = Math.floor(Math.random() * 1000);
      while (userIds.includes(randomId)) {
        randomId = Math.floor(Math.random() * 1000);
      }

      // delete the user and check that count is the same
      await models.deleteUser(randomId);
      const { rows: newRows } = await global.client.query(`SELECT * FROM ${usersTable}`);
      const newRowCount = rows.length ? rows.length : 0;
      expect(newRowCount).toBe(rowCount);
    });
  });
});

