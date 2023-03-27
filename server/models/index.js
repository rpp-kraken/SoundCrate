let db = require('../../db/index');
const { v4: uuid } = require('uuid');

// different db and table names for testing
const songsTable = process.env.NODE_ENV === 'test' ? 'temp_songs' : 'songs';
const usersTable = process.env.NODE_ENV === 'test' ? 'temp_users' : 'users';
const tagsTable = process.env.NODE_ENV === 'test' ? 'temp_tags' : 'song_tags';
const favoritesTable = process.env.NODE_ENV === 'test' ? 'temp_favorites' : 'favorites';

const addSong = async (data) => {
  db = process.env.NODE_ENV === 'test' ? global.client : db;
  const songId = uuid();

  // Cannot upload song unless already logged in and user data is already saved in state from App.jsx and passed in. No need for additional query.
  // var user_id = await db.query(`SELECT id FROM ${usersTable} WHERE username = '${data.user}'`);
  // if (!user_id.rows.length) await addUser({ name: data.user });
  // user_id = await db.query(`SELECT id FROM ${usersTable} WHERE name = '${data.user}'`);

  return await db.query(`INSERT INTO ${songsTable} (id, title, created_at, path_to_song, play_count, fav_count, path_to_artwork, user_id)
    VALUES ($1, $2, $3, $4, $5, $6, $7, $8);`, [songId, data.title, data.created_at, data.path_to_song, data.play_count,
    data.fav_count, data.path_to_artwork, data.userId]);
};

// TODO: tags currently expects a string of comma-separated tags, it should be an array of strings
const addTags = async (tags, titleOfSong) => {
  db = process.env.NODE_ENV === 'test' ? global.client : db;
  const tagsArray = tags.split(',');
  const songId = await db.query(`SELECT id FROM ${songsTable} WHERE title = '${titleOfSong}'`);
  if (!songId.rows.length) return console.log(`error adding tags to nonexistent song ${titleOfSong}`);
  tagsArray.forEach(tag => {
    const tagId = uuid();
    db.query(`INSERT INTO ${tagsTable} (id, name, song_id) VALUES ($1, $2, $3)`, [tagId, tag, songId.rows[0].id]);
  });
};

const getAllSongsHome = async () => {
  db = process.env.NODE_ENV === 'test' ? global.client : db;
  // const result = await db.query(`SELECT * FROM ${songsTable}`);
  // const result = await db.query(`SELECT songs.*, users.username, ARRAY_AGG(song_tags.name) AS tags FROM songs INNER JOIN users ON songs.user_id = users.id INNER JOIN song_tags ON songs.id = song_tags.song_id GROUP BY songs.id, users.id`);
  const result = await db.query(`SELECT
    songs.*,
    users.username,
    json_object_agg(
      song_tags.name,
      json_build_object(
        'id', song_tags.id,
        'song_id', song_tags.song_id,
        'name', song_tags.name
      )
    ) AS tags
  FROM
    songs
    INNER JOIN users ON songs.user_id = users.id
    INNER JOIN song_tags ON songs.id = song_tags.song_id
  GROUP BY
    songs.id,
    users.id`)
    .catch(err => console.log(`error retrieving songs on home tab`, err));

  return result.rows;
};


const getSongsByUser = async (user) => {
  db = process.env.NODE_ENV === 'test' ? global.client : db;
  const userId = await db.query(`SELECT id FROM ${usersTable} WHERE name = '${user}'`);
  // const userId = await db.query(`SELECT id FROM ${usersTable} WHERE username = '${user}'`);
  if (!userId.rows.length) return [];
  const result = await db.query(`SELECT
        json_agg(
          json_build_object(
            'id', ${songsTable}.id,
            'title', ${songsTable}.title,
            'created_at', ${songsTable}.created_at,
            'path_to_song', ${songsTable}.path_to_song,
            'play_count', ${songsTable}.play_count,
            'fav_count', ${songsTable}.fav_count,
            'path_to_artwork', ${songsTable}.path_to_artwork,
            'user_id', ${songsTable}.user_id,
            'username', ${usersTable}.username,
            'tags', (
              SELECT coalesce (
                json_agg(
                  json_build_object(
                    'id', tags.id,
                    'name', tags.name,
                    'song_id', tags.song_id
                  )
                ), '[]'::json
              )
              FROM ${tagsTable} tags
              WHERE tags.song_id = ${songsTable}.id
            )
          )
        )
      FROM
        ${songsTable}
        INNER JOIN ${usersTable} ON ${songsTable}.user_id = ${usersTable}.id
      WHERE
        user_id = $1;
      `, [userId.rows[0].id])
    .catch(err => console.log(`error retrieving songs for user with id ${userId.rows[0].id}`, err));
  return result.rows[0].json_agg;
};

