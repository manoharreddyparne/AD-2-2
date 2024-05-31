// src/WelcomePage.js
import React from 'react';
import './WelcomePage.css';

const WelcomePage = () => {
  const user = JSON.parse(localStorage.getItem('user'));

  const handleLogout = () => {
    localStorage.removeItem('user');
    window.location.button = '/login'; // Redirect to login page
  };

  return (
    <div className="welcome-page">
      <div className="navbar">
        <div className="dropdown">
          <button className="dropbtn">☰</button>
          <div className="dropdown-content">
            <a href="/profile">Profile</a>
            <a href='/'>Home</a>
            <a href="/contact">Contact</a>
            <a href="/settings">Settings</a>
            <a onClick={handleLogout}>Logout</a>
          </div>
        </div>
      </div>
      <div className="welcome-popup">
        <h1 className="greet">👋 Hi, {user.lastName} {user.firstName}!</h1>
      </div>
    </div>
  );
};

export default WelcomePage;
