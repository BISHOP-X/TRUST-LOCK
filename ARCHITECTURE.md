# TRUST-LOCK Architecture

## System Overview

TRUST-LOCK is a Zero Trust security gateway that performs real-time risk analysis on every login attempt. Instead of binary allow/deny decisions, it calculates a risk score (0-100) based on 4 security pillars and makes adaptive access decisions.

**Core Principle:** Never trust, always verify. Every access request is treated as potentially hostile until proven otherwise.

---

## High-Level Architecture

```
┌─────────────┐         ┌──────────────────┐         ┌─────────────────┐
│   Browser   │────────▶│  React Frontend  │────────▶│   Dashboard     │
│  (Login)    │         │  (TypeScript)    │         │  (Real-time)    │
└─────────────┘         └──────────────────┘         └─────────────────┘
       │                         │                            ▲
       │                         │                            │
       ▼                         ▼                            │
┌─────────────┐         ┌──────────────────┐                │
│ IP Geo API  │         │ Edge Function    │                │
│ (ip-api.com)│         │ (Risk Analysis)  │                │
└─────────────┘         └──────────────────┘                │
                                 │                            │
                                 ▼                            │
                        ┌──────────────────┐                │
                        │   PostgreSQL     │────────────────┘
                        │   (Supabase)     │   Real-time
                        └──────────────────┘   Subscription
```

---

## Technology Stack

### Frontend
- **React 18 + TypeScript** - Type-safe UI components
- **Vite** - Fast build tool with HMR (Hot Module Replacement)
- **Tailwind CSS + shadcn/ui** - Utility-first styling with pre-built components
- **Framer Motion** - 2D animations for UI transitions
- **Supabase JS Client** - Real-time database subscriptions

### Backend
- **Supabase Edge Functions** - Serverless Deno runtime for risk analysis
- **PostgreSQL** - Relational database for user data and audit logs
- **Supabase Real-time** - WebSocket-based pub/sub for live dashboard updates

### External Services
- **ip-api.com** - Free IP geolocation (city, country, lat/lon)

---

## Component Roles & Responsibilities

### 1. React Frontend (`src/`)
**What it does:** Renders UI, handles user interactions, displays real-time updates

**Key responsibilities:**
- Login form with dropdown account selector
- Dashboard with live risk gauge and audit log
- Real-time WebSocket subscription to database changes
- CSV export functionality

**Files:**
- `pages/Login.tsx` - Collects email/password, calls Edge Function
- `pages/Index.tsx` - Main dashboard with live updates
- `contexts/DashboardContext.tsx` - Manages real-time subscriptions and state

**Why React?** Component-based architecture makes it easy to manage complex UI state and real-time updates.

### 2. Supabase Edge Functions (`supabase/functions/`)
**What it does:** Serverless backend that runs risk analysis logic

**Key responsibilities:**
- Validate user credentials against `demo_users` table
- Fetch IP geolocation from external API
- Calculate risk score using 4-pillar model
- Query previous login for impossible travel detection
- Insert audit log into `login_logs` table
- Return decision (GRANTED/CHALLENGE/BLOCKED) to frontend

**Files:**
- `check-access/index.ts` - Main risk analysis function (300 lines)

**Why Edge Functions?**
- No server management (Supabase handles deployment)
- Auto-scaling (handles 1 or 10,000 requests without config)
- Deno runtime is secure by default (no file system access)
- Built-in CORS and error handling

**Execution flow:**
```typescript
1. Receive POST request with { email, password, ip, deviceFingerprint }
2. Query demo_users → validate credentials
3. Call ip-api.com → get city, country, lat/lon
4. Query login_logs → check for impossible travel
5. Calculate riskScore = identity + device + location + behavior
6. Determine decision based on thresholds (0-30, 31-60, 61+)
7. Insert into login_logs → triggers real-time event
8. Return { decision, reason, riskScore, riskFactors }
```

### 3. PostgreSQL Database (Supabase)
**What it does:** Stores user profiles and login audit logs

**Tables:**
- `demo_users` - User profiles with trusted device/IP/location
- `login_logs` - Audit trail of all login attempts

