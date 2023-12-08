import React from 'react';
import { Link } from 'react-router-dom';
import Container from 'react-bootstrap/Container';

const NotFound = () => {
    return (
        <Container className="d-flex align-items-center justify-content-center vh-100">
            <div className="text-center">
                <h1>404 - Not Found</h1>
                <p>The page you are looking for does not exist.</p>
                <Link to="/" className="btn btn-primary">Go to Home</Link>
            </div>
        </Container>
    );
}

export default NotFound;
