# Kindred Relief Network (KRN) 🤝

[![Next.js](https://img.shields.io/badge/Next.js-15+-black?style=for-the-badge&logo=next.js)](https://nextjs.org/)
[![Tailwind CSS](https://img.shields.io/badge/Tailwind_CSS-4.0-38B2AC?style=for-the-badge&logo=tailwind-css)](https://tailwindcss.com/)
[![Firebase](https://img.shields.io/badge/Firebase-Auth%20%26%20Firestore-FFCA28?style=for-the-badge&logo=firebase)](https://firebase.google.com/)
[![Gemini AI](https://img.shields.io/badge/Gemini_AI-1.5_Flash-4285F4?style=for-the-badge&logo=google-gemini)](https://ai.google.dev/)

**Kindred Relief Network** is a professional, community-centric platform engineered to streamline disaster relief, volunteer coordination, and mutual aid. It combines real-time situational awareness with intelligent matchmaking to empower communities when they need it most.

---

## 🚀 Key Innovation Pillars

### 🛡️ Community Sentinel (Live Safety Monitoring)
*   **Real-Time Data**: Integrates live feeds from **USGS** and **NOAA** to track environmental risks.
*   **Situational Map**: Interactive Leaflet-based map with custom hazard overlays (Weather, Earthquakes, etc.).
*   **Proactive Alerts**: Notifies community organizers of nearby critical signals before they escalate.

### 🧠 Intelligent Matchmaking
*   **Skill-Based Recommendations**: Proprietary scoring algorithm that matches volunteers to events based on their unique expertise (Medical, Logistics, Technical, etc.).
*   **Match Clarity**: Dynamic "Why it's a match" insights for every recommended event.
*   **Capacity Handling**: Optimized to show up to 6 high-relevance matches at a glance.

### 🔐 Verified Volunteer Ecosystem
*   **Email OTP Verification**: Secure, real-world verification via **Nodemailer** to ensure valid participants.
*   **Digital Tickets**: Automated delivery of confirmation emails containing unique **QR codes** for seamless event check-ins.
*   **Volunteer Leaderboard**: Gamified "Community Heroes" system to recognize top contributors.

### 🤖 AI-Native Operations
*   **24/7 AI Guide**: A persistent Gemini-powered assistant to answer platform questions and guide volunteer signups.
*   **Generative Event Tools**: AI-assisted generation for professional event descriptions and promotional imagery.
*   **Event Promotion**: Integrated **Twilio** support for multi-channel campaign outreach.

---

## 🛠 Technical Excellence

### Core Stack
- **Framework**: [Next.js 15+](https://nextjs.org/) (App Router, Turbopack, React 19)
- **Styling**: [Tailwind CSS 4](https://tailwindcss.com/) with a custom **Glassmorphism Design System**
- **Database**: [Cloud Firestore](https://firebase.google.com/docs/firestore) (Real-time NoSQL)
- **Auth**: [Firebase Authentication](https://firebase.google.com/docs/auth)
- **AI**: [Google Generative AI](https://ai.google.dev/) (Gemini 1.5 Flash)
- **Payments**: [Razorpay](https://razorpay.com/) integration for secure donations

### Supporting Technologies
- **Animations**: [Framer Motion](https://www.framer.com/motion/) for smooth, premium transitions
- **Mapping**: [Leaflet](https://leafletjs.com/) & [React Leaflet](https://react-leaflet.js.org/)
- **Email**: [Nodemailer](https://nodemailer.com/) (Gmail SMTP)
- **Communication**: [Twilio API](https://www.twilio.com/) for SMS/Voice

---

## 📂 Project Architecture

```text
├── src/
│   ├── app/                # Next.js App Router
│   │   ├── (app)/          # Main App Views (Dashboard, Feed, Home)
│   │   ├── (auth)/         # Authentication flows
│   │   └── api/            # Serverless Functions (Sentinel, Payments, AI)
│   ├── components/         # Premium UI Components (Glassmorphism)
│   ├── context/            # Global State (AuthContext)
│   ├── services/           # Backend Logic (Email, Recommendations, Firebase)
│   ├── types/              # TypeScript Interfaces
│   └── styles/             # Global CSS & Tailwind Config
├── public/                 # Static Assets & Icons
└── firebase.json           # Firebase Deployment Config
```

---

## ⚙️ Configuration & Setup

### 1. Prerequisites
- Node.js 18+
- Firebase Project
- Google AI (Gemini) API Key
- Razorpay Account (Optional)
- Twilio Account (Optional)

### 2. Environment Variables
Create a `.env.local` in the root and configure the following:

```env
# Firebase
NEXT_PUBLIC_FIREBASE_API_KEY=...
NEXT_PUBLIC_FIREBASE_AUTH_DOMAIN=...
NEXT_PUBLIC_FIREBASE_PROJECT_ID=...
NEXT_PUBLIC_FIREBASE_STORAGE_BUCKET=...
NEXT_PUBLIC_FIREBASE_MESSAGING_SENDER_ID=...
NEXT_PUBLIC_FIREBASE_APP_ID=...

# AI & Communication
GEMINI_API_KEY_AI_CHAT_BOT=...
TWILIO_SID=...
TWILIO_AUTH=...
TWILIO_PHONE=...

# Email (SMTP)
EMAIL=your-email@gmail.com
EMAIL_PASS=your-google-app-password

# Payments
RAZORPAY_KEY_ID=...
RAZORPAY_KEY_SECRET=...
```

### 3. Installation
```bash
# Install dependencies
npm install

# Start development server
npm run dev
```

---

## 🛡 Security & Reliability
- **Firestore Security Rules**: Strict access control for user data and chatrooms.
- **Input Validation**: Server-side checks for all API routes.
- **Error Handling**: Comprehensive logging and user-friendly error boundaries.

---

Built with ❤️ by the Kindred Relief Team to foster community resilience and rapid response.
