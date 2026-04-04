# Backend Integration Guide

This document details how the frontend and backend are integrated, and how to work with the API.

## Architecture Overview

```
┌─────────────────────────────────────────────────────────────┐
│                      Frontend (React)                        │
│  ┌──────────────┐        ┌──────────────┐                   │
│  │  Auth Pages  │   →    │ AuthContext  │                   │
│  └──────────────┘        └──────────────┘                   │
│         ↓                       ↓                            │
│  ┌──────────────┐        ┌──────────────┐                   │
│  │  Dashboard   │   →    │ResumeContext │                   │
│  └──────────────┘        └──────────────┘                   │
│         ↓                       ↓                            │
│  ┌──────────────┐        ┌──────────────┐                   │
│  │   Editor     │        │  api.js      │                   │
│  └──────────────┘        └──────────────┘                   │
└──────────────────────────────┼────────────────────────────┐
                               │                            │
                HTTP Requests with JWT Token               │
                               │                            │
┌──────────────────────────────▼────────────────────────────┐
│                    Backend (Express)                       │
│  ┌──────────────┐        ┌──────────────┐                │
│  │  Routes      │   →    │  Controllers │                │
│  └──────────────┘        └──────────────┘                │
│         ↓                       ↓                         │
│  ┌──────────────┐        ┌──────────────┐                │
│  │ Middleware   │   ←    │  Models      │                │
│  │ (Auth, CORS) │        └──────────────┘                │
│  └──────────────┘                ↓                        │
│                          ┌──────────────┐                 │
│                          │   MongoDB    │                 │
│                          └──────────────┘                 │
└────────────────────────────────────────────────────────────┘
```

## API Integration Points

### 1. Authentication Flow

**Signup:**
```javascript
// frontend/src/pages/SignUpPage.jsx
const handleSubmit = async (e) => {
  await signup(name, email, password);  // Calls authAPI.signup()
  // Token saved to localStorage automatically
  navigate('/dashboard');
};

// backend/routes/auth.js - POST /api/auth/signup
- Validates input
- Hashes password with bcrypt
- Creates user in MongoDB
- Returns JWT token
```

**Login:**
```javascript
// frontend/src/pages/LoginPage.jsx
const handleSubmit = async (e) => {
  await login(email, password);  // Calls authAPI.login()
  // Token saved to localStorage automatically
  navigate('/dashboard');
};

// backend/routes/auth.js - POST /api/auth/login
- Finds user by email
- Compares provided password with hashed password
- Returns JWT token
```

### 2. Resume Management Flow

**Create Resume:**
```javascript
// frontend/src/pages/DashboardPage.jsx
const handleCreateResume = async (title) => {
  await createResume(title);  // Calls resumeAPI.createResume()
};

// backend/routes/resumes.js - POST /api/resumes
- Validates title
- Creates new resume with userId
- Initializes empty sections
- Returns created resume with MongoDB _id
```

**Update Resume:**
```javascript
// frontend/src/pages/ResumeEditorPage.jsx
const handleSave = async () => {
  await updateResume(resumeData);  // Calls resumeAPI.updateResume()
};

// backend/routes/resumes.js - PUT /api/resumes/:id
- Saves current version to versions array
- Updates resume with new data
- Persists to MongoDB
- Returns updated resume
```

**Delete Resume:**
```javascript
// frontend/src/pages/DashboardPage.jsx
const handleDeleteResume = async (resumeId) => {
  await deleteResume(resumeId);  // Calls resumeAPI.deleteResume()
};

// backend/routes/resumes.js - DELETE /api/resumes/:id
- Checks ownership (userId match)
- Deletes resume from MongoDB
- Returns success message
```

**Duplicate Resume:**
```javascript
// frontend/src/pages/DashboardPage.jsx
const handleDuplicateResume = async (resume) => {
  await duplicateResume(resume._id);  // Calls resumeAPI.duplicateResume()
};

// backend/routes/resumes.js - POST /api/resumes/:id/duplicate
- Fetches original resume
- Creates copy with new title
- Links to same userId
- Returns new resume
```

## Token Management

### Token Storage
```javascript
// src/services/api.js
// Token stored in localStorage after login
localStorage.setItem('token', response.token);

// Automatically included in all API requests via interceptor
api.interceptors.request.use((config) => {
  const token = localStorage.getItem('token');
  if (token) {
    config.headers.Authorization = `Bearer ${token}`;
  }
  return config;
});
```

### Token Validation
```javascript
// backend/middleware/auth.js
exports.protect = async (req, res, next) => {
  // Extracts token from Authorization header
  // Verifies token signature
  // Decodes to get userId
  // Attaches user to req.user
};
```

## Error Handling

### Frontend Error Handling
```javascript
// Login errors
try {
  await login(email, password);
} catch (err) {
  setError(err.response?.data?.message || 'Login failed');
}

// Resume operation errors
try {
  await createResume(title);
} catch (err) {
  console.error('Failed to create resume:', err);
  alert('Failed to create resume. Please try again.');
}
```

### Backend Error Handling
```javascript
// All routes return standardized responses
{
  "success": true/false,
  "message": "...",
  "data": {...}  // or error details
}

// HTTP Status Codes:
// 200 - OK
// 201 - Created
// 400 - Bad Request
// 401 - Unauthorized
// 403 - Forbidden
// 404 - Not Found
// 500 - Server Error
```

## Context Integration

### AuthContext (`src/context/AuthContext.jsx`)
```javascript
// Uses authAPI for backend calls
const signup = async (name, email, password) => {
  const response = await authAPI.signup(name, email, password);
  localStorage.setItem('token', response.token);
  setUser(response.user);
  return response.user;
};

// Provides to entire app
<AuthProvider>
  <App />
</AuthProvider>
```

