require('dotenv').config();
const express = require('express');
const http = require('http');
const socketIo = require('socket.io');
const cors = require('cors');

const app = express();
const server = http.createServer(app);
const io = socketIo(server, {
  cors: {
    origin: '*',
    methods: ['GET', 'POST']
  }
});

app.use(cors());
app.use(express.json());

// Armazenamento em memória para usuários e mensagens
let users = [];
let messages = [];

// Rota para registrar um usuário
app.post('/register', (req, res) => {
  const { username } = req.body;
  try {
    console.log("Requisição recebida para registrar usuário:", username);
    let user = users.find(user => user.username === username);
    if (!user) {
      console.log("Usuário não encontrado, criando um novo.");
      user = { username, online: true };
      users.push(user);
    } else {
      console.log("Usuário já existente:", username);
    }
    res.status(201).send(user);
  } catch (error) {
    console.error('Erro ao registrar usuário:', error);
    res.status(500).send('Erro ao registrar usuário');
  }
});

// Gerenciamento do Socket.IO
io.on('connection', (socket) => {
  console.log('Novo cliente conectado:', socket.id);

  socket.on('sendMessage', (message) => {
    console.log('Mensagem recebida:', message);
    messages.push(message);
    io.emit('receiveMessage', message);
  });

  socket.on('disconnect', () => {
    console.log('Cliente desconectado:', socket.id);
  });
});

const PORT = process.env.PORT || 5000;
server.listen(PORT, () => console.log(`Servidor rodando na porta ${PORT}`));