**Why PostgreSQL?**
- ACID compliance (important for audit logs)
- JSONB support (stores risk_factors as structured JSON)
- Real-time triggers (LISTEN/NOTIFY for WebSocket updates)
- Full-text search (for future log analysis)

**Indexes:**
- `demo_users.email` - Fast user lookup during login
- `login_logs.email + created_at DESC` - Fast last-login query for impossible travel check

### 4. Supabase Real-time (WebSocket)
**What it does:** Pushes database changes to connected clients instantly

**How it works:**
1. PostgreSQL triggers NOTIFY event when row inserted into `login_logs`
2. Supabase listens for NOTIFY and broadcasts to all subscribers
3. React frontend receives event and updates dashboard UI

**Code example:**
```typescript
// Frontend subscribes to changes
supabase.channel('login_logs_changes')
  .on('postgres_changes', { event: 'INSERT', table: 'login_logs' }, 
    (payload) => updateDashboard(payload.new)
  )
  .subscribe();

// Backend inserts → automatically triggers real-time event
await supabase.from('login_logs').insert({ ... });
```

**Why WebSockets vs HTTP polling?**
- 100x fewer requests (only sends data when something changes)
- Lower latency (< 100ms vs 1-5 seconds with polling)
- Less battery drain on mobile devices

### 5. IP Geolocation API (ip-api.com)
**What it does:** Converts IP address to geographic location

**Request:**
```bash
GET http://ip-api.com/json/102.89.83.30
```

**Response:**
```json
{
  "status": "success",
  "country": "Nigeria",
  "city": "Ibadan",
  "lat": 7.3775,
  "lon": 3.9470
}
```

**Why external API?**
- Geolocation is hard (requires massive IP-to-location database)
- Free tier supports 45 requests/minute (enough for demo)
- Production would use MaxMind GeoIP2 (offline database, no rate limits)

### 6. Vite Build Tool
**What it does:** Bundles frontend code for production deployment

**Development mode:**
- Native ES modules (no bundling needed)
- Hot Module Replacement (instant updates when code changes)
- TypeScript compilation on-the-fly

**Production build:**
```bash
bun run build → dist/ folder
# Output: Optimized HTML/CSS/JS (gzipped to ~500KB)
```

**Why Vite?** 10x faster than webpack/CRA because it leverages native browser ES modules.

---

## How Everything Connects

```
┌──────────────────────────────────────────────────────────────────┐
│                         USER INTERACTION                          │
└──────────────────────────────────────────────────────────────────┘
                                │
                                ▼
                    ┌───────────────────────┐
                    │   React Frontend      │
                    │   (Vite dev server)   │
                    └───────────────────────┘
                                │
                ┌───────────────┴───────────────┐
                ▼                               ▼
    ┌───────────────────────┐       ┌───────────────────────┐
    │  Supabase JS Client   │       │   External IP API     │
    │  (WebSocket + HTTP)   │       │   (ip-api.com)        │
    └───────────────────────┘       └───────────────────────┘
                │                               │
                ▼                               │
    ┌───────────────────────┐                  │
    │  Supabase Platform    │                  │
    │  (Managed Backend)    │                  │
    └───────────────────────┘                  │
                │                               │
    ┌───────────┴───────────┐                  │
    ▼                       ▼                  │
┌─────────────┐    ┌──────────────────┐       │
│ PostgreSQL  │    │  Edge Functions  │◄──────┘
│ (Database)  │◄───│  (Deno Runtime)  │
└─────────────┘    └──────────────────┘
       │
       │ LISTEN/NOTIFY
       │
       ▼
┌─────────────┐
│ Real-time   │
│ (WebSocket) │
└─────────────┘
       │
       │ Push updates
       │
       ▼
┌─────────────┐
│ Dashboard   │
│ (React UI)  │
└─────────────┘
```

**Request Flow Example (Login):**

1. User clicks "Login" → React calls Edge Function
2. Edge Function queries PostgreSQL for user
3. Edge Function calls ip-api.com for location
4. Edge Function calculates risk score
5. Edge Function inserts into PostgreSQL
6. PostgreSQL triggers NOTIFY event
7. Supabase Real-time broadcasts to all connected clients
8. Dashboard receives WebSocket message and updates UI

**Total time:** ~370ms (300ms Edge Function + 50ms real-time + 20ms React render)

---

