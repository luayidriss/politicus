import React, { useState } from 'react';
import { Button, Form } from 'react-bootstrap';
import axios from 'axios';
import { useHistory } from 'react-router-dom';

function RegistrationForm() {
    const [username, setUsername] = useState('');
    const [email, setEmail] = useState('');
    const [password1, setPassword1] = useState('');
    const [password2, setPassword2] = useState('');
    const history = useHistory();

    const handleRegister = async () => {
        try {
            await axios.post("/dj-rest-auth/registration/", { username, email, password1, password2 });
            history.push("/login");
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

            <Button variant="primary" onClick={handleRegister}>
                Register
            </Button>
        </Form>
    );
}

export default RegistrationForm;
