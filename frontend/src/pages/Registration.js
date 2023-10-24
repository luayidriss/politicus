import React from 'react';
import RegistrationForm from '../components/RegistrationForm';
import '../styles/Auth.css';

const Registration = () => {
  return (
    <div className="auth-container">
      <div className="auth-card">
        <h2>Registration Page</h2>
        <RegistrationForm />
      </div>
    </div>
  );
};

export default Registration;
