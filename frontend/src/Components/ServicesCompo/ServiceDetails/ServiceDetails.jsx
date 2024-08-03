import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import axios from 'axios';
import './ServiceDetails.css';

const ServiceDetails = () => {
  const { id } = useParams();
  const [service, setService] = useState(null);
  const [extraPhotos, setExtraPhotos] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchServiceById = async (id) => {
      try {
        const response = await axios.get(`http://localhost:5000/api/service/${id}`);
        return response.data;
      } catch (error) {
        console.error('Error fetching service by ID:', error);
        throw error;
      }
    };

    const fetchExtraPhotos = async (serviceId) => {
      try {
        const response = await axios.get(`http://localhost:5000/api/extraphotos/${serviceId}`);
        return response.data.extraPhotos || [];
      } catch (error) {
        console.error('Error fetching extra photos:', error);
        return []; // Return an empty array in case of an error
      }
    };

    const getService = async () => {
      try {
        const serviceData = await fetchServiceById(id);
        setService(serviceData);
        const extraPhotosData = await fetchExtraPhotos(id);
        setExtraPhotos(extraPhotosData);
      } catch (error) {
        setError('Failed to fetch service details. Please try again.');
        console.error('Error fetching service details:', error);
      } finally {
        setLoading(false);
      }
    };

    getService();
  }, [id]);

  if (loading) return <p>Loading...</p>;
  if (error) return <p>Error: {error}</p>;

  return (
    <div className="service-details">
      {service && (
        <>
          <h1>{service.name}</h1>
          <img
            src={`http://localhost:5000/uploads/mainphotos/${service.mainPhoto}`}
            alt={service.name}
            className="service-main-photo"
          />
          <p>Location: {service.location}</p>
          <p>Description: {service.description}</p>
          {extraPhotos.length > 0 ? (
            <div className="extra-photos">
              <h2>Extra Photos</h2>
              <div style={{ display: 'flex', flexWrap: 'wrap' }}>
                {extraPhotos.map((photo, index) => (
                  <img
                    key={index}
                    src={`http://localhost:5000/uploads/extrapics/${photo}`}
                    alt={`Extra ${index}`}
                    className="extra-photo"
                    style={{ width: '100px', height: 'auto', margin: '5px' }}
                  />
                ))}
              </div>
            </div>
          ) : (
            <p>No extra photos available.</p>
          )}
        </>
      )}
    </div>
  );
};

export default ServiceDetails;
