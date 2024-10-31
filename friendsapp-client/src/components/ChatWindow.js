import React from 'react';

function ChatWindow({ messages }) {
  return (
    <div className="chat-window">
      {messages.map((msg, index) => (
        <div key={index} className="message">
          <strong>{msg.user}: </strong>{msg.text}
        </div>
      ))}
    </div>
  );
}

export default ChatWindow;
