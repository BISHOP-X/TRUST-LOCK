# Smart Access Gateway - Complete Project Context

## Project Overview
**Project Name:** Smart Access Gateway (Zero Trust Security Demo)  
**Client:** Wema Bank Hackathon 2025  
**Track:** Future-Proof Information Security - "The Borderless Office"  
**Team Goal:** Build a stunning, demo-ready proof-of-concept that showcases Zero Trust Architecture for banking security  
**Timeline:** 1 week to completion  
**Presentation Format:** 5-minute pitch to Wema Bank executives with live demo

---

## The Problem Statement (From Wema Bank)

### Challenge: "The Borderless Office"

**The Core Issue:**  
The traditional "castle-and-moat" security model (office firewall + VPN) is obsolete and dangerously inadequate for modern work.

**The New Reality:**
- Employees work from anywhere: homes, cafes, co-working spaces, airports
- They use personal devices (BYOD - Bring Your Own Device) that are often unpatched, unsecured, or shared
- They connect via untrusted networks: home Wi-Fi, public hotspots, mobile data
- Company data is accessed from these uncontrolled environments 24/7

**The Critical Vulnerability (Especially for Banks):**
A single stolen VPN password gives an attacker:
- Complete, unrestricted access to the entire internal network
- Ability to access sensitive customer data (BVNs, PII, transaction records)
- Access to core banking systems and internal tools (payroll, admin panels)
- Opportunity for lateral movement across all systems
- No way for security teams to detect or stop the breach until it's too late

**The Big Question:**  
> "How do we (banks/organizations) secure sensitive data and corporate systems in a 'work-from-anywhere' world WITHOUT compromising employee productivity or creating a terrible user experience?"

**Spark Questions We Must Answer:**
1. What if we assumed the network was already compromised and secured the data itself? (Zero Trust approach)
2. How can we verify the user, their device, and their context BEFORE granting access?
3. How can banks be protected without making employees' lives miserable?

---

## Our Solution: Smart Access Gateway

### Core Concept
A **Zero Trust Access Gateway** that acts as an intelligent, AI-powered security checkpoint between employees and sensitive applications.

**Key Principle:**  
"Never trust, always verify" - No broad network access. Every single request is evaluated in real-time.

### How It Works (Technical Flow)

#### 1. Real-Time Risk Analysis (Three Pillars)
When an employee tries to access a sensitive app (e.g., Payroll System), our gateway runs a multi-factor risk assessment:

**Pillar 1: Identity (WHO?)**
- Uses Supabase Auth to verify: Is this a legitimate, authenticated user?
- Checks: Valid credentials, active account status, proper role/permissions

**Pillar 2: Device Posture (WHAT DEVICE?)**
- Hybrid approach (real + simulated data for demo):
  - **Real Data:** Device fingerprint via FingerprintJS, User Agent string, OS version
  - **Simulated Data (for demo):** Disk encryption status, firewall active, antivirus running, last security patch date
- In production: Would use MDM (Mobile Device Management) APIs or endpoint agents

**Pillar 3: Context & Behavior (WHERE? WHEN? WHY?)**
- **Location:** IP Geolocation API (ip-api.com) to determine city/country
- **Behavior Analysis:** Query PostgreSQL `login_logs` table to check:
  - Is this a known device?
  - Is this a typical login time for this user?
  - **Impossible Travel Detection:** Did user log in from Lagos 5 mins after logging in from London?
- **Network Trust:** Is user on corporate network or public Wi-Fi?

#### 2. Explainable Risk Scoring Engine
The three pillars feed into an additive, explainable risk scoring algorithm:

```
Total Risk Score = Identity Risk + Device Risk + Context Risk

Example Breakdown:
- New device: +20 points
- Disk encryption OFF: +30 points
- Firewall disabled: +20 points
- Impossible travel detected: +50 points
- Login from untrusted IP: +15 points

Total: 135 points
```

**Why Explainable?**
- Not a "black box" ML model
- Security teams can see exactly why a decision was made
- Meets compliance requirements (CBN needs audit trails)
- Users understand why they were blocked

#### 3. Adaptive Access Decisions (Not Binary)
Based on the total risk score, the gateway makes one of three decisions:

