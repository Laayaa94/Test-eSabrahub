const mongoose = require('mongoose');

const PostSchema = new mongoose.Schema({
    text: String,
    photos: [String],
    videos: [String],
    location: String,
    caption: String,
    backgroundColor: String,
    postType: {
        type: String,
        enum: ['text', 'media'],
    },
    user: { type: mongoose.Schema.Types.ObjectId, ref: 'User' },
    likes: [{
        userId: { type: mongoose.Schema.Types.ObjectId, ref: 'User' },
        likedAt: { type: Date, default: Date.now }
    }]
}, {
    timestamps: true // Add this line
});

module.exports = mongoose.model('Post', PostSchema);
