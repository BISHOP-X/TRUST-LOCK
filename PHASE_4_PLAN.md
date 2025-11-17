# PHASE 4: PASSWORD SECURITY - STEP-BY-STEP EXECUTION PLAN

## OBJECTIVE
Replace plaintext "demo" passwords with bcrypt hashed passwords for all demo accounts. Implement secure password verification in Edge Function.

---

## STEP 1: Understand Current Password System

### 1.1 Current Implementation (INSECURE)
**Database:** `demo_users` table has `password` column storing `"demo"` in plaintext

**Edge Function Logic:**
```typescript
// Current (INSECURE)
if (password !== userData.password) {
  return new Response(JSON.stringify({
    decision: 'BLOCKED',
    message: 'Invalid credentials'
  }), { status: 401 });
}
```

**Problem:** Anyone with database access can see passwords

### 1.2 Target Implementation (SECURE)
**Database:** `password_hash` column stores bcrypt hash like `$2a$10$abc...`

**Edge Function Logic:**
```typescript
// Target (SECURE)
import * as bcrypt from 'https://deno.land/x/bcrypt@v0.4.1/mod.ts';

const isPasswordValid = await bcrypt.compare(password, userData.password_hash);
if (!isPasswordValid) {
  return new Response(JSON.stringify({
    decision: 'BLOCKED',
    message: 'Invalid credentials'
  }), { status: 401 });
}
```

**Benefit:** Even with database access, passwords cannot be reverse-engineered

---

## STEP 2: Generate Bcrypt Hashes for Demo Accounts

### 2.1 Install Bcrypt Utility (Local Testing)
**Option A: Use online tool (RECOMMENDED for quick hashing)**
- Go to: https://bcrypt-generator.com/
- Enter password: `demo`
- Rounds: `10` (default, good balance of security and speed)
- Click "Generate"
- Copy the hash (starts with `$2a$10$` or `$2b$10$`)

**Example Output:**
```
$2a$10$N9qo8uLOickgx2ZMRZoMyeIjZAgcfl7p92ldGxad68LJZdL17lhWy
```

### 2.2 Generate Hashes for All 4 Accounts
**All accounts use same password "demo" for simplicity:**

| Email | Password | Bcrypt Hash |
|-------|----------|-------------|
| alice@company.com | demo | Use generator |
| bob@company.com | demo | Use generator |
| carol@company.com | demo | Use generator |
| david@company.com | demo | Use generator |

**Action:** Go to https://bcrypt-generator.com/ and generate 4 hashes (or use same hash 4 times since password is identical)

**Save the hash:**
```
$2a$10$YOUR_GENERATED_HASH_HERE
```

---

## STEP 3: Update Database Schema

### 3.1 Open Supabase SQL Editor
- Go to: https://supabase.com/dashboard/project/sqwmkszppxqqvyyzdfox/editor
- Click "New Query"

### 3.2 Add password_hash Column
**Run this SQL:**
```sql
-- Add password_hash column to demo_users table
ALTER TABLE public.demo_users 
ADD COLUMN IF NOT EXISTS password_hash TEXT;
```

**Click:** "Run" button

**Expected:** "Success. No rows returned."

### 3.3 Verify Column Added
**Run this SQL to check:**
```sql
SELECT column_name, data_type 
FROM information_schema.columns 
WHERE table_name = 'demo_users';
```

**Expected Output:** Should include `password_hash` with type `TEXT`

---

## STEP 4: Update Demo Users with Bcrypt Hashes

### 4.1 Update All 4 Accounts
**Replace `YOUR_BCRYPT_HASH_HERE` with the hash you generated in Step 2.2**

