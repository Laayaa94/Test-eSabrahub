const mongoose = require('mongoose');
const User =require('../Models/User')
const PostSchema = new mongoose.Schema({
  text: { type: String, required: false },
  photos: { type: [String], required: false },
  videos: { type: [String], required: false },
  location: { type: String, required: false },
  caption: { type: String, required: false },
  backgroundColor: { type: String, required: false },
  postType: { type: String, required: true },
  user: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true }, 
}, { timestamps: true });

module.exports = mongoose.model('Post', PostSchema);
