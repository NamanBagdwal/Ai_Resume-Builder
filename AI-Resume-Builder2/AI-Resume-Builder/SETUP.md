# AI Resume Builder - Complete Setup Guide

This guide will help you set up and run the AI Resume Builder application (both frontend and backend).

## System Requirements

- **Node.js** v14 or higher
- **npm** or yarn
- **MongoDB** (local installation or MongoDB Atlas account)
- A modern web browser

## Project Structure

```
AI-Resume-Builder/
├── src/                    # React frontend
│   ├── components/         # Reusable UI components
│   ├── context/            # Auth and Resume context
│   ├── pages/              # Page components
│   ├── services/           # API service layer
│   ├── styles/             # CSS styling
│   ├── App.jsx
│   └── main.jsx
├── backend/                # Node.js/Express API
│   ├── config/             # Database configuration
│   ├── middleware/         # Auth middleware
│   ├── models/             # MongoDB schemas
│   ├── routes/             # API endpoints
│   └── server.js
├── package.json            # Frontend dependencies
└── vite.config.js          # Vite configuration
```

## Installation Steps

### Step 1: MongoDB Setup

**Option A: Local MongoDB**
1. Download MongoDB Community Edition from https://www.mongodb.com/try/download/community
2. Install and start MongoDB
3. Default connection: `mongodb://localhost:27017/ai-resume-builder`

**Option B: MongoDB Atlas (Cloud)**
1. Create a free account at https://www.mongodb.com/cloud/atlas
2. Create a database cluster
3. Get connection string: `mongodb+srv://username:password@cluster.mongodb.net/ai-resume-builder`

### Step 2: Frontend Setup

1. Navigate to the project root:
```bash
cd c:\AI-Resume-Builder
```

2. Install frontend dependencies:
```bash
npm install
```

3. Start the development server:
```bash
npm run dev
```

The frontend will be available at `http://localhost:3001`

### Step 3: Backend Setup

1. Navigate to the backend directory:
```bash
cd backend
```

2. Install backend dependencies:
```bash
npm install
```

3. Configure environment variables:
   - Open `.env` file
   - Update settings (see Backend Configuration below)

4. Start the backend server:
```bash
npm run dev
```

The backend will be available at `http://localhost:5000`

## Backend Configuration (.env)

Create or update `backend/.env` file:

```env
# Server
PORT=5000
NODE_ENV=development

# Database
MONGODB_URI=mongodb://localhost:27017/ai-resume-builder

# JWT
JWT_SECRET=your_super_secret_jwt_key_here_change_in_production

# Claude API (optional)
CLAUDE_API_KEY=your_claude_api_key_here

# Frontend URL
FRONTEND_URL=http://localhost:3001
```

**⚠️ Important Security Notes:**
- Change `JWT_SECRET` to a random, secure string in production
- Never commit `.env` file to version control
- Keep API key safe and rotate regularly

## Running the Application

### Option 1: Separate Terminals (Recommended for Development)

**Terminal 1 - Backend:**
```bash
cd backend
npm run dev
```

**Terminal 2 - Frontend:**
```bash
npm run dev
```

### Option 2: Using NPM Scripts

From the root directory:
```bash
# Start both (requires both servers running)
npm run dev
```

## Verifying Installation

### Check Backend
```bash
# Should return 200 OK
curl http://localhost:5000/api/health
```

### Check Frontend
Open `http://localhost:3001` in your browser. You should see the landing page.

## Testing the Application

1. **Sign Up**
   - Go to http://localhost:3001/signup
   - Create an account with any email/password
   - You'll be redirected to the dashboard

2. **Create Resume**
   - Click "New Resume"
   - Enter a resume title (e.g., "Software Engineer")
   - Click "Create"

3. **Edit Resume**
   - Click "Edit Resume" on the created resume
   - Fill in your information in various sections
   - Click "Save" to save changes
   - Click "Preview" to see the live preview

4. **Dashboard Features**
   - Duplicate a resume (Copy button)
   - Delete a resume (Trash button)
   - Edit existing resumes

## Available Scripts

### Frontend
```bash
npm run dev        # Start dev server
npm run build      # Build for production
npm run preview    # Preview production build
```

### Backend
```bash
npm run dev        # Start with nodemon (auto-reload)
npm start          # Start server
```

## API Documentation

### Authentication
- **POST** `/api/auth/signup` - Register new user
- **POST** `/api/auth/login` - Login user
- **GET** `/api/auth/me` - Get current user

### Resumes
- **GET** `/api/resumes` - List all resumes
- **POST** `/api/resumes` - Create new resume
- **GET** `/api/resumes/:id` - Get specific resume
- **PUT** `/api/resumes/:id` - Update resume
- **DELETE** `/api/resumes/:id` - Delete resume
- **POST** `/api/resumes/:id/duplicate` - Duplicate resume

See `backend/README.md` for detailed API documentation.

## Troubleshooting

### Port Already in Use
```bash
# Find process using port 3001 (Windows)
netstat -ano | findstr :3001

# Find process using port 5000 (Windows)
netstat -ano | findstr :5000

# Kill process (replace PID with actual ID)
taskkill /PID <PID> /F
```

### MongoDB Connection Error
```
ERROR: connect ECONNREFUSED 127.0.0.1:27017
```
- Ensure MongoDB is running
- Check `.env` MONGODB_URI is correct
- For Atlas: verify IP whitelist and credentials

### CORS Errors
- Ensure `FRONTEND_URL` in `.env` matches your frontend URL
- Default: `http://localhost:3001`

### Token Errors
- Clear localStorage: `localStorage.clear()` in browser console
- Log out and log back in
- Check that JWT_SECRET is consistent

### Changes Not Showing
- Clear browser cache (Ctrl+Shift+Delete)
- Hard reload (Ctrl+F5)
- Check browser console for errors (F12)

## Next Steps

### Add AI Features
1. Sign up for Claude API at https://console.anthropic.com
2. Add API key to `.env`
3. Implement AI suggestion endpoints

### Production Deployment

**Frontend (Vercel):**
```bash
npm run build
# Deploy `dist` folder to Vercel
```

**Backend (Heroku, Railway, or AWS):**
```bash
# Update environment variables on hosting platform
git push heroku main
```

### Database Backups
- Enable automatic backups in MongoDB Atlas
- Regular export/import for local databases

### Performance Optimization
- Add caching layers
- Implement lazy loading
- Optimize images
- Add request rate limiting

## Support & Resources

- **Vite Documentation**: https://vitejs.dev
- **React Documentation**: https://react.dev
- **Express Documentation**: https://expressjs.com
- **MongoDB Documentation**: https://docs.mongodb.com
- **JWT.io**: https://jwt.io

## License

MIT
