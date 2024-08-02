const mongoose = require('mongoose');

const serviceSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true,
    },
    location: {
        type: String,
        required: true,
    },
    description: {
        type: String,
        required: true,
    },
    mainPhoto: {
        type: String,  // URL or file path for the main photo
    },
    additionalPhotos: {
        type: [String],  // Array of URLs or file paths for additional photos
        default: [],
    },
    serviceType: {
        type: String,
        enum: ['accommodation', 'food', 'medical', 'transport', 'attractiveplaces'],
        required: true,
    }
}, {
    timestamps: true
});

module.exports = mongoose.model('Service', serviceSchema);
