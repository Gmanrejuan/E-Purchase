# MERN Stack Authentication App

A complete full-stack web application built with MongoDB, Express.js, React, and Node.js featuring user authentication with JWT tokens.

## 🚀 Features

- **User Registration**: Create new accounts with email and password
- **User Login**: Secure authentication with JWT tokens
- **Password Security**: Passwords are hashed using bcrypt
- **Protected Routes**: Home page accessible only to authenticated users
- **Session Management**: Token-based authentication with automatic logout
- **Responsive Design**: Modern and mobile-friendly UI
- **Error Handling**: Comprehensive error messages and validation

## 🛠️ Tech Stack

### Frontend
- **React** - User interface
- **React Router** - Client-side routing
- **Axios** - HTTP requests
- **CSS3** - Styling with gradients and animations

### Backend
- **Node.js** - Server runtime
- **Express.js** - Web framework
- **MongoDB** - Database
- **Mongoose** - ODM for MongoDB
- **JWT** - Authentication tokens
- **bcryptjs** - Password hashing
- **CORS** - Cross-origin resource sharing

## 📁 Project Structure

```
Demo Project/
├── client/                 # React frontend
│   ├── public/
│   │   └── index.html
│   ├── src/
│   │   ├── pages/
│   │   │   ├── Login.js
│   │   │   ├── Signup.js
│   │   │   └── Home.js
│   │   ├── components/
│   │   ├── App.js
│   │   ├── index.js
│   │   └── index.css
│   └── package.json
├── server/                 # Node.js backend
│   ├── models/
│   │   └── User.js
│   ├── routes/
│   │   └── auth.js
│   ├── middleware/
│   │   └── authMiddleware.js
│   ├── server.js
│   ├── .env
│   └── package.json
└── README.md
```

## 🔧 Installation & Setup

### Prerequisites
- Node.js (v14 or higher)
- MongoDB (local installation or MongoDB Atlas)
- npm or yarn package manager

### 1. Clone the Repository
```bash
# If you're starting fresh, create the project directory
mkdir mern-auth-app
cd mern-auth-app
```

### 2. Backend Setup
```bash
# Navigate to server directory
cd server

# Install dependencies
npm install

# Start MongoDB (if using local installation)
# For macOS with Homebrew:
brew services start mongodb-community

# For Ubuntu/Linux:
sudo systemctl start mongod

# Start the server
npm run dev
```

The server will run on `http://localhost:5000`

### 3. Frontend Setup
```bash
# Open a new terminal and navigate to client directory
cd client

# Install dependencies
npm install

# Start the React development server
npm start
```

The React app will run on `http://localhost:3000`

### 4. Environment Variables

The server uses the following environment variables (already configured in `.env`):

```env
PORT=5000
MONGODB_URI=mongodb://localhost:27017/mern-auth
JWT_SECRET=your-super-secret-jwt-key-here-change-this-in-production
```

**Important**: Change the `JWT_SECRET` to a secure random string in production!

## 🎯 Usage

1. **Start both servers** (backend on :5000, frontend on :3000)
2. **Open your browser** and navigate to `http://localhost:3000`
3. **Create an account** by clicking "Sign up here" and filling out the form
4. **Login** with your credentials
5. **Access the protected home page** after successful authentication
6. **Logout** when done

## 🔐 Authentication Flow

1. **Signup**: User creates account → Password hashed → JWT token generated → User logged in
2. **Login**: User provides credentials → Password verified → JWT token generated → User logged in
3. **Protected Routes**: JWT token verified on each request to protected endpoints
4. **Logout**: Token removed from client storage

## 🌐 API Endpoints

### Authentication Routes (`/api/auth`)

| Method | Endpoint | Description | Access |
|--------|----------|-------------|---------|
| POST | `/signup` | Register new user | Public |
| POST | `/login` | Login user | Public |
| GET | `/me` | Get current user | Private |

### Request/Response Examples

**Signup/Login Response:**
```json
{
  "message": "Login successful",
  "token": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9...",
  "user": {
    "id": "64f7b1a2c8e5d1234567890a",
    "name": "John Doe",
    "email": "john@example.com"
  }
}
```

## 🛡️ Security Features

- **Password Hashing**: bcrypt with salt rounds
- **JWT Authentication**: Secure token-based auth
- **Input Validation**: Server-side validation for all inputs
- **Error Handling**: Secure error messages that don't expose sensitive info
- **CORS Configuration**: Proper cross-origin setup

## 🎨 UI Features

- **Modern Design**: Gradient backgrounds and smooth animations
- **Responsive Layout**: Works on desktop and mobile devices
- **Form Validation**: Real-time validation with error messages
- **Loading States**: Visual feedback during API calls
- **Toast Messages**: Success and error notifications

## 📱 Screenshots

The application features:
- Clean, modern login and signup forms
- Protected dashboard with user information
- Responsive design that works on all devices
- Professional color scheme with gradients

## 🚀 Deployment

### Backend Deployment (Heroku, Railway, etc.)
1. Set environment variables in your hosting platform
2. Ensure MongoDB Atlas is configured for production
3. Update CORS settings for your frontend domain

### Frontend Deployment (Netlify, Vercel, etc.)
1. Update API base URL in App.js to your deployed backend
2. Build the project: `npm run build`
3. Deploy the build folder

## 🤝 Contributing

1. Fork the repository
2. Create a feature branch
3. Make your changes
4. Test thoroughly
5. Submit a pull request

## 📝 License

This project is open source and available under the [MIT License](LICENSE).

## 🆘 Troubleshooting

### Common Issues

**MongoDB Connection Error:**
- Ensure MongoDB is running locally or check your Atlas connection string
- Verify the MONGODB_URI in your .env file

**CORS Errors:**
- Check that the proxy is configured correctly in client/package.json
- Ensure the backend server is running on port 5000

**Authentication Issues:**
- Verify JWT_SECRET is set in the .env file
- Check that tokens are being stored correctly in localStorage

**Module Not Found Errors:**
- Run `npm install` in both client and server directories
- Delete node_modules and package-lock.json, then reinstall

## 📞 Support

If you encounter any issues or have questions, please check the troubleshooting section above or create an issue in the repository.

---

**Happy Coding! 🎉**
