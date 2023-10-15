import React, { useState, useEffect } from 'react';
import { Container, Card, Tabs, Tab } from 'react-bootstrap';
import axios from 'axios';

const UserProfile = ({ currentuser }) => {
  const [user, setUser] = useState({});
  const [profileImage, setProfileImage] = useState(null);
  const [questionCount, setQuestionCount] = useState(0);
  const [responseCount, setResponseCount] = useState(0);
  const [followersCount, setFollowersCount] = useState(0);
  const [followingCount, setFollowingCount] = useState(0);

  useEffect(() => {
    axios.get(`/api/profiles/${currentuser.pk}/`)
      .then((response) => {
        setUser(response.data);
        setProfileImage(response.data.profile_picture);
      })
      .catch((error) => {
        console.error('Error fetching user data:', error);
      });


    axios.get('/api/questions/count/')
      .then((response) => {
        setQuestionCount(response.data.count);
      })
      .catch((error) => {
        console.error('Error fetching question count:', error);
      });

    axios.get('/api/responses/count/')
      .then((response) => {
        setResponseCount(response.data.count);
      })
      .catch((error) => {
        console.error('Error fetching response count:', error);
      });

    axios.get('/api/followers/followers-count/')
      .then((response) => {
        setFollowersCount(response.data.count);
      })
      .catch((error) => {
        console.error('Error fetching followers count:', error);
      });

    axios.get('/api/followers/following-count/')
      .then((response) => {
        setFollowingCount(response.data.count);
      })
      .catch((error) => {
        console.error('Error fetching following count:', error);
      });
  }, [currentuser]);

  return (
    <Container className="mt-4">
      <h2 className="mb-4">User Profile</h2>
      <Card>
        <Card.Body>
          <Card.Title>Username: {user.username}</Card.Title>
          <Card.Text>Followers: {followersCount}</Card.Text>
          <Card.Text>Following: {followingCount}</Card.Text>
          {profileImage && (
            <Card.Img
              src={profileImage}
              alt="User Profile"
              className="img-fluid rounded-circle"
            />
          )}
        </Card.Body>
      </Card>

      <Tabs defaultActiveKey="questions" id="profile-tabs">
        <Tab eventKey="questions" title={`Questions (${questionCount})`}>
        </Tab>
        <Tab eventKey="responses" title={`Responses (${responseCount})`}>
        </Tab>
      </Tabs>
    </Container>
  );
};

export default UserProfile;
