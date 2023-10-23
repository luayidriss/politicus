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
    const [editableResponse, setEditableResponse] = useState(null);

    const fetchUserDetailsForQuestion = async (userId) => {
        try {
            const userResponse = await axios.get(`/api/profiles/${userId}`);
            return userResponse.data;
        } catch (error) {
            console.error('Error fetching user details for question author:', error);
            return {};
        }
    }

    const handleCancelEdit = () => {
        setEditableResponse(null);
        };

    const handleAddResponse = (newResponse) => {
        console.log('Response added:', newResponse);
    };

    const handleEditResponse = (responseToEdit) => {
        console.log('Editing response:', responseToEdit);
        setEditableResponse(responseToEdit);
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
    }

    const handleDelete = () => {
        axios.delete(`/api/questions/${questionId}`)
            .then(() => {
                history.push('/');
            })
            .catch((error) => {
                console.error('Error deleting question:', error);
            });

    }

    return (
        <div>
            {question ? (
                <div>
                    <h2>{question.question}</h2>
                    <p>{question.description}</p>
                    <p>
                        Author: <Link to={`/profile/${question.user}`}>{question.userDetails.username}</Link>
                    </p>

                    {currentUser && currentUser.pk === question.user && (
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
                    {currentUser && (
                        <ResponseForm
                            questionId={questionId}
                            currentUser={currentUser}
                            onAddResponse={handleAddResponse}
                            editableResponse={editableResponse}
                            onCancelEdit={handleCancelEdit}
                        />
                    )}
                </div>
            ) : (
                <p>Loading...</p>
            )}
        </div>
    );
}

export default QuestionDetail;
