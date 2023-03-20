let db = require('../../db/index');
const { v4: uuid } = require('uuid');

module.exports = {
  addSong: async (data, songsTable = 'songs', usersTable = 'users') => {
    db = process.env.NODE_ENV === 'test' ? global.client : db;
    const songId = uuid();
    var user_id =  await db.query(`SELECT id FROM ${usersTable} WHERE name = '${data.user}'`);
    return db.query(`INSERT INTO ${songsTable} (id, title, created_at, path_to_song, play_count, fav_count, path_to_artwork, user_id)
      VALUES ($1, $2, $3, $4, $5, $6, $7, $8);`, [songId, data.title, data.created_at, data.path_to_song, data.play_count,
      data.fav_count, data.path_to_artwork, user_id.rows[0].id]);
  },

  addTags: async (tags, titleOfSong, songsTable = 'songs', tagsTable = 'song_tags') => {
    db = process.env.NODE_ENV === 'test' ? global.client : db;
    const tagsArray = tags.split(',');
    const songId = await db.query(`SELECT id FROM ${songsTable} WHERE title = '${titleOfSong}'`);
    tagsArray.forEach(tag => {
      const tagId = uuid();
      db.query(`INSERT INTO ${tagsTable} (id, name, song_id) VALUES ($1, $2, $3)`, [tagId, tag, songId.rows[0].id]);
    });
  },

  getAllSongs: async (user, usersTable = 'users', songsTable = 'songs', tagsTable = 'song_tags') => {
    db = process.env.NODE_ENV === 'test' ? global.client : db;
    const userId = await db.query(`SELECT id FROM ${usersTable} WHERE name = '${user}'`);
    // return db.query(`SELECT json_agg(
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
      // .then(result => {
      //   return result.rows[0].json_agg;
      // });
    return result.rows[0].json_agg;
  }
}