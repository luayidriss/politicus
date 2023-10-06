import React, { useState } from 'react';
import { Form, Button } from 'react-bootstrap';
import axios from 'axios';

function ResponseForm({ questionId, onAddResponse }) {
    const [content, setContent] = useState('');

    const handleSubmit = async (e) => {
        e.preventDefault();

        try {
            const response = await axios.post(`/api/questions/${questionId}/responses/`, {
                content,
            });

            if (response.status === 201) {
                onAddResponse(response.data);
                setContent('');
            } else {
                console.error('Failed to create response');
            }
        } catch (error) {
            console.error('Error creating response:', error);
        }
    };

    return (
        <div>
            <h3>Add a Response</h3>
            <Form onSubmit={handleSubmit}>
                <Form.Group controlId="content">
                    <Form.Label>Your Response</Form.Label>
                    <Form.Control
                        as="textarea"
                        rows={3}
                        value={content}
                        onChange={(e) => setContent(e.target.value)}
                        placeholder="Write your response here..."
                        required
                    />
                </Form.Group>
                <Button variant="primary" type="submit">
                    Submit
                </Button>
            </Form>
        </div>
    );
}

export default ResponseForm;
