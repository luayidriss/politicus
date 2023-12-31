import React, { useState } from 'react';
import { Button, Form, Alert } from 'react-bootstrap';
import axios from 'axios';
import { useAuth } from './AuthContext';
import { useHistory } from 'react-router-dom';

function RegistrationForm() {
  const [username, setUsername] = useState('');
  const [email, setEmail] = useState('');
  const [password1, setPassword1] = useState('');
  const [password2, setPassword2] = useState('');
  const [error, setError] = useState(null);

  const { login } = useAuth();
  const history = useHistory();

  const handleRegister = async () => {
    try {
      await axios.post('api/dj-rest-auth/registration/', {
        username,
        email,
        password1,
        password2,
      });
      login();
      history.push('/');
    } catch (error) {
      if (error.response && error.response.data) {
          const { username, email, password1, password2 } = error.response.data;

          const errorMessages = [
              username && `Username: ${username.join(', ')}`,
              email && `Email: ${email.join(', ')}`,
              password1 && `Password: ${password1.join(', ')}`,
              password2 && `Confirm Password: ${password2.join(', ')}`,
          ].filter(Boolean);

          setError(`Validation failed. ${errorMessages.join(' ')}`);
      } else {
          setError('Registration failed. Please check your information.');
      }
  }
  };

  return (
    <div>
      {error && <Alert variant="danger">{error}</Alert>}
      <Form>
        <Form.Group controlId="username">
          <Form.Label>Username</Form.Label>
          <Form.Control
            type="text"
            placeholder="Enter username"
            value={username}
            onChange={(e) => setUsername(e.target.value)}
          />
        </Form.Group>

        <Form.Group controlId="email">
          <Form.Label>Email</Form.Label>
          <Form.Control
            type="email"
            placeholder="Enter email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          />
        </Form.Group>

        <Form.Group controlId="password1">
          <Form.Label>Password</Form.Label>
          <Form.Control
            type="password"
            placeholder="Enter password"
            value={password1}
            onChange={(e) => setPassword1(e.target.value)}
          />
        </Form.Group>

        <Form.Group controlId="password2">
          <Form.Label>Confirm Password</Form.Label>
          <Form.Control
            type="password"
            placeholder="Confirm password"
            value={password2}
            onChange={(e) => setPassword2(e.target.value)}
          />
        </Form.Group>

        <Button variant="primary" onClick={handleRegister}>
          Register
        </Button>
      </Form>
    </div>
  );
}

export default RegistrationForm;
