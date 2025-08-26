import axios from './axios';

export const fetchShopTypes = async () => {
  const res = await axios.get('/api/shop-types');
  return res.data;
};
