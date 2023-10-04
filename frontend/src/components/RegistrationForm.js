import React, { useState } from 'react';
import { Button, Form } from 'react-bootstrap';
import axios from 'axios';

function RegistrationForm() {
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');

    const handleRegister = async () => {
        // eslint-disable-next-line
        const response = await axios.post('/api/auth/register/', { username, password });
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

            <Form.Group controlId="password">
                <Form.Label>Password</Form.Label>
                <Form.Control
                    type="password"
                    placeholder="Enter password"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                />
            </Form.Group>

            <Button variant="primary" onClick={handleRegister}>
                Register
            </Button>
        </Form>
    );
}

export default RegistrationForm;
