import React from 'react';
import LoginForm from '../components/LoginForm';
import '../styles/Auth.css';

const Login = () => {
  return (
    <div className="auth-container">
      <div className="auth-card">
          <h2 className="text-center">Log in</h2>
          <LoginForm />
      </div>
    </div>
  );
};

export default Login;
