import axios from './axios';

export const login = async (credentials) => {
  const response = await axios.post('/auth/login', credentials);
  return response.data;
};

export const register = async (userData) => {
  let dataToSend = userData;
  let config = {};
  if (userData.logo) {
    // If logo is present, use FormData
    const formData = new FormData();
    Object.entries(userData).forEach(([key, value]) => {
      if (value !== undefined && value !== null) {
        formData.append(key, value);
      }
    });
    dataToSend = formData;
    config = { headers: { 'Content-Type': 'multipart/form-data' } };
  }
  const response = await axios.post('/api/users/signup', dataToSend, config);
  return response.data;
};
