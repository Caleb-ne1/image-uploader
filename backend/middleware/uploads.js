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

// upload size error
const uploadMiddleware = (req, res, next) => {
    upload.single('image')(req, res, function (err) {
        if (err instanceof multer.MulterError) {

            // file size error
            if (err.code === 'LIMIT_FILE_SIZE') {
                return res.status(400).json({
                    message: 'File too large. Maximum allowed size is 2MB.'
                });
            }
            return res.status(400).json({ message: err.message });
        }

        if (err) {
            return res.status(400).json({ message: err.message });
        }

        next();
    });
};

module.exports = { upload, uploadMiddleware};