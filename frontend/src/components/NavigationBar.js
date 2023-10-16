import React from 'react';
import { Link } from 'react-router-dom';
import Container from 'react-bootstrap/Container';
import Nav from 'react-bootstrap/Nav';
import Navbar from 'react-bootstrap/Navbar';
import NavDropdown from 'react-bootstrap/NavDropdown';
import { useAuth } from './AuthContext';

const NavigationBar = () => {
  const { loggedIn, currentUser } = useAuth();

  return (
    <Navbar bg="light" expand="lg">
      <Container>
        <Nav className="me-auto">
          <Nav.Item>
            <Link to="/" className="nav-link">Home</Link>
          </Nav.Item>
          {loggedIn && (
            <NavDropdown title="Profile" id="basic-nav-dropdown">
              <NavDropdown.Item>
                <Link to="/questions" className="nav-link">Add Questions</Link>
              </NavDropdown.Item>
              <NavDropdown.Item>
                <Link to={`/profile/${currentUser.pk}/`} className="nav-link">My Profile</Link>
              </NavDropdown.Item>
            </NavDropdown>
          ) }
        </Nav>
        <Nav className="ml-auto">
          {!loggedIn ? (
            <>
              <Nav.Item>
                <Link to="/register" className="nav-link">Sign Up</Link>
              </Nav.Item>
              <Nav.Item>
                <Link to="/login" className="nav-link">Sign In</Link>
              </Nav.Item>
            </>
          ) : (
            <Nav.Item>
              <Link to="/logout" className="nav-link">Sign Out</Link>
            </Nav.Item>
          )}
        </Nav>
      </Container>
    </Navbar>
  );
};

export default NavigationBar;