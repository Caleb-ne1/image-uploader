const express = require('express');
const app = express();
app.use(express.json());

const uploadRoutes = require('./routes/upload');
app.use('/api', uploadRoutes);

const port = process.env.PORT || 3000;

const minioConfig = require('./config/minio-conf');
minioConfig; // loaded MinIO configuration

app.get('/', (req, res) => {
  res.send('Image uploader + Minio backend is running');
});

app.listen(port, () => {
  console.log(`Server is running on http://localhost:${port}`);
});