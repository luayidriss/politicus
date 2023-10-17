import React, { useState, useEffect } from 'react';
import { useParams, useHistory } from 'react-router-dom';
import axios from 'axios';
import ResponseList from './ResponseList';
import ResponseForm from './ResponseForm';
import { useAuth } from './AuthContext';
import { Link } from 'react-router-dom';

function QuestionDetail() {
    const { questionId } = useParams();
    const history = useHistory();
    const [question, setQuestion] = useState(null);
    const { currentUser } = useAuth();

    const fetchUserDetailsForQuestion = async (userId) => {
        try {
            const userResponse = await axios.get(`/api/profiles/${userId}`);
            return userResponse.data;
        } catch (error) {
            console.error('Error fetching user details for question author:', error);
            return {};
        }
    };

    useEffect(() => {
        axios.get(`/api/questions/${questionId}/`)
            .then(async (response) => {
                const questionData = response.data;
                const userDetails = await fetchUserDetailsForQuestion(questionData.user);
                questionData.userDetails = userDetails;
                setQuestion(questionData);
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
                <p>
                    Author: <Link to={`/profile/${question.user}`}>{question.userDetails.username}</Link>
                </p>


                {question.is_owner && (
                    <div>
                        <button onClick={handleEdit}>Edit</button>
                        <button onClick={handleDelete}>Delete</button>
                    </div>
                )}

                <ResponseList questionId={questionId} />
                <ResponseForm questionId={questionId} currentUser={currentUser} />
            </div>
        </div>
    );
}

export default QuestionDetail;
