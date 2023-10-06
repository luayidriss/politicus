import React, { useState } from 'react';
import { Form, Button } from 'react-bootstrap';
import axios from 'axios';

function QuestionForm() {
    const [title, setTitle] = useState('');
    const [content, setContent] = useState('');

    const handleSubmit = async (e) => {
        e.preventDefault();

        try {
            const response = await axios.post('/api/questions/', {
                title,
                content
            });

            if (response.status === 201) {
                console.log('Question created successfully');
                setTitle('');
                setContent('');
            } else {
                console.error('Failed to create question');
            }
        } catch (error) {
            console.error('Error creating question:', error);
        }
    };

    return (
        <Form onSubmit={handleSubmit}>
            <Form onSubmit={handleSubmit}>
            <Form.Group controlId="title">
                <Form.Label>Title</Form.Label>
                <Form.Control
                    type="text"
                    value={title}
                    onChange={(e) => setTitle(e.target.value)}
                />
            </Form.Group>

            <Form.Group controlId="content">
                <Form.Label>Content</Form.Label>
                <Form.Control
                    as="textarea"
                    value={content}
                    onChange={(e) => setContent(e.target.value)}
                />
            </Form.Group>

            <Button variant="primary" type="submit">
                Create Question
            </Button>
            </Form>
        </Form>
    );
}

export default QuestionForm;
