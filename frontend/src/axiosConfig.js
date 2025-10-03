// src/axiosConfig.js
import axios from 'axios';

axios.interceptors.request.use((config) => {
  const token = localStorage.getItem('token');
  if (token) {
    console.log('axiosConfig: Adding token to request', { url: config.url, token });
    config.headers.Authorization = `Bearer ${token}`;
  } else {
    console.log('axiosConfig: No token found for request', { url: config.url });
  }
  return config;
});

axios.interceptors.response.use(
  (response) => response,
  (error) => {
    console.log('axiosConfig: Response error', {
      url: error.config?.url,
      status: error.response?.status,
      message: error.response?.data?.message,
    });
    if (error.response?.status === 401) {
      console.log('axiosConfig: 401 Unauthorized, clearing localStorage');
      localStorage.removeItem('token');
      localStorage.removeItem('user');
      window.location.href = '/?openAuthModal=true'; // Redirect to home with modal trigger
    }
    return Promise.reject(error);
  }
);

export default axios;