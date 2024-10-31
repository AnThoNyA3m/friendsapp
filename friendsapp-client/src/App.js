import React, { useState, useEffect } from 'react';
import axios from 'axios';
import Sidebar from './components/Sidebar/Sidebar';
import ChatBox from './components/ChatBox/ChatBox';
import './App.css';

const SERVER_URL = 'http://localhost:5000';

function App() {
  const [users, setUsers] = useState([]);
  const [messages, setMessages] = useState([]);
  const [username, setUsername] = useState('');
  const [connected, setConnected] = useState(false);
  const [selectedUser, setSelectedUser] = useState(null);

  useEffect(() => {
    if (connected) {
      fetchUsers();
      fetchMessages();
    }
  }, [connected]);

  const fetchUsers = async () => {
    try {
      const response = await axios.get(`${SERVER_URL}/users`);
      setUsers(response.data);
    } catch (error) {
      console.error('Erro ao buscar usuários:', error);
    }
  };

  const fetchMessages = async () => {
    try {
      const response = await axios.get(`${SERVER_URL}/messages`);
      setMessages(response.data);
    } catch (error) {
      console.error('Erro ao buscar mensagens:', error);
    }
  };

  const handleRegisterUser = async () => {
    if (username.trim() !== '') {
      try {
        const response = await axios.post(`${SERVER_URL}/register`, { username });
        setConnected(true);
        setUsername(response.data.username);
        fetchUsers();
      } catch (error) {
        console.error('Erro ao registrar usuário:', error);
      }
    }
  };

  const handleSendMessage = async (text) => {
    if (text.trim() !== '' && selectedUser) {
      const messageData = { from: username, to: selectedUser, text };
      try {
        const response = await axios.post(`${SERVER_URL}/messages`, messageData);
        setMessages((prevMessages) => [...prevMessages, response.data]);
      } catch (error) {
        console.error('Erro ao enviar mensagem:', error);
      }
    }
  };

  return (
    <div className="app">
      <div className={`app-container ${connected ? 'connected' : 'disconnected'}`}>
        {!connected ? (
          <div className="login-container">
            <h1>Bem-vindo ao Chat!</h1>
            <input
              type="text"
              placeholder="Digite seu nome de usuário"
              value={username}
              onChange={(e) => setUsername(e.target.value)}
              onKeyPress={(e) => e.key === 'Enter' && handleRegisterUser()}
            />
            <button onClick={handleRegisterUser}>Entrar</button>
          </div>
        ) : (
          <>
            <Sidebar users={users} onSelectUser={setSelectedUser} />
            <ChatBox
              messages={messages.filter(
                (msg) =>
                  (msg.from === username && msg.to === selectedUser) ||
                  (msg.from === selectedUser && msg.to === username)
              )}
              onSendMessage={handleSendMessage}
            />
          </>
        )}
      </div>
    </div>
  );
}

export default App;
