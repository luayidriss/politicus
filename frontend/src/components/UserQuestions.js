import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import axios from 'axios';
import { Card, Container } from 'react-bootstrap';
import '../styles/Lists.css';

function UserQuestions({ userId }) {
  const [userQuestions, setUserQuestions] = useState([]);

  useEffect(() => {
    axios.get(`/api/questions/user/${userId}/`)
      .then((response) => {
        setUserQuestions(response.data);
      })
      .catch((error) => {
        console.error('Error fetching user questions:', error);
      });
  }, [userId]);

  return (
    <Container className='user-data'>
      {userQuestions.length === 0 ? (
        <p>No questions found for this user</p>
      ) : (
        userQuestions.map((question) => (
          <Card key={question.id} className="mb-3">
            <Card.Body>
              <Card.Title>{question.question}</Card.Title>
              <Card.Text>{question.description}</Card.Text>
              <Link to={`/questions/${question.id}`} className="btn btn-primary">
                View Question
              </Link>
            </Card.Body>
          </Card>
        ))
      )}
    </Container>
  );
}

export default UserQuestions;
