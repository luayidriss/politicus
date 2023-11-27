import React, { useState, useEffect } from 'react';
import { Form, Button } from 'react-bootstrap';
import axios from 'axios';
import { useHistory } from 'react-router-dom';
import '../styles/ResponseForm.css'

function ResponseForm({ questionId, onAddResponse, currentUser, editableResponse, onCancelEdit, refreshResponses }) {
    const [responseText, setResponseText] = useState(editableResponse ? editableResponse.response : '');
    const [additionalResources, setAdditionalResources] = useState(
        editableResponse ? (editableResponse.additional_resources || '') : ''
    );
    const isEditing = !!editableResponse;
    const history = useHistory();
    const [error, setError] = useState(null);
    const handleCancelEdit = () => {
        setResponseText('');
        setAdditionalResources('');
        onCancelEdit(null);
    };

    useEffect(() => {
        if (editableResponse) {
            setResponseText(editableResponse.response || '');
            setAdditionalResources(editableResponse.additional_resources || '');
        } else {
            setResponseText('');
            setAdditionalResources('');
        }
    }, [editableResponse]);

    const handleSubmit = async (e) => {
        e.preventDefault();

        try {
            if (isEditing) {
                await axios.put(`/api/responses/${editableResponse.id}/`, {
                    response: responseText,
                    additional_resources: additionalResources,
                });
                handleCancelEdit();
                history.go(0)
            } else {
                const questionDetails = await axios.get(`/api/questions/${questionId}`);
                const question = questionDetails.data;

                const response = await axios.post(`/api/responses/question/${questionId}/`, {
                    response: responseText,
                    additional_resources: additionalResources,
                    question: question.id,
                    user: currentUser.pk,
                });

                if (response.status === 201) {
                    handleCancelEdit();
                    onAddResponse(response.data);
                    history.go(0)
                } else {
                    setError('Error submitting the response.');
                }
            }
        } catch (error) {
            if (error.response && error.response.data) {
                setError(error.response.data.detail || 'Error submitting the response.');
            } else {
                setError('Error submitting the response.');
            }
        }
    };

    return (
        <div className="comment-section">
            <div className="response-form">
                <h3>{isEditing ? 'Edit Response' : 'Add a Response'}</h3>
                {error && <Alert variant="danger">{error}</Alert>}
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
                        <Button variant="secondary" onClick={handleCancelEdit}>
                            Cancel
                        </Button>
                    )}
                </Form>
            </div>
        </div>
    );
}

export default ResponseForm;
