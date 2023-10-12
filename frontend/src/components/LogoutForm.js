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
            await axios.post("/accounts/logout/");
            logout();
            console.log('Logout successful');
            history.push('/home')
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