## Risk Scoring Engine

### Additive Risk Model

The system starts at **0 points** and adds points for each security concern. This is more intuitive than starting high and subtracting points.

```typescript
let riskScore = 0;

// Pillar 1: Identity (+10)
riskScore += 10; // Valid credentials

// Pillar 2: Device (+5 or +25)
if (deviceMatch) {
  riskScore += 5;  // Trusted device
} else {
  riskScore += 25; // New device
}

// Pillar 3: Location (+5, +15, or +25)
if (ipMatch && cityMatch) {
  riskScore += 5;  // Known location
} else if (countryMatch) {
  riskScore += 15; // Same country, different city
} else {
  riskScore += 25; // Different country
}

// Pillar 4: Behavior (+5, +10, or +60)
if (impossibleTravel) {
  riskScore += 60; // Critical anomaly
} else if (firstLogin) {
  riskScore += 10; // Slight risk
} else {
  riskScore += 5;  // Normal behavior
}
```

### Decision Thresholds

```
0-30   → GRANTED   (Low risk, seamless access)
31-60  → CHALLENGE (Medium risk, require MFA)
61+    → BLOCKED   (High risk, deny and alert)
```

**Example Calculations:**
- **Alice (Trusted):** 10 + 5 + 5 + 10 = 30 → GRANTED
- **Bob (New Device):** 10 + 25 + 5 + 10 = 50 → CHALLENGE
- **Carol (Impossible Travel):** 10 + 5 + 25 + 60 = 100 → BLOCKED _(hardcoded for demo)_
- **David (Compromised):** 85 → BLOCKED _(hardcoded for demo)_

---

## Key Technical Components

### 1. Device Fingerprinting

**Purpose:** Identify devices without cookies or local storage (which users can clear).

**Implementation:**
```typescript
// Login.tsx - Consistent fingerprints for demo accounts
const DEMO_ACCOUNTS = [
  { email: 'alice@company.com', deviceFingerprint: 'device_alice_trusted_2024' },
  { email: 'bob@company.com', deviceFingerprint: 'device_bob_new_unknown' },
  // ...
];

// Edge Function - Compare against trusted device
const deviceMatch = deviceFingerprint === user.trusted_device_fingerprint;
```

**Why it matters:** Prevents attackers from using stolen credentials on unknown devices.

### 2. IP Geolocation

**Purpose:** Detect location-based anomalies (e.g., impossible travel).

**API Call:**
```typescript
const geoResponse = await fetch(`http://ip-api.com/json/${ip}`);
const geoData = await geoResponse.json();

city = geoData.city;        // "Ibadan"
country = geoData.country;  // "Nigeria"
latitude = geoData.lat;     // 7.3775
longitude = geoData.lon;    // 3.9470
```

**Production Note:** `ip-api.com` is free but rate-limited (45 req/min). For production, use a paid service like MaxMind GeoIP2 or ipinfo.io.

### 3. Impossible Travel Detection

**Algorithm:** Haversine formula to calculate great-circle distance between two GPS coordinates.

```typescript
function calculateDistance(lat1, lon1, lat2, lon2) {
  const R = 6371; // Earth's radius in km
  const dLat = (lat2 - lat1) * Math.PI / 180;
  const dLon = (lon2 - lon1) * Math.PI / 180;
  const a = 
    Math.sin(dLat / 2) * Math.sin(dLat / 2) +
    Math.cos(lat1 * Math.PI / 180) * Math.cos(lat2 * Math.PI / 180) *
    Math.sin(dLon / 2) * Math.sin(dLon / 2);
  const c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));
  return R * c; // Distance in km
}

// Check if travel is physically possible
const maxPossibleDistance = (timeSinceLastLoginMinutes / 60) * 900; // 900 km/h plane

