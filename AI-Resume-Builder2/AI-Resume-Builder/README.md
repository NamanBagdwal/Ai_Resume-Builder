# 🚀 AI Resume Builder

A comprehensive, AI-powered resume builder application built with React, Node.js, Express, and MongoDB. Create, customize, and export professional resumes with AI-powered suggestions and ATS optimization.

## ✨ Features

### Core Features
✅ **Smart Resume Builder**
- Drag-and-drop section editor (Experience, Skills, Education, Projects)
- Real-time live preview with professional templates
- AI-powered content suggestions as you type

✅ **AI-Powered Enhancements**
- Bullet point optimizer - Paste weak points, get strong action-verb rewrites
- Skills gap analyzer - Compare resume to job description
- ATS Score Checker - Simulate Applicant Tracking System scoring
- Job-specific tailoring - Auto-adjust resume content for specific jobs

✅ **Job Description Matcher**
- Paste any job description and get a match % score
- Highlights missing skills/keywords
- Suggests edits to improve match rate

✅ **Resume Versioning**
- Save multiple versions (e.g., "SDE Resume", "Data Analyst Resume")
- Track changes between versions
- One-click export to PDF

✅ **User Authentication**
- Secure sign up and login with JWT
- Session management
- Protected routes

✅ **Dashboard**
- View all saved resumes
- Create, edit, duplicate, and delete resumes
- Version history tracking

## 🛠️ Tech Stack

| Layer | Technology | Usage |
|-------|-----------|-------|
| **Frontend** | React.js + Vite | Resume editor UI, live preview, dashboards |
| **Backend** | Node.js + Express | API routes, AI integration, authentication |
| **Database** | MongoDB | User accounts, resume data, version history |
| **Authentication** | JWT | Secure user authentication |
| **AI** | Claude API | Suggestions, rewriting, scoring (optional) |
| **Styling** | CSS3 | Responsive design |

## 📋 Pages & Screens

- ✅ **Landing Page** - Hero section with feature highlights
- ✅ **Auth Pages** - Sign up / Login (JWT-based)
- ✅ **Dashboard** - All saved resumes + version history
- ✅ **Resume Editor** - Live builder with AI sidebar
- ⏳ **Job Match Analyzer** - JD input + match results
- ⏳ **Export & Share** - PDF download, shareable links

## 🚀 Quick Start

### Prerequisites
- Node.js v14+
- MongoDB (local or Atlas)
- npm or yarn

### Installation

1. **Clone/Setup the repository**
```bash
cd c:\AI-Resume-Builder
```

2. **Install frontend dependencies**
```bash
npm install
```

3. **Setup backend**
```bash
cd backend
npm install
```

4. **Configure environment variables**
   - Copy `backend/.env` and update:
   ```env
   PORT=5000
   MONGODB_URI=mongodb://localhost:27017/ai-resume-builder
   JWT_SECRET=your_secret_key_here
   FRONTEND_URL=http://localhost:3001
   ```

5. **Start frontend** (Terminal 1)
```bash
npm run dev
```

6. **Start backend** (Terminal 2)
```bash
cd backend
npm run dev
```

7. **Open in browser**
   - Frontend: http://localhost:3001
   - Backend API: http://localhost:5000/api

See [SETUP.md](./SETUP.md) for detailed setup instructions.

## 📁 Project Structure

```
AI-Resume-Builder/
├── src/
│   ├── components/
│   │   ├── Header.jsx
│   │   ├── Hero.jsx
│   │   ├── Features.jsx
│   │   ├── HowItWorks.jsx
│   │   ├── Testimonials.jsx
│   │   ├── Pricing.jsx
│   │   ├── CTA.jsx
│   │   └── Footer.jsx
│   ├── context/
│   │   ├── AuthContext.jsx (JWT authentication)
│   │   └── ResumeContext.jsx (Resume management)
│   ├── pages/
│   │   ├── LandingPage.jsx
│   │   ├── LoginPage.jsx
│   │   ├── SignUpPage.jsx
│   │   ├── DashboardPage.jsx
│   │   └── ResumeEditorPage.jsx
│   ├── services/
│   │   └── api.js (API client)
│   ├── styles/
│   │   ├── landing.css
│   │   ├── auth.css
│   │   ├── dashboard.css
│   │   ├── editor.css
│   │   └── index.css
│   ├── App.jsx
│   └── main.jsx
├── backend/
│   ├── config/
│   │   └── db.js
│   ├── middleware/
│   │   └── auth.js
│   ├── models/
│   │   ├── User.js
│   │   └── Resume.js
│   ├── routes/
│   │   ├── auth.js
│   │   └── resumes.js
│   ├── server.js
│   ├── .env
│   ├── package.json
│   └── README.md
├── package.json
├── vite.config.js
├── SETUP.md
└── README.md
```

## 🔐 API Endpoints

### Authentication (`/api/auth`)
- `POST /signup` - Register new user
- `POST /login` - Login user
- `GET /me` - Get current user (protected)

