require('dotenv').config();
const express = require('express');
const fs = require('fs');
const http = require('http');
const https = require('https');
const multer = require('multer');
const { handleUpload } = require('./controllers/handleUpload');
const { getSongs } = require('./controllers/getSongs');
const upload = multer();

const app = express();

app.use(express.static('./client/dist'));
app.use(express.urlencoded({ extended: true }));
app.use(express.json());

// ROUTES
app.get('/api/songs', getSongs);
app.post(
  '/api/uploadSong',
  upload.fields([
    { name: 'audioFile', maxCount: 1 },
    { name: 'imageFile', maxCount: 1 },
  ]),
  handleUpload
);


// Need SSL KEY AND CERTS
const httpPort = 3000;
const httpsPort = 443;
// const key = fs.readFileSync(process.env.SSL_KEY_PATH);
// const cert = fs.readFileSync(process.env.SSL_CERT_PATH);


const httpServer = http.createServer(app);
// const httpsServer = https.createServer({ key, cert }, app);

httpServer.listen(httpPort, () => {
  console.log(`HTTP server listening on port ${httpPort}...`);
});

// httpsServer.listen(httpsPort, () => {
//   console.log(`HTTPS server listening on port ${httpsPort}...`);
// });

module.exports = app;