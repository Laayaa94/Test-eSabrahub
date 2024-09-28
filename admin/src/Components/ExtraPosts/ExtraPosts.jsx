import React, { useState } from 'react';
import axios from 'axios';
import './ExtraPhotos.css'; // Make sure to import your CSS file

const ExtraPhotos = ({ serviceId }) => {
    const [files, setFiles] = useState([]);
    const [message, setMessage] = useState('');
    const [error, setError] = useState('');

    const handleFileChange = (event) => {
        setFiles(event.target.files);
    };

    const handleSubmit = async (event) => {
        event.preventDefault();

        if (files.length === 0) {
            setMessage('');
            setError('Please select files to upload.');
            return;
        }

        const formData = new FormData();
        for (let i = 0; i < files.length; i++) {
            formData.append('extraPhotos', files[i]);
        }

        try {
            const response = await axios.post(`http://localhost:5000/api/extraphotos/extra/${serviceId}`, formData, {
                headers: {
                    'Content-Type': 'multipart/form-data'
                }
            });

            setMessage(response.data.message);
            setError('');

            // Clear form fields after successful upload
            setFiles([]);
            document.querySelector('input[type="file"]').value = ''; // Clear the file input

        } catch (err) {
            console.error('Error uploading files:', err);
            setMessage('');
            setError(err.response?.data?.message || 'An unexpected error occurred');
        }
    };

    // Function to generate image previews
    const renderImagePreviews = () => {
        const imageArray = Array.from(files);
        return imageArray.map((file, index) => {
            const imageUrl = URL.createObjectURL(file);
            return (
                <img
                    key={index}
                    src={imageUrl}
                    alt="Preview"
                    className="image-preview"
                />
            );
        });
    };

    return (
        <div className="extra-photos-container">
            <h2>Upload Extra Photos</h2>
            <form className="extra-photos-form" onSubmit={handleSubmit}>
                <label className="custom-file-upload">
                    <input
                        type="file"
                        multiple
                        onChange={handleFileChange}
                    />
                    <span className="upload-icon" /> {/* You can replace this with an actual image or icon */}
                    <p>Select Images</p>
                </label>
                
                {/* Display image previews below the label */}
                <div className="preview-images-container">
                    {renderImagePreviews()}
                </div>

                <button type="submit">Upload</button>
            </form>
            {message && <p className="extra-photos-message">{message}</p>}
            {error && <p className="extra-photos-error">{error}</p>}
        </div>
    );
};

export default ExtraPhotos;
