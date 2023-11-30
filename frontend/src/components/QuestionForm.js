import React, { useState, useEffect } from 'react';
import { Form, Button, Alert } from 'react-bootstrap';
import axios from 'axios';
import { useHistory } from 'react-router-dom';
import { useAuth } from './AuthContext';
import '../styles/QuestionForm.css';

function QuestionForm({ questionId }) {
    const [question, setQuestion] = useState('');
    const [description, setDescription] = useState('');
    const [isEditMode, setIsEditMode] = useState(false);
    const { currentUser } = useAuth();
    const [error, setError] = useState(null);
    const history = useHistory();

    console.log(currentUser)

    useEffect(() => {
        if (questionId) {
            axios.get(`/api/questions/${questionId}`)
                .then((response) => {
                    const questionData = response.data;
                    setQuestion(questionData.question);
                    setDescription(questionData.description);
                    setIsEditMode(true);
                })
                .catch((error) => {
                    console.log(error)
                    setError(error.response?.data || 'Error fetching question');
                });
        }
    }, [questionId]);

    const handleSubmit = async (e) => {
        e.preventDefault();

        try {
            const response = isEditMode
                ? await axios.put(`/api/questions/${questionId}/`, { question, description })
                : await axios.post('/api/questions/', { question, description, user: currentUser.pk });

            history.push(`/questions/${response.data.id}`);
        } catch (error) {
            console.log(error)
            setError(error.response?.data || 'Question submission failed. Please check your information.');
        }
    };

    return (
        <div className="page-container">
            <div className="question-form-container">
                <h2>Ask your Question</h2>
                {error && <Alert variant="danger">{error}</Alert>}
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
