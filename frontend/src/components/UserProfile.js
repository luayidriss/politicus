import React, { useState, useEffect, useCallback } from 'react';
import { useHistory } from 'react-router-dom';
import { Container, Card, Tabs, Tab, Button } from 'react-bootstrap';
import FollowButton from './FollowButton';
import UserQuestions from './UserQuestions';
import UserResponses from './UserResponses';
import axios from 'axios';
import { useAuth } from './AuthContext';
import '../styles/UserProfile.css';

const UserProfile = ({ userId }) => {
  const { currentUser } = useAuth();
  const [userData, setUserData] = useState({ username: '' });
  const [questionCount, setQuestionCount] = useState(0);
  const [responseCount, setResponseCount] = useState(0);
  const [followers, setFollowers] = useState([]);
  const [following, setFollowing] = useState([]);
  const [isFollowing, setIsFollowing] = useState(false);
  const isCurrentUser = currentUser && currentUser.pk === parseInt(userId, 10);
  const history = useHistory();

  const fetchUserQuestions = useCallback(() => {
    setTimeout(() => {
      axios.get(`/api/questions/user/${userId}/`)
        .then((response) => {
          setQuestionCount(response.data.results.length);
        })
        .catch((error) => {
        });
    }, 500);
  }, [userId]);

  const fetchUserResponses = useCallback(() => {
    setTimeout(() => {
      axios.get(`/api/responses/user/${userId}/`)
        .then((response) => {
          setResponseCount(response.data.results.length);
        })
        .catch((error) => {
        });
    }, [userId]);
  }, [userId]);

  const navigateToEditProfile = () => {
    history.push('/user/edit/');
  };

  useEffect(() => {
    const fetchData = async () => {
      try {
        const userDataResponse = await axios.get(`/api/profiles/${userId}/`);
        const userData = userDataResponse.data;
        setUserData(userData);
        setTimeout(() => {
          axios.get(`/api/followers/followers/${userId}/`)
            .then((followersData) => {
              setFollowers(followersData.data.results);
            })
            .catch((error) => {
            });
        }, 1500);

        setTimeout(() => {
          axios.get(`/api/followers/following/${userId}/`)
            .then((followingData) => {
              setFollowing(followingData.data.results);
            })
            .catch((error) => {
            });
        }, 2000);

        if (!isCurrentUser && currentUser) {
          setTimeout(() => {
            axios.get(`/api/followers/followers/${userId}/`)
              .then((followersData) => {
                const currentUserFollows = followersData.data.results.some(follower => {
                  return follower.follower === currentUser.pk;
                });
                setIsFollowing(currentUserFollows);
              })
              .catch((error) => {
              });
          }, 2500);
        }

        setTimeout(() => {
          fetchUserQuestions();
          fetchUserResponses();
        }, 3000);
      } catch (error) {
      }
    };

    fetchData();
  }, [userId, currentUser, isCurrentUser, fetchUserQuestions, fetchUserResponses]);

  const handleToggleFollow = (followStatus) => {
    setIsFollowing(followStatus);
  };

  return (
    <Container className=" user-profile mt-4">
      <Card>
        <Card.Body>
          <Card.Title>Username: {userData.username}</Card.Title>
          <Card.Text>Followers: {followers.length}</Card.Text>
          <Card.Text>Following: {following.length}</Card.Text>
          <Card.Text>{userData.bio}</Card.Text>
          {!isCurrentUser && currentUser && (
            <Card.Text>
              <FollowButton userId={userId} isFollowing={isFollowing} onToggleFollow={handleToggleFollow} />
            </Card.Text>
          )}
          {isCurrentUser && currentUser && (
            <Button onClick={navigateToEditProfile}>Edit Profile</Button>
          )}
        </Card.Body>
      </Card>

      <Tabs defaultActiveKey="questions" id="profile-tabs" className="custom-tabs">
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