// src/WelcomePage.js
import React, { useState, useEffect } from 'react';
import './WelcomePage.css';
import Chatbot from './Chatbot'; // Import the Chatbot component

const WelcomePage = () => {
  const [userName, setUserName] = useState('');

  useEffect(() => {
    const user = JSON.parse(localStorage.getItem('user'));
    if (user) {
      setUserName(`${user.lastName} ${user.firstName}`);
    }
  }, []);

  const handleLogout = () => {
    localStorage.removeItem('user');
    window.location.href = '/login'; // Redirect to login page
  };

  return (
    <div className="welcome-page">
      <div className="navbar">
        <div className="dropdown">
          <button className="dropbtn">☰</button>
          <div className="dropdown-content">
            <a href="/profile">Profile</a>
            <a href="/">Home</a>
            <a href="/contact">Contact</a>
            <a href="/settings">Settings</a>
            <button onClick={handleLogout}>Logout</button> {/* Use a button */}
          </div>
        </div>
      </div>
      <div className="welcome-popup">
        <h1 className="greet">👋 Hi, {userName ? userName : 'Loading...'}!</h1>
      </div>
      <div className="profile-section">
        {/* Profile details */}
      </div>
      <Chatbot /> {/* Integrate the Chatbot component */}
    </div>
  );
};

export default WelcomePage;
