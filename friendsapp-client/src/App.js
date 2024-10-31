import React, { useState } from 'react';
import Sidebar from './components/Sidebar/Sidebar';
import ChatBox from './components/ChatBox/ChatBox';
import Login from './pages/Login';
import './App.css';

function App() {
  const [user, setUser] = useState(null);
  const [chats, setChats] = useState([
    { name: 'Amigo 1', messages: [{ user: 'Amigo 1', text: 'Oi, como vai?' }], lastMessage: 'Oi, como vai?' },
    { name: 'Amigo 2', messages: [{ user: 'Amigo 2', text: 'Vamos sair amanhã?' }], lastMessage: 'Vamos sair amanhã?' },
  ]);
  const [selectedChat, setSelectedChat] = useState(null);

  const selectChat = (chat) => {
    setSelectedChat(chat);
  };

  const sendMessage = (message) => {
    if (selectedChat) {
      const updatedChats = chats.map((chat) =>
        chat.name === selectedChat.name
          ? {
              ...chat,
              messages: [...chat.messages, { user: user.username, text: message }],
              lastMessage: message,
            }
          : chat
      );
      setChats(updatedChats);
      setSelectedChat({ ...selectedChat, messages: [...selectedChat.messages, { user: user.username, text: message }] });
    }
  };

  if (!user) {
    return <Login setUser={setUser} />;
  }

  return (
    <div className="app">
      <Sidebar user={user} chats={chats} selectChat={selectChat} />
      {selectedChat ? (
        <ChatBox selectedChat={selectedChat} sendMessage={sendMessage} />
      ) : (
        <div className="chat-placeholder">Selecione um chat para começar</div>
      )}
    </div>
  );
}

export default App;
