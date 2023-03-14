const db = require('../../db/index');
const { uuid } = require('uuidv4');

module.exports = {
  addSong: async (data) => {
    const songId = uuid();
    var user_id =  await db.query(`SELECT id FROM users WHERE name = '${data.user}'`);
    return db.query(`INSERT INTO songs (id, title, created_at, path_to_song, play_count, fav_count, path_to_artwork, user_id)
      VALUES ($1, $2, $3, $4, $5, $6, $7, $8);`, [songId, data.title, data.created_at, data.path_to_song, data.play_count,
      data.fav_count, data.path_to_artwork, user_id.rows[0].id])
      .then(result => {
        return result
      })
      .catch(err => {
        return err;
      });
  },

  addTags: async (tagsArray, titleOfSong) => {
    tagsArray = tagsArray.split(',');
    const songId = await db.query(`SELECT id FROM songs WHERE title = '${titleOfSong}'`);
    tagsArray.forEach(tag => {
      const tagId = uuid();
      db.query(`INSERT INTO tags (id, name, song_id) VALUES ($1, $2, $3)`, [tagId, tag, songId.rows[0].id]);
    });
  },
}