import React, { useState } from 'react';
import { Form, Button } from 'react-bootstrap';
import axios from 'axios';

function ResponseForm({ questionId, onAddResponse, currentUser }) {
    const [response, setResponse] = useState('');
    const [additionalResources, setAdditionalResources] = useState('');

    const handleSubmit = async (e) => {
        e.preventDefault();

        try {
            const response = await axios.post(`/api/responses/`, {
                response,
                additional_resources: additionalResources,
                question: questionId,
                user: currentUser.id,
            });

            if (response.status === 201) {
                onAddResponse(response.data);
                setResponse('');
                setAdditionalResources('');
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
                <Form.Group controlId="response">
                    <Form.Label>Your Response</Form.Label>
                    <Form.Control
                        as="textarea"
                        rows={3}
                        value={response}
                        onChange={(e) => setResponse(e.target.value)}
                        placeholder="Write your response here..."
                        required
                    />
                </Form.Group>

                <Form.Group controlId="additionalResources">
                    <Form.Label>Additional Resources (Optional)</Form.Label>
                    <Form.Control
                        type="text"
                        value={additionalResources}
                        onChange={(e) => setAdditionalResources(e.target.value)}
                        placeholder="Enter additional resources (e.g., links)"
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
