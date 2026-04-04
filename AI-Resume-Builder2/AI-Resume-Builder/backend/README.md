# AI Resume Builder - Backend API

This is the Node.js/Express backend for the AI Resume Builder application. It provides RESTful API endpoints for user authentication, resume management, and other core features.

## Tech Stack

- **Node.js** - JavaScript runtime
- **Express** - Web framework
- **MongoDB** - Database (using Mongoose ODM)
- **JWT** - User authentication
- **bcryptjs** - Password hashing

## Installation

### Prerequisites
- Node.js (v14 or higher)
- MongoDB (running locally or Atlas connection string)
- npm or yarn

### Setup Steps

1. Navigate to the backend directory:
```bash
cd backend
```

2. Install dependencies:
```bash
npm install
```

3. Configure environment variables:
   - Open `.env` file
   - Update `MONGODB_URI` with your MongoDB connection string
   - Update `JWT_SECRET` with a secure key
   - Update `CLAUDE_API_KEY` with your Claude API key
   - Update `FRONTEND_URL` if running on a different port

**Default .env values:**
```
PORT=5000
MONGODB_URI=mongodb://localhost:27017/ai-resume-builder
JWT_SECRET=your_jwt_secret_key_change_this_in_production
CLAUDE_API_KEY=your_claude_api_key_here
NODE_ENV=development
FRONTEND_URL=http://localhost:3001
```

## Running the Server

### Development Mode (with auto-reload)
```bash
npm run dev
```

### Production Mode
```bash
npm start
```

The server will start on `http://localhost:5000` (or the port specified in .env)

## API Endpoints

### Authentication Routes (`/api/auth`)

**POST /signup** - Create a new user account
```json
{
  "name": "John Doe",
  "email": "john@example.com",
  "password": "password123"
}
```

**POST /login** - Login user
```json
{
  "email": "john@example.com",
  "password": "password123"
}
```

**GET /me** - Get current user (requires authentication)

### Resume Routes (`/api/resumes`)

**GET /** - Get all resumes for the user (requires authentication)

**GET /:id** - Get a specific resume (requires authentication)

**POST /** - Create a new resume (requires authentication)
```json
{
  "title": "Software Engineer Resume"
}
```

**PUT /:id** - Update a resume (requires authentication)
```json
{
  "personalInfo": { ... },
  "summary": "...",
  "experience": [ ... ],
  "education": [ ... ],
  "skills": [ ... ],
  "projects": [ ... ]
}
```

**DELETE /:id** - Delete a resume (requires authentication)

**POST /:id/duplicate** - Duplicate a resume (requires authentication)

## Authentication

The API uses JWT (JSON Web Tokens) for authentication. Include the token in the Authorization header:

```
Authorization: Bearer <your_jwt_token>
```

Tokens expire after 30 days.

## Project Structure

```
backend/
├── config/
│   └── db.js                 # MongoDB connection
├── middleware/
│   └── auth.js              # JWT authentication middleware
├── models/
│   ├── User.js              # User schema
│   └── Resume.js            # Resume schema
├── routes/
│   ├── auth.js              # Authentication endpoints
│   └── resumes.js           # Resume CRUD endpoints
├── .env                      # Environment variables
├── .gitignore               # Git ignore file
├── package.json             # Dependencies
└── server.js                # Main server file
```

## Database Models

### User Model
- `name` - User's full name
- `email` - User's email (unique)
- `password` - Hashed password
- `createdAt` - Account creation timestamp
- `updatedAt` - Last update timestamp

### Resume Model
- `userId` - Reference to User
- `title` - Resume title
- `personalInfo` - Contact information
- `summary` - Professional summary
- `experience` - Work experience array
- `education` - Education array
- `skills` - Skills array
- `projects` - Projects array
- `atsScore` - ATS compatibility score
- `versions` - Version history array
- `createdAt` - Creation timestamp
- `updatedAt` - Last update timestamp

## Error Handling

The API returns appropriate HTTP status codes:
- **200** - Success
- **201** - Created
- **400** - Bad Request
- **401** - Unauthorized
- **403** - Forbidden
- **404** - Not Found
- **500** - Server Error

## Future Features

- [ ] Claude API integration for AI suggestions
- [ ] ATS score calculation
- [ ] Job description matching
- [ ] PDF export functionality
- [ ] Email verification
- [ ] Password reset
- [ ] Rate limiting
- [ ] Request logging

## Troubleshooting

### MongoDB Connection Error
- Ensure MongoDB is running on your system
- Check the `MONGODB_URI` in .env
- For MongoDB Atlas, make sure your IP is whitelisted

### Port Already in Use
- Change the `PORT` in .env
- Or kill the process using the port

### Authentication Errors
- Ensure token is included in the Authorization header
- Check that token hasn't expired
- Verify JWT_SECRET matches between login and API calls

## Contributing

When adding new features:
1. Create appropriate models in `/models`
2. Add routes in `/routes`
3. Use the auth middleware for protected routes
4. Handle errors gracefully
5. Update this README

## License

MIT
