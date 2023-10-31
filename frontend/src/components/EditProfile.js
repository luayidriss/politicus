import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { Container, Form, Button, Row, Col, Alert } from 'react-bootstrap';
import { useAuth } from './AuthContext';
import { useHistory } from 'react-router-dom';

const EditProfile = () => {
  const { currentUser } = useAuth();
  const history = useHistory();
  const [user, setUser] = useState({});
  const [formData, setFormData] = useState({
    username: '',
    email: '',
    country: '',
    birth_date: '',
    bio: '',
    first_name: '',
    last_name: '',
  });
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [error, setError] = useState({
    updateUsernameError: null,
    updateProfileError: null,
    updatePasswordError: null,
  });

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
      })
      .catch((error) => {
        setError({ updateProfileError: 'Error loading profile data.' });
      });
  }, [currentUser.pk]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };


  const handleUpdateProfile = () => {
    const updatedFormData = new FormData();
    updatedFormData.append('username', formData.username);
    updatedFormData.append('email', formData.email);
    updatedFormData.append('country', formData.country);
    updatedFormData.append('birth_date', formData.birth_date);
    updatedFormData.append('bio', formData.bio);
    updatedFormData.append('first_name', formData.first_name);
    updatedFormData.append('last_name', formData.last_name);

    axios
      .patch(`/api/profiles/${currentUser.pk}/`, updatedFormData)
      .then((response) => {
        history.push(`/profile/${currentUser.pk}`);
      })
      .catch((error) => {
        setError({ updateProfileError: 'Error updating profile.' });
      });
  };

  const handleUpdatePassword = () => {
    if (password !== confirmPassword) {
      setError({ updatePasswordError: 'Passwords do not match.' });
      return;
    }
  
    axios
      .post('api/dj-rest-auth/password/change/', {
        new_password1: password,
        new_password2: confirmPassword,
      })
      .then((response) => {
        history.push(`/profile/${currentUser.pk}`);
      })
      .catch((error) => {
        setError({ updatePasswordError: 'Error updating password.' });
      });
  };

  return (
    <Container className="edit-profile-container mt-4">
      {error.updateUsernameError && <Alert variant="danger">{error.updateUsernameError}</Alert>}
      {error.updateProfileError && <Alert variant="danger">{error.updateProfileError}</Alert>}
      {error.updatePasswordError && <Alert variant="danger">{error.updatePasswordError}</Alert>}
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
