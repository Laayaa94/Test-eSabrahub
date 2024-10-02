// src/components/AccommodationCompo.js

import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { fetchServicesByType } from './Api';
import { useNavigate } from 'react-router-dom';
import './CommonServices.css';

const PlacesCompo = () => {
  const [services, setServices] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchData = async () => {
        try {
            const data = await fetchServicesByType('attractiveplaces');
            setServices(data);
        } catch (error) {
            setError(error.message);
        } finally {
            setLoading(false);
        }
    };

    fetchData();
}, []);
  const handleServiceClick = (id) => {
    navigate(`/details/${id}`);
  };

  if (loading) return <p>Loading...</p>;
  if (error) return <p>Error: {error}</p>;

  return (
    <div className='frontend-services'>
      <h1>Attractive Places</h1>
      {services.length > 0 ? (
          <div className="services-list">
          {services.map((service) => (
            <div className='service-list-gallery'>
              <div
              key={service._id}
              className="service-item"
              onClick={() => handleServiceClick(service._id)}
              style={{ cursor: 'pointer' }} 
            >
              <img
                src={`http://localhost:5000/uploads/mainphotos/${service.mainPhoto}`}
                alt={service.name}
                className="service-main-photo"
              />
              <h2>{service.name}</h2>
              <p>Location: {service.location}</p>
            </div>
            </div>
          ))}
        </div>
      ) : (
        <p>No accommodation services available.</p>
      )}
    </div>
  );
};
export default PlacesCompo;
