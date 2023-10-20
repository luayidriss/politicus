import React, { useState } from 'react';
import { Form, Button } from 'react-bootstrap';
import axios from 'axios';

function ResponseForm({ questionId, onAddResponse, currentUser, editableResponse, onCancelEdit, refreshResponses }) {
    const [responseText, setResponseText] = useState(editableResponse ? editableResponse.response : '');
    const [additionalResources, setAdditionalResources] = useState(
        editableResponse ? (editableResponse.additional_resources || '') : ''
    );

    const isEditing = !!editableResponse;

    const handleSubmit = async (e) => {
        e.preventDefault();

        try {
            if (isEditing) {
                await axios.put(`/api/responses/${editableResponse.id}`, {
                    response: responseText,
                    additional_resources: additionalResources,
                });
                onCancelEdit();
                refreshResponses(); // Refresh responses after editing
            } else {
                const questionDetails = await axios.get(`/api/questions/${questionId}`);
                const question = questionDetails.data;

                const response = await axios.post(`/api/responses/question/${questionId}/`, {
                    response: responseText,
                    additional_resources: additionalResources,
                    question: question,
                    user: currentUser.pk,
                });

                if (response.status === 201) {
                    setResponseText('');
                    setAdditionalResources('');
                    onAddResponse(response.data);
                    refreshResponses();
                } else {
                    console.error('Failed to create response');
                }
            }
        } catch (error) {
            console.error(`Error ${isEditing ? 'editing' : 'creating'} response:`, error);
        }
    };

    return (
        <div>
            <h3>{isEditing ? 'Edit Response' : 'Add a Response'}</h3>
            <Form onSubmit={handleSubmit}>
                <Form.Group controlId="response">
                    <Form.Control
                        as="textarea"
                        rows={3}
                        value={responseText}
                        onChange={(e) => setResponseText(e.target.value)}
                        placeholder={`Write your ${isEditing ? 'edited response' : 'response'} here...`}
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
                    {isEditing ? 'Save' : 'Submit'}
                </Button>
                {isEditing && (
                    <Button variant="secondary" onClick={onCancelEdit}>
                        Cancel
                    </Button>
                )}
            </Form>
        </div>
    );
}

export default ResponseForm;
