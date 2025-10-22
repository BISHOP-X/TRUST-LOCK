-- Update demo_users with consistent device fingerprints and IP addresses for testing
-- These values match the Login.tsx DEMO_ACCOUNTS configuration

-- Alice: Trusted employee - Everything matches (GRANTED scenario)
UPDATE demo_users
SET 
  trusted_device_fingerprint = 'device_alice_trusted_2024',
  trusted_ip = '197.210.76.45',  -- Lagos IP (your likely IP during demo)
  trusted_city = 'Lagos',
  trusted_country = 'Nigeria'
WHERE email = 'alice@company.com';

-- Bob: New device - Device fingerprint WON'T match (CHALLENGE scenario)
UPDATE demo_users
SET 
  trusted_device_fingerprint = 'device_bob_original_2023',  -- Different from login
  trusted_ip = '197.210.76.45',  -- Same IP
  trusted_city = 'Lagos',
  trusted_country = 'Nigeria'
WHERE email = 'bob@company.com';

-- Carol: Impossible travel - For this to work, we need a previous login
-- Device matches but location will be different
UPDATE demo_users
SET 
  trusted_device_fingerprint = 'device_carol_trusted_2024',
  trusted_ip = '81.2.69.142',  -- London IP (different from actual)
  trusted_city = 'London',
  trusted_country = 'United Kingdom'
WHERE email = 'carol@company.com';

-- David: Compromised device - Special case handled in Edge Function
UPDATE demo_users
SET 
  trusted_device_fingerprint = 'device_david_original',  -- Different from login
  trusted_ip = '197.210.76.45',
  trusted_city = 'Lagos',
  trusted_country = 'Nigeria'
WHERE email = 'david@company.com';

-- Insert a fake "previous login" for Carol to trigger impossible travel detection
-- This login happened 45 minutes ago from London
INSERT INTO login_logs (
  email,
  user_id,
  ip_address,
  user_agent,
  device_fingerprint,
  city,
  country,
  latitude,
  longitude,
  risk_score,
  decision,
  risk_factors,
  ai_reason,
  is_trusted_device,
  is_impossible_travel,
  travel_distance_km,
  time_since_last_login_minutes,
  created_at
)
SELECT
  'carol@company.com',
  id,
  '81.2.69.142',  -- London IP
  'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36',
  'device_carol_trusted_2024',
  'London',
  'United Kingdom',
  51.5074,  -- London coordinates
  -0.1278,
  15,
  'GRANTED',
  '[]'::jsonb,
  'Previous login from London office.',
  true,
  false,
  0,
  0,
  NOW() - INTERVAL '45 minutes'  -- 45 minutes ago
FROM demo_users
WHERE email = 'carol@company.com'
AND NOT EXISTS (
  SELECT 1 FROM login_logs WHERE email = 'carol@company.com'
);
