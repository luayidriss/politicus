import React, { useEffect } from 'react';
import { Link } from 'react-router-dom';
import Container from 'react-bootstrap/Container';
import Nav from 'react-bootstrap/Nav';
import Navbar from 'react-bootstrap/Navbar';
import { useAuth } from './AuthContext';
import '../styles/NavBar.css';

const NavigationBar = () => {
  const { loggedIn, currentUser, handleTokenRefresh } = useAuth();

  useEffect(() => {
    if (loggedIn) {
      handleTokenRefresh();
    }
  }, [loggedIn, handleTokenRefresh]);

  return (
    <Navbar bg="dark" variant="dark" expand="lg">
      <Container>
        <Nav className="me-auto">
          {loggedIn && (
            <Nav.Item>
              <span className="nav-link">Welcome, {currentUser.first_name}!</span>
            </Nav.Item>
          )}
          <Nav.Item>
            <Link to="/" className="nav-link">
              Home
            </Link>
          </Nav.Item>
          {loggedIn && (
            <Nav.Item>
              <Link to="/add-question" className="nav-link">
                Add Questions
              </Link>
            </Nav.Item>
          )}
          {loggedIn && (
            <Nav.Item>
              <Link to={`/profile/${currentUser.pk}/`} className="nav-link">
                My Profile
              </Link>
            </Nav.Item>
          )}
        </Nav>
        <Nav className="ml-auto">
          {!loggedIn ? (
            <>
              <Nav.Item>
                <Link to="/register" className="nav-link">
                  Sign Up
                </Link>
              </Nav.Item>
              <Nav.Item>
                <Link to="/login" className="nav-link">
                  Sign In
                </Link>
              </Nav.Item>
            </>
          ) : (
            <Nav.Item>
              <Link to="/logout" className="nav-link">
                Sign Out
              </Link>
            </Nav.Item>
          )}
        </Nav>
      </Container>
    </Navbar>
  );
};

export default NavigationBar;