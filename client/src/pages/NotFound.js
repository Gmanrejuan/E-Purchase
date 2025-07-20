import React from 'react';
import { Link } from 'react-router-dom';

const NotFound = () => {
  return (
    <div className="home-container">
      <div className="home-card not-found-card">
        <div className="not-found-content">
          <h1 className="not-found-title">404</h1>
          <h2>🔍 Page Not Found</h2>
          <p>
            Oops! The page you're looking for doesn't exist. 
            It might have been moved, deleted, or you entered the wrong URL.
          </p>
          
          <div className="not-found-suggestions">
            <h3>What you can do:</h3>
            <ul>
              <li>Check the URL for any typos</li>
              <li>Go back to the previous page</li>
              <li>Visit our homepage</li>
              <li>Use the navigation menu</li>
            </ul>
          </div>
          
          <div className="not-found-actions">
            <Link to="/dashboard" className="btn">
              🏠 Go to Dashboard
            </Link>
            <button 
              onClick={() => window.history.back()} 
              className="btn btn-secondary"
            >
              ← Go Back
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default NotFound;
