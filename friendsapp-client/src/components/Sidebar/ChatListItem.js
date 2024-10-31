import React from 'react';

const Sidebar = ({ profilePicture, userName }) => {
  // Utilize uma imagem padrão caso 'profilePicture' não seja fornecido
  const picture = profilePicture ?? "default_picture.png";

  return (
    <div className="sidebar">
      <div className="profile-section">
        <img src={picture} alt="Profile" className="profile-picture" />
        <span className="user-name">{userName}</span>
      </div>
      {/* Outros elementos da Sidebar */}
    </div>
  );
};

export default Sidebar;
