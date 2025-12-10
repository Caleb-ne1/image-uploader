require('dotenv').config();
const minio = require('minio');
const bucketName = process.env.MINIO_BUCKET;

const minioClient = new minio.Client({
    endPoint: process.env.MINIO_ENDPOINT,
    port: parseInt(process.env.MINIO_PORT, 10),
    useSSL: process.env.MINIO_USE_SSL === 'true',
    accessKey: process.env.MINIO_ACCESS_KEY,
    secretKey: process.env.MINIO_SECRET_KEY
});


minioClient.bucketExists(bucketName, (err, exists) => {
    if (err) {
        return console.log('Error checking bucket existence:', err);
    }
    if (!exists) {
        minioClient.makeBucket(bucketName,  (err) => {
            if (err) {
                return console.log('Error creating bucket:', err);
            }
            console.log(`Bucket "${bucketName}" created successfully.`);
        });
    } else {
        console.log(`Bucket "${bucketName}" already exists.`);
    }
});

module.exports = { minioClient, bucketName };