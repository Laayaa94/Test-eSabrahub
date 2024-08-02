import React, { useEffect, useState } from 'react';
import { fetchServicesByType } from '../ServicesAPI/Api';

function Foods() {
  const [services, setServices] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const data = await fetchServicesByType('food');
        setServices(data);
      } catch (error) {
        setError(error.message);
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
      <h1>Attractiveplaces Services</h1>
      {services.length > 0 ? (
        <ul>
          {services.map((service) => (
            <li key={service.id} className="servicesAllDiv">
            <img src={`http://localhost:5000/uploads/mainphotos/${service.mainPhoto}`} alt={service.name} />
<p>{service.name}</p>
              <p>{service.location}</p>
              <p>{service.description}</p>
            </li>
          ))}
        </ul>
      ) : (
        <p>No Attractiveplaces services available.</p>
      )}
    </div>
  );
}

export default Foods;

