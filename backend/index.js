const express = require('express');
const app = express();
const port = process.env.PORT || 3000;

const minioConfig = require('./config/minio-conf');
minioConfig; // loaded MinIO configuration

app.get('/', (req, res) => {
  res.send('Image uploader + Minio backend is running');
});

app.listen(port, () => {
  console.log(`Server is running on http://localhost:${port}`);
});