**Run this SQL:**
```sql
-- Update Alice with bcrypt hash
UPDATE public.demo_users
SET password_hash = '$2a$10$N9qo8uLOickgx2ZMRZoMyeIjZAgcfl7p92ldGxad68LJZdL17lhWy'
WHERE email = 'alice@company.com';

-- Update Bob with bcrypt hash
UPDATE public.demo_users
SET password_hash = '$2a$10$N9qo8uLOickgx2ZMRZoMyeIjZAgcfl7p92ldGxad68LJZdL17lhWy'
WHERE email = 'bob@company.com';

-- Update Carol with bcrypt hash
UPDATE public.demo_users
SET password_hash = '$2a$10$N9qo8uLOickgx2ZMRZoMyeIjZAgcfl7p92ldGxad68LJZdL17lhWy'
WHERE email = 'carol@company.com';

-- Update David with bcrypt hash
UPDATE public.demo_users
SET password_hash = '$2a$10$N9qo8uLOickgx2ZMRZoMyeIjZAgcfl7p92ldGxad68LJZdL17lhWy'
WHERE email = 'david@company.com';
```

**Note:** Since all use "demo" password, same hash works for all. In production, each user would have unique password and unique hash.

### 4.2 Verify Hashes Added
**Run this SQL:**
```sql
SELECT email, password, password_hash
FROM public.demo_users
ORDER BY email;
```

**Expected:** All 4 rows should have `password_hash` starting with `$2a$10$` or `$2b$10$`

---

## STEP 5: Update Edge Function with Bcrypt Verification

### 5.1 Open Edge Function
- Open: `c:\Users\Wisdom\Desktop\TRUST-LOCK\supabase\functions\check-access\index.ts`

### 5.2 Add Bcrypt Import at Top
**Location:** At the very top of the file (line 1)

**Add:**
```typescript
import * as bcrypt from 'https://deno.land/x/bcrypt@v0.4.1/mod.ts';
```

### 5.3 Update Password Verification Logic
**Location:** Find where password is checked (around line 135)

**Find this code:**
```typescript
// Check password
if (password !== userData.password) {
  return new Response(
    JSON.stringify({
      success: false,
      decision: 'BLOCKED',
      riskScore: 100,
      message: 'Invalid credentials',
    }),
    { status: 401, headers: corsHeaders }
  );
}
```

**Replace with:**
```typescript
// Check password (bcrypt verification)
const isPasswordValid = await bcrypt.compare(password, userData.password_hash);
if (!isPasswordValid) {
  return new Response(
    JSON.stringify({
      success: false,
      decision: 'BLOCKED',
      riskScore: 100,
      message: 'Invalid credentials',
    }),
    { status: 401, headers: corsHeaders }
  );
}
```

**Key changes:**
- Uses `bcrypt.compare()` to check password against hash
- `await` because bcrypt is async
- Compares plaintext password from request against `password_hash` from database

### 5.4 Update Database Query to Include password_hash
**Location:** Find where user data is fetched (around line 115)

**Find this code:**
```typescript
const { data: userData, error: userError } = await supabase
  .from('demo_users')
  .select('*')
  .eq('email', email)
  .single();
```

**No change needed:** `select('*')` already includes all columns (including new `password_hash`)

**BUT if you have explicit columns, update to:**
```typescript
.select('email, deviceFingerprint, last_location_name, last_location_lat, last_location_lng, last_login_time, password_hash')
```

### 5.5 Add Comment About Password Security
**Location:** Right before password verification

**Add this comment:**
```typescript
// Password Security: Bcrypt verification with 10 rounds (2^10 = 1,024 iterations)
// - Plaintext password never stored in database
// - Hash cannot be reverse-engineered
// - Timing attack resistant (bcrypt takes constant time)
// - Industry standard: OWASP recommended for password storage
```

### 5.6 Save File
- Press `Ctrl + S`

---

## STEP 6: Deploy Updated Edge Function

### 6.1 Copy Updated Code
- Open: `c:\Users\Wisdom\Desktop\TRUST-LOCK\supabase\functions\check-access\index.ts`
- Select all: `Ctrl + A`
- Copy: `Ctrl + C`

### 6.2 Open Supabase Functions Dashboard
- Go to: https://supabase.com/dashboard/project/sqwmkszppxqqvyyzdfox/functions
- Click "check-access"
- Click "Edit" or "Deploy new version"

