// use docker-secret instead of .env for env variables in production
require('dotenv').config()
const { secrets } = require('docker-secret');
const express = require('express');
const app = express();
const multer = require('multer');
const { handleUpload } = require('./controllers/handleUpload');
const { getSongs } = require('./controllers/getSongs');
// const { getOneSong } = require('./controllers/getOneSong');
const { getAllSongsHome } = require('./controllers/getAllSongsHome');
const { newUser } = require('./controllers/newUser');
const { getUser } = require('./controllers/getUser');
const { handleDelete } = require('./controllers/deleteSong');
const { getFavoriteSongs } = require('./controllers/getFavoriteSongs');
const { editTitle } = require('./controllers/editTitle');
const upload = multer();

app.use(express.static('./client/dist'));
app.use(express.urlencoded({extended: true}));
app.use(express.json());

//ROUTES

// song routes
app.get('/api/songs', getSongs);
// app.get('/api/songSingle', getOneSong);
app.get('/api/getAllSongsHome', getAllSongsHome);
app.get('/api/getFavoriteSongs', getFavoriteSongs)
app.post('/api/uploadSong', upload.fields([
  {name: 'audioFile', maxCount: 1},
  {name: 'imageFile', maxCount: 1}
]), handleUpload);
app.put('/api/editTitle', editTitle);
app.delete('/api/deleteSong', handleDelete);

// user routes
app.get('/api/user', getUser);
app.post('/api/user', upload.fields([
  {name: 'imageFile', maxCount: 1}
]), newUser)

const port = secrets.PORT || process.env.PORT || 3000;

const server = app.listen(port, () => {
  console.log(`listening on port ${port}...`);
});

module.exports = { app, server };
