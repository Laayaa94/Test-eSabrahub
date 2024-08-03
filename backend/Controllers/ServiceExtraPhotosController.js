const ServiceExtraPhotos = require('../Models/ServicesExtraPhotos');
const path = require('path');
const fs = require('fs');

// Create extra photos for a specific service
// Controller Function
const createServiceExtraPhotos = async (req, res) => {
    try {
        console.log('Files received:', req.files);
        const { serviceId } = req.params; // Use req.params to get serviceId from URL params

        if (!req.files || !req.files['extraPhotos']) {
            return res.status(400).json({
                message: 'No files uploaded'
            });
        }

        const extraPhotos = req.files['extraPhotos'].map(file => file.filename);

        const newServiceExtraPhotos = new ServiceExtraPhotos({
            serviceId,
            extraPhotos
        });

        await newServiceExtraPhotos.save();

        res.status(201).json({
            message: 'Service extra photos added successfully',
            serviceExtraPhotos: newServiceExtraPhotos
        });
    } catch (error) {
        console.error('Error creating service extra photos:', error);
        res.status(500).json({
            message: 'Error creating service extra photos',
            error: error.message || 'An unexpected error occurred'
        });
    }
};

// Get all extra photos for a specific service
const getServiceExtraPhotos = async (req, res) => {
    try {
        const { serviceId } = req.params;
        const serviceExtraPhotos = await ServiceExtraPhotos.findOne({ serviceId });

        if (!serviceExtraPhotos) {
            return res.status(404).json({
                message: 'No extra photos found for this service'
            });
        }

        res.status(200).json(serviceExtraPhotos);
    } catch (error) {
        console.error('Error fetching service extra photos:', error);
        res.status(500).json({
            message: 'Error fetching service extra photos',
            error: error.message
        });
    }
};

// Update extra photos for a specific service
const updateServiceExtraPhotos = async (req, res) => {
    try {
        const { serviceId } = req.params;
        const newPhotos = req.files.extraPhotos.map(file => file.filename);

        let serviceExtraPhotos = await ServiceExtraPhotos.findOne({ serviceId });

        if (!serviceExtraPhotos) {
            serviceExtraPhotos = new ServiceExtraPhotos({
                serviceId,
                extraPhotos: newPhotos
            });
        } else {
            // Delete old photos
            serviceExtraPhotos.extraPhotos.forEach(photo => {
                const filePath = path.join(__dirname, '..', 'uploads', 'extrapics', photo);
                if (fs.existsSync(filePath)) {
                    fs.unlinkSync(filePath);
                }
            });

            // Update with new photos
            serviceExtraPhotos.extraPhotos = newPhotos;
        }

        await serviceExtraPhotos.save();

        res.status(200).json({
            message: 'Service extra photos updated successfully',
            serviceExtraPhotos
        });
    } catch (error) {
        console.error('Error updating service extra photos:', error);
        res.status(500).json({
            message: 'Error updating service extra photos',
            error: error.message
        });
    }
};

// Delete extra photos for a specific service
const deleteServiceExtraPhotos = async (req, res) => {
    try {
        const { serviceId } = req.params;
        const serviceExtraPhotos = await ServiceExtraPhotos.findOneAndDelete({ serviceId });

        if (!serviceExtraPhotos) {
            return res.status(404).json({
                message: 'Service extra photos not found'
            });
        }

        // Delete all photos
        serviceExtraPhotos.extraPhotos.forEach(photo => {
            const filePath = path.join(__dirname, '..', 'uploads', 'extrapics', photo);
            if (fs.existsSync(filePath)) {
                fs.unlinkSync(filePath);
            }
        });

        res.status(200).json({
            message: 'Service extra photos deleted successfully'
        });
    } catch (error) {
        console.error('Error deleting service extra photos:', error);
        res.status(500).json({
            message: 'Error deleting service extra photos',
            error: error.message
        });
    }
};

module.exports = {
    createServiceExtraPhotos,
    getServiceExtraPhotos,
    updateServiceExtraPhotos,
    deleteServiceExtraPhotos
};
