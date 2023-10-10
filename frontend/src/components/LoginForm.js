import React, { useState } from 'react';
import { Button, Form } from 'react-bootstrap';
import axios from 'axios';
import { useAuth } from './AuthContext';
import { useHistory } from 'react-router-dom';

function LoginForm() {
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');

    const { login } = useAuth();
    const history = useHistory();

    const handleLogin = async () => {
        try {
            const response = await axios.post('dj-rest-auth/login/', { username, password });
            login();
            console.log('Login successful:', response.data);
            history.push('/home')
        } catch (error) {
            console.error('Login error:', error);
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

            <Form.Group controlId="password">
                <Form.Label>Password</Form.Label>
                <Form.Control
                    type="password"
                    placeholder="Enter password"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                />
            </Form.Group>

            <Button variant="primary" onClick={handleLogin}>
                Login
            </Button>
        </Form>
    );
}

export default LoginForm;
