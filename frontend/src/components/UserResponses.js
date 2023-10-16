import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import axios from 'axios';
import { Card, Container } from 'react-bootstrap';

function UserResponses({ userId }) {
  const [userResponses, setUserResponses] = useState([]);

  useEffect(() => {
    axios.get(`/api/responses/user/${userId}/`)
      .then((response) => {
        setUserResponses(response.data);
        console.log(response.data)
      })
      .catch((error) => {
        console.error('Error fetching user responses:', error);
      });
  }, [userId]);


  return (
    <Container>
      <h2>User Responses</h2>
      {userResponses.length === 0 ? (
        <p>No responses found for this user</p>
      ) : (
        userResponses.map((response) => (
          <Card key={response.id} className="mb-3">
            <Card.Body>
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
