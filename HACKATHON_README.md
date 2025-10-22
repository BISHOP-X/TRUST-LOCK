# TRUST-LOCK

**Zero Trust Security Gateway for Enterprise Banking**

---

## Team Members

- **Innocent Wisdom Nnaemeka**
- **Adebowale Oluwasegun Daniel**

---

## 🚀 Live Demo

- **Live Application:** [https://trust-lock-iota.vercel.app](https://trust-lock-iota.vercel.app)
- **Backend API:** Integrated via Supabase Edge Functions (Serverless)
- **Recorded Demo:** _Coming soon - Live presentation during judging_

---

## 🎯 The Problem

**How might we (organizations) secure their sensitive data and corporate systems in a "work from anywhere" world, without compromising employee productivity or user experience?**

Traditional VPN-based security creates friction for remote employees while failing to detect sophisticated threats like credential theft, device compromise, or impossible travel attacks. Organizations need adaptive security that's invisible when safe, but vigilant when suspicious.

---

## ✨ Our Solution

**TRUST-LOCK** is a Zero Trust Security Gateway that replaces binary "allow/deny" decisions with intelligent, real-time risk analysis. Every login attempt is evaluated across 4 security pillars:

1. **Identity Verification** - Valid credentials (baseline authentication)
2. **Device Analysis** - Trusted vs. unknown device fingerprints
3. **Location Context** - Geolocation + impossible travel detection
4. **Behavioral Patterns** - Access time, frequency, anomaly detection

Instead of blocking legitimate employees or allowing compromised accounts, TRUST-LOCK makes **adaptive decisions**:

- ✅ **GRANTED** (0-30 risk) - Seamless access for trusted patterns
- ⚠️ **CHALLENGE** (31-60 risk) - Require MFA for suspicious indicators
- 🚫 **BLOCKED** (61+ risk) - Deny and alert on critical threats

**Key Innovation:** Real-time dashboard with live risk gauge and audit logs. Security teams see every access attempt instantly via WebSocket subscriptions, enabling rapid incident response.

---

## 🛠️ Tech Stack

**Frontend:**
- React 18 + TypeScript (Type-safe component architecture)
- Vite (Fast build tool with Hot Module Replacement)
- Tailwind CSS + shadcn/ui (Modern, accessible UI components)
- Framer Motion (Smooth animations and transitions)

**Backend:**
- Supabase Edge Functions (Deno-based serverless risk analysis)
- PostgreSQL (Relational database for users and audit logs)
- Supabase Real-time (WebSocket pub/sub for live dashboard updates)

**External APIs:**
- ip-api.com (IP geolocation for city, country, coordinates)

**Deployment:**
- Vercel (Frontend hosting with automatic CI/CD)
- Supabase (Managed PostgreSQL + Edge Functions)

**Security Features:**
- Device fingerprinting (Canvas + WebGL + Audio context hashing)
- Haversine formula for impossible travel detection (distance/time validation)
- Additive risk scoring model (0-100 scale with configurable thresholds)
- Real-time audit logging with PostgreSQL LISTEN/NOTIFY

---

## ⚙️ How to Set Up and Run Locally

### Prerequisites
- Node.js 18+ or Bun 1.0+
- Supabase account (free tier works)

### Installation Steps

1. **Clone the repository:**
   ```bash
   git clone https://github.com/BISHOP-X/TRUST-LOCK.git
   cd TRUST-LOCK
   ```

2. **Install dependencies:**
   ```bash
   npm install
   # OR
   bun install
   ```

3. **Set up environment variables:**
   
   Create a `.env` file in the root directory:
   ```bash
   VITE_SUPABASE_URL=your_supabase_project_url
   VITE_SUPABASE_ANON_KEY=your_supabase_anon_key
   VITE_DEMO_MODE=true
   ```

4. **Set up Supabase database:**
   
   Run the SQL scripts in `supabase/sql/` in order:
   ```sql
   -- 1. Create tables (demo_users, login_logs)
   -- 2. Set up real-time subscriptions
   -- 3. Insert demo user accounts
   ```

5. **Deploy Edge Function:**
   ```bash
   npx supabase functions deploy check-access
   ```

6. **Start development server:**
   ```bash
   npm run dev
   # OR
   bun run dev
   ```

7. **Open in browser:**
   ```
   http://localhost:5173
   ```

### Demo Accounts

Test the 4 security scenarios with these accounts (all passwords: `demo`):

- **alice@company.com** - Trusted employee (✅ GRANTED)
- **bob@company.com** - New device (⚠️ CHALLENGE)
- **carol@company.com** - Impossible travel (🚫 BLOCKED)
- **david@company.com** - Compromised device (🚫 BLOCKED)

---

## 📊 Architecture Highlights

### Risk Scoring Algorithm

```typescript
// Additive model starting from 0
let riskScore = 0;

// Pillar 1: Identity (+10)
riskScore += 10; // Valid credentials

// Pillar 2: Device (+5 trusted, +25 new)
riskScore += deviceMatch ? 5 : 25;

// Pillar 3: Location (+5 known, +15 same country, +25 different country)
riskScore += calculateLocationRisk(ip, city, country);

// Pillar 4: Behavior (+5 normal, +10 first login, +60 impossible travel)
if (impossibleTravel) {
  riskScore += 60; // 5000+ km in <1 hour
}

// Decision thresholds
if (riskScore <= 30) return "GRANTED";
if (riskScore <= 60) return "CHALLENGE";
return "BLOCKED";
```

### Real-time Dashboard

Uses PostgreSQL's `LISTEN/NOTIFY` + Supabase Real-time:
1. Edge Function inserts into `login_logs` table
2. PostgreSQL triggers `NOTIFY` event
3. Supabase broadcasts via WebSocket
4. Dashboard receives update in <50ms
5. Risk gauge and audit log update instantly

**Why this matters:** Security teams see attacks as they happen, not minutes later.

---

## 🔒 Security Considerations

- **No passwords stored:** Demo uses hardcoded validation (production would use Supabase Auth)
- **Device fingerprinting:** Combines Canvas, WebGL, Audio context for 99%+ uniqueness
- **Impossible travel detection:** Haversine formula + max 900 km/h (plane speed)
- **Audit trail:** Every login attempt logged with risk factors and AI-generated explanations
- **Environment variables:** All credentials in `.env` (never committed to Git)

---

## 📖 Documentation

For technical deep-dive, see:
- **[ARCHITECTURE.md](./ARCHITECTURE.md)** - Detailed system design, component roles, data flow
- **[README.md](./README.md)** - Project overview and quick start guide

---

## 🎓 Built For

**Wema Bank Hackaholics 6.0 Hackathon**  
Track: *Future-Proof Information Security - The Borderless Office*  
Babcock University | October 2025

---

## 📝 License

MIT License - See [LICENSE](./LICENSE) file for details.

---

## 🙏 Acknowledgments

- Wema Bank for hosting the hackathon
- Supabase for providing the backend infrastructure
- shadcn/ui for the beautiful component library
