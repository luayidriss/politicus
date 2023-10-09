import React, { useState, useEffect } from 'react';
import { Container, Card } from 'react-bootstrap';
import axios from 'axios';

const UserProfile = () => {
  const [user, setUser] = useState({});
  const [profileImage, setProfileImage] = useState(null);

  useEffect(() => {
    axios.get('/api/profile/')
      .then((response) => {
        setUser(response.data);
        setProfileImage(response.data.profile_image);
      })
      .catch((error) => {
        console.error('Error fetching user data:', error);
      });
  }, []);

  return (
    <Container className="mt-4">
      <h2 className="mb-4">User Profile</h2>
      <Card>
        <Card.Body>
          <Card.Title>Username: {user.username}</Card.Title>
          <Card.Text>Email: {user.email}</Card.Text>
          {profileImage && (
            <Card.Img
              src={profileImage}
              alt="User Profile"
              className="img-fluid rounded-circle"
            />
          )}
        </Card.Body>
      </Card>
    </Container>
  );
};

export default UserProfile;
