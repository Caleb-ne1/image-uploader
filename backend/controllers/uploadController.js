const {minioClient, bucketName} = require('../config/minio-conf');
const upload = require('../middleware/uploads');

const uploadImage = async (req, res) => {
    try {
        if (!req.file) {
            return res.status(400).json({ error: 'No file uploaded' });
        }

        const file = req.file;
        const fileName = `${Date.now()}-${file.originalname}`;

        minioClient.putObject(bucketName, fileName, file.buffer, (err) => {
    if (err) return res.status(500).json({ message: 'Error uploading file', err });

    // generate presigned URL for frontend (valid 1 hour)
    minioClient.presignedGetObject(bucketName, fileName, 60 * 60, (err, url) => {
      if (err) return res.status(500).json({ message: 'Error generating URL', err });
      res.json({ fileName, url });
    });
  });
    } catch (error) {
        console.error('Error uploading file:', error);
        res.status(500).json({ error: 'Error uploading file' });
    }
};

module.exports = {
    uploadImage,
    uploadMiddleware: upload.single('image')
};