import React, { useState } from 'react';
import axios from 'axios';

const serviceTypes = [
  'accommodation',
  'food',
  'medical',
  'transport',
  'attractiveplaces'
];

const CreatePost = () => {
  const [formData, setFormData] = useState({
    name: '',
    location: '',
    description: '',
    serviceType: ''
  });

  const [mainPhoto, setMainPhoto] = useState(null);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value
    });
  };

  const handleFileChange = (e) => {
    setMainPhoto(e.target.files[0]);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    const data = new FormData();
    data.append('name', formData.name);
    data.append('location', formData.location);
    data.append('description', formData.description);
    data.append('serviceType', formData.serviceType);
    if (mainPhoto) {
      data.append('mainPhoto', mainPhoto);
    }

    try {
      const response = await axios.post('http://localhost:5000/api/service/create', data, {
        headers: {
          'Content-Type': 'multipart/form-data'
        }
      });
      console.log('Service created successfully:', response.data);
      alert('Service created successfully!');
      setFormData({
        name: '',
        location: '',
        description: '',
        serviceType: ''
      });
      setMainPhoto(null);
    } catch (error) {
      console.error('Error creating service:', error);
      alert('Error creating service. Please try again.');
    }
  };

  return (
    <div>
      <h1>Create New Service</h1>
      <form onSubmit={handleSubmit}>
        <div>
          <label htmlFor="name">Name:</label>
          <input
            type="text"
            id="name"
            name="name"
            value={formData.name}
            onChange={handleChange}
            required
          />
        </div>
        <div>
          <label htmlFor="location">Location:</label>
          <input
            type="text"
            id="location"
            name="location"
            value={formData.location}
            onChange={handleChange}
            required
          />
        </div>
        <div>
          <label htmlFor="description">Description:</label>
          <textarea
            id="description"
            name="description"
            value={formData.description}
            onChange={handleChange}
            required
          ></textarea>
        </div>
        <div>
          <label htmlFor="serviceType">Service Type:</label>
          <select
            id="serviceType"
            name="serviceType"
            value={formData.serviceType}
            onChange={handleChange}
            required
          >
            <option value="">Select Service Type</option>
            {serviceTypes.map((type) => (
              <option key={type} value={type}>
                {type.charAt(0).toUpperCase() + type.slice(1)}
              </option>
            ))}
          </select>
        </div>
        <div>
          <label htmlFor="mainPhoto">Main Photo:</label>
          <input
            type="file"
            id="mainPhoto"
            name="mainPhoto"
            onChange={handleFileChange}
          />
        </div>
        
        <button type="submit">Create Service</button>
      </form>
    </div>
  );
};

export default CreatePost;
