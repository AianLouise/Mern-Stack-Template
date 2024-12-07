import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import axiosInstance from '../../axiosInstance';

const Profile = () => {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');
  const [editMode, setEditMode] = useState(false);
  const [username, setUsername] = useState('');
  const [email, setEmail] = useState('');
  const [profilePicture, setProfilePicture] = useState('');
  const [profilePictureFile, setProfilePictureFile] = useState(null);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchUserProfile = async () => {
      try {
        const response = await axiosInstance.get('/api/user/profile', {
          withCredentials: true,
        });
        setUser(response.data);
        setUsername(response.data.username);
        setEmail(response.data.email);
        setProfilePicture(response.data.profilePicture);
        setLoading(false);
      } catch (err) {
        setError('Failed to fetch user profile');
        setLoading(false);
      }
    };

    fetchUserProfile();
  }, []);

  const handleLogout = async () => {
    try {
      await axiosInstance.get('/api/auth/logout');
      navigate('/login');
    } catch (err) {
      console.error('Logout failed:', err);
    }
  };

  const handleBack = () => {
    navigate(-1); // Navigate back to the previous page
  };

  const uploadProfilePicture = async () => {
    if (!profilePictureFile) return null;

    const formData = new FormData();
    formData.append('file', profilePictureFile);

    try {
      const response = await axiosInstance.post('/api/upload', formData, {
        headers: {
          'Content-Type': 'multipart/form-data',
        },
      });

      if (response.data.success) {
        return response.data.url; // Cloudinary file URL
      } else {
        setError('Failed to upload profile picture');
        return null;
      }
    } catch (err) {
      console.error('Error uploading profile picture:', err);
      setError('Failed to upload profile picture');
      return null;
    }
  };

  const handleSave = async () => {
    try {
      const profilePictureUrl = await uploadProfilePicture();
      const response = await axiosInstance.post(`/api/user/update/${user._id}`, {
        username,
        email,
        profilePicture: profilePictureUrl || profilePicture,
      });
      setUser(response.data);
      setEditMode(false);
    } catch (err) {
      setError('Failed to update user profile');
    }
  };

  const handleProfilePictureChange = (e) => {
    const file = e.target.files[0];
    if (!file) return;
    setProfilePictureFile(file);
    setProfilePicture(URL.createObjectURL(file));
  };

  if (loading) {
    return <div>Loading...</div>;
  }

  if (error) {
    return <div>{error}</div>;
  }

  return (
    <div className="w-full h-screen flex flex-col bg-gray-100">
      <nav className="w-full bg-blue-500 p-4 flex justify-between items-center">
        <div className="text-white text-2xl font-bold">Profile</div>
        <div>
          <button
            onClick={handleBack}
            className="text-white mr-4"
          >
            Back
          </button>
          <button
            onClick={handleLogout}
            className="text-white"
          >
            Logout
          </button>
        </div>
      </nav>
      <div className="flex-grow flex items-center justify-center">
        <div className="w-full max-w-md p-8 space-y-6 bg-white rounded shadow-md">
          <h2 className="text-2xl font-bold text-center">Profile</h2>
          {user && (
            <div>
              <div className="flex justify-center mb-4">
                {profilePicture ? (
                  <img src={profilePicture} alt="Profile" className="w-32 h-32 rounded-full" />
                ) : (
                  <div className="w-32 h-32 rounded-full bg-gray-300 flex items-center justify-center">
                    <span className="text-gray-500">No Image</span>
                  </div>
                )}
              </div>
              {editMode ? (
                <>
                  <div>
                    <label htmlFor="profilePicture" className="block text-sm font-medium text-gray-700">
                      Upload Profile Picture
                    </label>
                    <input
                      type="file"
                      id="profilePicture"
                      onChange={handleProfilePictureChange}
                      className="w-full px-3 py-2 mt-1 border rounded"
                    />
                  </div>
                  <div>
                    <label htmlFor="username" className="block text-sm font-medium text-gray-700">
                      Username
                    </label>
                    <input
                      type="text"
                      id="username"
                      value={username}
                      onChange={(e) => setUsername(e.target.value)}
                      className="w-full px-3 py-2 mt-1 border rounded"
                    />
                  </div>
                  <div>
                    <label htmlFor="email" className="block text-sm font-medium text-gray-700">
                      Email
                    </label>
                    <input
                      type="email"
                      id="email"
                      value={email}
                      onChange={(e) => setEmail(e.target.value)}
                      className="w-full px-3 py-2 mt-1 border rounded"
                    />
                  </div>
                  <button
                    onClick={handleSave}
                    className="w-full px-4 py-2 mt-4 text-white bg-green-500 rounded hover:bg-green-600"
                  >
                    Save
                  </button>
                  <button
                    onClick={() => setEditMode(false)}
                    className="w-full px-4 py-2 mt-4 text-white bg-gray-500 rounded hover:bg-gray-600"
                  >
                    Cancel
                  </button>
                </>
              ) : (
                <>
                  <p><strong>Username:</strong> {user.username}</p>
                  <p><strong>Email:</strong> {user.email}</p>
                  <button
                    onClick={() => setEditMode(true)}
                    className="w-full px-4 py-2 mt-4 text-white bg-blue-500 rounded hover:bg-blue-600"
                  >
                    Edit
                  </button>
                </>
              )}
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default Profile;