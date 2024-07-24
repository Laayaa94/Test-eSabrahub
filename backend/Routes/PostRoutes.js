const express = require('express');
const { createPost, getPosts, getPostById, getPostsByUser, updatePost, deletePost } = require('../Controllers/PostController');
const authenticate = require('../Middleware/auth');

const router = express.Router();

router.post('/posts', authenticate, createPost); // Protect this route with authentication middleware
router.get('/posts', getPosts);
router.get('/posts/:id', getPostById);
router.get('/posts/user/:userId', getPostsByUser); // New route to get posts by user
router.put('/posts/:id', authenticate, updatePost); // Protect this route with authentication middleware
router.delete('/posts/:id', authenticate, deletePost); // Protect this route with authentication middleware

module.exports = router;
