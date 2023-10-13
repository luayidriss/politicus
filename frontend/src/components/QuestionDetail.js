import React, { useState, useEffect } from 'react';
import { useParams, useHistory } from 'react-router-dom';
import axios from 'axios';
import ResponseList from './ResponseList';
import ResponseForm from './ResponseForm';

function QuestionDetail() {
    console.log(useParams());
    const { questionId } = useParams();
    const history = useHistory();
    const [question, setQuestion] = useState(null);

    useEffect(() => {
        console.log(questionId);
        axios.get(`/api/questions/${ questionId }/`)
            .then((response) => {
                setQuestion(response.data);
            })
            .catch((error) => {
                console.error('Error fetching question details:', error);
            });
    }, [questionId]);

    const handleEdit = () => {
        history.push(`/questions/${questionId}/edit`);
    };

    const handleDelete = () => {
        axios.delete(`/api/questions/${questionId}`)
            .then(() => {
                history.push('/');
            })
            .catch((error) => {
                console.error('Error deleting question:', error);
            });
    };

    if (!question) {
        return <p>Loading...</p>;
    }

    return (
        <div>
            <div>
                <h2>{question.question}</h2>
                <p>{question.description}</p>
                <p>Author: {question.user.username}</p>

                {question.is_owner && (
                    <div>
                        <button onClick={handleEdit}>Edit</button>
                        <button onClick={handleDelete}>Delete</button>
                    </div>
                )}

                <ResponseList questionId={questionId} />
                <ResponseForm questionId={questionId} />
            </div>
        </div>
    );
}

export default QuestionDetail;
