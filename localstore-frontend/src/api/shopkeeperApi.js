import axios from './axios';

export const getDashboard = async () => {
  const response = await axios.get('/shopkeeper/dashboard');
  return response.data;
};

export const shopkeeperAction = async (actionData) => {
  const response = await axios.post('/shopkeeper/action', actionData);
  return response.data;
};
