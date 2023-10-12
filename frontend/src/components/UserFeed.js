import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useAuth } from './AuthContext';

function UserFeed() {
  const [questions, setQuestions] = useState([]);
  const [page, setPage] = useState(1);
  const [hasMore, setHasMore] = useState(true);
  const { loggedIn } = useAuth();

  const loadQuestions = async () => {
    try {
      const response = await axios.get(`/api/questions/followed-questions/?page=${page}`);
      const newQuestions = response.data;

      if (newQuestions.length === 0) {
        setHasMore(false);
      } else {
        setQuestions([...questions, ...newQuestions]);
        setPage(page + 1);
      }
    } catch (error) {
      console.error('Error fetching questions:', error);
    }
  };

  const handleScroll = () => {
    if (
      window.innerHeight + document.documentElement.scrollTop ===
      document.documentElement.offsetHeight
    ) {
      loadQuestions();
    }
  };

  useEffect(() => {
    if (loggedIn) {
      loadQuestions();
    }

    window.addEventListener('scroll', handleScroll);
    return () => {
      window.removeEventListener('scroll', handleScroll);
    };
  }, [loggedIn, page]);

  return (
    <div>
      {loggedIn ? (
        <div>
          <h2>User Feed</h2>
          {questions.map((question) => (
            <div key={question.id}>
              <h4>{question.title}</h4>
              <p>Question: {question.body}</p>
              <p>User: {question.author.username}</p>
            </div>
          ))}
          {hasMore && <p>Loading more questions...</p>}
        </div>
      ) : (
        <p>Please log in to view your feed.</p>
      )}
    </div>
  );
}

export default UserFeed;
