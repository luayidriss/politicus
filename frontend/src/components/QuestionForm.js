import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { Container, Form, Button, Row, Col } from 'react-bootstrap';
import { useAuth } from './AuthContext';
import { useHistory } from 'react-router-dom';
import '../styles/EditProfile.css';

const EditProfile = () => {
  const { currentUser } = useAuth();
  const history = useHistory();
  const [user, setUser] = useState({});
  const [formData, setFormData] = useState({});
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');

  useEffect(() => {
    axios.get(`/api/profiles/${currentUser.pk}/`)
      .then((response) => {
        setUser(response.data);
        setFormData({
          username: response.data.username,
          email: response.data.email,
          country: response.data.country,
          birth_date: response.data.birth_date,
          bio: response.data.bio,
          first_name: response.data.first_name,
          last_name: response.data.last_name,
        });
      })
      .catch((error) => {
        // Handle the error
      });
  }, [currentUser.pk]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleUpdateUsername = () => {
    axios
      .put(`/api/profiles/${currentUser.pk}/`, { username: formData.username })
      .then((response) => {
        history.push(`/profile/${currentUser.pk}`);
      })
      .catch((error) => {
        // Handle the error
      });
  };

  const handleUpdateProfile = () => {
    const updatedFormData = new FormData();
    updatedFormData.append('username', formData.username);
    updatedFormData.append('country', formData.country);
    updatedFormData.append('birth_date', formData.birth_date);
    updatedFormData.append('bio', formData.bio);
    updatedFormData.append('first_name', formData.first_name);
    updatedFormData.append('last_name', formData.last_name);

    axios
      .patch(`/api/profiles/${currentUser.pk}/`, updatedFormData)
      .then((response) => {
        history.push(`/profile/${currentUser.pk}`);
      })
      .catch((error) => {
        // Handle the error
      });
  };

  const handleUpdatePassword = () => {
    if (password !== confirmPassword) {
      return;
    }

    axios
      .post('/dj-rest-auth/password/change/', { password })
      .then((response) => {
        history.push(`/profile/${currentUser.pk}`); // Change this route to your actual user profile route
      })
      .catch((error) => {
        // Handle the error
      });
  };

    return (
        <div className="page-container">
            <div className="question-form-container">
                <h2>Ask your Question</h2>
                <Form onSubmit={handleSubmit}>
                    <Form.Group controlId="title">
                        <Form.Label className="form-label">Question</Form.Label>
                        <Form.Control
                            type="text"
                            value={question}
                            onChange={(e) => setQuestion(e.target.value)}
                            className="form-control"
                        />
                    </Form.Group>

                    <Form.Group controlId="content">
                        <Form.Label className="form-label">Description</Form.Label>
                        <Form.Control
                            as="textarea"
                            value={description}
                            onChange={(e) => setDescription(e.target.value)}
                            className="form-control"
                        />
                    </Form.Group>

                    <Button variant="primary" type="submit">
                        {isEditMode ? 'Update Question' : 'Create Question'}
                    </Button>

                    <Button
                        variant="secondary"
                        className="btn-secondary"
                        onClick={() => history.push('/')}>
                        Cancel
                    </Button>
                </Form>
            </div>
        </div>
    );
}

export default QuestionForm;
