import React, { useState } from 'react';
import './Chatbot.css';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faMicrophone } from '@fortawesome/free-solid-svg-icons';

const KrishnaHelpline = () => {
  const [messages, setMessages] = useState([]);
  const [inputText, setInputText] = useState('');
  const [selectedLanguage, setSelectedLanguage] = useState('en-US'); // Default language is English

  const handleSendMessage = (text) => {
    // Add logic here to send message to the chatbot server and receive response
    // For now, we'll just add a sample response
    const userMessage = { sender: 'user', text };
    const reply = { sender: 'bot', text: `Hey! This is Smathakrisan. I'm still learning.` };
    setMessages([...messages, userMessage, reply]);
    setInputText('');
  };

  const handleSpeechInput = () => {
    const recognition = new window.webkitSpeechRecognition();
    recognition.lang = selectedLanguage;

    recognition.onresult = (event) => {
      const transcript = event.results[0][0].transcript;
      setInputText(transcript);
      handleSendMessage(transcript); // Automatically send the filled text after speech recognition
    };

    recognition.start();
  };

  const handleLanguageChange = (e) => {
    setSelectedLanguage(e.target.value);
  };

  return (
    <div className="chatbot">
      <div className="chatbot-header">KrishnaHelpline</div>
      <div className="chatbot-messages">
        {messages.map((message, index) => (
          <div key={index} className={`message ${message.sender}`}>
            {message.text}
          </div>
        ))}
      </div>
      <div className="chatbot-input">
        <input
          type="text"
          placeholder="Type your message..."
          value={inputText}
          onChange={(e) => setInputText(e.target.value)}
        />
        <button onClick={handleSpeechInput}>
          <FontAwesomeIcon icon={faMicrophone} />
        </button>
        <button onClick={() => handleSendMessage(inputText)}>Send</button>
        <div className="dropdown">
          <select value={selectedLanguage} onChange={handleLanguageChange}>
            <option value="en-US">English</option>
            <option value="te-IN">Telugu</option>
            <option value="hi-IN">Hindi</option>
          </select>
        </div>
      </div>
    </div>
  );
};

export default KrishnaHelpline;