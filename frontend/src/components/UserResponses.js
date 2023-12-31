import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import axios from 'axios';
import { Card, Container } from 'react-bootstrap';
import '../styles/Lists.css';

function UserResponses({ userId }) {
  const [userResponses, setUserResponses] = useState([]);

  useEffect(() => {
    axios.get(`/api/responses/user/${userId}/`)
      .then((response) => {
        setUserResponses(response.data.results);
      })
      .catch((error) => {
      });
  }, [userId]);


  return (
    <Container className='user-data'>
      {userResponses.length === 0 ? (
        <p>No responses found for this user</p>
      ) : (
        userResponses.map((response) => (
          <Card key={response.id} className="mb-3">
            <Card.Body className='card-body'>
              <Card.Title>{response.question.question}</Card.Title>
              <Card.Text>{response.response}</Card.Text>
              <Link to={`/questions/${response.question.id}`} className="btn btn-primary">
                View Question
              </Link>
            </Card.Body>
          </Card>
        ))
      )}
    </Container>
  );
}

export default UserResponses;
