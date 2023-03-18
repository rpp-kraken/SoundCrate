// use docker-secret instead of .env for env variables in production
require('dotenv').config()
const { secrets } = require('docker-secret');
const multer = require('multer');
const express = require('express');
const session = require('express-session');
const { handleUpload } = require('./controllers/handleUpload');
const { getSongs } = require('./controllers/getSongs');
const upload = multer();
const app = express();

app.use(express.static('./client/dist'));
app.use(express.urlencoded({extended: true}));
app.use(express.json());

app.use(session({
  secret: process.env.SEKRIT_KEY,
  resave: true,
  saveUninitialized: false,
  cookie: {
    domain: "sound-crate.com",
    maxAge: 24 * 60 * 60 * 1000,
    sameSite: true
  }
}))

//ROUTES
app.get('/test', (req, res) => {
  req.session.name = "soundcrate"
  req.session.save(() => {
    console.log('saved')
  })
  console.log('Session', req.session)
  res.status(201).send('Cookie added')
})


app.get('/api/songs', getSongs);
app.post('/api/uploadSong', upload.fields([
  {name: 'audioFile', maxCount: 1},
  {name: 'imageFile', maxCount: 1}
]), handleUpload);

// const port = process.env.PORT || 3000;
const port = secrets.PORT || process.env.PORT || 3000;

app.listen(port, () => {
  console.log(`listening on port ${port}...`);
});

module.exports = app;