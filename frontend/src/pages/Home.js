import React, { useState, useEffect } from 'react';
import SearchBar from '../components/SearchBar';
import QuestionList from '../components/QuestionList';
import FollowerList from '../components/FollowerList';
import axios from 'axios';
import { Row, Col } from 'react-bootstrap';
import '../styles/Home.css';

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
    <div className="home-container">
      <Row className="row" >
        <Col xs={12} md={8} lg={6}>
          <SearchBar onSearch={handleSearch} />
          {searchKeyword ? (
            <QuestionList data={searchResults} />
          ) : (
            <QuestionList data={feedQuestions} />
          )}
        </Col>
        <Col xs={12} md={4} lg={3}>
          <FollowerList />
        </Col>
      </Row>
    </div>
  );
};

export default Home;
