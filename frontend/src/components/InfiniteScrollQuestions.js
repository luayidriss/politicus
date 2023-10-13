import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import InfiniteScroll from 'react-infinite-scroll-component';
import axios from 'axios';
import { Card, Container } from 'react-bootstrap';

function InfiniteScrollQuestions({ data }) {
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
        const responseData = response.data;
        if (responseData.length === 0) {
          setHasMore(false);
        } else {
          setQuestions([...questions, ...responseData]);
        }
      } else {
        console.error('Failed to fetch more questions');
      }
    } catch (error) {
      console.error('Error fetching more questions:', error);
    }
  }

  useEffect(() => {
    if (data && data.length > 0) {
      setQuestions(data);
    }
  }, [data]);

  return (
    <Container>
      <h2>Infinite Scroll Questions</h2>
      {data.length === 0 ? (
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
                <Card.Text>User: {question.user}</Card.Text>
                <Link to={`/questions/${question.id}`} className="btn btn-primary">View Question</Link>
              </Card.Body>
            </Card>
          ))}
        </InfiniteScroll>
      )}
    </Container>
  );
}

export default InfiniteScrollQuestions;
