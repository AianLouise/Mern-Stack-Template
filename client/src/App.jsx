import { BrowserRouter, Routes, Route } from "react-router-dom";
import Home from "./pages/Home";
import Login from "./pages/Login";
import Register from "./pages/Register";
import Landing from "./pages/Landing";
import Profile from "./pages/Profile";
import AuthRoute from "./components/AuthRoute"; // Adjust the path as needed
import AuthRedirect from "./components/AuthRedirect"; // Adjust the path as needed

export default function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route
          path="/login"
          element={
            <AuthRedirect>
              <Login />
            </AuthRedirect>
          }
        />
        <Route
          path="/register"
          element={
            <AuthRedirect>
              <Register />
            </AuthRedirect>
          }
        />
        <Route
          path="/landing"
          element={
            <AuthRoute>
              <Landing />
            </AuthRoute>
          }
        />
        <Route
          path="/profile"
          element={
            <AuthRoute>
              <Profile />
            </AuthRoute>
          }
        />
      </Routes>
    </BrowserRouter>
  );
}