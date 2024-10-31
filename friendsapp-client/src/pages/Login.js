import React, { useState } from 'react';
import { Button, TextField, Container, Typography, Paper } from '@mui/material';

function Login({ onLogin }) {
  const [username, setUsername] = useState('');

  const handleLogin = () => {
    if (username.trim() !== '') {
      onLogin(username);
    } else {
      alert('Por favor, insira um nome de usuário válido.');
    }
  };

  return (
    <Container maxWidth="sm" style={{ marginTop: '10%' }}>
      <Paper elevation={10} style={{ padding: '40px', borderRadius: '15px' }}>
        <Typography variant="h4" align="center" gutterBottom>
          Chat Entre Amigos
        </Typography>
        <TextField
          fullWidth
          label="Digite seu nome..."
          variant="outlined"
          value={username}
          onChange={(e) => setUsername(e.target.value)}
          style={{ marginBottom: '20px' }}
        />
        <Button
          fullWidth
          variant="contained"
          color="primary"
          onClick={handleLogin}
        >
          Entrar
        </Button>
      </Paper>
    </Container>
  );
}

export default Login;
