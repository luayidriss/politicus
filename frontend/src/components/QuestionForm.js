import React, { useState } from 'react';
import { Form, Button } from 'react-bootstrap';
import axios from 'axios';

function QuestionForm() {
    const [question, setQuestion] = useState('');
    const [description, setDescription] = useState('');

    const handleSubmit = async (e) => {
        e.preventDefault();

        try {
            const response = await axios.post('/api/questions/', {
                question,
                description
            });

            if (response.status === 201) {
                console.log('Question created successfully');
                setQuestion('');
                setDescription('');
            } else {
                console.error('Failed to create the question');
            }
        } catch (error) {
            console.error('Error creating the question:', error);
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
                Create Question
            </Button>
        </Form>
    );
}

export default QuestionForm;
