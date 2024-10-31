import React from 'react';
import ChatListItem from './ChatListItem';
import './Sidebar.css';

function Sidebar({ user, chats, setChats, selectChat }) {
  const handleAddChat = () => {
    const chatName = prompt('Digite o nome do chat:');
    if (chatName) {
      setChats([...chats, { name: chatName, messages: [], lastMessage: '' }]);
    }
  };

  return (
    <div className="sidebar">
      <div className="sidebar-header">
        <div className="user-info">
          <img
            className="profile-picture"
            src={user.profilePicture || 'https://via.placeholder.com/50'}
            alt="Foto de Perfil"
          />
          <span>{user.username}</span>
        </div>
        <button onClick={handleAddChat}>Novo Chat</button>
      </div>
      <div className="chat-list">
        {chats.map((chat, index) => (
          <ChatListItem key={index} chat={chat} onClick={() => selectChat(chat)} />
        ))}
      </div>
    </div>
  );
}

export default Sidebar;
