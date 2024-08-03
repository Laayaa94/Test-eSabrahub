const express = require('express');
const router = express.Router();
const multer = require('multer');
const path = require('path');
const serviceExtraPhotosController = require('../Controllers/ServiceExtraPhotosController');

// Multer storage configuration
const storage = multer.diskStorage({
    destination: (req, file, cb) => {
        cb(null, 'uploads/extrapics/');
    },
    filename: (req, file, cb) => {
        cb(null, Date.now() + path.extname(file.originalname));
    }
});

// Multer upload configuration with file filter
const upload = multer({
    storage: storage,
    limits: { fileSize: 5 * 1024 * 1024 }, // 5MB limit
    fileFilter: (req, file, cb) => {
        const filetypes = /jpeg|jpg|png/;
        const mimetype = filetypes.test(file.mimetype);
        const extname = filetypes.test(path.extname(file.originalname).toLowerCase());
        
        if (mimetype && extname) {
            return cb(null, true);
        }
        cb(new Error('Error: File upload only supports the following filetypes - ' + filetypes));
    }
});

// Upload multiple photos for extraPhotos field
const multipleUpload = upload.fields([{ name: 'extraPhotos', maxCount: 10 }]);

// Define routes
router.post('/extra/:serviceId', multipleUpload, serviceExtraPhotosController.createServiceExtraPhotos);
router.get('/:serviceId', serviceExtraPhotosController.getServiceExtraPhotos);
router.put('/:serviceId', multipleUpload, serviceExtraPhotosController.updateServiceExtraPhotos);
router.delete('/:serviceId', serviceExtraPhotosController.deleteServiceExtraPhotos);


module.exports = router;
