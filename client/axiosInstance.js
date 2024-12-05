import axios from 'axios';

// Set the API base URL from environment variables
const apiBaseUrl = import.meta.env.VITE_API_BASE_URL;

const axiosInstance = axios.create({
  baseURL: apiBaseUrl, // Base URL for API requests
  withCredentials: true, // Include credentials (cookies) in the request
  headers: {
    'Content-Type': 'application/json', // Ensure JSON content type
  },
});

// Add an interceptor for error handling and logging (optional)
axiosInstance.interceptors.response.use(
  (response) => response,
  (error) => {
    console.error('API Error:', error.response?.data || error.message);
    return Promise.reject(error);
  }
);

export default axiosInstance;
