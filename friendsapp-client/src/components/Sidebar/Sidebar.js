import React from 'react';
import './Sidebar.css';

const Sidebar = ({ users }) => {
  return (
    <div className="sidebar">
      <h2>Usuários Online</h2>
      <ul>
        {users.length > 0 ? (
          users.map((user, index) => (
            <li key={index} className={user.online ? 'online' : 'offline'}>
              {user.username}
            </li>
          ))
        ) : (
          <p>Nenhum usuário online</p>
        )}
      </ul>
    </div>
  );
};

export default Sidebar;