| Risk Score | Decision | Action |
|------------|----------|--------|
| **0-20 points** | ✅ **GRANT** | User logs in seamlessly with no friction |
| **21-49 points** | ⚠️ **CHALLENGE** | User must complete MFA (step-up authentication) |
| **50+ points** | 🚫 **BLOCK** | Access denied, incident logged for security review |

This is **adaptive security** - low-risk users get a frictionless experience, high-risk attempts are stopped cold.

#### 4. AI-Enhanced User Experience
**The Differentiator:** When access is blocked or challenged, we don't show a cryptic error code.

**What We Do:**
- Send risk factors to an LLM API (Claude/GPT)
- LLM generates a human-readable explanation:
  - ❌ "Access blocked because your device's disk encryption is turned off and you're logging in from an unusual location."
  - ⚠️ "Please complete two-factor authentication because you're using a new device."
- **Demo Reliability:** 2-second timeout with hard-coded fallback reasons if API fails

**Benefits:**
- Reduces user frustration and support tickets
- Educates employees about security in real-time
- Makes security feel helpful, not punitive

#### 5. CBN Compliance & Audit Logging
**Every access attempt is logged:**
- Timestamp, User ID, Device ID, IP Address, Geolocation
- All risk factors and their scores
- Final decision (Grant/Challenge/Block)
- Reason provided to user

**One-Click Audit Export:**
- "Export Audit Log" button generates a CSV
- Satisfies Central Bank of Nigeria (CBN) Cybersecurity Framework requirements
- Demonstrates regulatory compliance to bank executives

---

## Technology Stack

### Frontend (Current State: Built by Lovable)
- **Framework:** React 18 + TypeScript
- **Styling:** Tailwind CSS with glassmorphic design system
- **UI Components:** shadcn/ui (Button, Card, Badge, Table, Tabs, Progress)
- **Icons:** Lucide React
- **State Management:** React Context API (DashboardContext)
- **Design:** Split-screen layout, draggable scenario controller, live risk gauge

**What Lovable Built:**
- Complete UI shell with 4 interactive demo scenarios
- Risk gauge visualization (circular progress bar)
- Audit log table with dummy data
- Split-screen "Old vs New" security comparison
- Enterprise-grade visual design (deep blues, cyans, glassmorphism)
- TODO comments for Three.js integration points

### Frontend (To Be Added by Us)
- **3D Visualizations:** Three.js via React Three Fiber (R3F)
  - `@react-three/fiber` - Core React wrapper for Three.js
  - `@react-three/drei` - Helper components (cameras, controls, loaders, effects)
  - `@react-three/postprocessing` - Visual effects (bloom, glow)
- **Animation:** Framer Motion (for 2D UI transitions)
- **Device Fingerprinting:** FingerprintJS (real device identification)
- **Performance Tools:** Leva (GUI controls for live-tweaking 3D scenes during demo)

### Backend (Serverless via Supabase)
- **Platform:** Supabase (PostgreSQL + Edge Functions + Auth)
- **Language:** Deno/TypeScript for Edge Functions
- **Authentication:** Supabase Auth (email/password for demo)

**Edge Functions to Build:**
1. **`check-access`** - Main risk scoring function
   - Input: User session, device data, geolocation
   - Process: Calculate risk score from three pillars
   - Output: Decision (Grant/Challenge/Block) + reason
   
2. **`export-audit-log`** - CSV export function
   - Input: Date range filter (optional)
   - Process: Query `login_logs` table
   - Output: CSV file download

### Database Schema (Supabase PostgreSQL)

