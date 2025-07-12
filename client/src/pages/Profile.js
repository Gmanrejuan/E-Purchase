import React, { useState } from 'react';
import axios from 'axios';

const Profile = ({ user, onUserUpdate }) => {
  const [formData, setFormData] = useState({
    name: user?.name || '',
    email: user?.email || ''
  });
  const [isEditing, setIsEditing] = useState(false);
  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState('');
  const [error, setError] = useState('');

  const { name, email } = formData;

  const onChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const onSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError('');
    setMessage('');

    try {
      const token = localStorage.getItem('token');
      const response = await axios.put('/api/auth/profile', {
        name,
        email
      }, {
        headers: { Authorization: `Bearer ${token}` }
      });

      onUserUpdate(response.data.user);
      setMessage('Profile updated successfully!');
      setIsEditing(false);
    } catch (error) {
      setError(error.response?.data?.message || 'Update failed');
    } finally {
      setLoading(false);
    }
  };

  const handleCancel = () => {
    setFormData({
      name: user?.name || '',
      email: user?.email || ''
    });
    setIsEditing(false);
    setError('');
    setMessage('');
  };

  return (
    <div className="home-container">
      <div className="home-card">
        <h1>👤 User Profile</h1>
        
        {message && <div className="success-message">{message}</div>}
        {error && <div className="error-message">{error}</div>}
        
        <form onSubmit={onSubmit} className="profile-form">
          <div className="user-info">
            <div className="form-group">
              <label htmlFor="name">Full Name</label>
              <input
                type="text"
                id="name"
                name="name"
                value={name}
                onChange={onChange}
                disabled={!isEditing}
                required
                className={!isEditing ? 'disabled-input' : ''}
              />
            </div>
            
            <div className="form-group">
              <label htmlFor="email">Email Address</label>
              <input
                type="email"
                id="email"
                name="email"
                value={email}
                onChange={onChange}
                disabled={!isEditing}
                required
                className={!isEditing ? 'disabled-input' : ''}
              />
            </div>
            
            <div className="form-group">
              <label>User ID</label>
              <input
                type="text"
                value={user?.id || ''}
                disabled
                className="disabled-input"
              />
            </div>
            
            <div className="form-group">
              <label>Member Since</label>
              <input
                type="text"
                value={user?.createdAt ? new Date(user.createdAt).toLocaleDateString() : 'N/A'}
                disabled
                className="disabled-input"
              />
            </div>
          </div>
          
          <div className="profile-actions">
            {!isEditing ? (
              <button 
                type="button" 
                onClick={() => setIsEditing(true)}
                className="btn"
              >
                ✏️ Edit Profile
              </button>
            ) : (
              <div className="edit-actions">
                <button 
                  type="submit" 
                  className="btn"
                  disabled={loading}
                >
                  {loading ? 'Saving...' : '💾 Save Changes'}
                </button>
                <button 
                  type="button" 
                  onClick={handleCancel}
                  className="btn btn-secondary"
                  disabled={loading}
                >
                  ❌ Cancel
                </button>
              </div>
            )}
          </div>
        </form>
      </div>
    </div>
  );
};

export default Profile;
