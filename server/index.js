// use docker-secret instead of .env for env variables in production
require('dotenv').config()
const { secrets } = require('docker-secret');
const express = require('express');
const app = express();
const multer = require('multer');
const { handleUpload } = require('./controllers/handleUpload');
const upload = multer();

app.use(express.static('./client/dist'));
app.use(express.urlencoded({extended: true}));
app.use(express.json());

//ROUTES
app.post('/upload', upload.fields([
  {name: 'audioFile', maxCount: 1},
  {name: 'imageFile', maxCount: 1}
]), handleUpload);

// const port = process.env.PORT || 3000;
const port = secrets.PORT || process.env.PORT || 3000;

app.listen(port, () => {
  console.log(`listening on port ${port}...`);
});