import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import axios from 'axios';
import ResponseList from './ResponseList';
import ResponseForm from './ResponseForm';

function QuestionDetail() {
    const { questionId } = useParams();
    const [question, setQuestion] = useState(null);

    useEffect(() => {
        axios.get(`/api/questions/${questionId}`)
            .then((response) => {
                setQuestion(response.data);
            })
            .catch((error) => {
                console.error('Error fetching question details:', error);
            });
    }, [questionId]);

    return (
        <div>
            {question ? (
                <div>
                    <h2>{question.title}</h2>
                    <p>{question.content}</p>
                    <p>Author: {question.user.username}</p>

                    <ResponseList questionId={questionId} />
                    <ResponseForm questionId={questionId} />
                </div>
            ) : (
                <p>Loading question details...</p>
            )}
        </div>
    );
}

export default QuestionDetail;
