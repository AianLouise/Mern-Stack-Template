import { Navigate } from "react-router-dom";

const AuthRedirect = ({ children }) => {
  const isAuthenticated = !!localStorage.getItem("token"); // Replace with your actual authentication logic

  return isAuthenticated ? <Navigate to="/landing" /> : children;
};

export default AuthRedirect;