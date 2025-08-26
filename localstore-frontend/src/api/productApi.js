import axios from './axios';

export const fetchProducts = async () => {
  const response = await axios.get('/products');
  return response.data;
};

export const uploadProduct = async (productData) => {
  const response = await axios.post('/products', productData);
  return response.data;
};
