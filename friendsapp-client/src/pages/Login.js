import React, { useState } from 'react';
import './Login.css';

function Login({ setUser }) {
  const [username, setUsername] = useState('');
  const [profilePicture, setProfilePicture] = useState(null);

  const handleLogin = () => {
    if (username.trim()) {
      setUser({ username, profilePicture });
    }
  };

  const handleProfilePictureChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        setProfilePicture(reader.result);
      };
      reader.readAsDataURL(file);
    }
  };

  return (
    <div className="login-container">
      <div className="login-box">
        <h2>Login</h2>
        <input
          type="text"
          placeholder="Digite seu nome..."
          value={username}
          onChange={(e) => setUsername(e.target.value)}
        />
        <input type="file" onChange={handleProfilePictureChange} />
        <button onClick={handleLogin}>Entrar</button>
      </div>
    </div>
  );
}

export default Login;
