const express = require('express');
const router = express.Router();
const multer = require('multer');
const path = require('path');
const serviceController = require('../Controllers/ServiceController');

// Set up multer storage for different folders
const storage = multer.diskStorage({
    destination: (req, file, cb) => {
        if (file.fieldname === 'mainPhoto') {
            cb(null, 'uploads/mainphotos/'); // Directory for mainPhoto
        } else {
            cb(new Error('Invalid field name'), null); // Handle unexpected fields
        }
    },
    filename: (req, file, cb) => {
        cb(null, Date.now() + path.extname(file.originalname)); // Unique filename
    }
});

const upload = multer({
    storage: storage,
    limits: { fileSize: 5 * 1024 * 1024 } // 5MB limit
});

// Routes
router.post('/create', upload.fields([
    { name: 'mainPhoto', maxCount: 1 }
]), serviceController.createService);

router.get('/', serviceController.getAllServices);

router.get('/:id', serviceController.getServiceById);

router.put('/:id', upload.fields([
    { name: 'mainPhoto', maxCount: 1 }
]), serviceController.updateService);

router.delete('/:id', serviceController.deleteService);

module.exports = router;
