import React, { useState, useEffect } from 'react';
import SearchBar from '../components/SearchBar';
import QuestionList from '../components/QuestionList';
import FollowerList from '../components/FollowerList';
import { Row, Col } from 'react-bootstrap';
import axios from 'axios';
import '../styles/Home.css';

const Home = () => {
  const [searchResults, setSearchResults] = useState([]);
  const [feedQuestions, setFeedQuestions] = useState([]);
  const [searchKeyword, setSearchKeyword] = useState('');
  const [hasMore, setHasMore] = useState(true);
  const [nextPageUrl, setNextPageUrl] = useState('/api/questions');
  const [errors, setErrors] = useState([]);

  useEffect(() => {
    loadAllQuestions();
  }, []);

  const loadAllQuestions = () => {
    axios
      .get('/api/questions/')
      .then((response) => {
        setFeedQuestions(response.data.results);
        if (response.data.next) {
          setNextPageUrl(response.data.next);
        } else {
          setHasMore(false);
        }
      })
      .catch((error) => {
        setErrors([...errors, error.message]);
      });
  };

  const handleSearch = () => {
    if (searchKeyword !== "") {
      axios
        .get(`/api/questions/?q=${searchKeyword}`)
        .then((response) => {
          setSearchResults(response.data.results);
        })
        .catch((error) => {
          setErrors([...errors, error.message]);
        });
    } else {
      setSearchResults([]);
    }
  };

  const fetchMoreQuestions = async () => {
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
          setFeedQuestions([...feedQuestions, ...updatedQuestions]);

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
  };

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

  return (
    <div className="home-container">
      <Row className="row">
        <Col xs={12} md={8} lg={6}>
          <SearchBar handleSearch={handleSearch} keyword={searchKeyword} setKeyword={setSearchKeyword} />
          <QuestionList
            data={searchKeyword !== "" ? searchResults : feedQuestions}
            fetchMoreQuestions={fetchMoreQuestions}
            hasMore={hasMore}
          />
        </Col>
        <Col xs={12} md={4} lg={3}>
          <FollowerList />
        </Col>
      </Row>
    </div>
  );
};

export default Home;
