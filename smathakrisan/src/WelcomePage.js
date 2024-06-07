
import React, { useState, useEffect } from 'react';
import './WelcomePage.css';
import { Link } from 'react-router-dom'; 
import Chatbot from './Chatbot'; 

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
    window.location.href = '/login'; 
  };

  return (
    <div className="welcome-page">
      <div className="navbar">
        <div className="dropdown">
          <button className="dropbtn">☰</button>
          <div className="dropdown-content">
            <Link to="/profile">Profile</Link>
            <Link to="/">Home</Link> 
            <Link to="/contact">Contact</Link>
            <Link to="/learn">Learn with SmathaKrisan</Link>
            <Link to="/settings">Settings</Link> 
            <button onClick={handleLogout}>Logout</button>
          </div>
        </div>
      </div>
      <div className="welcome-popup">
        <h1 className="greet">👋 Hi, {userName ? userName : 'Loading...'}!</h1>
      </div>
      <div className="profile-section">
      </div>
      <Link to="/learn" className="learn-link">Learn with Smathakrisan</Link>
      <Chatbot /> 
    </div>
  );
};

export default WelcomePage;