```sql
-- Users table (handled by Supabase Auth)
-- We reference auth.users(id)

-- Login logs table
CREATE TABLE login_logs (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id UUID REFERENCES auth.users(id),
  timestamp TIMESTAMP DEFAULT NOW(),
  device_id TEXT NOT NULL,           -- From FingerprintJS
  user_agent TEXT,                   -- Browser/OS info
  ip_address INET,                   -- User's IP
  city TEXT,                         -- From geolocation API
  country TEXT,                      -- From geolocation API
  risk_score INTEGER NOT NULL,       -- Total calculated risk
  decision TEXT NOT NULL,            -- 'GRANT', 'CHALLENGE', 'BLOCK'
  reason TEXT,                       -- AI-generated or fallback
  
  -- Risk factor breakdown (for audit trail)
  identity_risk INTEGER,
  device_risk INTEGER,
  context_risk INTEGER,
  
  -- Specific flags (for analysis)
  is_new_device BOOLEAN,
  is_disk_encrypted BOOLEAN,
  is_firewall_active BOOLEAN,
  impossible_travel_detected BOOLEAN
);

-- Index for fast queries
CREATE INDEX idx_login_logs_user_timestamp ON login_logs(user_id, timestamp DESC);
CREATE INDEX idx_login_logs_decision ON login_logs(decision);
```

### External APIs
1. **IP Geolocation:** `http://ip-api.com/json/{ip}` (free, no key required)
   - Returns: city, country, latitude, longitude
   
2. **LLM API:** Claude API (Anthropic) or OpenAI GPT
   - Endpoint: `https://api.anthropic.com/v1/messages` (for Claude)
   - Input: Risk factors as structured prompt
   - Output: Human-readable reason string
   - **Fallback:** Hard-coded reasons if API fails or times out (>2 seconds)

---

## The Three.js Enhancements (Post-Lovable)

### 1. Network Breach Visualization (Opening Hook)
**Location:** Left side of split-screen (Old Security panel)  
**File:** `src/components/NetworkVisualization3D.tsx`

**What It Shows:**
- 3D network diagram: Nodes (spheres) connected by lines (edges)
- OLD SECURITY scenario:
  - One node turns red (compromised)
  - Red "infection" spreads to all connected nodes like a virus
  - Text overlay: "1 STOLEN PASSWORD = FULL BREACH"
- NEW SECURITY scenario:
  - Red node appears but gateway (glowing shield) blocks it
  - Infection tries to spread but fails
  - Text overlay: "ZERO TRUST = ZERO SPREAD"

**Technical Approach:**
- Use R3F `<mesh>` for nodes (SphereGeometry)
- Use R3F `<line>` for edges
- Animate color changes with `useSpring` from @react-spring/three
- Add particle effects for "infection spread" with `Points` geometry

### 2. Impossible Travel Globe (Killer Feature)
**Location:** Center of dashboard (when Scenario 3 is triggered)  
**File:** `src/components/ImpossibleTravelGlobe3D.tsx`

**What It Shows:**
- 3D Earth with realistic textures
- Glowing markers for cities (Lagos, London)
- Animated arc between the two cities
- Distance calculation displayed
- "BLOCKED" stamp animation
- AI-generated reason fades in below

**Technical Approach:**
- Use Drei `<Sphere>` with Earth texture map
- Use `<OrbitControls>` for rotation
- Custom shader for glowing city markers
- Bezier curve for the arc animation (using `TubeGeometry`)
- Country/city data from geolocation API

### 3. Risk Reactor (Live Demo Centerpiece)
**Location:** Right side (New Security panel), replaces circular progress bar  
**File:** `src/components/RiskReactor3D.tsx`

**What It Shows:**
- 3D cylindrical "reactor core" in center
- Risk factors fly in as glowing orbs when scenario is triggered
- Orbs orbit the reactor and stack up
- Reactor color shifts: Blue (safe) → Yellow (medium) → Red (high)
- Energy level rises visually (height of glowing column)
- When HIGH RISK, reactor pulses and triggers block animation

**Technical Approach:**
- Use `CylinderGeometry` for reactor core
- Use `SphereGeometry` for risk factor orbs
- Animate orbs with `useFrame` hook (orbital motion)
- Color interpolation based on risk score
- Add bloom/glow with `@react-three/postprocessing`

### Performance Optimization
```typescript
// Add to each 3D component
const DEMO_MODE = import.meta.env.VITE_DEMO_MODE === 'true';

// Reduce particle counts in demo mode
const particleCount = DEMO_MODE ? 500 : 2000;

// Cap frame rate for stability
useFrame((state, delta) => {
  const cappedDelta = Math.min(delta, 1/30); // Max 30fps
  // ... animation logic
});
```

---

