const express = require('express');
const router = express.Router();
const { signup, login, getUserDetails, editUserDetails } = require('../Controllers/AuthController');
const authenticateUser = require('../Middleware/auth');
const multer = require('multer');
const path = require('path');

// Multer setup for handling file uploads
const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    const uploadPath = path.join(__dirname, '..', 'uploads', 'profiles');
    cb(null, uploadPath);
  },
  filename: (req, file, cb) => {
    cb(null, `${Date.now()}-${file.originalname}`);
  },
});
const upload = multer({ storage });

// Define routes
router.post('/signup', signup);
router.post('/login', login);
router.get('/profile', authenticateUser, getUserDetails);
router.put('/profile/edit', authenticateUser, upload.single('profileImage'), editUserDetails);



module.exports = router;
