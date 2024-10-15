// src/Chatbot.js
import React, { useState, useEffect, useRef } from 'react';
import axios from 'axios';
import './Chatbot.css';

const Chatbot = () => {
  const [messages, setMessages] = useState([]);
  const [input, setInput] = useState('');
  const chatEndRef = useRef(null);

  const handleSendMessage = async () => {
    if (input.trim()) {
      const newMessage = { text: input, sender: 'user' };
      setMessages([...messages, newMessage]);

      try {
        // Simulating sending to a dummy REST API
        const response = await axios.post('https://jsonplaceholder.typicode.com/posts', {
          message: input,
        });

        // Simulated bot reply
        const botReply = { text: `Bot reply to "${input}"`, sender: 'bot' };
        setMessages((prevMessages) => [...prevMessages, botReply]);
      } catch (error) {
        console.error('Error sending message:', error);
      }

      setInput('');
    }
  };

  // Scroll to bottom when new message is added
  useEffect(() => {
    chatEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [messages]);

  return (
    <div className="chatbot-wrapper">
      <div className="chatbot-header">
        <h2>Lets learn Git</h2>
      </div>
      <div className="chat-window">
        <div className="chat-messages">
          {messages.map((msg, index) => (
            <div key={index} className={`message ${msg.sender}`}>
              {msg.text}
            </div>
          ))}
          <div ref={chatEndRef}></div>
        </div>
        <div className="chat-input">
          <input
            type="text"
            value={input}
            onChange={(e) => setInput(e.target.value)}
            placeholder="Type your message..."
            onKeyDown={(e) => e.key === 'Enter' && handleSendMessage()}
          />
          <button onClick={handleSendMessage}>Send</button>
        </div>
      </div>
    </div>
  );
};

export default Chatbot;
