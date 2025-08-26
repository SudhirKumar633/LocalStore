// Axios API calls for users
import axios from 'axios';

export const loginUser = async (credentials) => {
  const response = await axios.post('/api/login', credentials);
  return response.data;
};
