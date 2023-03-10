require('dotenv').config()
const express = require('express');
const app = express();

app.use(express.static('./client/dist'));

const port = process.env.PORT || 3000;

app.listen(port, () => {
  console.log(`listening on port ${port}...`);
});