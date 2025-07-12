import React from 'react';

const Footer = ({ isAuthenticated }) => {
  const currentYear = new Date().getFullYear();

  return (
    <footer className="footer">
      <div className="footer-container">
        <div className="footer-content">
          <div className="footer-section">
            <h4>🚀 MERN Auth</h4>
            <p>A complete authentication solution built with MongoDB, Express.js, React, and Node.js.</p>
          </div>
          
          <div className="footer-section">
            <h5>Quick Links</h5>
            <ul className="footer-links">
              {isAuthenticated ? (
                <>
                  <li><a href="/dashboard">Dashboard</a></li>
                  <li><a href="/profile">Profile</a></li>
                  <li><a href="/settings">Settings</a></li>
                  <li><a href="/about">About</a></li>
                </>
              ) : (
                <>
                  <li><a href="/login">Login</a></li>
                  <li><a href="/signup">Sign Up</a></li>
                </>
              )}
            </ul>
          </div>
          
          <div className="footer-section">
            <h5>Technologies</h5>
            <ul className="footer-links">
              <li>⚛️ React</li>
              <li>🟢 Node.js</li>
              <li>🍃 MongoDB</li>
              <li>🚀 Express.js</li>
            </ul>
          </div>
          
          <div className="footer-section">
            <h5>Resources</h5>
            <ul className="footer-links">
              <li><span className="footer-link-placeholder">Documentation</span></li>
              <li><span className="footer-link-placeholder">GitHub</span></li>
              <li><span className="footer-link-placeholder">Support</span></li>
              <li><span className="footer-link-placeholder">API Reference</span></li>
            </ul>
          </div>
        </div>
        
        <div className="footer-bottom">
          <div className="footer-divider"></div>
          <div className="footer-bottom-content">
            <p>&copy; {currentYear} MERN Auth Demo. Built for educational purposes.</p>
            <div className="footer-badges">
              <span className="badge">🔐 Secure</span>
              <span className="badge">📱 Responsive</span>
              <span className="badge">⚡ Fast</span>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