## Demo Scenarios (Built by Lovable, We Enhance)

### Scenario 1: Trusted Employee ✅
**Risk Score:** 15 points  
**Decision:** GRANT  
**Breakdown:**
- Identity: Verified ✅ (+0)
- Device: Known, encrypted, patched ✅ (+0)
- Location: Lagos office, normal time ✅ (+0)
- Behavior: Typical pattern ✅ (+15 for baseline)

**User Experience:** Seamless login, no prompts  
**3D Effect:** Risk reactor stays blue/green, gentle pulse

---

### Scenario 2: New Device ⚠️
**Risk Score:** 25 points  
**Decision:** CHALLENGE  
**Breakdown:**
- Identity: Verified ✅ (+0)
- Device: **New device detected** ⚠️ (+20)
- Location: Lagos (home), evening ⚠️ (+5)
- Behavior: First login from this device

**User Experience:** MFA prompt appears  
**AI Reason:** "Please verify your identity with two-factor authentication because you're logging in from a new device."  
**3D Effect:** Risk reactor turns yellow, one warning orb appears

---

### Scenario 3: Impossible Travel 🚫
**Risk Score:** 70 points  
**Decision:** BLOCK  
**Breakdown:**
- Identity: Verified ✅ (+0)
- Device: Known device ✅ (+0)
- Location: **London, UK** 🚫 (+15 untrusted location)
- Behavior: **Impossible travel detected** 🚫 (+50)
  - Last login: Lagos at 2:15 PM
  - Current login: London at 2:20 PM (5 mins later, 5000km away)
- Session: Suspicious (+5)

**User Experience:** Access blocked immediately  
**AI Reason:** "Access was blocked because you attempted to log in from London just 5 minutes after logging in from Lagos. This is physically impossible and indicates a compromised account. Please contact IT security."  
**3D Effect:** 
- Globe animation shows Lagos → London arc
- Risk reactor turns red, pulses violently
- "BLOCKED" stamp appears

---

### Scenario 4: Compromised Device 🚫
**Risk Score:** 85 points  
**Decision:** BLOCK  
**Breakdown:**
- Identity: Verified ✅ (+0)
- Device: **Multiple security issues** 🚫
  - Disk encryption: OFF (+30)
  - Firewall: Disabled (+20)
  - Antivirus: Outdated (+15)
  - OS patch level: 6 months behind (+10)
- Location: Public Wi-Fi, cafe ⚠️ (+10)
- Behavior: Unusual access time (+0)

**User Experience:** Access blocked  
**AI Reason:** "Access was blocked because your device has critical security issues: disk encryption is disabled, firewall is turned off, and your operating system hasn't been updated in 6 months. Please contact IT to secure your device before accessing sensitive systems."  
**3D Effect:**
- Network visualization shows device (red node) trying to connect
- Gateway shield blocks it with force field effect
- Risk reactor maxes out (red, multiple danger orbs)

---

## The Demo Flow (5-Minute Pitch)

### [0:00-0:30] The Hook
**Script:** "Wema Bank executives, imagine this: Your CFO's laptop is stolen from their car. The thief has the VPN password saved in the browser. What happens next?"

**Visual:** 3D network breach animation plays on left screen  
**Impact:** Silent room, everyone understands the problem instantly

---

### [0:30-2:00] The Solution Overview
**Script:** 
- "Our Smart Access Gateway replaces that broken model with Zero Trust Architecture."
- "Instead of one master key, we have an AI-powered security guard at every door."
- "It asks three questions: WHO are you? WHAT DEVICE are you using? WHERE and WHY are you logging in?"

**Visual:** 
- Split-screen comparison (Old vs New)
- Walk through the three pillars with icons/diagrams

---

### [2:00-3:30] Live Demo (The Magic)
**Script:** "Let me show you how this works in real-time..."

**Actions:**
1. Click "Scenario 1: Trusted Employee"
   - Risk reactor stays calm, shows GRANT decision
   - "See? Frictionless for legitimate users."

2. Click "Scenario 2: New Device"
   - Risk reactor turns yellow, CHALLENGE appears
   - "A new device? We ask for MFA. Smart, not strict."