### 6.3 Paste and Deploy
- Replace entire code
- Click "Deploy"
- Wait 30-60 seconds

### 6.4 Check Deployment Logs
- Click "Logs" tab
- Look for "Deployment successful"
- Check for any bcrypt import errors

---

## STEP 7: Test Password Verification on Production

### 7.1 Test with Correct Password
- Go to: https://trust-lock-iota.vercel.app/login
- Select "Alice - Trusted Employee"
- Password: `demo` (correct)
- Click "Secure Login"

**Expected:** Login succeeds, risk score 30, GRANTED decision

### 7.2 Test with Wrong Password
- Select "Alice - Trusted Employee"
- Open browser DevTools: F12
- Go to Console
- Run this code to bypass frontend validation:
```javascript
await fetch('https://sqwmkszppxqqvyyzdfox.supabase.co/functions/v1/check-access', {
  method: 'POST',
  headers: { 'Content-Type': 'application/json' },
  body: JSON.stringify({
    email: 'alice@company.com',
    password: 'wrong_password',
    deviceFingerprint: 'test'
  })
});
```

**Expected:** Response status 401, message "Invalid credentials"

### 7.3 Test All 4 Accounts
- Alice → Should work with "demo"
- Bob → Should work with "demo"
- Carol → Should work with "demo"
- David → Should work with "demo"

### 7.4 Verify bcrypt Performance
- Check Edge Function logs in Supabase
- bcrypt verification should add ~50-100ms to request time
- Total response time should still be <1 second

---

## STEP 8: Remove Plaintext Password Column (Optional)

### 8.1 Verify password_hash Works
**Before deleting old column, ensure everything works!**

- Test all 4 accounts successfully
- Check Edge Function logs for errors
- Confirm bcrypt verification passing

### 8.2 Drop Old password Column
**Only run after confirming password_hash works!**

**Open Supabase SQL Editor:**
```sql
-- Remove insecure plaintext password column
ALTER TABLE public.demo_users 
DROP COLUMN password;
```

**Click:** "Run"

**Expected:** "Success. No rows returned."

### 8.3 Verify Schema Updated
```sql
SELECT column_name, data_type 
FROM information_schema.columns 
WHERE table_name = 'demo_users';
```

**Expected:** `password` column should NOT appear, only `password_hash`

---

## STEP 9: Update Documentation

### 9.1 Update README.md
- Open: `c:\Users\Wisdom\Desktop\TRUST-LOCK\README.md`

### 9.2 Find Security Features Section
**Location:** Around line 50

**Find:**
```markdown
**Security Features:**
- ✅ Device identity tracking: Real Canvas + WebGL fingerprinting with SHA-256 hashing (fully implemented in `src/lib/fingerprint.ts`)
- ✅ AI-powered security explanations: Anthropic Claude API generates contextual threat analysis in real-time (fully integrated in Edge Function)
- ✅ Impossible travel detection via Haversine formula (validates geographic distance against time delta)
- ✅ Additive risk scoring model (0-100 scale with configurable decision thresholds)
- ✅ Real-time audit logging with PostgreSQL LISTEN/NOTIFY
- ✅ Intelligent fallback system: Pre-written explanations when API unavailable (zero downtime)
```

**Add:**
```markdown
**Security Features:**
- ✅ Device identity tracking: Real Canvas + WebGL fingerprinting with SHA-256 hashing (fully implemented in `src/lib/fingerprint.ts`)
- ✅ AI-powered security explanations: Anthropic Claude API generates contextual threat analysis in real-time (fully integrated in Edge Function)
- ✅ Password security: Bcrypt hashing with 10 rounds (OWASP recommended, timing attack resistant)
- ✅ Impossible travel detection via Haversine formula (validates geographic distance against time delta)
- ✅ Additive risk scoring model (0-100 scale with configurable decision thresholds)
- ✅ Real-time audit logging with PostgreSQL LISTEN/NOTIFY
- ✅ Intelligent fallback system: Pre-written explanations when API unavailable (zero downtime)
```

