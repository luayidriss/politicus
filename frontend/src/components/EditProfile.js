import React, { useState, useEffect } from 'react';
import axios from 'axios';

const EditProfile = () => {
  const [user, setUser] = useState({});
  const [formData, setFormData] = useState({});
  const [profileImage, setProfileImage] = useState(null);

  useEffect(() => {
    axios.get('/api/profile')
      .then((response) => {
        setUser(response.data);
        setFormData({
          username: response.data.username,
          email: response.data.email,
        });
        setProfileImage(response.data.profile_image);
      })
      .catch((error) => {
        console.error('Error fetching user data:', error);
      });
  }, []);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    axios.put('/api/profile', formData)
      .then((response) => {
        console.log('Profile updated successfully:', response.data);
      })
      .catch((error) => {
        console.error('Error updating profile:', error);
      });
  };

  return (
    <div>
      <h2>Edit Profile</h2>
      <form onSubmit={handleSubmit}>
        <div>
          <label>Username:</label>
          <input
            type="text"
            name="username"
            value={formData.username}
            onChange={handleChange}
          />
        </div>
        <div>
          <label>Email:</label>
          <input
            type="email"
            name="email"
            value={formData.email}
            onChange={handleChange}
          />
        </div>
        {profileImage && <img src={profileImage} alt="User Profile" />}
        <button type="submit">Update Profile</button>
      </form>
    </div>
  );
};

export default EditProfile;
