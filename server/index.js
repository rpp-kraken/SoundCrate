// use docker-secret instead of .env for env variables in production
require('dotenv').config()
const { secrets } = require('docker-secret');
const express = require('express');
const fs = require('fs');
const http = require('http');
const https = require('https');
const path = require('path');
const cookieParser = require('cookie-parser');
const multer = require('multer');
const { handleUpload } = require('./controllers/handleUpload');
const { getSongsByUser } = require('./controllers/getSongsByUser');
// const { getOneSong } = require('./controllers/getOneSong');
const { getAllSongsHome } = require('./controllers/getAllSongsHome');
const { newUser } = require('./controllers/newUser');
const { getUserByCol } = require('./controllers/getUserByCol');
const { handleDelete } = require('./controllers/deleteSong');
const { getFavoriteSongs } = require('./controllers/getFavoriteSongs');
const { editTitle } = require('./controllers/editTitle');
const { editTier } = require('./controllers/editTier');
const { editProfileBio } = require('./controllers/editProfileBio');
const { editProfilePic } = require('./controllers/editProfilePic');
const { playCountIncrement } = require('./controllers/playCountIncrement');
const { addLikedSong } = require('./controllers/addLikedSong')
const { dislikeSong } = require('./controllers/dislikeSong')
const { handleDeleteUser } = require('./controllers/deleteUser');
const upload = multer();
const { artistBadge } = require('./controllers/artistBadge')

const app = express();

// redirect all http traffic to https
app.enable('trust proxy');
app.use((req, res, next) => {
  console.log(`req.secure: ${req.secure}`);
  if (process.env.NODE_ENV === 'production' && !req.secure) {
    console.log('redirecting...');
    return res.redirect('https://' + req.headers.host + req.url);
  }

  next();
});

app.use(express.static('./client/dist'));
app.use(express.urlencoded({ extended: true }));
app.use(express.json());
app.use(cookieParser());


//ROUTES

// song routes
app.get('/api/getAllSongsHome', getAllSongsHome);
app.get('/api/songs', getSongsByUser);
app.get('/api/getFavoriteSongs', getFavoriteSongs)
// app.get('/api/songSingle', getOneSong);
app.post('/api/uploadSong', upload.fields([
  { name: 'audioFile', maxCount: 1 },
  { name: 'imageFile', maxCount: 1 }
]), handleUpload);
app.delete('/api/deleteSong', handleDelete);

// user routes
app.get('/api/userbycol', getUserByCol);
app.post('/api/user', upload.fields([
  { name: 'imageFile', maxCount: 1 }
]), newUser)
app.put('/api/editTitle', editTitle);
app.put('/api/editProfileBio', editProfileBio);
app.put('/api/editProfilePic', upload.single('imageFile'), editProfilePic);
app.put('/api/editTier', editTier);
app.delete('/api/deleteUser', handleDeleteUser);

// play count routes
app.put('/api/playCountIncrement', playCountIncrement);

//artist icon badge
app.get('/api/userBadge', artistBadge)

// liked songs routes
app.put('/likeSong',addLikedSong)
app.put('/dislikeSong', dislikeSong)

const port = secrets.PORT || process.env.PORT || 3000;
let server;
if (process.env.NODE_ENV === 'production') {
  const key = fs.readFileSync('/etc/letsencrypt/live/www.sound-crate.com/privkey.pem');
  const cert = fs.readFileSync('/etc/letsencrypt/live/www.sound-crate.com/fullchain.pem');
  const credentials = { key, cert };
  const httpsServer = https.createServer(credentials, app);
  server = httpsServer.listen(port, () => {
    console.log(`listening on port ${port}...`);
  });
} else {
  server = app.listen(port, () => {
    console.log(`listening on port ${port}...`);
  });
}

module.exports = { app, server };




