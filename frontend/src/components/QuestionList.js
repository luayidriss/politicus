import React, { useState, useEffect, useCallback } from 'react';
import { Link } from 'react-router-dom';
import InfiniteScroll from 'react-infinite-scroll-component';
import axios from 'axios';
import { Card, Container } from 'react-bootstrap';
import '../styles/Lists.css';

function QuestionList() {
  const [questions, setQuestions] = useState([]);
  const [hasMore, setHasMore] = useState(true);
  const [nextPageUrl, setNextPageUrl] = useState('/api/questions');
  const [errors, setErrors] = useState([]);

  const fetchMoreQuestions = useCallback(async () => {
    if (!hasMore) {
      return;
    }

    try {
      const response = await axios.get(nextPageUrl);

      if (response.status === 200) {
        const responseData = response.data.results;
        if (responseData.length === 0) {
          setHasMore(false);
        } else {
          const updatedQuestions = await fetchUserDetailsForQuestions(responseData);
          setQuestions([...questions, ...updatedQuestions]);

          if (response.data.next) {
            setNextPageUrl(response.data.next);
          } else {
            setHasMore(false);
          }
        }
      } else {
        setErrors(['Error fetching questions.']);
      }
    } catch (error) {
      setErrors([...errors, error.message]);
    }
  }, [hasMore, nextPageUrl, questions, errors]);

  const fetchUserDetailsForQuestions = async (questionData) => {
    const userDetails = await Promise.all(
      questionData.map(async (question) => {
        try {
          const userResponse = await axios.get(`/api/profiles/${question.user}`);
          return userResponse.data;
        } catch (error) {
          setErrors([...errors, error.message]);
          return {};
        }
      })
    );

    return questionData.map((question, index) => ({
      ...question,
      userDetails: userDetails[index],
    }));
  };

  useEffect(() => {
    fetchMoreQuestions();
  }, [fetchMoreQuestions]);

  return (
    <Container className='user-data'>
      {errors.length > 0 && (
        <div className="error-container">
          <p>Errors:</p>
          <ul>
            {errors.map((error, index) => (
              <li key={index}>{error}</li>
            ))}
          </ul>
        </div>
      )}
      {questions.length === 0 ? (
        <p>No questions found</p>
      ) : (
        <InfiniteScroll
          dataLength={questions.length}
          next={fetchMoreQuestions}
          hasMore={hasMore}
          loader={<h4>Loading...</h4>}
        >
          {questions.map((question) => (
            <Card key={question.id} className="mb-3">
              <Card.Body>
                <Card.Title>{question.question}</Card.Title>
                <Card.Text>{question.description}</Card.Text>
                <Card.Text>
                  Author: <Link to={`/profile/${question.user}`}>{question.userDetails.username}</Link>
                </Card.Text>
                <Link to={`/questions/${question.id}`} className="btn btn-primary">
                  View Question
                </Link>
              </Card.Body>
            </Card>
          ))}
        </InfiniteScroll>
      )}
    </Container>
  );
}

export default QuestionList;