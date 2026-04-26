# 🚀 Anti-Gravity: Student Study Analytics

Anti-Gravity is a premium, glassmorphic MERN application designed to help students track their study habits with precision. It features a high-performance analytics dashboard, a weekly momentum tracker, and an AI-powered tutor.

## ✨ Features

- **Orbital Dashboard**: A sleek, dark-mode interface with glassmorphic elements.
- **Weekly Momentum**: Interactive bar charts showing your study consistency over the last 7 days.
- **Core Distribution**: Daily breakdown of subjects studied, accessible by clicking any day in the momentum chart.
- **AI Tutor**: Integrated Gemini-powered assistant to help with academic queries.
- **Study Streak**: Gamified streak system to encourage daily focus.
- **Secure Auth**: JWT-based authentication for personal study data.

## 🛠️ Tech Stack

- **Frontend**: React 19, Tailwind CSS, Recharts, Lucide Icons.
- **Backend**: Node.js, Express 5, Mongoose.
- **Database**: MongoDB Atlas (with local Memory Server fallback).
- **AI**: Google Gemini API.

## ⚙️ Setup

1. **Clone and Install**:
   ```bash
   cd backend && npm install
   cd ../frontend && npm install
   ```

2. **Environment Variables**:
   Create a `.env` file in the `backend` directory:
   ```env
   PORT=5000
   MONGO_URI=your_mongodb_uri
   JWT_SECRET=your_secret
   GEMINI_API_KEY=your_api_key
   ```

3. **Run Locally**:
   - Backend: `npm run dev`
   - Frontend: `npm run dev`

---
*Created with ❤️ for the Anti-Gravity project.*
