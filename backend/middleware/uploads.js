const multer = require('multer');

const storage = multer.memoryStorage();

const fileFilter = (req, file, cb) => {
    if (file.mimetype.startsWith('image/jpg') || file.mimetype.startsWith('image/png') || file.mimetype.startsWith('image/jpeg')) {
        cb(null, true);
    } else {
        cb(new Error('Only image files are allowed!'), false);
    }
};

const upload = multer({ storage: storage, 
    fileFilter: fileFilter, 
    limits: { fileSize: 2 * 1024 * 1024 }  // 2 MB file size limit
});

module.exports = upload;