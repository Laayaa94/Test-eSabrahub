import React, { useEffect, useState } from 'react';
import { fetchServicesByType } from '../ServicesAPI/Api';
import './ServicesAdmin.css'; // Import CSS file

function AttractivePlaces() {
  const [services, setServices] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const data = await fetchServicesByType('accommodation');
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
      <h1>Attractive Places Services</h1>
      {services.length > 0 ? (
        <table className="servicesTable">
          <thead>
            <tr>
              <th>Image</th>
              <th>Name</th>
              <th>Location</th>
              <th>Description</th>
              <th>Actions</th>
            </tr>
          </thead>
          <tbody>
            {services.map((service) => (
              <tr key={service.id}>
                <td>
                  <img
                    src={`http://localhost:5000/uploads/mainphotos/${service.mainPhoto}`}
                    alt={service.name}
                    className="serviceImage"
                  />
                </td>
                <td>{service.name}</td>
                <td>{service.location}</td>
                <td>{service.description}</td>
                <td>
                  <button className="deleteButton">
                    X
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      ) : (
        <p>No Attractive Places services available.</p>
      )}
    </div>
  );
}

export default AttractivePlaces;
