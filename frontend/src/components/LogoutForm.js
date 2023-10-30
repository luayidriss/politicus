import React from 'react';
import axios from 'axios';
import { Button } from 'react-bootstrap';
import { useAuth } from './AuthContext';
import { useHistory } from 'react-router-dom';


function LogoutForm() {
    const { logout } = useAuth();
    const history = useHistory();

    const handleLogout = async () => {
        try {
            await axios.post("api/dj-rest-auth/logout/");
            console.log('Logout successful');
            logout();
            history.push('/')
        } catch (error) {
            console.error('Logout error:', error);
        }
    };

    return (
        <Button variant="danger" onClick={handleLogout}>
            Sign Out
        </Button>
    );
}

export default LogoutForm;
