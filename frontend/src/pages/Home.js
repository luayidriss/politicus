import React, { useState } from 'react';
import InfiniteScrollQuestions from '../components/InfiniteScrollQuestions';
import SearchBar from '../components/SearchBar';
import axios from 'axios';

const Home = () => {
  const [searchResults, setSearchResults] = useState([]);

  const handleSearch = (keyword) => {
    axios
      .get(`/api/search?q=${keyword}`)
      .then((response) => {
        setSearchResults(response.data);
      })
      .catch((error) => {
        console.error('Error searching:', error);
      });
  };

  return (
    <div>
      <h2>Home</h2>
      <SearchBar onSearch={handleSearch} />
      <InfiniteScrollQuestions data={searchResults} />
    </div>
  );
};

export default Home;