### ResumeContext (`src/context/ResumeContext.jsx`)
```javascript
// Uses resumeAPI for backend calls
const createResume = async (title) => {
  const response = await resumeAPI.createResume(title);
  setResumes([...resumes, response.resume]);
  return response.resume;
};

// Listens to user changes
useEffect(() => {
  if (user) {
    fetchResumes();  // Loads user's resumes from API
  }
}, [user]);
```

## Data Flow Example: Creating and Editing a Resume

### Step 1: Navigate to Dashboard
```
User logs in
  ↓
AuthContext stores JWT token
  ↓
Dashboard page loads
  ↓
ResumeContext triggers fetchResumes()
  ↓
GET /api/resumes sends JWT token in header
  ↓
Backend verifies token, gets userId from JWT
  ↓
Query: Resume.find({ userId: decoded.id })
  ↓
Returns all user resumes
  ↓
ResumeContext updates state with resumes
  ↓
Dashboard renders resume cards
```

### Step 2: Click "New Resume"
```
User clicks "New Resume"
  ↓
handleCreateResume() called with title
  ↓
resumeAPI.createResume(title) called (with JWT in header)
  ↓
POST /api/resumes { title: "..." }
  ↓
Backend creates Resume document with userId
  ↓
Returns created resume with MongoDB _id
  ↓
ResumeContext adds to state
  ↓
Dashboard updates UI with new resume
```

### Step 3: Edit Resume
```
User clicks "Edit Resume"
  ↓
handleEditResume(resumeId) called
  ↓
resumeAPI.getResume(resumeId) called
  ↓
GET /api/resumes/:id (with JWT in header)
  ↓
Backend verifies ownership (userId check)
  ↓
Returns resume data
  ↓
ResumeContext sets currentResume
  ↓
Navigate to editor
  ↓
Editor loads with resume data
```

### Step 4: Save Changes
```
User clicks "Save"
  ↓
handleSave() called with updated resumeData
  ↓
resumeAPI.updateResume(resumeId, resumeData) called
  ↓
PUT /api/resumes/:id (with JWT in header, data in body)
  ↓
Backend saves current version to versions array
  ↓
Updates resume with new data
  ↓
Saves to MongoDB
  ↓
Returns updated resume
  ↓
ResumeContext updates state
  ↓
Editor shows "Saved" status
```

## API Client (`src/services/api.js`)

### Configuration
```javascript
const api = axios.create({
  baseURL: 'http://localhost:5000/api',  // Calls backend API
});

// Request interceptor automatically adds JWT token
// All requests include: Authorization: Bearer <token>
```

### Available Methods

**Auth API:**
```javascript
authAPI.signup(name, email, password)     // Register
authAPI.login(email, password)            // Login
authAPI.getCurrentUser()                  // Get current user info
```

**Resume API:**
```javascript
resumeAPI.getAllResumes()                 // List all
resumeAPI.getResume(id)                   // Get one
resumeAPI.createResume(title)             // Create
resumeAPI.updateResume(id, data)          // Update
resumeAPI.deleteResume(id)                // Delete
resumeAPI.duplicateResume(id)             // Duplicate
```

## Environment Configuration

### Frontend
- No .env needed for frontend
- Backend URL hardcoded in src/services/api.js (localhost:5000)

### Backend
```env
# .env file in backend/ directory
PORT=5000                                                    # Server port
MONGODB_URI=mongodb://localhost:27017/ai-resume-builder    # Database URL
JWT_SECRET=your_secret_key                                  # Signing key
CLAUDE_API_KEY=sk-...                                       # Claude API (optional)
NODE_ENV=development                                        # Environment
FRONTEND_URL=http://localhost:3001                          # CORS origin
```

## Debugging Tips

### Check Token
```javascript
// Browser console
localStorage.getItem('token')  // See stored JWT
```

### Decode Token
```javascript
// Use jwt.io or in browser console
const token = localStorage.getItem('token');
const decoded = JSON.parse(atob(token.split('.')[1]));  // Decode middle part
```

### Test API Directly
```bash
# Test signup
curl -X POST http://localhost:5000/api/auth/signup \
  -H "Content-Type: application/json" \
  -d '{"name":"John","email":"john@example.com","password":"password123"}'

# Test get resumes (replace TOKEN)
curl -X GET http://localhost:5000/api/resumes \
  -H "Authorization: Bearer TOKEN"
```

### Monitor Network Requests
1. Open browser DevTools (F12)
2. Go to Network tab
3. Perform actions (login, create resume, etc.)
4. Check request/response headers and body

## Troubleshooting

### "Not authorized to access this route"
- JWT token missing or invalid
- Token expired
- Check: `localStorage.getItem('token')`
- Solution: Sign out (`logout()`) and sign back in

### "MongoDB Connection Error"
- MongoDB not running
- Connection string incorrect in .env
- Authentication failed for Atlas
- Check MongoDB logs

### CORS Error
- Frontend URL doesn't match FRONTEND_URL in .env
- Solution: Update FRONTEND_URL in backend/.env

### Resume data not persisting
- Save button not working?
- Check Network tab in DevTools
- Verify resume _id in URL
- Check backend console for errors

## Future Enhancements

- [ ] Implement AI suggestion endpoints
- [ ] Add ATS score validation
- [ ] Implement job matching algorithm
- [ ] Add resume export to PDF
- [ ] Email notifications
- [ ] Analytics tracking
- [ ] Rate limiting
- [ ] Caching layer
