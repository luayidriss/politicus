import React, { useState } from 'react';
import { Button, Form } from 'react-bootstrap';
import axios from 'axios';
import { useAuth } from './AuthContext';
import { useHistory } from 'react-router-dom';

function RegistrationForm() {
    const [username, setUsername] = useState('');
    const [email, setEmail] = useState('');
    const [password1, setPassword1] = useState('');
    const [password2, setPassword2] = useState('');
    const [birthDate, setBirthDate] = useState('');
    const [firstName, setFirstName] = useState('');
    const [lastName, setLastName] = useState('');
    const [country, setCountry] = useState('');
    const { login } = useAuth();
    const history = useHistory();

    const handleRegister = async () => {
        try {
            await axios.post("/dj-rest-auth/registration/", {
                username,
                email,
                password1,
                password2,
                birth_date: birthDate,
                first_name: firstName,
                last_name: lastName,
                country,
            });
            login();
            history.push("/home");
        } catch (error) {
            console.error('Sign Up error:', error);
        }
    };

    return (
        <Form>
            <Form.Group controlId="username">
                <Form.Label>Username</Form.Label>
                <Form.Control
                    type="text"
                    placeholder="Enter username"
                    value={username}
                    onChange={(e) => setUsername(e.target.value)}
                />
            </Form.Group>

            <Form.Group controlId="email">
                <Form.Label>Email</Form.Label>
                <Form.Control
                    type="email"
                    placeholder="Enter email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                />
            </Form.Group>

            <Form.Group controlId="password1">
                <Form.Label>Password</Form.Label>
                <Form.Control
                    type="password"
                    placeholder="Enter password"
                    value={password1}
                    onChange={(e) => setPassword1(e.target.value)}
                />
            </Form.Group>

            <Form.Group controlId="password2">
                <Form.Label>Password</Form.Label>
                <Form.Control
                    type="password"
                    placeholder="Confirm password"
                    value={password2}
                    onChange={(e) => setPassword2(e.target.value)}
                />
            </Form.Group>

            <Form.Group controlId="birthDate">
                <Form.Label>Birth Date</Form.Label>
                <Form.Control
                    type="date"
                    value={birthDate}
                    onChange={(e) => setBirthDate(e.target.value)}
                />
            </Form.Group>

            <Form.Group controlId="firstName">
                <Form.Label>First Name</Form.Label>
                <Form.Control
                    type="text"
                    placeholder="Enter first name"
                    value={firstName}
                    onChange={(e) => setFirstName(e.target.value)}
                />
            </Form.Group>

            <Form.Group controlId="lastName">
                <Form.Label>Last Name</Form.Label>
                <Form.Control
                    type="text"
                    placeholder="Enter last name"
                    value={lastName}
                    onChange={(e) => setLastName(e.target.value)}
                />
            </Form.Group>

            <Form.Group controlId="country">
                <Form.Label>Country</Form.Label>
                <Form.Control
                    type="text"
                    placeholder="Enter country"
                    value={country}
                    onChange={(e) => setCountry(e.target.value)}
                />
            </Form.Group>

            <Button variant="primary" onClick={handleRegister}>
                Register
            </Button>
        </Form>
    );
}

export default RegistrationForm;
