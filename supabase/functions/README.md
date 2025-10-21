# Supabase Edge Functions

## Setup Instructions

### 1. Install Supabase CLI

```bash
# Windows (PowerShell)
scoop install supabase

# Or download from: https://github.com/supabase/cli/releases
```

### 2. Login to Supabase

```bash
supabase login
```

### 3. Link to Your Project

```bash
supabase link --project-ref sqwmkszppxqqvyyzdfox
```

### 4. Deploy the Edge Function

```bash
supabase functions deploy check-access
```

### 5. Set Environment Variables

The Edge Function needs access to these environment secrets (they're automatically available in Supabase):

- `SUPABASE_URL` - Your Supabase project URL (auto-provided)
- `SUPABASE_SERVICE_ROLE_KEY` - Service role key (auto-provided)

## Edge Function: check-access

**Endpoint:** `https://sqwmkszppxqqvyyzdfox.supabase.co/functions/v1/check-access`

### Request Format

```json
{
  "email": "alice@company.com",
  "password": "demo",
  "ip": "197.210.76.45",
  "userAgent": "Mozilla/5.0 ...",
  "deviceFingerprint": "device_abc123"
}
```

### Response Format

```json
{
  "decision": "GRANTED" | "CHALLENGE" | "BLOCKED",
  "reason": "AI-generated explanation...",
  "riskScore": 15,
  "riskFactors": [
    {
      "name": "Identity Verified",
      "status": "success",
      "points": 0,
      "label": "✅ Credentials Valid"
    }
  ]
}
```

## How It Works

### 1. **Query demo_users**
   - Looks up user by email
   - Returns 401 if user not found

### 2. **Validate Password**
   - Checks if password === 'demo' (all demo accounts)
   - Returns 401 if incorrect

### 3. **Get IP Geolocation**
   - Calls `http://ip-api.com/json/{ip}` (free API)
   - Extracts city, country, latitude, longitude

### 4. **Calculate Risk Score**
   - **Base Score:** 50
   - **Device Match:** -35 points
   - **IP/City Match:** -20 points
   - **New Device:** +15 points
   - **Different Country:** +20 points
   - **Impossible Travel:** +50 points

### 5. **Impossible Travel Detection**
   - Queries last login from `login_logs` table
   - Calculates distance between locations (Haversine formula)
   - Checks if travel time is physically possible (900 km/h max speed)
   - Flags if distance > time allows

### 6. **Pick AI Reason**
   - Randomly selects from hardcoded library based on risk category:
     - `trustedDevice` - Low risk, all pillars passed
     - `newDevice` - Medium risk, unknown device
     - `impossibleTravel` - High risk, geographic anomaly
     - `compromisedDevice` - Critical risk, security failures
     - `differentCountry` - Medium risk, unexpected location

### 7. **Determine Decision**
   - **0-30 points:** GRANTED (green)
   - **31-60 points:** CHALLENGE (yellow)
   - **61-100 points:** BLOCKED (red)

### 8. **Write to login_logs**
   - Inserts new row with all analysis data
   - Triggers real-time update to dashboard via Supabase subscriptions

### 9. **Return to Client**
   - Sends decision + reason + risk score + factors
   - Login page displays result to user

## Special Demo Logic

- **alice@company.com** - Trusted employee (all checks pass → GRANTED)
- **bob@company.com** - New device detected → CHALLENGE
- **carol@company.com** - Impossible travel (simulate by logging in twice rapidly) → BLOCKED
- **david@company.com** - Hardcoded compromised device scenario → BLOCKED

## Testing Locally

```bash
# Serve function locally
supabase functions serve check-access

# Test with curl
curl -i --location --request POST 'http://localhost:54321/functions/v1/check-access' \
  --header 'Authorization: Bearer YOUR_ANON_KEY' \
  --header 'Content-Type: application/json' \
  --data '{"email":"alice@company.com","password":"demo","ip":"197.210.76.45","userAgent":"Mozilla/5.0","deviceFingerprint":"trusted_fingerprint_alice"}'
```

## Production Deployment

Once deployed, your login page will call:
```
POST https://sqwmkszppxqqvyyzdfox.supabase.co/functions/v1/check-access
```

With the `Authorization: Bearer <ANON_KEY>` header from your `.env` file.
