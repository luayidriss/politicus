import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import InfiniteScroll from 'react-infinite-scroll-component';
import axios from 'axios';

function InfiniteScrollQuestions() {
    const [questions, setQuestions] = useState([]);
    const [hasMore, setHasMore] = useState(true);

    const fetchMoreQuestions = async () => {
        try {
            const response = await axios.get(`/api/questions/?offset=${questions.length}`);

            if (response.status === 200) {
                const data = response.data;
                if (data.length === 0) {
                    setHasMore(false);
                } else {
                    setQuestions([...questions, ...data]);
                }
            } else {
                console.error('Failed to fetch more questions');
            }
        } catch (error) {
            console.error('Error fetching more questions:', error);
        }
    };

    useEffect(() => {
        fetchMoreQuestions();
    }, []);

    return (
        <div>
            <h2>Infinite Scroll Questions</h2>
            <InfiniteScroll
                dataLength={questions.length}
                next={fetchMoreQuestions}
                hasMore={hasMore}
                loader={<h4>Loading...</h4>}
            >
                <ul>
                    {questions.map((question) => (
                        <li key={question.id}>
                            <Link to={`/questions/${question.id}`}>{question.title}</Link>
                        </li>
                    ))}
                </ul>
            </InfiniteScroll>
        </div>
    );
}

export default InfiniteScrollQuestions;

