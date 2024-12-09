import axiosInstance from '../../axiosInstance'; // Adjust the path as needed

const handleLogout = async (navigate) => {
  try {
    console.log('Attempting to log out...');
    const response = await axiosInstance.get('/api/auth/logout');
    console.log('Logout response:', response);
    localStorage.removeItem('token'); // Clear the token from localStorage
    console.log('Token removed from localStorage');
    navigate('/login');
    console.log('Navigated to login page');
  } catch (err) {
    console.error('Logout failed:', err);
  }
};

export default handleLogout;