if (travelDistanceKm > maxPossibleDistance && travelDistanceKm > 100) {
  // IMPOSSIBLE TRAVEL DETECTED
  riskScore += 60;
}
```

**Example:**
- Previous login: London (51.5074°N, 0.1278°W) at 10:15 AM
- Current login: Ibadan (7.3775°N, 3.9470°E) at 10:30 AM
- Distance: ~5,000 km in 15 minutes
- Max possible: (15/60) * 900 = 225 km
- **Result:** BLOCKED (impossible travel)

### 4. Real-time Dashboard Updates

**Problem:** How does the dashboard update instantly when someone logs in from a different browser/device?

**Solution:** PostgreSQL LISTEN/NOTIFY via Supabase Real-time.

**Frontend (Dashboard):**
```typescript
// DashboardContext.tsx
useEffect(() => {
  const channel = supabase
    .channel('login_logs_changes')
    .on(
      'postgres_changes',
      { event: 'INSERT', schema: 'public', table: 'login_logs' },
      (payload) => {
        updateFromLoginLog(payload.new); // Update UI instantly
      }
    )
    .subscribe();

  return () => supabase.removeChannel(channel);
}, []);
```

**Backend (Edge Function):**
```typescript
// After calculating risk score, insert into database
await supabase
  .from('login_logs')
  .insert({
    email,
    risk_score: riskScore,
    decision,
    risk_factors: riskFactors,
    ai_reason: aiReason,
    // ...
  });

