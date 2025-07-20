import React from 'react';

const About = () => {
  return (
    <div className="home-container">
      <div className="home-card">
        <h1>📖 About This Application</h1>
        
        <div className="about-content">
          <p>
            Welcome to our <strong>MERN Stack Authentication Demo</strong>! This application 
            showcases a complete full-stack web solution built with modern technologies.
          </p>
          
          <div className="tech-stack">
            <h3>🛠️ Tech Stack</h3>
            <div className="tech-grid">
              <div className="tech-item">
                <h4>Frontend</h4>
                <ul>
                  <li>⚛️ React</li>
                  <li>🚦 React Router</li>
                  <li>📡 Axios</li>
                  <li>🎨 CSS3</li>
                </ul>
              </div>
              
              <div className="tech-item">
                <h4>Backend</h4>
                <ul>
                  <li>🟢 Node.js</li>
                  <li>🚀 Express.js</li>
                  <li>🍃 MongoDB</li>
                  <li>📦 Mongoose</li>
                </ul>
              </div>
              
              <div className="tech-item">
                <h4>Security</h4>
                <ul>
                  <li>🔐 JWT Tokens</li>
                  <li>🔒 bcrypt</li>
                  <li>🌐 CORS</li>
                  <li>🛡️ Input Validation</li>
                </ul>
              </div>
            </div>
          </div>
          
          <div className="features">
            <h3>✨ Features</h3>
            <ul>
              <li>🔐 Secure user authentication</li>
              <li>📝 User registration and login</li>
              <li>🏠 Protected dashboard</li>
              <li>👤 User profile management</li>
              <li>📱 Responsive design</li>
              <li>🎯 Modern UI/UX</li>
            </ul>
          </div>
          
          <div className="version-info">
            <h3>📋 Version Information</h3>
            <p><strong>Version:</strong> 1.0.0</p>
            <p><strong>Last Updated:</strong> July 2025</p>
            <p><strong>License:</strong> MIT</p>
          </div>
          
          <div className="contact">
            <h3>📞 Contact</h3>
            <p>
              This is a demo application created for educational purposes. 
              Feel free to explore all the features and learn from the implementation!
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default About;
