import React, { useState, useEffect } from 'react';
import { useParams, useHistory } from 'react-router-dom';
import axios from 'axios';
import ResponseList from './ResponseList';
import ResponseForm from './ResponseForm';
import { useAuth } from './AuthContext';
import { Link } from 'react-router-dom';
import '../styles/QuestionDetail.css';
import { Container } from 'react-bootstrap';

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
            return {};
        }
    }

    const handleCancelEdit = () => {
        setEditableResponse(null);
    };

    const handleAddResponse = (newResponse) => {
    };

    const handleEditResponse = (responseToEdit) => {
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
            });
    }, [questionId]);

    const navigateToEditQuestion = () => {
        history.push(`/questions/${questionId}/edit`);
    }

    const handleDelete = () => {
        axios.delete(`/api/questions/${questionId}`)
            .then(() => {
                history.push(`/profile/${currentUser.pk}`);
            })
            .catch((error) => {
            });
    }

    return (
        <Container className="question-detail-container mt-4">
        {question ? (
            <div>
                <h1 className="question-title">{question.question}</h1>
                <p className="question-description">{question.description}</p>
                <div className="author-info">
                    Author: <Link to={`/profile/${question.user}`}>{question.userDetails.username}</Link>
                </div>

                {currentUser && currentUser.pk === question.user && (
                    <div className="button-container">
                        <button className="edit-button" onClick={navigateToEditQuestion}>Edit</button>
                        <button className="delete-button" onClick={handleDelete}>Delete</button>
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
        </Container>
    );
}

export default QuestionDetail;