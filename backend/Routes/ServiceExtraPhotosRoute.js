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

// Multer upload configuration
const upload = multer({
    storage: storage,
    limits: { fileSize: 5 * 1024 * 1024 } // 5MB limit
});

// Upload multiple photos for extraPhotos field
const multipleUpload = upload.fields([{ name: 'extraPhotos', maxCount: 10 }]);

router.post('/:serviceId', multipleUpload, serviceExtraPhotosController.createServiceExtraPhotos);
router.get('/:serviceId', serviceExtraPhotosController.getServiceExtraPhotos);
router.put('/:serviceId', multipleUpload, serviceExtraPhotosController.updateServiceExtraPhotos);
router.delete('/:serviceId', serviceExtraPhotosController.deleteServiceExtraPhotos);

module.exports = router;
