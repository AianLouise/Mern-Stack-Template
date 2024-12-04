// client/src/axiosInstance.js
import axios from 'axios';

const apiBaseUrl = import.meta.env.VITE_API_BASE_URL;

const axiosInstance = axios.create({
  baseURL: apiBaseUrl,
  withCredentials: true, // Include credentials in the request
  headers: {
    'Content-Type': 'application/json',
  },
});

export default axiosInstance;