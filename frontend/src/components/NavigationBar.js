import React from 'react';
import { Link } from 'react-router-dom';
import Container from 'react-bootstrap/Container';
import Nav from 'react-bootstrap/Nav';
import Navbar from 'react-bootstrap/Navbar';

const NavigationBar = () => {
  return (
    <Navbar bg="light" expand="lg">
      <Container>
          <Nav className="me-auto">
            <Nav.Item>
              <Link to="/" className="nav-link">Home</Link>
            </Nav.Item>
            <Nav.Item>
              <Link to="/questions" className="nav-link">Questions</Link>
            </Nav.Item>
            <Nav.Item>
              <Link to="/user-profiles" className="nav-link">Profiles</Link>
            </Nav.Item>
          </Nav>
          <Nav className="ml-auto">
          <Nav.Item>
            <Link to="/register" className="nav-link">Sign Up</Link>
          </Nav.Item>
          <Nav.Item>
            <Link to="/signin" className="nav-link">Sign In</Link>
          </Nav.Item>
        </Nav>
      </Container>
    </Navbar>
  );
};

export default NavigationBar;