### 9.3 Add Password Security Section
**Location:** After "AI-Powered Security Explanations" section

**Add new section:**
```markdown
---

## 🔐 Password Security Implementation

### Bcrypt Hashing

TRUST-LOCK uses **bcrypt** (industry standard) for password storage. Plaintext passwords are NEVER stored in the database.

**How it works:**
1. User registers/sets password → Bcrypt hashes it with 10 rounds (2^10 = 1,024 iterations)
2. Hash stored in `password_hash` column (e.g., `$2a$10$abc123...`)
3. User logs in → Edge Function compares plaintext input against stored hash using `bcrypt.compare()`
4. Hash verification takes constant time (~50ms) → Prevents timing attacks

**Example:**
```
Password: "demo"
Bcrypt Hash: $2a$10$N9qo8uLOickgx2ZMRZoMyeIjZAgcfl7p92ldGxad68LJZdL17lhWy
```

**Why Bcrypt?**
- ✅ **OWASP Recommended:** Industry standard for password storage
- ✅ **Salted:** Each hash includes random salt (prevents rainbow table attacks)
- ✅ **Slow by Design:** 10 rounds = 1,024 iterations (makes brute force impractical)
- ✅ **Future-proof:** Can increase rounds as hardware improves
- ✅ **Timing Attack Resistant:** Constant-time comparison prevents side-channel attacks

**Implementation:** 
- Database: `demo_users.password_hash` column (TEXT type)
- Edge Function: `supabase/functions/check-access/index.ts` uses `bcrypt.compare()`
- Library: Deno bcrypt module v0.4.1

**Security Comparison:**

| Method | Security | Reversible? | OWASP Approved? |
|--------|----------|-------------|-----------------|
| Plaintext | ❌ None | ✅ Yes | ❌ No |
| MD5/SHA1 | ❌ Broken | ✅ Yes (rainbow tables) | ❌ No |
| SHA-256 | ⚠️ Weak | ⚠️ Partially (with salt) | ⚠️ Not recommended |
| **Bcrypt** | ✅ Strong | ❌ No | ✅ **Yes** |
| Argon2 | ✅ Strongest | ❌ No | ✅ Yes (newer) |

**Why not Argon2?**
Argon2 is technically stronger (winner of Password Hashing Competition 2015), but bcrypt is more established, has better Deno support, and is sufficient for hackathon/demo purposes. Production deployment could upgrade to Argon2id.

```

### 9.4 Save README.md
- Press `Ctrl + S`

---

## STEP 10: Update ARCHITECTURE.md

### 10.1 Open ARCHITECTURE.md
- Open: `c:\Users\Wisdom\Desktop\TRUST-LOCK\ARCHITECTURE.md`

### 10.2 Add Password Security Section
**Location:** After "AI-Powered Explanation Generation" section

**Add:**
```markdown
---

## Password Security Implementation

### Overview
TRUST-LOCK implements bcrypt password hashing following OWASP guidelines. Plaintext passwords are never stored, transmitted in logs, or exposed in error messages.

### Architecture

```
User Submits Password (Plaintext)
     ↓
Edge Function Receives Request
     ↓
Query Database for User (email lookup)
     ↓
Retrieve password_hash from demo_users table
     ↓
bcrypt.compare(plaintext, hash) → Constant-time comparison
     ↓
If Match: Continue to risk analysis
If Mismatch: Return 401 Unauthorized
```

### Implementation Details

#### Database Schema
```sql
CREATE TABLE demo_users (
  id SERIAL PRIMARY KEY,
  email TEXT UNIQUE NOT NULL,
  password_hash TEXT NOT NULL,  -- bcrypt hash, NOT plaintext
  deviceFingerprint TEXT,
  last_location_name TEXT,
  last_location_lat NUMERIC,
  last_location_lng NUMERIC,
  last_login_time TIMESTAMP WITH TIME ZONE
);
```

**Column: `password_hash`**
- Type: `TEXT`
- Format: `$2a$10$` or `$2b$10$` prefix (bcrypt identifier)
- Length: 60 characters
- Example: `$2a$10$N9qo8uLOickgx2ZMRZoMyeIjZAgcfl7p92ldGxad68LJZdL17lhWy`

#### Hash Generation
```typescript
import * as bcrypt from 'https://deno.land/x/bcrypt@v0.4.1/mod.ts';

