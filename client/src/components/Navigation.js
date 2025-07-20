import React, { useState } from 'react';
import { Link, useLocation } from 'react-router-dom';

const Navigation = ({ user, onLogout, isAuthenticated }) => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const location = useLocation();

  const toggleMenu = () => {
    setIsMenuOpen(!isMenuOpen);
  };

  const closeMenu = () => {
    setIsMenuOpen(false);
  };

  const isActive = (path) => {
    return location.pathname === path ? 'nav-link active' : 'nav-link';
  };

  if (!isAuthenticated) {
    return null; // Don't show navigation if not authenticated
  }

  return (
    <nav className="navigation">
      <div className="nav-container">
        <div className="nav-brand">
          <Link to="/dashboard" className="brand-link">
            🚀 MERN Auth
          </Link>
        </div>
        
        <div className={`nav-menu ${isMenuOpen ? 'nav-menu-open' : ''}`}>
          <Link 
            to="/dashboard" 
            className={isActive('/dashboard')}
            onClick={closeMenu}
          >
            🏠 Dashboard
          </Link>
          <Link 
            to="/profile" 
            className={isActive('/profile')}
            onClick={closeMenu}
          >
            👤 Profile
          </Link>
          <Link 
            to="/settings" 
            className={isActive('/settings')}
            onClick={closeMenu}
          >
            ⚙️ Settings
          </Link>
          <Link 
            to="/about" 
            className={isActive('/about')}
            onClick={closeMenu}
          >
            📖 About
          </Link>
        </div>
        
        <div className="nav-user">
          <span className="user-greeting">
            Hi, {user?.name?.split(' ')[0]}!
          </span>
          <button onClick={onLogout} className="nav-logout-btn">
            🚪 Logout
          </button>
        </div>
        
        <div className="nav-toggle" onClick={toggleMenu}>
          <span className="nav-toggle-bar"></span>
          <span className="nav-toggle-bar"></span>
          <span className="nav-toggle-bar"></span>
        </div>
      </div>
    </nav>
  );
};

export default Navigation;
