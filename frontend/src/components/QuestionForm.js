import React, { useState, useEffect } from 'react';
import { Form, Button } from 'react-bootstrap';
import axios from 'axios';
import { useHistory } from 'react-router-dom'; // Import useHistory

function QuestionForm({ questionId }) {
    const [question, setQuestion] = useState('');
    const [description, setDescription] = useState('');
    const [isEditMode, setIsEditMode] = useState(false);
    const history = useHistory(); // Initialize the history object

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
                    console.error('Error fetching question details for editing:', error);
                });
        }
    }, [questionId]);

    const handleSubmit = async (e) => {
        e.preventDefault();

        try {
            if (isEditMode) {
                const response = await axios.put(`/api/questions/${questionId}/`, {
                    question,
                    description,
                });
                history.push(`/questions/${response.data.id}`);
            } else {
                const response = await axios.post('/api/questions/', {
                    question,
                    description,
                });
                history.push(`/questions/${response.data.id}`);
            }

        } catch (error) {
            console.error('Error creating/updating question:', error);
        }
    };

    return (
        <Form onSubmit={handleSubmit}>
            <Form.Group controlId="title">
                <Form.Label>Question</Form.Label>
                <Form.Control
                    type="text"
                    value={question}
                    onChange={(e) => setQuestion(e.target.value)}
                />
            </Form.Group>

            <Form.Group controlId="content">
                <Form.Label>Description</Form.Label>
                <Form.Control
                    as="textarea"
                    value={description}
                    onChange={(e) => setDescription(e.target.value)}
                />
            </Form.Group>

            <Button variant="primary" type="submit">
                {isEditMode ? 'Update Question' : 'Create Question'}
            </Button>
        </Form>
    );
}

export default QuestionForm;
