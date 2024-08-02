const mongoose = require('mongoose');

const serviceExtraPhotosSchema = new mongoose.Schema({
    serviceId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Service',
        required: true,
    },
    extraPhotos: [String], // Array of photo file names
}, {
    timestamps: true
});

module.exports = mongoose.model('ServiceExtraPhotos', serviceExtraPhotosSchema);
