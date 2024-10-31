require('dotenv').config();
const express = require('express');
const http = require('http');
const cors = require('cors');

const app = express();
const server = http.createServer(app);

app.use(cors());
app.use(express.json());

// Armazenamento em memória para usuários e mensagens
let users = [];
let messages = [];

// Rota para registrar um usuário
app.post('/register', (req, res) => {
  const { username } = req.body;

  if (!username) {
    return res.status(400).send('Nome de usuário é obrigatório');
  }

  try {
    let user = users.find(user => user.username === username);
    if (!user) {
      user = { username, online: true };
      users.push(user);
    } else {
      user.online = true;
    }
    res.status(201).send(user);
  } catch (error) {
    res.status(500).send('Erro ao registrar usuário');
  }
});

// Rota para buscar usuários online
app.get('/users', (req, res) => {
  try {
    const onlineUsers = users.filter(user => user.online);
    res.json(onlineUsers);
  } catch (error) {
    res.status(500).send('Erro ao buscar usuários online');
  }
});

// Rota para buscar mensagens
app.get('/messages', (req, res) => {
  try {
    res.json(messages);
  } catch (error) {
    res.status(500).send('Erro ao buscar mensagens');
  }
});

// Rota para enviar mensagem
app.post('/messages', (req, res) => {
  const { from, to, text } = req.body;

  if (!from || !to || !text) {
    return res.status(400).send('Dados da mensagem são obrigatórios');
  }

  try {
    const message = { from, to, text, timestamp: new Date() };
    messages.push(message);
    res.status(201).send(message);
  } catch (error) {
    res.status(500).send('Erro ao enviar mensagem');
  }
});

const PORT = process.env.PORT || 5000;
server.listen(PORT, () => console.log(`Servidor rodando na porta ${PORT}`));
