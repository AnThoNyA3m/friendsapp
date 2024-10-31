import React from 'react';
import './ChatListItem.css';

function ChatListItem({ chat, onClick }) {
  return (
    <div className="chat-list-item" onClick={onClick}>
      <div className="chat-name">{chat.name}</div>
      <div className="chat-last-message">{chat.lastMessage}</div>
    </div>
  );
}

export default ChatListItem;
