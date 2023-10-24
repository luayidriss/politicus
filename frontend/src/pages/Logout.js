import React from 'react';
import LogoutForm from '../components/LogoutForm';
import '../styles/Auth.css';

const Logout = () => {
  return (
    <div className="auth-container">
      <div className="auth-card">
          <h2 className="text-center">Do you wish to Sign out?</h2>
          <LogoutForm />
      </div>
    </div>
  );
};

export default Logout;
