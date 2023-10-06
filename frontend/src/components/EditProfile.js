import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { Container, Form, Button, Row, Col, Image } from 'react-bootstrap';

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
    <Container className="mt-4">
      <h2>Edit Profile</h2>
      <Form onSubmit={handleSubmit}>
        <Row>
          <Col>
            <Form.Group>
              <Form.Label>Username</Form.Label>
              <Form.Control
                type="text"
                name="username"
                value={formData.username}
                onChange={handleChange}
              />
            </Form.Group>
          </Col>
          <Col>
            <Form.Group>
              <Form.Label>Email</Form.Label>
              <Form.Control
                type="email"
                name="email"
                value={formData.email}
                onChange={handleChange}
              />
            </Form.Group>
          </Col>
        </Row>
        {profileImage && (
          <Image
            src={profileImage}
            alt="User Profile"
            className="img-fluid rounded-circle mb-3"
          />
        )}
        <Button variant="primary" type="submit">
          Update Profile
        </Button>
      </Form>
    </Container>
  );
};

export default EditProfile;