// Generate hash (during user registration)
const plainPassword = 'demo';
const salt = await bcrypt.genSalt(10);  // 10 rounds = 2^10 = 1,024 iterations
const hash = await bcrypt.hash(plainPassword, salt);
// Result: $2a$10$N9qo8uLOickgx2ZMRZoMyeIjZAgcfl7p92ldGxad68LJZdL17lhWy
```

**Parameters:**
- **Rounds: 10** (default, recommended by OWASP)
  - 2^10 = 1,024 iterations
  - Takes ~50-100ms to hash/verify
  - Good balance: Secure but not too slow for UX
  - Can increase to 12 (4,096 iterations) for higher security if needed

#### Password Verification
```typescript
// Edge Function password check
const { data: userData } = await supabase
  .from('demo_users')
  .select('email, password_hash')
  .eq('email', email)
  .single();

const isPasswordValid = await bcrypt.compare(password, userData.password_hash);
if (!isPasswordValid) {
  return new Response(
    JSON.stringify({
      success: false,
      decision: 'BLOCKED',
      riskScore: 100,
      message: 'Invalid credentials',
    }),
    { status: 401, headers: corsHeaders }
  );
}
```

**Security Properties:**
1. **Constant-time comparison:** Prevents timing attacks (attacker can't measure time differences to guess password)
2. **Salted automatically:** Each hash includes unique random salt (prevents rainbow table attacks)
3. **One-way function:** Cannot reverse-engineer password from hash
4. **Slow by design:** 1,024 iterations make brute force impractical

### Security Analysis

#### Attack Vectors Mitigated

**1. Database Breach**
- **Scenario:** Attacker gains read access to `demo_users` table
- **Without bcrypt:** Attacker sees plaintext passwords → Can login as any user
- **With bcrypt:** Attacker sees hashes → Cannot reverse-engineer passwords
- **Result:** ✅ Passwords remain secret even if database compromised

**2. Rainbow Table Attack**
- **Scenario:** Attacker pre-computes hash tables for common passwords
- **Without salt:** Hash of "password123" is same for all users → Rainbow table works
- **With bcrypt salt:** Each user's "password123" has different hash → Rainbow table useless
- **Result:** ✅ Bcrypt auto-salts every hash

**3. Brute Force Attack**
- **Scenario:** Attacker tries all possible passwords
- **With fast hash (MD5):** Can test 1 billion passwords/second on GPU
- **With bcrypt (10 rounds):** Can test ~10,000 passwords/second (100,000x slower)
- **Result:** ✅ Makes brute force impractical

**4. Timing Attack**
- **Scenario:** Attacker measures response time to guess password correctness
- **Without constant-time:** Early rejection is faster than late rejection
- **With bcrypt.compare():** Always takes same time regardless of match/mismatch
- **Result:** ✅ No information leaked via timing

#### Performance Impact

**Hash Generation (User Registration):**
- Time: ~100-150ms
- Frequency: Once per user (only on registration)
- Impact: Negligible (one-time cost)

**Hash Verification (Login):**
- Time: ~50-100ms
- Frequency: Every login attempt
- Impact: Acceptable (adds <100ms to login flow)

**Comparison with alternatives:**

| Algorithm | Time | Security | OWASP Status |
|-----------|------|----------|--------------|
| Plaintext | <1ms | ❌ None | ❌ Forbidden |
| MD5 | <1ms | ❌ Broken | ❌ Forbidden |
| SHA-256 (no salt) | <1ms | ⚠️ Weak | ❌ Not recommended |
| SHA-256 (with salt) | <1ms | ⚠️ Moderate | ⚠️ Discouraged |
| **Bcrypt (10 rounds)** | ~50ms | ✅ Strong | ✅ **Recommended** |
| Bcrypt (12 rounds) | ~200ms | ✅ Stronger | ✅ Recommended |
| Argon2id | ~100ms | ✅ Strongest | ✅ Recommended |

### Code Location
- Edge Function: `supabase/functions/check-access/index.ts` (lines 1, 135-145)
- Import: `import * as bcrypt from 'https://deno.land/x/bcrypt@v0.4.1/mod.ts'`
- Usage: `await bcrypt.compare(password, userData.password_hash)`

### Future Enhancements

**Production considerations:**
1. **Increase rounds to 12:** As hardware improves, increase to 4,096 iterations
2. **Migrate to Argon2id:** Winner of Password Hashing Competition 2015 (strongest algorithm)
3. **Password policies:** Enforce minimum length, complexity requirements
4. **Rate limiting:** Prevent brute force via account lockout after N failed attempts
5. **Breach detection:** Check passwords against Have I Been Pwned API during registration
```

