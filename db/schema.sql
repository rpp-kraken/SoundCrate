CREATE TABLE IF NOT EXISTS users (
  id VARCHAR(150) PRIMARY KEY,
  name VARCHAR(100),
  email VARCHAR(100),
  bio VARCHAR(250),
  path_to_pic VARCHAR(250),
  username VARCHAR(100),
  tier1 BOOLEAN,
  tier2 BOOLEAN,
  tier3 BOOLEAN
);

CREATE TABLE IF NOT EXISTS songs (
  id VARCHAR(150) PRIMARY KEY,
  title VARCHAR(100),
  created_at timestamp,
  path_to_song VARCHAR(250),
  play_count INT,
  fav_count INT,
  path_to_artwork VARCHAR(250),
  user_id VARCHAR(150),
  FOREIGN KEY(user_id)
    REFERENCES users(id)
);

CREATE TABLE IF NOT EXISTS song_tags (
  id VARCHAR(150) PRIMARY KEY,
  name VARCHAR(100),
  song_id VARCHAR(150),
  FOREIGN KEY(song_id)
    REFERENCES songs(id)
);

CREATE TABLE IF NOT EXISTS favorites (
  id VARCHAR(150) PRIMARY KEY,
  user_id VARCHAR(150),
  song_id VARCHAR(150),
  artist_id VARCHAR(150),
  FOREIGN KEY(user_id)
    REFERENCES users(id),
  FOREIGN KEY(song_id)
    REFERENCES songs(id),
  FOREIGN KEY(artist_id)
    REFERENCES users(id)
);