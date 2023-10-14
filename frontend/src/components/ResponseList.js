import React, { useState, useEffect } from 'react';
import axios from 'axios';

function ResponseList({ questionId, currentUser }) {
    const [responses, setResponses] = useState([]);

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

    const fetchUserDetailsForResponse = async (userDetails) => {
        try {
            const userResponse = await axios.get(`dj-rest-auth/user/`);
            return userResponse.data;
        } catch (error) {
            console.error('Error fetching user details:', error);
            return {};
        }
    };

    const handleEdit = (responseId, newContent) => {
        axios.put(`/api/responses/${responseId}`, { content: newContent })
            .then(() => {
                refreshResponses();
            })
            .catch((error) => {
                console.error('Error editing response:', error);
            });
    };

    const handleDelete = (responseId) => {
        axios.delete(`/api/responses/${responseId}`)
            .then(() => {
                refreshResponses();
            })
            .catch((error) => {
                console.error('Error deleting response:', error);
            });
    };

    const refreshResponses = () => {
        axios.get(`/api/responses/?question=${questionId}`)
            .then((response) => {
                setResponses(response.data);
            })
            .catch((error) => {
                console.error('Error fetching responses:', error);
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
                        {currentUser && currentUser.pk === response.user.pk && (
                            <div>
                                <button onClick={() => {
                                    const newContent = prompt('Edit response:', response.content);
                                    if (newContent !== null) {
                                        handleEdit(response.id, newContent);
                                    }
                                }}>Edit</button>
                                <button onClick={() => {
                                    if (window.confirm('Are you sure you want to delete this response?')) {
                                        handleDelete(response.id);
                                    }
                                }}>Delete</button>
                            </div>
                        )}
                    </li>
                ))}
            </ul>
        </div>
    );
}

export default ResponseList;
