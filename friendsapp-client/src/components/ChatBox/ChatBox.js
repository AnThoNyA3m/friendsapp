import React, { useState, useEffect } from 'react';
import './ChatBox.css';

function ChatBox({ currentUser, selectedUser, socket }) {
  const [message, setMessage] = useState('');
  const [messages, setMessages] = useState([]);

  useEffect(() => {
    socket.on('receiveMessage', (newMessage) => {
      setMessages((prevMessages) => [...prevMessages, newMessage]);
    });

    return () => {
      socket.off('receiveMessage');
    };
  }, [socket]);

  const handleSendMessage = () => {
    if (message.trim() && selectedUser) {
      const newMessage = {
        from: currentUser,
        to: selectedUser,
        text: message,
        timestamp: new Date().toISOString(),
      };
      socket.emit('sendMessage', newMessage);
      setMessages((prevMessages) => [...prevMessages, newMessage]);
      setMessage('');
    }
  };

  return (
    <div className="chat-box">
      <div className="messages-container">
        {messages.length === 0 ? (
          <p>Nenhuma mensagem disponível</p>
        ) : (
          messages.map((msg, index) => (
            <div key={index} className="message">
              <strong>{msg.from}:</strong> {msg.text}
            </div>
          ))
        )}
      </div>
      <div className="message-input-container">
        <input
          type="text"
          className="message-input"
          placeholder="Digite uma mensagem..."
          value={message}
          onChange={(e) => setMessage(e.target.value)}
        />
        <button className="send-button" onClick={handleSendMessage}>
          Enviar
        </button>
      </div>
    </div>
  );
}

export default ChatBox;
