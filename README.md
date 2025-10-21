# TRUST-LOCK

**Zero Trust Security Gateway for Enterprise Banking**

A modern security solution that replaces traditional VPN-based access with intelligent, real-time risk analysis. Built for the Wema Bank Hackathon 2025 - "The Borderless Office" track.

---

## 🎯 What is TRUST-LOCK?

TRUST-LOCK is a Zero Trust Access Gateway that evaluates every login attempt using three security pillars:

1. **Identity Verification** - Who is trying to access?
2. **Device Analysis** - What device are they using?
3. **Context Evaluation** - Where, when, and why are they logging in?

Instead of binary access (allowed/denied), TRUST-LOCK makes adaptive decisions:
- ✅ **GRANT** - Low risk, seamless access
- ⚠️ **CHALLENGE** - Medium risk, require MFA
- 🚫 **BLOCK** - High risk, deny and alert security team

---

## 🚀 Quick Start

### Prerequisites
- Node.js 18+ and npm
- Supabase account (for backend)

### Installation

```bash
# Clone the repository
git clone https://github.com/BISHOP-X/TRUST-LOCK.git
cd TRUST-LOCK

# Install dependencies
npm install --legacy-peer-deps

# Set up environment variables
# Create a .env file with your Supabase credentials:
# VITE_SUPABASE_URL=your_supabase_url
# VITE_SUPABASE_ANON_KEY=your_anon_key

# Start development server
npm run dev
```

The app will be available at `http://localhost:8080`

---

## 🏗️ Technology Stack

**Frontend:**
- React 18 + TypeScript
- Vite (build tool)
- Tailwind CSS + shadcn/ui components
- Framer Motion (animations)
- Three.js (3D visualizations)

**Backend:**
- Supabase (PostgreSQL + Auth + Real-time)
- IP Geolocation API
- Claude API (AI-generated security explanations)

---

## 📋 Project Structure

```
TRUST-LOCK/
├── src/
│   ├── components/
│   │   ├── dashboard/        # Dashboard components
│   │   ├── presentation/     # Presentation mode slides
│   │   └── ui/              # shadcn/ui components
│   ├── contexts/            # React Context providers
│   ├── lib/                 # Utilities (Supabase client)
│   └── pages/               # Main application pages
├── public/                  # Static assets
└── supabase/               # Database schema & functions
```

---

## 🎮 Demo Scenarios

The application includes 4 interactive demo scenarios:

1. **Trusted Employee** - Normal login (✅ GRANTED)
2. **New Device** - Unrecognized device (⚠️ CHALLENGE)
3. **Impossible Travel** - Lagos to London in 3 minutes (🚫 BLOCKED)
4. **Compromised Device** - Failed security checks (🚫 BLOCKED)

---

## 🛠️ Available Scripts

```bash
npm run dev          # Start development server
npm run build        # Build for production
npm run preview      # Preview production build
npm run lint         # Run ESLint
```

---

## 📦 Deployment

1. Build the production bundle:
   ```bash
   npm run build
   ```

2. Deploy the `dist/` folder to your hosting provider:
   - Vercel
   - Netlify
   - AWS S3 + CloudFront
   - Any static hosting service

---

## 🤝 Contributing

This project was built for the Wema Bank Hackathon 2025. For questions or collaboration:

- **Repository:** https://github.com/BISHOP-X/TRUST-LOCK
- **Issues:** https://github.com/BISHOP-X/TRUST-LOCK/issues

---

## 📄 License

MIT License - See LICENSE file for details

---

## 🎓 Acknowledgments

Built for Wema Bank Hackathon 2025 - "Future-Proof Information Security: The Borderless Office" track.

