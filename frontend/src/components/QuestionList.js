import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import InfiniteScroll from 'react-infinite-scroll-component';
import axios from 'axios';
import { Card, Container } from 'react-bootstrap';
import '../styles/Lists.css';

function QuestionList({ data }) {
  const [questions, setQuestions] = useState([]);
  const [hasMore, setHasMore] = useState(true);

  const fetchMoreQuestions = async () => {
    if (!hasMore) {
      return;
    }

    try {
      let response;
      if (data.length === 0) {
        response = await axios.get(`/api/questions/?offset=${questions.length}`);
      } else {
        response = await axios.get(`/api/questions/?q=${data}&offset=${questions.length}`);
      }

      if (response.status === 200) {
        const responseData = response.data.results;
        if (responseData.length === 0) {
          setHasMore(false);
        } else {
          const updatedQuestions = await fetchUserDetailsForQuestions(responseData);
          setQuestions([...questions, ...updatedQuestions]);
        }
      } else {
        console.error('Failed to fetch more questions');
      }
    } catch (error) {
      console.error('Error fetching more questions:', error);
    }
  }

  const fetchUserDetailsForQuestions = async (questionData) => {
    const userDetails = await Promise.all(
      questionData.map(async (question) => {
        try {
          const userResponse = await axios.get(`/api/profiles/${question.user}`);
          return userResponse.data;
        } catch (error) {
          console.error('Error fetching user details for the question author:', error);
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
    if (data && data.length > 0) {
      fetchUserDetailsForQuestions(data).then((updatedQuestions) => {
        setQuestions(updatedQuestions);
      });
    }
  }, [data]);
  
  return (
    <Container className='user-data'>
      {data.length === 0 ? (
        <p>No questions found</p>
      ) : (
        <InfiniteScroll
          dataLength={questions.length}
          next={fetchMoreQuestions}
          hasMore={hasMore}
          loader={<h4>Loading...</h4>}
        >
          {questions.map((question) => {
            return (
              <Card key={question.id} className="mb-3">
                <Card.Body>
                  <Card.Title>{question.question}</Card.Title>
                  <Card.Text>{question.description}</Card.Text>
                  <Card.Text>Author: <Link to={`/profile/${question.user}`}>{question.userDetails.username}</Link></Card.Text>
                  <Link to={`/questions/${question.id}`} className="btn btn-primary">View Question</Link>
                </Card.Body>
              </Card>
            );
          })}
        </InfiniteScroll>
      )}
    </Container>
  );
}

export default QuestionList;