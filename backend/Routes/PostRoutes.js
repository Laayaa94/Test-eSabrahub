const express = require('express');
const multer = require('multer');
const { createPost, getPosts, getPostById, getPostsByUser, updatePost, deletePost,likePost } = require('../Controllers/PostController');
const authenticate = require('../Middleware/auth');
const path = require('path');
const fs = require('fs');

// Ensure upload directories exist
const ensureUploadDirsExist = () => {
    const photoDir = path.join(__dirname, '..', 'uploads', 'photos');
    const videoDir = path.join(__dirname, '..', 'uploads', 'videos');
    
    if (!fs.existsSync(photoDir)) {
        fs.mkdirSync(photoDir, { recursive: true });
    }
    if (!fs.existsSync(videoDir)) {
        fs.mkdirSync(videoDir, { recursive: true });
    }
};

ensureUploadDirsExist();

const router = express.Router();

// Configure multer for file uploads
const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    let folder = 'uploads/';
    if (file.fieldname === 'photos') {
      folder += 'photos/';
    } else if (file.fieldname === 'videos') {
      folder += 'videos/';
    }
    cb(null, folder);
  },
  filename: (req, file, cb) => {
    cb(null, `${Date.now()}-${file.originalname}`);
  }
});

const upload = multer({ storage });

router.post('/', authenticate, upload.fields([
  { name: 'photos', maxCount: 5 },
  { name: 'videos', maxCount: 2 }
]), createPost);

router.get('/', getPosts);
router.get('/:id', getPostById);
router.get('/user/:userId', authenticate, getPostsByUser);
router.put('/:id', authenticate, upload.fields([
  { name: 'photos', maxCount: 5 },
  { name: 'videos', maxCount: 2 }
]), updatePost);
router.delete('/:id', authenticate, deletePost);
router.post('/:id/like', authenticate, likePost);



module.exports = router;
