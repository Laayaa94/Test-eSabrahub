const Service = require('../Models/Service'); // Adjust the path to your Service model
const path = require('path');
const fs = require('fs');

// Ensure upload directories exist
const ensureUploadDirsExist = () => {
    const uploadDirs = ['mainphotos'];
    uploadDirs.forEach(dir => {
        const dirPath = path.join(__dirname, '..', 'uploads', dir);
        if (!fs.existsSync(dirPath)) {
            fs.mkdirSync(dirPath, { recursive: true });
        }
    });
};

ensureUploadDirsExist();

// Create a service
const createService = async (req, res) => {
    try {
        const { name, location, description, serviceType } = req.body;

        // Validate required fields
        if (!name || !location || !description || !serviceType) {
            return res.status(400).json({
                message: 'All fields are required: name, location, description, serviceType.'
            });
        }

        // Handle file path
        const mainPhoto = req.files.mainPhoto ? req.files.mainPhoto[0].filename : null; // Use filename

        // Create a new service document
        const newService = new Service({
            name,
            location,
            description,
            mainPhoto, // Save the filename
            serviceType
        });

        // Save the service to the database
        await newService.save();

        res.status(201).json({
            message: 'Service created successfully',
            service: newService
        });
    } catch (error) {
        console.error('Error creating service:', error);
        res.status(500).json({
            message: 'Error creating service',
            error: error.message
        });
    }
};

// Read (fetch) all services
const getAllServices = async (req, res) => {
    try {
        const services = await Service.find();
        res.status(200).json(services);
    } catch (error) {
        console.error('Error fetching services:', error);
        res.status(500).json({
            message: 'Error fetching services',
            error: error.message
        });
    }
};

// Read (fetch) a single service by ID
const getServiceById = async (req, res) => {
    try {
        const { id } = req.params;
        const service = await Service.findById(id);

        if (!service) {
            return res.status(404).json({
                message: 'Service not found'
            });
        }

        res.status(200).json(service);
    } catch (error) {
        console.error('Error fetching service:', error);
        res.status(500).json({
            message: 'Error fetching service',
            error: error.message
        });
    }
};

// Update a service
const updateService = async (req, res) => {
    try {
        const { id } = req.params;
        const { name, location, description, serviceType } = req.body;

        // Find the service by ID
        const service = await Service.findById(id);

        if (!service) {
            return res.status(404).json({
                message: 'Service not found'
            });
        }

        // Update fields
        service.name = name || service.name;
        service.location = location || service.location;
        service.description = description || service.description;
        service.serviceType = serviceType || service.serviceType;

        // Handle file upload
        if (req.files.mainPhoto) {
            // Delete old file if exists
            if (service.mainPhoto) {
                fs.unlinkSync(path.join(__dirname, '..', 'uploads', 'mainphotos', service.mainPhoto));
            }
            service.mainPhoto = req.files.mainPhoto[0].filename; // Save the new filename
        }

        // Save updated service
        await service.save();

        res.status(200).json({
            message: 'Service updated successfully',
            service
        });
    } catch (error) {
        console.error('Error updating service:', error);
        res.status(500).json({
            message: 'Error updating service',
            error: error.message
        });
    }
};

// Delete a service
const deleteService = async (req, res) => {
    try {
        const { id } = req.params;
        const service = await Service.findByIdAndDelete(id);

        if (!service) {
            return res.status(404).json({
                message: 'Service not found'
            });
        }

        // Delete file if exists
        if (service.mainPhoto) {
            fs.unlinkSync(path.join(__dirname, '..', 'uploads', 'mainphotos', service.mainPhoto));
        }

        res.status(200).json({
            message: 'Service deleted successfully'
        });
    } catch (error) {
        console.error('Error deleting service:', error);
        res.status(500).json({
            message: 'Error deleting service',
            error: error.message
        });
    }
};

module.exports = {
    createService,
    getAllServices,
    getServiceById,
    updateService,
    deleteService
};
