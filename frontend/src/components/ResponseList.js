import React, { useState, useEffect } from 'react';
import axios from 'axios';

function ResponseList({ questionId }) {
    const [responses, setResponses] = useState([]);

    useEffect(() => {
        axios.get(`/api/responses/?question=${questionId}`)
            .then((response) => {
                setResponses(response.data);
            })
            .catch((error) => {
                console.error('Error fetching responses:', error);
            });
    }, [questionId]);

    return (
        <div>
            <h3>Responses</h3>
            <ul>
                {responses.map((response) => (
                    <li key={response.id}>
                        {response.content}
                        <p>Author: {response.user.username}</p>
                    </li>
                ))}
            </ul>
        </div>
    );
}

export default ResponseList;