3. Click "Scenario 3: Impossible Travel" ⭐ **THE SHOWSTOPPER**
   - 3D globe animation: Lagos → London arc
   - Risk reactor goes red, BLOCKED
   - AI-generated reason appears
   - "The system detected impossible travel and blocked the attempt automatically. Your CFO's account is safe."

4. Click "Scenario 4: Compromised Device"
   - Network breach animation shows device being blocked
   - Show the detailed AI reason
   - "And unlike a generic error, our AI explains exactly what's wrong so users can fix it."

---

### [3:30-4:30] The Differentiators
**Script:** 
- "But here's what makes this perfect for Wema Bank..."
- (Click "Audit Log" tab)
- "Every single decision is logged. Every risk factor is recorded."
- (Click "Export Audit Log" button)
- "One click, and you have a CSV ready for CBN compliance audits."
- "This isn't just security. It's security that meets Nigerian banking regulations."

**Visual:** Show the audit log table, then the export success message

---

### [4:30-5:00] The Vision & Ask
**Script:**
- "This is a proof-of-concept, but the path to production is clear."
- "Real device checks via MDM. Real user behavior analytics. Real-time threat intelligence feeds."
- "We're ready to pilot this with Wema Bank in Q1 2025."
- "Instead of a VPN that trusts everyone, you get a gateway that trusts no one but frustrates nobody."

**Visual:** Simple roadmap slide or architecture diagram

**Close:** "Questions?"

---

## Implementation Priorities (Post-Lovable)

### Phase 1: Core Backend (Days 1-2)
**Goal:** Get real risk scoring working

**Tasks:**
1. Set up Supabase project
   - Create database tables
   - Set up auth (email/password)
   - Create 3 demo user accounts

2. Build `check-access` Edge Function
   - Risk scoring algorithm
   - IP geolocation API integration
   - Query login_logs for impossible travel
   - Return decision + reason

3. Connect frontend to backend
   - Replace dummy scenario data with real API calls
   - Update dashboard context to call Supabase
   - Test all 4 scenarios with real backend

**Success Criteria:** Clicking scenarios triggers real backend logic, risk scores are calculated correctly

---

### Phase 2: Three.js Integration (Days 3-4)
**Goal:** Add the three hero visualizations

**Tasks:**
1. Install dependencies
   ```bash
   npm install three @react-three/fiber @react-three/drei @react-three/postprocessing
   ```

2. Build NetworkVisualization3D component
   - Replace TODO comment in Old Security panel
   - Implement node network with spread animation
   - Test performance

3. Build ImpossibleTravelGlobe3D component
   - Replace TODO comment in dashboard
   - Implement Earth with city markers and arc
   - Integrate with Scenario 3 trigger

4. Build RiskReactor3D component
   - Replace circular progress bar in New Security panel
   - Implement reactor with orbital risk orbs
   - Sync animation with risk score changes

**Success Criteria:** All three 3D elements render smoothly at 30+ fps, animations play correctly

---

### Phase 3: AI Enhancement (Day 5)
**Goal:** Add LLM-generated explanations

**Tasks:**
1. Set up Claude API (or OpenAI)
   - Get API key from Anthropic
   - Add to environment variables

2. Build `generateReason` function in Edge Function
   - Format risk factors as prompt
   - Call Claude API with 2-second timeout
   - Fallback to hard-coded reasons on failure

3. Test with all 4 scenarios
   - Verify AI reasons are helpful and accurate
   - Ensure fallback works if API is slow/down

**Success Criteria:** AI-generated reasons appear for all blocked/challenged scenarios, fallback is reliable

---

### Phase 4: Polish & Testing (Day 6)
**Goal:** Make it presentation-ready

**Tasks:**
1. Performance optimization
   - Add DEMO_MODE environment variable
   - Reduce particle counts in demo mode
   - Test on projector-equivalent screen

2. UI polish
   - Smooth all transitions
   - Add loading states
   - Fix any visual bugs

3. Audit log enhancement
   - Populate with realistic dummy data
   - Implement CSV export function
   - Test export functionality

4. Backup demo video
   - Record perfect run-through of all 4 scenarios
   - Save as fallback if live demo fails