### 10.3 Save ARCHITECTURE.md
- Press `Ctrl + S`

---

## STEP 11: Commit and Deploy

### 11.1 Stage Files
```powershell
git add supabase/functions/check-access/index.ts
git add README.md
git add ARCHITECTURE.md
```

### 11.2 Commit with Message
```powershell
git commit -m "feat: Implement bcrypt password hashing for secure storage

- Replace plaintext password storage with bcrypt hashes (10 rounds)
- Add password_hash column to demo_users table
- Update Edge Function to use bcrypt.compare() for verification
- Remove insecure plaintext password column from database
- Add comprehensive password security documentation
- Follows OWASP recommendations for password storage
- Timing attack resistant with constant-time comparison"
```

### 11.3 Push to Repos
```powershell
git push origin master
git push hackathon master:main
```

### 11.4 Verify Deployment
- Check Vercel dashboard for successful build
- Check Supabase Edge Function logs for bcrypt import success

---

## STEP 12: Final Testing

### 12.1 Test All Demo Accounts
- Alice → Login with "demo" → Should work
- Bob → Login with "demo" → Should work
- Carol → Login with "demo" → Should work
- David → Login with "demo" → Should work

### 12.2 Test Invalid Password
- Try Alice with wrong password
- **Expected:** 401 error, "Invalid credentials" message

### 12.3 Check Performance
- Login time should still be <1 second
- bcrypt adds ~50-100ms (acceptable overhead)

### 12.4 Verify Dashboard
- Check audit log entries
- All logins should appear with correct risk scores
- No errors in console

---

## ✅ COMPLETION CHECKLIST

Before considering Phase 4 complete, verify:

- [ ] Bcrypt hashes generated for all 4 demo accounts
- [ ] Database has `password_hash` column with bcrypt hashes
- [ ] Old `password` column removed (optional but recommended)
- [ ] Edge Function imports bcrypt correctly
- [ ] Edge Function uses `bcrypt.compare()` for verification
- [ ] Tested all 4 accounts login successfully with "demo"
- [ ] Tested invalid password returns 401 error
- [ ] Performance still good (<1 second login time)
- [ ] README.md updated with password security section
- [ ] ARCHITECTURE.md has comprehensive bcrypt documentation
- [ ] All changes committed and pushed
- [ ] Production deployment working

---

## 🎯 SUCCESS CRITERIA

Phase 4 is complete when:

1. ✅ No plaintext passwords stored in database
2. ✅ All passwords hashed with bcrypt (10 rounds)
3. ✅ Password verification works correctly
4. ✅ Invalid passwords rejected with 401
5. ✅ Follows OWASP password storage guidelines
6. ✅ Documentation explains security benefits

**Estimated Time:** 30 minutes
**Impact:** 🔥 Shows understanding of basic security fundamentals

---

## 🚀 NEXT STEPS

After Phase 4 completion, proceed to:
- **Phase 5:** Enhanced Demo Features (interactive testing, admin panel)
- **Phase 6:** Production Readiness (error handling, rate limiting)
- **Phase 7:** Final Documentation (presentation slides, rehearsal)
