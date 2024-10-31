import React, { useState } from 'react';
import './ChatBox.css';

function ChatBox({ selectedChat, sendMessage }) {
  const [message, setMessage] = useState('');

  const handleSend = () => {
    if (message.trim()) {
      sendMessage(message);
      setMessage('');
    }
  };

  return (
    <div className="chat-box">
      <div className="chat-header">
        <h2>{selectedChat.name}</h2>
      </div>
      <div className="chat-messages">
        {selectedChat.messages.map((msg, index) => (
          <div key={index} className={`message ${msg.user === 'você' ? 'outgoing' : 'incoming'}`}>
            <strong>{msg.user}:</strong> {msg.text}
          </div>
        ))}
      </div>
      <div className="message-input">
        <input
          type="text"
          value={message}
          onChange={(e) => setMessage(e.target.value)}
          placeholder="Digite uma mensagem..."
        />
        <button onClick={handleSend}>Enviar</button>
      </div>
    </div>
  );
}

export default ChatBox;
