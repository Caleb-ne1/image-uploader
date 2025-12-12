require('dotenv').config();   

const express = require('express');
const app = express();
const cors = require('cors');

app.use(express.json());

// allow requests from your frontend
app.use(cors({
  origin: process.env.FRONTEND_URL,
  credentials: true
}));

const uploadRoutes = require('./routes/upload');
app.use('/api', uploadRoutes);

app.use((err, req, res, next) => {
  if (err.code === 'LIMIT_FILE_SIZE') {
    return res.status(413).json({
      message: "File too large. Maximum allowed size is 2MB."
    });
  }

  // other multer errors
  if (err.code === 'LIMIT_UNEXPECTED_FILE') {
    return res.status(400).json({ message: "Unexpected file field" });
  }

  // fallback
  res.status(500).json({ message: err.message });
});


const port = process.env.PORT || 3000;

require('./config/minio-conf'); // load MinIO config

app.get('/', (req, res) => {
  res.send('Image uploader + Minio backend is running');
});

app.listen(port, () => {
  console.log(`Server is running on http://localhost:${port}`);
});
