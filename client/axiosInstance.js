// client/src/axiosInstance.js
import axios from 'axios';

const axiosInstance = axios.create({
  baseURL: import.meta.env.VITE_API_BASE_URL,
  withCredentials: true, // Include credentials in the request
  headers: {
    'Content-Type': 'application/json',
  },
});

export default axiosInstance;