const mongoose = require('mongoose');
const User = require('../Models/User');
const Post = require('../Models/Post');
const fs = require('fs');
const path = require('path');

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

const createPost = async (req, res) => {
    try {
        const { text, location, caption, backgroundColor, postType } = req.body;
        const photos = req.files?.photos ? req.files.photos.map(file => file.path) : [];
        const videos = req.files?.videos ? req.files.videos.map(file => file.path) : [];

        // Validate postType
        if (!['text', 'media'].includes(postType)) {
            return res.status(400).json({ message: 'Invalid post type. Must be "text" or "media".' });
        }

        const post = new Post({
            text,
            photos,
            videos,
            location,
            caption,
            backgroundColor,
            postType,
            user: req.user._id
        });

        await post.save();

        const populatedPost = await Post.findById(post._id)
                                       .populate('user', 'username email')
                                       .exec();

        res.status(201).json(populatedPost);
    } catch (error) {
        console.error("Error creating post:", error);
        res.status(500).json({ message: 'Internal server error', error: error.message });
    }
};

const getPosts = async (req, res) => {
    try {
        const posts = await Post.find().populate('user', 'username email');
        res.status(200).json(posts);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};

const getPostById = async (req, res) => {
    try {
        const post = await Post.findById(req.params.id).populate('user', 'username email');
        if (!post) {
            return res.status(404).json({ error: 'Post not found' });
        }
        res.status(200).json(post);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};

const getPostsByUser = async (req, res) => {
    try {
        const posts = await Post.find({ user: req.params.userId }).populate('user', 'username email');
        if (!posts || posts.length === 0) {
            return res.status(404).json({ error: 'No posts found for this user' });
        }
        res.status(200).json(posts);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};

const updatePost = async (req, res) => {
    try {
        const post = await Post.findByIdAndUpdate(req.params.id, req.body, { new: true }).populate('user', 'username email');
        if (!post) {
            return res.status(404).json({ error: 'Post not found' });
        }
        res.status(200).json(post);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};

const deletePost = async (req, res) => {
    try {
        const post = await Post.findById(req.params.id);
        if (!post) {
            return res.status(404).json({ error: 'Post not found' });
        }

        // Delete associated photos and videos
        if (post.photos.length > 0) {
            post.photos.forEach(photo => {
                const filePath = path.join(__dirname, '..', photo);
                if (fs.existsSync(filePath)) {
                    fs.unlinkSync(filePath);
                }
            });
        }

        if (post.videos.length > 0) {
            post.videos.forEach(video => {
                const filePath = path.join(__dirname, '..', video);
                if (fs.existsSync(filePath)) {
                    fs.unlinkSync(filePath);
                }
            });
        }

        await Post.findByIdAndDelete(req.params.id);
        res.status(200).json({ message: 'Post deleted successfully' });
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};

module.exports = {
    createPost,
    getPosts,
    getPostById,
    getPostsByUser,
    updatePost,
    deletePost,
};
