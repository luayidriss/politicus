import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import InfiniteScroll from 'react-infinite-scroll-component';
import axios from 'axios';

function InfiniteScrollQuestions({ data, isLoading, searchKeyword }) {
  const [questions, setQuestions] = useState([]);
  const [hasMore, setHasMore] = useState(true);
  const [searchPerformed, setSearchPerformed] = useState(false);
  const [questionsFound, setQuestionsFound] = useState(true);

  const fetchMoreQuestions = async () => {
    if (!hasMore) {
      return;
    }

    try {
      const response = await axios.get(`/api/questions/?offset=${questions.length}`);

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
      setSearchPerformed(true);
      setQuestionsFound(true);
    } else {
      setSearchPerformed(true);
      setQuestionsFound(false);
    }
  }, [data]);

  return (
    <div>
      <h2>Infinite Scroll Questions</h2>
      {questions.length === 0 ? (
        isLoading ? (
          <p>Loading...</p>
        ) : (
          searchPerformed && !questionsFound ? (
            <p>No questions found</p>
          ) : null
        )
      ) : (
        <InfiniteScroll
          dataLength={questions.length}
          next={fetchMoreQuestions}
          hasMore={hasMore}
          loader={<h4>Loading...</h4>}
        >
          <ul>
            {questions.map((question) => (
              <li key={question.id}>
                <Link to={`/questions/${question.id}`}>{question.question}</Link>
              </li>
            ))}
          </ul>
        </InfiniteScroll>
      )}
    </div>
  );
}

export default InfiniteScrollQuestions;