const Post = require('../Models/Post');
const User = require("../Models/User");

const createPost = async (req, res) => {
  try {
    const post = new Post({
      ...req.body,
      user: req.user._id // Associate the post with the authenticated user
    });

    await post.save();

    const populatedPost = await Post.findById(post._id)
                                   .populate('user', 'username email')
                                   .exec();

    res.status(201).json(populatedPost);
  } catch (error) {
    console.error("Error creating post:", error); // Log error for debugging
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
    const post = await Post.findByIdAndDelete(req.params.id);
    if (!post) {
      return res.status(404).json({ error: 'Post not found' });
    }
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
