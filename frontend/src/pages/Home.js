import React, { useState, useEffect } from 'react';
import InfiniteScrollQuestions from '../components/InfiniteScrollQuestions';
import SearchBar from '../components/SearchBar';
import axios from 'axios';

const Home = () => {
  const [searchResults, setSearchResults] = useState([]);
  const [searchKeyword, setSearchKeyword] = useState('');

  const loadAllQuestions = () => {
    axios
      .get('/api/questions/')
      .then((response) => {
        setSearchResults(response.data);
      })
      .catch((error) => {
        console.error('Error fetching questions:', error);
      });
  };

  useEffect(() => {
    // Load all questions by default
    loadAllQuestions();
  }, []);

  const handleSearch = (keyword) => {
    setSearchKeyword(keyword);
    if (keyword) {
      axios
        .get(`/api/questions/?q=${keyword}`)
        .then((response) => {
          setSearchResults(response.data);
        })
        .catch((error) => {
          console.error('Error searching:', error);
        });
    } else {
      setSearchResults([]);
    }
  };

  return (
    <div>
      <h2>Home</h2>
      <SearchBar onSearch={handleSearch} />
      {searchKeyword && searchResults.length === 0 ? (
        <p>No questions found</p>
      ) : (
        <InfiniteScrollQuestions
          data={searchKeyword ? searchResults : undefined}
          loadAllQuestions={loadAllQuestions}
        />
      )}
    </div>
  );
};

export default Home;