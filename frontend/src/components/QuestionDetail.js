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

    const navigateToEditQuestion = () => {
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

    const handleAddResponse = (newResponse) => {
        // Handle adding a response
        console.log('Response added:', newResponse);
    };

    const handleEditResponse = (responseToEdit) => {
        // Handle editing a response
        console.log('Editing response:', responseToEdit);
    };

    if (!question) {
        return <p>Loading...</p>;
    }

    const isOwner = currentUser && currentUser.pk === question.user;

    return (
        <div>
            <div>
                <h2>{question.question}</h2>
                <p>{question.description}</p>
                <p>
                    Author: <Link to={`/profile/${question.user}`}>{question.userDetails.username}</Link>
                </p>

                {isOwner && (
                    <div>
                        <button onClick={navigateToEditQuestion}>Edit</button>
                        <button onClick={handleDelete}>Delete</button>
                    </div>
                )}

                <ResponseList
                    questionId={questionId}
                    currentUser={currentUser}
                    onEditResponse={handleEditResponse}
                />
                <ResponseForm
                    questionId={questionId}
                    currentUser={currentUser}
                    onAddResponse={handleAddResponse}
                />
            </div>
        </div>
    );
}

export default QuestionDetail;
