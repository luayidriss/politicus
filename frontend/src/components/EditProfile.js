import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { Container, Form, Button, Row, Col, Image } from 'react-bootstrap';
import { useAuth } from './AuthContext';
import '../styles/EditProfile.css';

const EditProfile = () => {
  const { currentUser } = useAuth();
  const [user, setUser] = useState({});
  const [formData, setFormData] = useState({});
  const [profileImage, setProfileImage] = useState(null);
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');

  useEffect(() => {
    axios.get(`/api/profiles/${currentUser.pk}/`)
      .then((response) => {
        setUser(response.data);
        setFormData({
          username: response.data.username,
          email: response.data.email,
          country: response.data.country,
          birth_date: response.data.birth_date,
          bio: response.data.bio,
          first_name: response.data.first_name,
          last_name: response.data.last_name,
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

  const handleProfileImageChange = (e) => {
    const file = e.target.files[0];
    setProfileImage(URL.createObjectURL(file));
  };

  const handleUpdateUsername = () => {
    axios.put(`/api/profiles/${currentUser.pk}/`, { username: formData.username })
      .then((response) => {
        console.log('Username updated successfully:', response.data);
      })
      .catch((error) => {
        console.error('Error updating username:', error);
      });
  };

  const handleUpdatePassword = () => {
    if (password !== confirmPassword) {
      console.error('Password and confirm password do not match.');
      return;
    }

    axios.post('/dj-rest-auth/password/change/', { password })
      .then((response) => {
        console.log('Password updated successfully:', response.data);
      })
      .catch((error) => {
        console.error('Error updating password:', error);
      });
  };

  const handleUpdateProfile = () => {
    axios.patch(`/api/profiles/${currentUser.pk}/`, formData)
      .then((response) => {
        console.log('Profile data updated successfully:', response.data);
      })
      .catch((error) => {
        console.error('Error updating profile data:', error);
      });
  };

  return (
    <Container className="edit-profile-container mt-4">
      <h2>Edit Profile</h2>
      <Form>
        <Form.Group>
          <Form.Label className="form-label">Username</Form.Label>
          <Form.Control
            type="text"
            name="username"
            value={formData.username}
            onChange={handleChange}
            className="form-control"
          />
          <Button variant="primary" onClick={handleUpdateUsername} className="update-button">
            Update Username
          </Button>
        </Form.Group>
        <Form.Group>
          <Form.Label className="form-label">Country</Form.Label>
          <Form.Control
            type="text"
            name="country"
            value={formData.country}
            onChange={handleChange}
            className="form-control"
          />
        </Form.Group>
        <Form.Group>
          <Form.Label className="form-label">Birthday</Form.Label>
          <Form.Control
            type="date"
            name="birth_date"
            value={formData.birth_date}
            onChange={handleChange}
            className="form-control"
          />
        </Form.Group>
        <Form.Group>
          <Form.Label className="form-label">Bio</Form.Label>
          <Form.Control
            as="textarea"
            rows={4}
            name="bio"
            value={formData.bio}
            onChange={handleChange}
            className="form-control"
          />
        </Form.Group>
        <Row>
          <Col>
            <Form.Group>
              <Form.Label className="form-label">First Name</Form.Label>
              <Form.Control
                type="text"
                name="first_name"
                value={formData.first_name}
                onChange={handleChange}
                className="form-control"
              />
            </Form.Group>
          </Col>
          <Col>
            <Form.Group>
              <Form.Label className="form-label">Last Name</Form.Label>
              <Form.Control
                type="text"
                name="last_name"
                value={formData.last_name}
                onChange={handleChange}
                className="form-control"
              />
            </Form.Group>
          </Col>
        </Row>
        <Form.Group>
          <Form.Label className="form-label">Profile Picture</Form.Label>
          <Form.File
            id="custom-file"
            label="Choose a profile picture"
            custom
            onChange={handleProfileImageChange}
          />
        </Form.Group>
        {profileImage && (
          <Image
            src={profileImage}
            alt="User Profile"
            className="img-fluid rounded-circle mb-3 user-image"
          />
        )}
        <Button variant="primary" onClick={handleUpdateProfile} className="update-button">
          Update Profile
        </Button>
      </Form>
      <Form className="password-form">
        <Form.Group>
          <Form.Label className="password-label">Password</Form.Label>
          <Form.Control
            type="password"
            name="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            className="password-control form-control"
          />
        </Form.Group>
        <Form.Group>
          <Form.Label className="password-label">Confirm Password</Form.Label>
          <Form.Control
            type="password"
            name="confirmPassword"
            value={confirmPassword}
            onChange={(e) => setConfirmPassword(e.target.value)}
            className="password-control form-control"
          />
        </Form.Group>
        <Button variant="primary" onClick={handleUpdatePassword} className="update-button">
          Update Password
        </Button>
      </Form>
    </Container>
  );
};

export default EditProfile;
