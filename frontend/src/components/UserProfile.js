import React, { useState, useEffect } from 'react';
import { useHistory } from 'react-router-dom';
import { Container, Card, Tabs, Tab, Button } from 'react-bootstrap';
import FollowButton from './FollowButton';
import UserQuestions from './UserQuestions'
import UserResponses from './UserResponses'
import axios from 'axios';
import { useAuth } from './AuthContext';

const UserProfile = ({ userId }) => {
  const { currentUser } = useAuth();
  const [user, setUser] = useState({});
  const [profileImage, setProfileImage] = useState(null);
  const [questionCount, setQuestionCount] = useState(0);
  const [responseCount, setResponseCount] = useState(0);
  const [followers, setFollowers] = useState([]);
  const [following, setFollowing] = useState([]);
  const [isFollowing, setIsFollowing] = useState(false);
  const isCurrentUser = currentUser && currentUser.pk === parseInt(userId, 10);
  const history = useHistory();

  const fetchUserQuestions = () => {
    setTimeout(() => {
      axios.get(`/api/questions/user/${userId}/`)
        .then((response) => {
          setQuestionCount(response.data.length);
        })
        .catch((error) => {
          console.error('Error fetching user questions:', error);
        });
    }, 500);
  };

  const fetchUserResponses = () => {
    setTimeout(() => {
      axios.get(`/api/responses/user/${userId}/`)
        .then((response) => {
          setResponseCount(response.data.length);
        })
        .catch((error) => {
          console.error('Error fetching user responses:', error);
        });
    }, 1000);
  };

  const navigateToEditProfile = () => {
    history.push('/user/edit/');
  };

  useEffect(() => {
    const fetchData = async () => {
      try {
        const userData = await axios.get(`/api/profiles/${userId}/`);
        setUser(userData.data);
        setProfileImage(userData.data.profile_picture);
        setTimeout(() => {
          axios.get(`/api/followers/followers/${userId}/`)
            .then((followersData) => {
              setFollowers(followersData.data);
            })
            .catch((error) => {
              console.error('Error fetching followers:', error);
            });
        }, 1500);

        setTimeout(() => {
          axios.get(`/api/followers/following/${userId}/`)
            .then((followingData) => {
              setFollowing(followingData.data);
            })
            .catch((error) => {
              console.error('Error fetching following:', error);
            });
        }, 2000);

        if (!isCurrentUser && currentUser) {
          setTimeout(() => {
            axios.get(`/api/followers/followers/${userId}/`)
              .then((followersData) => {
                const currentUserFollows = followersData.data.some(follower => {
                  return follower.follower === currentUser.pk;
                });
                setIsFollowing(currentUserFollows);
              })
              .catch((error) => {
                console.error('Error checking if following:', error);
              });
          }, 2500);
        }

        setTimeout(() => {
          fetchUserQuestions();
          fetchUserResponses();
        }, 3000);
      } catch (error) {
        console.error('Error fetching user data:', error);
      }
    };

    fetchData();
  }, [userId, currentUser, isCurrentUser]);

  const handleToggleFollow = (followStatus) => {
    setIsFollowing(followStatus);
  };

  return (
    <Container className="mt-4">
      <h2 className="mb-4">User Profile</h2>
      <Card>
        <Card.Body>
          <Card.Title>Username: {user.username}</Card.Title>
          <Card.Text>Followers: {followers.length}</Card.Text>
          <Card.Text>Following: {following.length}</Card.Text>
          {!isCurrentUser && currentUser && (
            <Card.Text>
              <FollowButton userId={userId} isFollowing={isFollowing} onToggleFollow={handleToggleFollow} />
            </Card.Text>
          )}
          {profileImage && (
            <Card.Img
              src={profileImage}
              alt="User Profile"
              className="img-fluid rounded-circle"
            />
          )}
          {isCurrentUser && currentUser && (
            <Button onClick={navigateToEditProfile}>Edit Profile</Button>
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