**Success Criteria:** Demo runs flawlessly 10 times in a row, backup video exists

---

### Phase 5: Presentation Prep (Day 7)
**Goal:** Nail the delivery

**Tasks:**
1. Write demo script (see "Demo Flow" above)
2. Practice 5-minute pitch 10 times
3. Prepare answers for likely questions:
   - "How much would this cost to deploy?"
   - "What about false positives?"
   - "How do you prevent device fingerprint spoofing?"
   - "What if the AI gives a wrong explanation?"
4. Create 1-page handout with architecture diagram
5. Test on venue equipment if possible

**Success Criteria:** Can deliver pitch confidently without notes, handle Q&A smoothly

---

## Key Technical Details for LLM Implementation

### Environment Variables Needed
```env
# Supabase
VITE_SUPABASE_URL=https://your-project.supabase.co
VITE_SUPABASE_ANON_KEY=your-anon-key

# Claude API (or OpenAI)
ANTHROPIC_API_KEY=sk-ant-...
# OR
OPENAI_API_KEY=sk-...

# Demo mode
VITE_DEMO_MODE=true  # Enable for hackathon demo
```

### Claude API Implementation (For AI Reasons)
```typescript
// In check-access Edge Function
async function generateReason(riskFactors: RiskFactors): Promise<string> {
  const prompt = `You are a security system explaining why access was denied to a bank employee. 

Risk factors detected:
- Device encryption: ${riskFactors.isDiskEncrypted ? 'ON' : 'OFF'}
- Firewall: ${riskFactors.isFirewallActive ? 'Active' : 'Disabled'}
- Location: ${riskFactors.city}, ${riskFactors.country}
- Impossible travel: ${riskFactors.impossibleTravel ? 'YES - logged in from two distant locations in <10 mins' : 'NO'}
- New device: ${riskFactors.isNewDevice ? 'YES' : 'NO'}

Write ONE clear sentence (max 25 words) explaining why access was blocked. Be helpful and specific.`;

  try {
    const response = await fetch('https://api.anthropic.com/v1/messages', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'x-api-key': Deno.env.get('ANTHROPIC_API_KEY'),
        'anthropic-version': '2023-06-01'
      },
      body: JSON.stringify({
        model: 'claude-3-5-sonnet-20241022',
        max_tokens: 100,
        messages: [{
          role: 'user',
          content: prompt
        }]
      }),
      signal: AbortSignal.timeout(2000) // 2-second timeout
    });

    const data = await response.json();
    return data.content[0].text;
  } catch (error) {
    // Fallback to hard-coded reason
    return generateFallbackReason(riskFactors);
  }
}

function generateFallbackReason(factors: RiskFactors): string {
  if (factors.impossibleTravel) {
    return `Access blocked: Login from ${factors.city} detected minutes after login from different location.`;
  }
  if (!factors.isDiskEncrypted && !factors.isFirewallActive) {
    return 'Access blocked: Device has disk encryption disabled and firewall turned off.';
  }
  if (!factors.isDiskEncrypted) {
    return 'Access blocked: Device disk encryption is disabled.';
  }
  if (factors.isNewDevice) {
    return 'Please verify your identity: New device detected.';
  }
  return 'Access blocked due to security policy violation. Contact IT support.';
}
```

