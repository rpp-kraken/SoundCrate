let db = require('../../db/index');
const { v4: uuid } = require('uuid');

// different db and table names for testing
const songsTable = process.env.NODE_ENV === 'test' ? 'temp_songs' : 'songs';
const usersTable = process.env.NODE_ENV === 'test' ? 'temp_users' : 'users';
const tagsTable = process.env.NODE_ENV === 'test' ? 'temp_tags' : 'tags';

module.exports = {
  addSong: async (data) => {
    db = process.env.NODE_ENV === 'test' ? global.client : db;
    const songId = uuid();
    var user_id =  await db.query(`SELECT id FROM ${usersTable} WHERE name = '${data.user}'`);
    return db.query(`INSERT INTO ${songsTable} (id, title, created_at, path_to_song, play_count, fav_count, path_to_artwork, user_id)
      VALUES ($1, $2, $3, $4, $5, $6, $7, $8);`, [songId, data.title, data.created_at, data.path_to_song, data.play_count,
      data.fav_count, data.path_to_artwork, user_id.rows[0].id]);
  },

  addTags: async (tags, titleOfSong) => {
    db = process.env.NODE_ENV === 'test' ? global.client : db;
    const tagsArray = tags.split(',');
    const songId = await db.query(`SELECT id FROM ${songsTable} WHERE title = '${titleOfSong}'`);
    tagsArray.forEach(tag => {
      const tagId = uuid();
      db.query(`INSERT INTO ${tagsTable} (id, name, song_id) VALUES ($1, $2, $3)`, [tagId, tag, songId.rows[0].id]);
    });
  },

  getAllSongs: async (user) => {
    db = process.env.NODE_ENV === 'test' ? global.client : db;
    const userId = await db.query(`SELECT id FROM ${usersTable} WHERE name = '${user}'`);
    if (!userId.rows.length) return [];
    const result = await db.query(`SELECT json_agg(
      json_build_object(
        'id', id,
        'title', title,
        'created_at', created_at,
        'path_to_song', path_to_song,
        'play_count', play_count,
        'fav_count', fav_count,
        'path_to_artwork', path_to_artwork,
        'user_id', user_id,
        'tags', (
          SELECT coalesce (json_agg(
            json_build_object(
              'id', id,
              'name', name,
              'song_id', song_id
            )
          ), '[]'::json) FROM ${tagsTable} WHERE ${tagsTable}.song_id = ${songsTable}.id
        )
      )
    ) FROM ${songsTable} WHERE user_id = $1;`, [userId.rows[0].id])
    .catch(err => console.log(`error retrieving songs for user with id ${userId.rows[0].id}`, err));
    return result.rows[0].json_agg;
  },

  getSong: async (songId) => {
    return db.query(`SELECT * FROM ${songsTable} WHERE id = $1`, [songId]);
  },

  deleteSong: async (songId) => {
    await db.query(`DELETE FROM ${tagsTable} WHERE song_id = $1`, [songId]);
    return db.query(`DELETE FROM ${songsTable} WHERE id = $1`, [songId]);
  }
}