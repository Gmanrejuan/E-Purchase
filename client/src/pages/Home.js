import React from 'react';

const Home = ({ user, onLogout }) => {
  return (
    <div className="home-container">
      <div className="home-card">
        <h1>🎉 Welcome to Your Dashboard!</h1>
        <p>You have successfully logged in to the MERN Auth application.</p>
        
        <div className="user-info">
          <h3>👤 User Information</h3>
          <p><strong>Name:</strong> {user?.name}</p>
          <p><strong>Email:</strong> {user?.email}</p>
          <p><strong>User ID:</strong> {user?.id}</p>
        </div>
        
        <p>This is a protected page that can only be accessed by authenticated users.</p>
        
        <button onClick={onLogout} className="logout-btn">
          🚪 Logout
        </button>
      </div>
    </div>
  );
};

export default Home;
