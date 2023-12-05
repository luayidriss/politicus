import React, { useEffect, useCallback, useState } from 'react';
import { Link } from 'react-router-dom';
import InfiniteScroll from 'react-infinite-scroll-component';
import axios from 'axios';
import { Card, Container } from 'react-bootstrap';
import '../styles/Lists.css';

function QuestionList({ data, fetchMoreQuestions, hasMore }) {
  const [userDetails, setUserDetails] = useState({});
  const [errors, setErrors] = useState([]);

  const fetchUserDetailsForQuestions = async (questionData) => {
    const userDetailsData = await Promise.all(
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

    setUserDetails((prevDetails) => {
      return { ...prevDetails, ...userDetailsData.reduce((acc, userDetail, index) => {
        acc[questionData[index].user] = userDetail;
        return acc;
      }, {})};
    });
  };

  const handleFetchMore = useCallback(async () => {
    await fetchMoreQuestions();
  }, [fetchMoreQuestions]);

  useEffect(() => {
    fetchUserDetailsForQuestions(data);
  }, [data]);

  return (
    <Container className='user-data'>
      {data.length === 0 ? (
        <p>No questions found</p>
      ) : (
        <InfiniteScroll
          dataLength={data.length}
          next={handleFetchMore}
          hasMore={hasMore}
          loader={<h4>Loading...</h4>}
        >
          {data.map((question) => (
            <Card key={question.id} className="mb-3">
              <Card.Body>
                <Card.Title>{question.question}</Card.Title>
                <Card.Text>{question.description}</Card.Text>
                <Card.Text>
                  Author: <Link to={`/profile/${question.user}`}>{userDetails[question.user]?.username}</Link>
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
