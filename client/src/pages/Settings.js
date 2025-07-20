import React, { useState } from 'react';

const Settings = ({ user }) => {
  const [settings, setSettings] = useState({
    emailNotifications: true,
    pushNotifications: false,
    theme: 'light',
    language: 'en',
    autoLogout: 30
  });
  const [message, setMessage] = useState('');

  const handleSettingChange = (setting, value) => {
    setSettings(prev => ({
      ...prev,
      [setting]: value
    }));
  };

  const handleSave = () => {
    // In a real app, you would save these to the backend
    setMessage('Settings saved successfully!');
    setTimeout(() => setMessage(''), 3000);
  };

  const handleReset = () => {
    setSettings({
      emailNotifications: true,
      pushNotifications: false,
      theme: 'light',
      language: 'en',
      autoLogout: 30
    });
    setMessage('Settings reset to defaults!');
    setTimeout(() => setMessage(''), 3000);
  };

  return (
    <div className="home-container">
      <div className="home-card">
        <h1>⚙️ Settings</h1>
        <p>Customize your application preferences</p>
        
        {message && <div className="success-message">{message}</div>}
        
        <div className="settings-sections">
          <div className="settings-section">
            <h3>🔔 Notifications</h3>
            <div className="setting-item">
              <label className="setting-label">
                <input
                  type="checkbox"
                  checked={settings.emailNotifications}
                  onChange={(e) => handleSettingChange('emailNotifications', e.target.checked)}
                />
                Email Notifications
              </label>
              <p className="setting-description">Receive email updates about your account</p>
            </div>
            
            <div className="setting-item">
              <label className="setting-label">
                <input
                  type="checkbox"
                  checked={settings.pushNotifications}
                  onChange={(e) => handleSettingChange('pushNotifications', e.target.checked)}
                />
                Push Notifications
              </label>
              <p className="setting-description">Get push notifications in your browser</p>
            </div>
          </div>
          
          <div className="settings-section">
            <h3>🎨 Appearance</h3>
            <div className="setting-item">
              <label className="setting-label">Theme</label>
              <select
                value={settings.theme}
                onChange={(e) => handleSettingChange('theme', e.target.value)}
                className="setting-select"
              >
                <option value="light">Light</option>
                <option value="dark">Dark</option>
                <option value="auto">Auto</option>
              </select>
              <p className="setting-description">Choose your preferred color theme</p>
            </div>
          </div>
          
          <div className="settings-section">
            <h3>🌍 Language & Region</h3>
            <div className="setting-item">
              <label className="setting-label">Language</label>
              <select
                value={settings.language}
                onChange={(e) => handleSettingChange('language', e.target.value)}
                className="setting-select"
              >
                <option value="en">English</option>
                <option value="es">Español</option>
                <option value="fr">Français</option>
                <option value="de">Deutsch</option>
              </select>
              <p className="setting-description">Select your preferred language</p>
            </div>
          </div>
          
          <div className="settings-section">
            <h3>🔒 Security</h3>
            <div className="setting-item">
              <label className="setting-label">Auto Logout (minutes)</label>
              <select
                value={settings.autoLogout}
                onChange={(e) => handleSettingChange('autoLogout', parseInt(e.target.value))}
                className="setting-select"
              >
                <option value={15}>15 minutes</option>
                <option value={30}>30 minutes</option>
                <option value={60}>1 hour</option>
                <option value={120}>2 hours</option>
                <option value={0}>Never</option>
              </select>
              <p className="setting-description">Automatically log out after inactivity</p>
            </div>
          </div>
        </div>
        
        <div className="settings-actions">
          <button onClick={handleSave} className="btn">
            💾 Save Settings
          </button>
          <button onClick={handleReset} className="btn btn-secondary">
            🔄 Reset to Defaults
          </button>
        </div>
      </div>
    </div>
  );
};

export default Settings;
