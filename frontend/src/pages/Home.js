import React, { useState, useEffect } from 'react';
import SearchBar from '../components/SearchBar';
import InfiniteScrollQuestions from '../components/InfiniteScrollQuestions';
import axios from 'axios';
import { Row, Col } from 'react-bootstrap';

const Home = () => {
  const [searchResults, setSearchResults] = useState([]);
  const [feedQuestions, setFeedQuestions] = useState([]);
  const [searchKeyword, setSearchKeyword] = useState('');

  useEffect(() => {
    loadAllQuestions();
  }, []);

  const loadAllQuestions = () => {
    axios
      .get('/api/questions/')
      .then((response) => {
        setFeedQuestions(response.data);
      })
      .catch((error) => {
        console.error('Error fetching questions:', error);
      });
  };

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
      <Row>
        <Col xs={12} md={8}>
          <SearchBar onSearch={handleSearch} />
          {searchKeyword ? (
            <InfiniteScrollQuestions data={searchResults} />
          ) : (
            <InfiniteScrollQuestions data={feedQuestions} />
          )}
        </Col>
        <Col xs={12} md={4}>
          {/* Space for trending followers component*/}
        </Col>
      </Row>
    </div>
  );
};

export default Home;
