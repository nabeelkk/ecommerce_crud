import axios from 'axios';

const API_BASE_URL = 'https://ecommerce-crud-backend.onrender.com/api';

export const fetchProducts = async (category = '', search = '', sort = '') => {
  let url = `${API_BASE_URL}/products?`;
  if (category) url += `category=${category}&`;
  if (search) url += `search=${search}&`;
  if (sort) url += `sort=${sort}&`;
  const response = await axios.get(url);
  return response.data;
};

export const fetchProductById = async (id) => {
  const response = await axios.get(`${API_BASE_URL}/products/${id}`);
  return response.data;
};

export const addProduct = async (formData) => {
  const response = await axios.post(`${API_BASE_URL}/products/add`, formData, {
    headers: {
      'Content-Type': 'multipart/form-data'
    }
  });
  return response.data;
};

export const fetchCategories = async () => {
  const response = await axios.get(`${API_BASE_URL}/products/categories`);
  return response.data;
};

export const fetchCart = async () => {
  const response = await axios.get(`${API_BASE_URL}/cart`);
  return response.data;
};

export const addToCart = async (productId) => {
  const response = await axios.post(`${API_BASE_URL}/cart/add`, { productId });
  return response.data;
};

export const removeFromCart = async (id) => {
  const response = await axios.delete(`${API_BASE_URL}/cart/${id}`);
  return response.data;
};

export const updateCartQuantity = async (id, quantity) => {
  const response = await axios.patch(`${API_BASE_URL}/cart/${id}`, { quantity });
  return response.data;
};
