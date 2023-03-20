// use docker-secret instead of .env for env variables in production
require('dotenv').config()
const { secrets } = require('docker-secret');
const express = require('express');
const app = express();
const multer = require('multer');
const { handleUpload } = require('./controllers/handleUpload');
const { getSongs } = require('./controllers/getSongs');
const upload = multer();

const models = require('./models/index');

app.use(express.static('./client/dist'));
app.use(express.urlencoded({extended: true}));
app.use(express.json());

//ROUTES
app.get('/api/songs', getSongs);
app.post('/api/uploadSong', upload.fields([
  {name: 'audioFile', maxCount: 1},
  {name: 'imageFile', maxCount: 1}
]), handleUpload);

app.post('/api/user', async (req, res) => {
  const data = req.body;
  // const imageFileData = req.files['imageFile'][0].buffer;
  const usersTable = process.env.NODE_ENV === 'test' ? 'temp_users' : 'users';

  try {

    // await uploadImageFile(imageFileData)
    //   .then(imageFileUrl => {
    //     data.path_to_artwork = imageFileUrl;
    //   });

    console.log(data)
    let test = await models.addUser(data, usersTable);
    console.log(test)

    res.status(201).json('successfully added new user');
  } catch (error) {
      console.error(error);
      res.status(500).json({ error: 'Failed to add new user' });
  }
})

// const port = process.env.PORT || 3000;
const port = secrets.PORT || process.env.PORT || 3000;

const server = app.listen(port, () => {
  console.log(`listening on port ${port}...`);
});

module.exports = { app, server };
