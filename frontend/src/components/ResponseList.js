import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useHistory, Link } from 'react-router-dom';
import '../styles/ResponseList.css';

function ResponseList({ questionId, currentUser, onEditResponse, refreshResponses }) {
    const [responses, setResponses] = useState([]);
    const history = useHistory();

    useEffect(() => {
        axios.get(`/api/responses/?question=${questionId}`)
            .then(async (response) => {
                const responseList = response.data.results;
                const updatedResponses = await Promise.all(
                    responseList.map(async (response) => {
                        const userDetails = await fetchUserDetailsForResponse(response.user);
                        return { ...response, userDetails };
                    })
                );
                setResponses(updatedResponses);
            })
            .catch((error) => {
                console.error('Error fetching responses:', error);
            });
    }, [questionId]);

    const fetchUserDetailsForResponse = async (userId) => {
        try {
            const userResponse = await axios.get(`/api/profiles/${userId}`);
            return userResponse.data;
        } catch (error) {
            console.error('Error fetching user details:', error);
            return {};
        }
    };

    const handleEdit = (responseId) => {
        const editableResponse = responses.find((response) => response.id === responseId);
        onEditResponse(editableResponse);
    };

    const handleDelete = (responseId) => {
        axios.delete(`/api/responses/${responseId}`)
            .then(() => {
                history.push(`/questions/${questionId}`);
            })
            .catch((error) => {
                console.error('Error deleting response:', error);
            });
    };

    return (
        <div className="response-list">
            <h3>Responses</h3>
            {responses.map((response) => (
                <div className="response" key={response.id}>
                    <p>{response.response}</p>
                    {response.additional_resources && (
                        <p>Additional Resources:&nbsp;
                            <a href={response.additional_resources} target="_blank" rel="noopener noreferrer">
                                {response.additional_resources}
                            </a>
                        </p>
                    )}
                    <div className="author-info">
                        Author: <Link to={`/profile/${response.user}`}>{response.userDetails.username}</Link>
                    </div>
                    {currentUser && currentUser.pk === response.user && (
                        <div className="buttons">
                            <button onClick={() => handleEdit(response.id)}>Edit</button>
                            <button className="delete-button" onClick={() => handleDelete(response.id)}>Delete</button>
                        </div>
                    )}
                </div>
            ))}
        </div>
    );
}

export default ResponseList;