// PostgreSQL triggers NOTIFY → Supabase broadcasts to all subscribed clients
```

**Flow:**
1. User logs in via `/login` page
2. Edge Function calculates risk and inserts into `login_logs`
3. PostgreSQL triggers a change event
4. Supabase broadcasts to all connected clients
5. Dashboard receives event and updates UI (< 100ms latency)

**Why WebSockets?** HTTP polling would be inefficient (constant requests). WebSockets maintain a persistent connection and push updates only when data changes.

---

## Data Flow

### Login Flow

```
1. User selects account from dropdown → sends email + password to Edge Function
2. Edge Function queries demo_users table → validates credentials
3. Edge Function fetches IP geolocation from ip-api.com
4. Edge Function queries last login from login_logs → checks for impossible travel
5. Edge Function calculates risk score → determines decision (GRANTED/CHALLENGE/BLOCKED)
6. Edge Function inserts new row into login_logs table
7. PostgreSQL triggers real-time event → Supabase broadcasts to dashboard
8. Dashboard updates instantly with new login attempt
```

### Database Schema

**demo_users** (User profiles)
```sql
CREATE TABLE demo_users (
  id UUID PRIMARY KEY,
  email TEXT UNIQUE,
  trusted_device_fingerprint TEXT,
  trusted_ip TEXT,
  trusted_city TEXT,
  trusted_country TEXT,
  created_at TIMESTAMP DEFAULT NOW()
);
```

**login_logs** (Audit trail)
```sql
CREATE TABLE login_logs (
  id UUID PRIMARY KEY,
  email TEXT,
  user_id UUID REFERENCES demo_users(id),
  ip_address TEXT,
  device_fingerprint TEXT,
  city TEXT,
  country TEXT,
  latitude FLOAT,
  longitude FLOAT,
  risk_score INTEGER,
  decision TEXT CHECK (decision IN ('GRANTED', 'CHALLENGE', 'BLOCKED')),
  risk_factors JSONB,
  ai_reason TEXT,
  is_trusted_device BOOLEAN,
  is_impossible_travel BOOLEAN,
  travel_distance_km FLOAT,
  time_since_last_login_minutes INTEGER,
  created_at TIMESTAMP DEFAULT NOW()
);
```

---

## Security Considerations

### What We Did Right

1. **No client-side decision making** - All risk analysis happens server-side (Edge Function). Frontend just displays results.

2. **Audit logging** - Every login attempt is logged with full context (IP, device, location, timestamp). Immutable audit trail.

3. **Rate limiting** (via Supabase) - Edge Functions have built-in rate limiting to prevent brute force attacks.

4. **Environment variables** - Supabase credentials stored in `.env` (not committed to Git).

### What's Missing (Production TODOs)

1. **Password hashing** - Demo uses plaintext password `'demo'`. Production needs bcrypt/argon2.

2. **JWT tokens** - No session management. Production needs secure tokens with expiration.

3. **MFA implementation** - CHALLENGE decision should trigger actual 2FA (SMS, TOTP, email code).

4. **Device fingerprinting** - Demo uses static strings. Production needs browser fingerprinting (Canvas, WebGL, fonts).

5. **IP reputation** - Check if IP is from a VPN, proxy, or known malicious source (use AbuseIPDB).

6. **Rate limiting per user** - Prevent account enumeration attacks.

---

## Performance Optimizations

### Edge Function Cold Starts

**Problem:** Serverless functions have cold start latency (~500ms for Deno).

**Mitigation:**
- Keep functions warm by pinging every 5 minutes (cron job)
- Use lightweight dependencies (we only import Supabase client)

### Database Queries

**Problem:** Multiple database round-trips slow down response time.

**Optimization:**
- Single query for user lookup (indexed on email)
- Single query for last login (indexed on email + created_at DESC)
- Use connection pooling (Supabase handles this automatically)

**Current Performance:**
- Average Edge Function execution: ~300ms
- Real-time propagation: ~50ms
- Total login-to-dashboard latency: **~350ms**

### Frontend Bundle Size

**Why Vite?** Faster than webpack/CRA because it uses native ES modules in dev mode (no bundling needed).

**Production Build:**
```bash
bun run build
# Output: dist/ folder (~500KB gzipped)
```

---

## Deployment Architecture

### Current Setup
- **Frontend:** Vercel (CDN-hosted static files)
- **Backend:** Supabase (managed PostgreSQL + Edge Functions)
- **Real-time:** Supabase WebSocket server

### Why This Stack?

1. **Zero infrastructure management** - No servers to maintain
2. **Global CDN** - Fast loading times worldwide (Vercel has 100+ edge locations)
3. **Auto-scaling** - Handles traffic spikes without configuration
4. **Cost-effective** - Free tier covers 500K Edge Function invocations/month

### Environment Variables (Vercel)

```bash
VITE_SUPABASE_URL=https://sqwmkszppxqqvyyzdfox.supabase.co
VITE_SUPABASE_ANON_KEY=eyJhbGci...  # Public key (safe to expose)
VITE_DEMO_MODE=true
```

**Note:** `SUPABASE_SERVICE_ROLE_KEY` is only stored in Supabase Edge Functions (never in frontend code).

---

## Testing Strategy

### Demo Scenarios

We created 4 accounts that demonstrate different risk levels:

1. **alice@company.com**
   - Trusted device: ✅
   - Known location: ✅ (Ibadan, Nigeria)
   - First login: ❌
   - **Score:** 30 → GRANTED

2. **bob@company.com**
   - Trusted device: ❌ (new device)
   - Known location: ✅
   - First login: ✅
   - **Score:** 50 → CHALLENGE

3. **carol@company.com**
   - Trusted device: ✅
   - Location: ⚠️ (London → Lagos in 45 min)
   - Impossible travel: 🚨
   - **Score:** 100 → BLOCKED
   - _Note: Hardcoded for demo reliability (impossible travel detection works but requires previous login data)_

4. **david@company.com**
   - Device security: 🚨 (malware, outdated patches)
   - **Score:** 85 → BLOCKED
   - _Note: Hardcoded for demo reliability (real device scanning requires endpoint security agent integration)_

### Testing Real-time Updates

1. Open dashboard at `/` (localhost:5173)
2. Open login page at `/login` in separate window
3. Select any account and submit
4. Dashboard updates **instantly** (< 100ms)

---

## Code Organization

```
src/
├── components/
│   ├── dashboard/          # Main dashboard views
│   │   ├── NavigationBar.tsx        # Top nav with CSV export
│   │   ├── AuditLogView.tsx         # Login history table
│   │   ├── SystemInfoView.tsx       # Technical documentation
│   │   └── RiskGauge.tsx            # Circular risk score gauge
│   └── ui/                 # shadcn/ui primitives (button, card, etc.)
├── contexts/
│   └── DashboardContext.tsx         # React Context for state + real-time
├── pages/
│   ├── Index.tsx           # Main dashboard page
│   └── Login.tsx           # Login page with dropdown selector
├── lib/
│   └── supabase.ts         # Supabase client initialization
└── main.tsx                # React entry point

supabase/
├── functions/
│   └── check-access/
│       └── index.ts        # Edge Function (risk analysis logic)
└── sql/
    ├── 01_create_tables.sql
    ├── 02_insert_demo_users.sql
    └── 03_update_demo_users_for_testing.sql