const getSong = async (songId) => {
  const song = await db.query(`SELECT * FROM ${songsTable} WHERE id = $1`, [songId]);
  if (!song.rows.length) return {};
  return song.rows[0];
};

const editTitle = async (songId, newTitle) => {
  return db.query(`UPDATE ${songsTable} SET title = $1 WHERE id = $2`, [newTitle, songId]);
};

const deleteSong = async (songId) => {
  await db.query(`DELETE FROM ${tagsTable} WHERE song_id = $1`, [songId]);
  return db.query(`DELETE FROM ${songsTable} WHERE id = $1`, [songId]);
};

const addUser = async (data) => {
  db = process.env.NODE_ENV === 'test' ? global.client : db;
  const userId = uuid();
  return db.query(`INSERT INTO ${usersTable} (id, name, email, bio, path_to_pic, username, tier1, tier2, tier3)
      VALUES ($1, $2, $3, $4, $5, $6, $7, $8, $9);`, [userId, data.name, data.email, data.bio, data.path_to_pic,
    data.username, data.tier1, data.tier2, data.tier3]);
};

const getUsersFavoriteSongs = async (userId) => {
  return db.query(`SELECT
    ${songsTable}.*,
    ${usersTable}.id AS user_id,
    COALESCE(ARRAY_AGG(${tagsTable}.name) FILTER (WHERE ${tagsTable}.name IS NOT NULL), ARRAY[]::text[]) AS tags
  FROM
    ${usersTable}
  JOIN
    ${favoritesTable} ON ${usersTable}.id = ${favoritesTable}.user_id
  JOIN
    ${songsTable} ON ${favoritesTable}.song_id = ${songsTable}.id
  LEFT JOIN
    ${tagsTable} ON ${songsTable}.id = ${tagsTable}.song_id
  WHERE
    ${usersTable}.id = $1
  GROUP BY
    ${songsTable}.id, ${usersTable}.id;
`, [userId]);
};

const getUser = async (userEmail) => {
  const user = await db.query(`SELECT * FROM ${usersTable} WHERE email = $1`, [userEmail]);
  if (!user.rows.length) return {};
  return user.rows[0];
};

const deleteUser = async (userId) => {
  return await db.query(`DELETE FROM ${usersTable} WHERE id = $1`, [userId]);
}

const getUserId = async (user) => {
  const userId = await db.query(`SELECT id FROM ${usersTable} WHERE name = $1`, [user]);
  if (!userId.rows.length) return {};
  return userId.rows[0].id;
};

const checkUser = async (userId) => {
  const user = await db.query(`SELECT * FROM ${usersTable} WHERE id = $1`, [userId]);
  if (!user.rows.length) return {};
  return user.rows[0].id;
};

const editBio = async (userId, newBio) => {
  return db.query(`UPDATE ${usersTable} SET bio = $1 WHERE id = $2`, [newBio, userId]);
};

const editProfilePic = async (newPic, userId) => {
  return db.query(`UPDATE ${usersTable} SET path_to_pic = $1 WHERE id = $2`, [newPic, userId]);
}

const editTier = async (userId, newTier, oldTier) => {
  try {
    await db.query(`UPDATE ${usersTable} SET ${newTier} = $1 WHERE id = $2`, [true, userId]);
    if (oldTier) {
      await db.query(`UPDATE ${usersTable} SET ${oldTier} = $1 WHERE id = $2`, [false, userId]);
    }
    return 'Completed tier update(s).'
  }
  catch (err) { return err }
}

const getUserByid = async (id) => {
  const user = await db.query(`SELECT * FROM ${usersTable} WHERE id = $1`, [id]);
  if (!user.rows.length) return {};
  return user.rows[0];
}

const getUserByCol = async (col, val) => {
  const user = await db.query(`SELECT * FROM ${usersTable} WHERE ${col} = $1`, [val]);
  if (!user.rows.length) return {};
  return user.rows[0];
}

const playCountIncrementModel = async (songId) => {
  const query = {
    text: `UPDATE ${songsTable} SET play_count = play_count + 1 WHERE id = $1`,
    values: [songId],
  };

  const result = await db.query(query);
  return result.rowCount;
};

module.exports = {
  addUser,
  addSong,
  addTags,
  getAllSongsHome,
  getSongsByUser,
  getSong,
  getUser,
  deleteSong,
  editTitle,
  editTier,
  getUsersFavoriteSongs,
  getUserId,
  checkUser,
  playCountIncrementModel,
  editBio,
  deleteUser,
  editProfilePic,
  getUserByid,
  getUserByCol
};
