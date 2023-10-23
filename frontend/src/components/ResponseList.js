import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useHistory } from 'react-router-dom';

function ResponseList({ questionId, currentUser, onEditResponse, refreshResponses }) {
    const [responses, setResponses] = useState([]);
    const history = useHistory();

    useEffect(() => {
        axios.get(`/api/responses/?question=${questionId}`)
            .then(async (response) => {
                const responseList = response.data;
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
        <div>
            <h3>Responses</h3>
            <ul>
                {responses.map((response) => (
                    <li key={response.id}>
                        <p>{response.response}</p>
                        <p>Author: {response.userDetails.username}</p>
                        {currentUser && currentUser.pk === response.user && (
                            <div>
                                <button onClick={() => handleEdit(response.id)}>Edit</button>
                                <button onClick={() => handleDelete(response.id)}>Delete</button>
                            </div>
                        )}
                    </li>
                ))}
            </ul>
        </div>
    );
}

export default ResponseList;
