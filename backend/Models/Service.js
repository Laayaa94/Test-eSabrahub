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
   
    serviceType: {
        type: String,
        enum: ['accommodation', 'food', 'medical', 'transport', 'attractiveplaces'],
        required: true,
    },
    extraPhotos: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'ServiceExtraPhotos', // Reference to the ServiceExtraPhotos model
    }
}, {
    timestamps: true
});

module.exports = mongoose.model('Service', serviceSchema);
