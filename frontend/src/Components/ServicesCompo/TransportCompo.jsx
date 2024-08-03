import React, { useEffect, useState } from 'react';
import axios from 'axios';

const TransportCompo = () => {
  const [services, setServices] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get('http://localhost:5000/api/service?postType=transport');
        setServices(response.data);
      } catch (error) {
        setError('Failed to fetch services. Please try again.');
        console.error('Error fetching accommodation services:', error);
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, []);

  if (loading) return <p>Loading...</p>;
  if (error) return <p>Error: {error}</p>;

  return (
    <div>
      <h1>Accommodation Services</h1>
      {services.length > 0 ? (
        <div className="services-list">
          {services.map((service) => (
            <div key={service._id} className="service-item">
              <img
                src={`http://localhost:5000/uploads/mainphotos/${service.mainPhoto}`}
                alt={service.name}
                className="service-main-photo"
              />
              <h2>{service.name}</h2>
              <p>Location: {service.location}</p>
              
            </div>
          ))}
        </div>
      ) : (
        <p>No accommodation services available.</p>
      )}
    </div>
  );
};

export default TransportCompo;
