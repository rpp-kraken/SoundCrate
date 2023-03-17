const db = require('../../db/index');
const { uuid } = require('uuidv4');

module.exports = {
  addSong: async (data) => {
    const songId = uuid();
    var user_id =  await db.query(`SELECT id FROM users WHERE name = '${data.user}'`);
    return db.query(`INSERT INTO songs (id, title, created_at, path_to_song, play_count, fav_count, path_to_artwork, user_id)
      VALUES ($1, $2, $3, $4, $5, $6, $7, $8);`, [songId, data.title, data.created_at, data.path_to_song, data.play_count,
      data.fav_count, data.path_to_artwork, user_id.rows[0].id]);
  },

  addTags: async (tags, titleOfSong) => {
    const tagsArray = tags.split(',');
    const songId = await db.query(`SELECT id FROM songs WHERE title = '${titleOfSong}'`);
    tagsArray.forEach(tag => {
      const tagId = uuid();
      db.query(`INSERT INTO tags (id, name, song_id) VALUES ($1, $2, $3)`, [tagId, tag, songId.rows[0].id]);
    });
  },

  getAllSongs: async (user) => {
    const userId = await db.query(`SELECT id FROM users WHERE name = '${user}'`);
    return db.query(`SELECT json_agg(
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
          ), '[]'::json) FROM song_tags WHERE song_tags.song_id = songs.id
        )
      )
    ) FROM songs WHERE user_id = $1;`, [userId.rows[0].id])
      .then(result => {
        console.log(result.rows[0].json_agg);
        return result.rows[0].json_build_object;
      });
  }
}