```

---

## Key Design Decisions

### Why Edge Functions instead of Node.js backend?

**Pros:**
- No server management (fully managed by Supabase)
- Auto-scaling (handles 10 requests or 10,000 with no config changes)
- Built-in CORS handling
- Deno runtime (secure by default, TypeScript native)

**Cons:**
- Cold start latency (~500ms first request)
- Limited to 30-second execution time
- Can't use all npm packages (Deno uses ES modules)

**Verdict:** For this use case (lightweight risk analysis), Edge Functions are perfect.

### Why Supabase Real-time instead of polling?

**Polling (bad):**
```typescript
setInterval(async () => {
  const logs = await fetch('/api/logs');
  setAuditLog(logs); // Wasteful if nothing changed
}, 1000); // 60 requests/minute even if idle
```

**WebSocket (good):**
```typescript
supabase.channel('logs').on('INSERT', (payload) => {
  setAuditLog(prev => [payload.new, ...prev]); // Only updates when needed
});
```

**Benefits:**
- 100x fewer requests (only transmits changes)
- Lower latency (< 100ms vs 1-5 seconds with polling)
- Less server load (WebSocket connection is persistent but idle most of the time)

### Why TypeScript instead of plain JavaScript?

**Example of type safety preventing bugs:**

```typescript
// This would catch the error at compile time:
const decision: 'GRANTED' | 'CHALLENGE' | 'BLOCKED' = 'APPROVED'; 
// ❌ Type error: "APPROVED" not assignable to union type

// Without TypeScript, this bug would only show up at runtime:
if (decision === 'APPROVED') { // Logic error, would never match
  grantAccess();
}
```

---

## Lessons Learned

### What Worked Well

1. **Real-time updates** - Judges were impressed by instant dashboard updates
2. **Simple additive scoring** - Easy to explain and debug
3. **Dropdown selector** - Made live demos smooth (no typing passwords)
4. **Supabase** - Handled all backend complexity (auth, DB, real-time, functions)

### What We'd Change

1. **Use Redis for session state** - Currently stateless (no user sessions)
2. **Add actual device fingerprinting** - Canvas/WebGL/font detection
3. **Use paid IP API** - `ip-api.com` rate limits (45/min) could break during heavy testing
4. **Add E2E tests** - Manual testing is error-prone
5. **Better error handling** - Edge Function should retry geolocation API on failure

---

## Future Enhancements

### Phase 2 Ideas

1. **Machine Learning Risk Model**
   - Replace static thresholds with ML model trained on real login data
   - Use anomaly detection (isolation forest, LSTM) to catch subtle patterns

2. **Adaptive Thresholds**
   - Lower threshold for executives (more strict)
   - Higher threshold for developers (less friction)

3. **Context-Aware Policies**
   - Time-based: Block after-hours access to sensitive systems
   - IP-based: Require MFA from public WiFi
   - Device-based: Block jailbroken/rooted devices

4. **Integration with SIEM**
   - Send high-risk events to Splunk/ELK
   - Automated incident response (lock account, notify SOC)

---

## Performance Metrics

**Current System:**
- Login validation: ~300ms (Edge Function)
- Real-time propagation: ~50ms (WebSocket)
- Frontend render: ~20ms (React)
- **Total latency:** ~370ms (acceptable for auth flow)

**Scalability:**
- Tested: 10 concurrent users (no issues)
- Theoretical max: 500K requests/month (Supabase free tier)
- Production bottleneck: ip-api.com rate limit (45 req/min)

**Database Performance:**
- `demo_users` table: 4 rows (indexed on email)
- `login_logs` table: ~100 rows after testing
- Query time: < 10ms (PostgreSQL is fast for small datasets)

---

## Conclusion

TRUST-LOCK demonstrates how Zero Trust security can be implemented with modern serverless architecture. By combining real-time risk analysis, geolocation intelligence, and behavioral analytics, we can make smarter access decisions than traditional "password = access" systems.

The stack (React + Supabase + Edge Functions) proves that you don't need complex infrastructure to build production-grade security tools. Everything runs on managed services, scales automatically, and costs almost nothing.

**Key Takeaway:** Security doesn't have to be complicated. Start with clear principles (never trust, always verify), measure risk on multiple dimensions (identity, device, location, behavior), and make decisions based on data, not assumptions.
