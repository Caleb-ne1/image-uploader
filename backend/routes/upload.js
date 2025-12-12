const express = require('express');
const router = express.Router();
const { uploadImage } = require('../controllers/uploadController');
const { uploadMiddleware } = require('../middleware/uploads');

router.post('/upload', uploadMiddleware, uploadImage);

module.exports = router;