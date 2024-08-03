import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useParams, useNavigate } from 'react-router-dom';

const EditService = () => {
  const { id } = useParams(); // Get the ID from the route parameters
  const navigate = useNavigate(); // Hook to programmatically navigate
  const [service, setService] = useState({
    name: '',
    location: '',
    description: '',
    serviceType: '',
    mainPhoto: null
  });
  const [file, setFile] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchService = async () => {
      try {
        const response = await axios.get(`http://localhost:5000/api/service/${id}`);
        setService(response.data);
        setLoading(false);
      } catch (error) {
        console.error('Error fetching service:', error);
      }
    };

    fetchService();
  }, [id]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setService((prevService) => ({ ...prevService, [name]: value }));
  };

  const handleFileChange = (e) => {
    setFile(e.target.files[0]);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const formData = new FormData();
    
    formData.append('name', service.name);
    formData.append('location', service.location);
    formData.append('description', service.description);
    formData.append('serviceType', service.serviceType);
    if (file) {
      formData.append('mainPhoto', file);
    }

    try {
      await axios.put(`http://localhost:5000/api/service/${id}`, formData, {
        headers: { 'Content-Type': 'multipart/form-data' }
      });
      alert('Service updated successfully');
      navigate('/accommodation'); // Navigate to /accommodation after successful update
    } catch (error) {
      console.error('Error updating service:', error);
      alert('Error updating service');
    }
  };

  if (loading) return <p>Loading...</p>;

  return (
    <div>
      <h2>Edit Service</h2>
      <form onSubmit={handleSubmit}>
        <div>
          <label>Name:</label>
          <input
            type="text"
            name="name"
            value={service.name}
            onChange={handleChange}
          />
        </div>
        <div>
          <label>Location:</label>
          <input
            type="text"
            name="location"
            value={service.location}
            onChange={handleChange}
          />
        </div>
        <div>
          <label>Description:</label>
          <textarea
            name="description"
            value={service.description}
            onChange={handleChange}
          />
        </div>
        <div>
          <label>Service Type:</label>
          <input
            type="text"
            name="serviceType"
            value={service.serviceType}
            onChange={handleChange}
          />
        </div>
        <div>
          <label>Main Photo:</label>
          <input
            type="file"
            accept="image/*"
            onChange={handleFileChange}
          />
        </div>
        <button type="submit">Update Service</button>
      </form>
    </div>
  );
};

export default EditService;