### IP Geolocation Implementation
```typescript
async function getGeolocation(ipAddress: string) {
  const response = await fetch(`http://ip-api.com/json/${ipAddress}`);
  const data = await response.json();
  
  return {
    city: data.city,
    country: data.country,
    lat: data.lat,
    lon: data.lon,
    isp: data.isp
  };
}
```

### Impossible Travel Detection Logic
```typescript
async function checkImpossibleTravel(
  userId: string, 
  currentCity: string, 
  currentTime: Date
): Promise<boolean> {
  // Query last login
  const { data: lastLogin } = await supabase
    .from('login_logs')
    .select('city, timestamp')
    .eq('user_id', userId)
    .order('timestamp', { ascending: false })
    .limit(1)
    .single();

  if (!lastLogin) return false;

  const timeDiff = (currentTime.getTime() - new Date(lastLogin.timestamp).getTime()) / 1000 / 60; // minutes
  
  // If different city and less than 30 minutes, flag as impossible
  if (lastLogin.city !== currentCity && timeDiff < 30) {
    return true;
  }

  return false;
}
```

---

## Success Metrics (How We Win)

### Technical Excellence
- ✅ All 4 scenarios work flawlessly in live demo
- ✅ Three.js animations run at 30+ fps
- ✅ AI-generated reasons are accurate and helpful
- ✅ Backend responds in <500ms for risk scoring
- ✅ Zero crashes during 5-minute demo

### Presentation Impact
- ✅ Judges remember our demo 1 hour later ("the globe one")
- ✅ At least 3 questions during Q&A (shows engagement)
- ✅ Wema Bank execs nod during CBN compliance part
- ✅ Other teams compliment our visuals

### Business Viability
- ✅ Clear path to production explained
- ✅ Cost estimate provided if asked ($X/user/month SaaS model)
- ✅ Pilot program timeline proposed (Q1 2025)
- ✅ Competitive advantage articulated (AI + compliance)

---

## Contingency Plans

### If Three.js Takes Too Long
- **Fallback:** Use the Lovable UI as-is (it's already polished)
- **Compromise:** Implement only the Risk Reactor (easiest one)
- **Nuclear Option:** Show static 3D screenshots + backup video

### If Supabase Backend Isn't Ready
- **Fallback:** Use mock data in frontend (already built by Lovable)
- **Demo Approach:** "This is running on simulated data, but in production..."

### If LLM API Fails During Demo
- **Mitigation:** 2-second timeout + fallback reasons (already built in)
- **Script:** "And if the AI is slow, we have instant fallback explanations"

### If Demo Laptop/Projector Fails
- **Backup:** Have backup laptop with identical setup
- **Nuclear Option:** Show backup video on phone/tablet if needed

---

## Post-Hackathon Roadmap (For Pitch)

### Phase 1: MVP (Months 1-2)
- Replace simulated device checks with real MDM integration
- Implement real MFA (SMS/TOTP/Push)
- Add session management and token refresh
- Deploy to production Supabase instance

### Phase 2: Pilot (Months 3-4)
- Deploy for 50-100 Wema Bank employees
- Integrate with one internal app (e.g., Payroll)
- Collect feedback and tune risk thresholds
- Generate compliance reports for CBN

### Phase 3: Scale (Months 5-6)
- Expand to all employees
- Integrate with all sensitive apps
- Add admin dashboard for security team
- Implement threat intelligence feeds

### Pricing Model (If Asked)
- **Per-User SaaS:** ₦2,000-5,000/user/month
- **Enterprise:** Custom pricing for banks (₦5M-20M/year)
- **Compare to:** VPN costs (₦50k-500k/year) + breach costs (₦50M-500M)

---

## The Winning Narrative

**Opening:** "Traditional security says: Trust everyone inside the castle walls. Zero Trust says: Verify everyone, every time."

**Middle:** "We built a system that's smarter than a password, gentler than a security guard, and compliant with CBN regulations."

**Close:** "Wema Bank, you've seen the problem. You've seen our solution. Let's build the future of banking security together."

---

## Important Notes for LLM Assistant

1. **Always prioritize demo reliability** over perfect code
2. **Visual impact > Technical complexity** for hackathon judging
3. **The Three.js is optional but high-impact** - if time runs out, Lovable UI is sufficient
4. **The CBN compliance angle is our secret weapon** - emphasize it heavily
5. **Practice the demo flow** - the story matters as much as the tech
6. **Have backup plans for everything** - Murphy's Law applies to demos

---

## Questions the LLM Should Be Ready to Answer

- How do I integrate the Supabase backend with the Lovable frontend?
- How do I implement the Three.js network visualization?
- How do I build the impossible travel detection logic?
- How do I integrate the Claude API for AI reasons?
- How do I optimize Three.js performance for the demo?
- How do I implement the CSV export functionality?
- How should I structure the pitch/demo script?
- What are good answers to tough questions from judges?

---

**End of Context Document**  
**Version:** 1.0  
**Last Updated:** October 20, 2025  
**Status:** Ready for implementation post-Lovable