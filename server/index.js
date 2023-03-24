// use docker-secret instead of .env for env variables in production
require('dotenv').config()
const { secrets } = require('docker-secret');
const express = require('express');
const fs = require('fs');
const http = require('http');
const https = require('https');
const cookieParser = require('cookie-parser');
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

// TO BE TURNED ON WITH SSL CERT/KEY
// const privateKey  = fs.readFileSync('/Users/briankuzma/Desktop/HR/Kraken/SoundCrate/server/key.pem', 'utf8');
// const certificate = fs.readFileSync('/Users/briankuzma/Desktop/HR/Kraken/SoundCrate/server/cert.pem', 'utf8');
// const credentials = {key: privateKey, cert: certificate};

const { handleDeleteUser } = require('./controllers/deleteUser');
const upload = multer();


const app = express();


app.use(express.static('./client/dist'));
app.use(express.urlencoded({ extended: true }));
app.use(express.json());
app.use(cookieParser());


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
app.delete('/api/deleteUser', handleDeleteUser);

// user routes
app.get('/api/user', getUser);
app.post('/api/user', upload.fields([
  {name: 'imageFile', maxCount: 1}
]), newUser)

// cookie routes
app.get('/addCookie', (req, res) => { req.cookies = 'soundcrate'; });
app.get('/checkCookie', (req, res) => {
  console.log('cookies', req.cookies);
});

const port = secrets.PORT || process.env.PORT || 3000;



// Key and Cert should be included as config for httpsServer when created.


//NOT NEEDED
// const httpPort = 3000;
// const httpServer = http.createServer(app);
// httpServer.listen(port, () => {
//   console.log(`HTTP Server running on port ${port}`);
// });

let server = {};

console.log(process.env.NODE_ENV)
if (process.env.NODE_ENV === "production") {
  const httpsPort = 443;
  const httpsServer = https.createServer(credentials, app);
  httpsServer.listen(httpsPort, () => {
    console.log(`HTTPS Server running on port ${httpsPort}`);
  });
} else {
  server = app.listen(port, () => {
    console.log(`listening on port ${port}...`);
  });
};


//EXPORT httpsServer <<<<<<<<<<<<<<<<
module.exports = { app, server };




