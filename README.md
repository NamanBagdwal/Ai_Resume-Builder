# 🚀 AI Resume Builder

An intelligent **MERN Stack** based Resume Builder that helps users create, enhance, and download professional resumes with the power of AI.

---

## 🌟 Features

* 🔐 **Authentication System**

  * User Signup & Login (JWT आधारित)
  * Secure password hashing using bcrypt

* 📄 **Resume Management**

  * Create, edit, update, delete resumes
  * Multiple resume templates

* 🤖 **AI-Powered Enhancements**

  * AI-based content improvement
  * Smart skill suggestions
  * Better phrasing for professional resumes

* 📥 **Download Feature**

  * Export resume as PDF

* 🎨 **Modern UI**

  * Clean and responsive React frontend
  * User-friendly interface

---

## 🛠️ Tech Stack

### Frontend:

* React.js
* Axios
* React Router
* CSS

### Backend:

* Node.js
* Express.js
* MongoDB (Mongoose)

### Other:

* JWT Authentication
* bcryptjs
* AI Integration (for content enhancement)

---

## 📂 Project Structure

AI-Resume-Builder/
│── backend/
│   ├── models/
│   ├── routes/
│   ├── controllers/
│   ├── config/
│   └── server.js
│
│── frontend/
│   ├── components/
│   ├── pages/
│   ├── context/
│   └── api/
│
│── README.md

---

## ⚙️ Installation & Setup

### 1️⃣ Clone the repository

```bash
git clone https://github.com/NamanBagdwal/Ai_Resume-Builder.git
cd Ai_Resume-Builder
```

---

### 2️⃣ Backend Setup

```bash
cd backend
npm install
```

Create `.env` file:

```env
PORT=5000
MONGO_URI=your_mongodb_connection_string
JWT_SECRET=your_secret_key
```

Run backend:

```bash
npm run dev
```

---

### 3️⃣ Frontend Setup

```bash
cd frontend
npm install
npm start
```

---

## 🔑 API Endpoints

### Auth

* POST `/api/auth/signup`
* POST `/api/auth/login`

### Resume

* GET `/api/resumes`
* POST `/api/resumes`
* PUT `/api/resumes/:id`
* DELETE `/api/resumes/:id`

---

## 🚀 Future Improvements

* 📊 More resume templates
* 🌐 Deployment (Vercel + Render)
* 🧠 Better AI models
* 📱 Mobile responsiveness improvements

---

## 🤝 Contributing

Contributions are welcome!
Feel free to fork the repo and submit a PR.

---

## 📬 Contact

👤 **Naman Bagdwal**
GitHub: https://github.com/NamanBagdwal

---

## ⭐ Show Your Support

If you like this project, give it a ⭐ on GitHub!

---
