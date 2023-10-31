import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useAuth } from './AuthContext';
import { Card, ListGroup } from 'react-bootstrap';
import { Link } from 'react-router-dom'; 

const FollowerList = () => {
  const [users, setUsers] = useState([]);
  const { isLoggedIn, userId } = useAuth();

  useEffect(() => {
    const fetchUsers = async () => {
      try {
        if (isLoggedIn && userId) {
          const response = await axios.get(`/api/followers/following/${userId}/`);
          const shuffledFollowings = shuffleArray(response.data.results);
          const randomFollowings = shuffledFollowings.slice(0, 10);
          setUsers(randomFollowings);
        } else {
          const response = await axios.get('/api/profiles/');
          const shuffledUsers = shuffleArray(response.data.results);
          const randomUsers = shuffledUsers.slice(0, 10);
          setUsers(randomUsers);
        }
      } catch (error) {
      }
    };

    fetchUsers();
  }, [isLoggedIn, userId]);

  const shuffleArray = (array) => {
    const shuffled = [...array];
    for (let i = shuffled.length - 1; i > 0; i--) {
      const j = Math.floor(Math.random() * (i + 1));
      [shuffled[i], shuffled[j]] = [shuffled[j], shuffled[i]];
    }
    return shuffled;
  };

  return (
    <Card>
      <Card.Body>
        <Card.Title>Thinkers</Card.Title>
        <ListGroup as="ul">
          {users.map((user) => (
            <ListGroup.Item as="li" key={user.id}>
              <Link to={`/profile/${user.id}`}>{user.username}</Link>
            </ListGroup.Item>
          ))}
        </ListGroup>
      </Card.Body>
    </Card>
  );
};

export default FollowerList;
