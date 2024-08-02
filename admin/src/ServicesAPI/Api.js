import axios from 'axios';

const API_BASE_URL = 'http://localhost:5000/api'; // Your backend URL

export const fetchServicesByType = async (postType) => {
  try {
    const response = await axios.get(`${API_BASE_URL}/service/by-type`, {
      params: { postType },
    });
    return response.data;
  } catch (error) {
    console.error('Error fetching services:', error);
    throw error;
  }
};