### Resumes (`/api/resumes`)
- `GET /` - List all user resumes (protected)
- `POST /` - Create new resume (protected)
- `GET /:id` - Get specific resume (protected)
- `PUT /:id` - Update resume (protected)
- `DELETE /:id` - Delete resume (protected)
- `POST /:id/duplicate` - Duplicate resume (protected)

## 🔑 Key Components

### Frontend Context & State Management
- **AuthContext** - User authentication, login/logout
- **ResumeContext** - Resume CRUD operations, API integration
- **API Service** - Centralized axios instance with token injection

### Resume Data Structure
```javascript
{
  _id: ObjectId,
  userId: ObjectId,
  title: String,
  personalInfo: {
    fullName: String,
    email: String,
    phone: String,
    location: String,
    linkedin: String
  },
  summary: String,
  experience: [{
    position: String,
    company: String,
    startDate: String,
    endDate: String,
    currentlyWorking: Boolean,
    description: String
  }],
  education: [{
    degree: String,
    field: String,
    school: String,
    graduationDate: String
  }],
  skills: [{
    category: String,
    items: [String]
  }],
  projects: [{
    title: String,
    description: String,
    technologies: [String],
    link: String
  }],
  versions: Array,
  createdAt: Date,
  updatedAt: Date
}
```

## 🔄 State Flow

```
User Login/Signup
    ↓
AuthContext stores JWT token + user info
    ↓
Protected routes check auth status
    ↓
ResumeContext fetches resumes from API
    ↓
Resume editor updates data locally
    ↓
Save triggers API update + MongoDB persistence
```

## 🔒 Security Features
- Password hashing with bcryptjs
- JWT-based authentication
- Protected API routes
- Secure token storage in localStorage
- CORS configuration for frontend-backend communication

## 📱 Responsive Design
- Mobile-first approach
- Responsive grid layouts
- Mobile navigation menu
- Touch-friendly buttons
- Optimized for all screen sizes

## 🎯 Next Steps / Roadmap

- [ ] Claude API integration for AI suggestions
- [ ] ATS score calculation algorithm
- [ ] Advanced job match analyzer
- [ ] PDF export with professional templates
- [ ] Email verification
- [ ] Password reset functionality
- [ ] User profile management
- [ ] Resume sharing with unique links
- [ ] Collaborative editing
- [ ] Template variations
- [ ] Import from LinkedIn
- [ ] Dark mode

## 🤝 Contributing

This is a personal project. Feel free to fork and customize it for your needs!

## 📄 License

MIT

## 📞 Support

For detailed setup instructions, see [SETUP.md](./SETUP.md)  
For backend API documentation, see [backend/README.md](./backend/README.md)

---

**Built with ❤️ for job seekers everywhere**

### Prerequisites

- Node.js 16+ and npm or yarn

### Installation

1. **Install dependencies:**
   ```bash
   npm install
   ```

2. **Start the development server:**
   ```bash
   npm run dev
   ```
   The app will open at `http://localhost:3000`

3. **Build for production:**
   ```bash
   npm run build
   ```

4. **Preview the production build:**
   ```bash
   npm run preview
   ```

## Component Overview

### Landing Page Sections

1. **Header** - Navigation bar with logo and CTA buttons
2. **Hero** - Main headline with stats and call-to-action
3. **Features** - 6 core features with icons and descriptions
4. **How It Works** - 4-step process overview
5. **Testimonials** - 3 user testimonials with ratings
6. **Pricing** - 3 tier pricing plans
7. **CTA** - Final call-to-action section
8. **Footer** - Links and legal information

## Customization

### Colors & Branding

Edit the CSS variables in `src/index.css`:
```css
:root {
  --primary-color: #6366f1;        /* Change primary color */
  --secondary-color: #06b6d4;      /* Change secondary color */
  --dark-color: #1f2937;           /* Change dark text color */
  /* ... more variables ... */
}
```

### Content

Edit component files in `src/components/` to customize:
- Feature descriptions and icons
- Testimonials and user quotes
- Pricing plans and features
- Navigation links

## Next Steps

1. **Implement Authentication**
   - Create sign up/login pages
   - Set up JWT auth with backend

2. **Build Resume Editor**
   - Interactive resume editor component
   - Drag-and-drop sections
   - Real-time preview

3. **Connect to Backend**
   - Set up Node.js/Express API
   - Create database models
   - Implement Claude API integration

4. **Add Features**
   - Job description upload
   - ATS score calculation
   - Resume tailoring engine

## API Integration (Coming Soon)

The app will integrate with:
- **Claude API** - For AI suggestions and rewriting
- **PDF Export** - Using Puppeteer or jsPDF
- **Job Database** - For job matching features

## Contributing

Contributions are welcome! Please feel free to submit a Pull Request.

## License

MIT License - feel free to use this project for your own resume builder.

## Support

For support, email support@resumeai.com or open an issue in the repository.
