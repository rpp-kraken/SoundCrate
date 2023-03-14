const express = require('express');
const app = express();

app.use(express.static('./client/dist'));
const upload = multer();
app.use(express.urlencoded({extended: true}));
app.use(express.json());

//ROUTES
app.post('/upload', upload.fields([
  {name: 'audioFile', maxCount: 1},
  {name: 'imageFile', maxCount: 1}
]), handleUpload);

const port = process.env.PORT || 3000;
app.listen(port, () => {
  console.log(`listening on port ${port}...`);
});