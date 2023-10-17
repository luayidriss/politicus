import React, { useState, useEffect } from 'react';
import { Container, Card, Tabs, Tab } from 'react-bootstrap';
import UserQuestions from './UserQuestions';
import UserResponses from './UserResponses'; 
import axios from 'axios';

const UserProfile = ({ userId }) => {
  const [user, setUser] = useState({});
  const [profileImage, setProfileImage] = useState(null);
  const [questionCount, setQuestionCount] = useState(0);
  const [responseCount, setResponseCount] = useState(0);
  const [followers, setFollowers] = useState([]);
  const [following, setFollowing] = useState([]);

  const fetchUserQuestions = () => {
    axios.get(`/api/questions/user/${userId}/`)
      .then((response) => {
        setQuestionCount(response.data.length);
      })
      .catch((error) => {
        console.error('Error fetching user questions:', error);
      });
  };

  const fetchUserResponses = () => {
    axios.get(`/api/responses/user/${userId}/`)
      .then((response) => {
        setResponseCount(response.data.length);
      })
      .catch((error) => {
        console.error('Error fetching user responses:', error);
      });
  };

  useEffect(() => {
    axios.get(`/api/profiles/${userId}/`)
      .then((response) => {
        setUser(response.data);
        setProfileImage(response.data.profile_picture);
      })
      .catch((error) => {
        console.error('Error fetching user data:', error);
      });

      axios.get(`/api/followers/followers/${userId}/`)
      .then((response) => {
        setFollowers(response.data);
      })
      .catch((error) => {
        console.error('Error fetching followers:', error);
      });

    axios.get(`/api/followers/following/${userId}/`)
      .then((response) => {
        setFollowing(response.data);
      })
      .catch((error) => {
        console.error('Error fetching following:', error);
      });

    fetchUserQuestions();
    fetchUserResponses();
  }, [userId]);

  return (
    <Container className="mt-4">
      <h2 className="mb-4">User Profile</h2>
      <Card>
        <Card.Body>
          <Card.Title>Username: {user.username}</Card.Title>
          <Card.Text>Followers: {followers.length}</Card.Text>
          <Card.Text>Following: {following.length}</Card.Text>
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
          <UserQuestions userId={userId} />
        </Tab>
        <Tab eventKey="responses" title={`Responses (${responseCount})`}>
          <UserResponses userId={userId} />
        </Tab>
      </Tabs>
    </Container>
  );
};

export default UserProfile;
