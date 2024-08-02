const mongoose = require('mongoose');

const serviceSchema = new mongoose.Schema({
    name: {
        type: String,
    },
    location: {
        type: String,
    },
    description: {
        type: String,
    },
    mainPhoto: {
        type: String,  // Assuming this is a URL or file path
    },
    serviceType: {
        type: String,
        enum: ['accommodation', 'food', 'medical', 'transport', 'attractiveplaces'],  
    }
}, {
    timestamps: true
});

module.exports = mongoose.model('Service', serviceSchema);
