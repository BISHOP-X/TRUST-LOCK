import { serve } from 'https://deno.land/std@0.168.0/http/server.ts';
import { createClient } from 'https://esm.sh/@supabase/supabase-js@2.39.0';

// AI-generated security explanations for each risk category (SIMULATED FOR DEM, WILL USE REAL AI API IN PRODUCTION)
const AI_REASONS = {
  trustedDevice: [
    "All verification pillars passed. Device fingerprint matches trusted registry, IP geolocation confirms expected Lagos office location, and behavioral patterns align with normal working hours.",
    "Identity verified through credential match. Device recognized from previous sessions. Location data consistent with employee's registered work site. Access granted with confidence score of 95%.",
    "Comprehensive security analysis complete: Known device signature detected, trusted IP range confirmed, standard business hours access pattern. Zero anomalies detected across all security pillars.",
  ],
  newDevice: [
    "Credentials validated but device fingerprint unknown. Recommendation: Challenge with 2FA to establish new trusted device in registry before granting full access privileges.",
    "Identity pillar verified successfully, however device signature does not match historical records. Additional verification recommended before granting access to sensitive resources.",
    "Valid credentials detected from unrecognized device. Security policy requires multi-factor authentication challenge to verify user identity and establish device trust relationship.",
  ],
  impossibleTravel: [
    "Analysis detected login attempt from London (51.5074°N, 0.1278°W) just 45 minutes after authenticated session in Lagos (6.5244°N, 3.3792°E). Physical travel distance of 5,046 km cannot be covered in given timeframe, indicating credential compromise or session hijacking.",
    "Geolocation anomaly: Previous login Lagos, Nigeria at 09:15 WAT. Current attempt London, UK at 09:52 GMT. Travel time insufficient for 5,000+ km distance. High probability of stolen credentials. Immediate account lockdown recommended.",
    "Impossible travel pattern detected. User authenticated from Lagos, Nigeria 30 minutes prior. Current login originates from London, United Kingdom. Geographic distance and time delta physically impossible. Security breach highly likely.",
  ],
  compromisedDevice: [
    "Device security scan reveals multiple integrity failures: outdated OS patch level, presence of known malware signatures, and disabled firewall. Device pillar compromised. Access denied until device remediation completed.",
    "Critical device violations detected: 3 failed security checks including missing antivirus software, suspicious background processes, and compromised system files. Risk score exceeds acceptable threshold. Administrative intervention required.",
    "Device health assessment failed. Security analysis identified disabled endpoint protection, outdated security patches (45+ days overdue), and public WiFi connection from high-risk location. Access blocked per security policy.",
  ],
  differentCountry: [
    "Login attempt from different country detected. User's trusted location is Nigeria, current attempt originates from United Kingdom. While credentials are valid, geographic anomaly requires additional verification.",
    "Location pillar flagged: Expected location Nigeria, detected location United Kingdom. Cross-border access requires enhanced authentication. Challenge initiated per security policy.",
  ],
};

// Helper function to calculate distance between two coordinates (Haversine formula)
function calculateDistance(lat1: number, lon1: number, lat2: number, lon2: number): number {
  const R = 6371; // Earth's radius in km
  const dLat = (lat2 - lat1) * Math.PI / 180;
  const dLon = (lon2 - lon1) * Math.PI / 180;
  const a = 
    Math.sin(dLat / 2) * Math.sin(dLat / 2) +
    Math.cos(lat1 * Math.PI / 180) * Math.cos(lat2 * Math.PI / 180) *
    Math.sin(dLon / 2) * Math.sin(dLon / 2);
  const c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));
  return R * c;
}

// Pick random AI reason from category
function getRandomReason(category: keyof typeof AI_REASONS): string {
  const reasons = AI_REASONS[category];
  return reasons[Math.floor(Math.random() * reasons.length)];
}

serve(async (req) => {
  // CORS headers
  if (req.method === 'OPTIONS') {
    return new Response('ok', {
      headers: {
        'Access-Control-Allow-Origin': '*',
        'Access-Control-Allow-Methods': 'POST',
        'Access-Control-Allow-Headers': 'authorization, x-client-info, apikey, content-type',
      },
    });
  }

  try {
    // Parse request body
    const { email, password, ip, userAgent, deviceFingerprint } = await req.json();

    // Initialize Supabase client with service role
    const supabaseUrl = Deno.env.get('SUPABASE_URL')!;
    const supabaseServiceKey = Deno.env.get('SUPABASE_SERVICE_ROLE_KEY')!;
    const supabase = createClient(supabaseUrl, supabaseServiceKey);

    // 1. Query demo_users by email
    const { data: user, error: userError } = await supabase
      .from('demo_users')
      .select('*')
      .eq('email', email)
      .single();

    if (userError || !user) {
      return new Response(
        JSON.stringify({
          decision: 'BLOCKED',
          reason: 'Invalid credentials. User not found in system.',
          riskScore: 100,
          riskFactors: [],
        }),
        {
          headers: {
            'Content-Type': 'application/json',
            'Access-Control-Allow-Origin': '*',
          },
          status: 401,
        }
      );
    }

    // 2. Simple password check (all demo accounts use 'demo')
    if (password !== 'demo') {
      return new Response(
        JSON.stringify({
          decision: 'BLOCKED',
          reason: 'Invalid credentials. Incorrect password.',
          riskScore: 100,
          riskFactors: [],
        }),
        {
          headers: {
            'Content-Type': 'application/json',
            'Access-Control-Allow-Origin': '*',
          },
          status: 401,
        }
      );
    }

    // 3. Get IP geolocation from ip-api.com (free API)
    let city = 'Unknown';
    let country = 'Unknown';
    let latitude = 0;
    let longitude = 0;

    try {
      const geoResponse = await fetch(`http://ip-api.com/json/${ip}`);
      const geoData = await geoResponse.json();
      
      if (geoData.status === 'success') {
        city = geoData.city || 'Unknown';
        country = geoData.country || 'Unknown';
        latitude = geoData.lat || 0;
        longitude = geoData.lon || 0;
      }
    } catch (error) {
      console.error('Geolocation API error:', error);
      // Continue with unknown location
    }

    // 4. Calculate risk score using 3-pillar logic
    let riskScore = 0; // Start at 0, add/subtract points based on pillars
    const riskFactors: Array<{ name: string; status: string; points: number; label: string }> = [];
    let aiReasonCategory: keyof typeof AI_REASONS = 'trustedDevice';
    let isImpossibleTravel = false;
    let travelDistanceKm = 0;
    let timeSinceLastLoginMinutes = 0;

    // DEMO MODE: Hardcoded scenarios for reliable presentation
    // Alice scenario: Always GRANTED (30)
    if (email === 'alice@company.com') {
      riskScore = 30;
      riskFactors.push(
        { name: 'Identity Verified', status: 'success', points: 10, label: '✅ Credentials Valid' },
        { name: 'Device Status', status: 'success', points: 5, label: '✅ Trusted Device' },
        { name: 'Location', status: 'success', points: 5, label: `✅ ${city}, ${country}` },
        { name: 'Behavior', status: 'success', points: 10, label: '✅ Normal Pattern' }
      );
      aiReasonCategory = 'trustedDevice';
      
      const decision = 'GRANTED';
      const aiReason = getRandomReason(aiReasonCategory);
      
      await supabase.from('login_logs').insert({
        email, user_id: user.id, ip_address: ip, user_agent: userAgent,
        device_fingerprint: deviceFingerprint, city, country, latitude, longitude,
        risk_score: riskScore, decision, risk_factors: riskFactors, ai_reason: aiReason,
        is_trusted_device: true, is_impossible_travel: false, travel_distance_km: 0,
        time_since_last_login_minutes: 0,
      });
      
      return new Response(JSON.stringify({ decision, reason: aiReason, riskScore, riskFactors }), {
        headers: { 'Content-Type': 'application/json', 'Access-Control-Allow-Origin': '*' },
      });
    }

    // Bob scenario: Always CHALLENGE (50)
    if (email === 'bob@company.com') {
      riskScore = 50;
      riskFactors.push(
        { name: 'Identity Verified', status: 'success', points: 10, label: '✅ Credentials Valid' },
        { name: 'Device Status', status: 'warning', points: 25, label: '⚠️ New Device Detected' },
        { name: 'Location', status: 'success', points: 5, label: `✅ ${city}, ${country}` },
        { name: 'Behavior', status: 'warning', points: 10, label: '⚠️ First Login' }
      );
      aiReasonCategory = 'newDevice';
      
      const decision = 'CHALLENGE';
      const aiReason = getRandomReason(aiReasonCategory);
      
      await supabase.from('login_logs').insert({
        email, user_id: user.id, ip_address: ip, user_agent: userAgent,
        device_fingerprint: deviceFingerprint, city, country, latitude, longitude,
        risk_score: riskScore, decision, risk_factors: riskFactors, ai_reason: aiReason,
        is_trusted_device: false, is_impossible_travel: false, travel_distance_km: 0,
        time_since_last_login_minutes: 0,
      });
      
      return new Response(JSON.stringify({ decision, reason: aiReason, riskScore, riskFactors }), {
        headers: { 'Content-Type': 'application/json', 'Access-Control-Allow-Origin': '*' },
      });
    }

    // Carol scenario: Always BLOCKED (100) - Impossible Travel
    if (email === 'carol@company.com') {
      riskScore = 100;
      riskFactors.push(
        { name: 'Identity Verified', status: 'success', points: 10, label: '✅ Credentials Valid' },
        { name: 'Device Status', status: 'success', points: 5, label: '✅ Trusted Device' },
        { name: 'Location', status: 'warning', points: 25, label: '⚠️ Lagos, Nigeria' },
        { name: 'Behavior', status: 'danger', points: 60, label: '🚨 Impossible Travel' }
      );
      aiReasonCategory = 'impossibleTravel';
      isImpossibleTravel = true;
      travelDistanceKm = 5046;
      timeSinceLastLoginMinutes = 45;
      
      const decision = 'BLOCKED';
      const aiReason = getRandomReason(aiReasonCategory);
      
      await supabase.from('login_logs').insert({
        email, user_id: user.id, ip_address: ip, user_agent: userAgent,
        device_fingerprint: deviceFingerprint, city, country, latitude, longitude,
        risk_score: riskScore, decision, risk_factors: riskFactors, ai_reason: aiReason,
        is_trusted_device: true, is_impossible_travel: true, travel_distance_km: 5046,
        time_since_last_login_minutes: 45,
      });
      
      return new Response(JSON.stringify({ decision, reason: aiReason, riskScore, riskFactors }), {
        headers: { 'Content-Type': 'application/json', 'Access-Control-Allow-Origin': '*' },
      });
    }

    // David scenario: Always BLOCKED (85) - Compromised Device
    if (email === 'david@company.com') {
      riskScore = 85;
      riskFactors.push(
        { name: 'Identity Verified', status: 'success', points: 0, label: '✅ Password Valid' },
        { name: 'Device Status', status: 'danger', points: 50, label: '🚨 Security Failures' },
        { name: 'Location', status: 'warning', points: 20, label: '⚠️ Public WiFi' },
        { name: 'Behavior', status: 'warning', points: 15, label: '⚠️ Unusual Access' }
      );
      aiReasonCategory = 'compromisedDevice';
      
      const decision = 'BLOCKED';
      const aiReason = getRandomReason(aiReasonCategory);
      
      await supabase.from('login_logs').insert({
        email, user_id: user.id, ip_address: ip, user_agent: userAgent,
        device_fingerprint: deviceFingerprint, city, country, latitude, longitude,
        risk_score: riskScore, decision, risk_factors: riskFactors, ai_reason: aiReason,
        is_trusted_device: false, is_impossible_travel: false, travel_distance_km: 0,
        time_since_last_login_minutes: 0,
      });
      
      return new Response(JSON.stringify({ decision, reason: aiReason, riskScore, riskFactors }), {
        headers: { 'Content-Type': 'application/json', 'Access-Control-Allow-Origin': '*' },
      });
    }

    // Pillar 1: Identity (already validated via password)
    riskScore += 10; // Base points for valid credentials
    riskFactors.push({
      name: 'Identity Verified',
      status: 'success',
      points: 10,
      label: '✅ Credentials Valid',
    });

    // Pillar 2: Device
    const deviceMatch = deviceFingerprint === user.trusted_device_fingerprint;
    if (deviceMatch) {
      riskScore += 5; // Trusted device adds minimal risk
      riskFactors.push({
        name: 'Device Status',
        status: 'success',
        points: 5,
        label: '✅ Trusted Device',
      });
    } else {
      riskScore += 25; // New device adds moderate risk
      riskFactors.push({
        name: 'Device Status',
        status: 'warning',
        points: 25,
        label: '⚠️ New Device Detected',
      });
      aiReasonCategory = 'newDevice';
    }

    // Pillar 3: Location
    const ipMatch = ip === user.trusted_ip;
    const cityMatch = city === user.trusted_city;
    const countryMatch = country === user.trusted_country;

    if (ipMatch && cityMatch) {
      riskScore += 5; // Known location, minimal risk
      riskFactors.push({
        name: 'Location',
        status: 'success',
        points: 5,
        label: `✅ ${city}, ${country}`,
      });
    } else if (countryMatch) {
      riskScore += 15; // Same country but different city
      riskFactors.push({
        name: 'Location',
        status: 'warning',
        points: 15,
        label: `⚠️ ${city}, ${country}`,
      });
    } else {
      riskScore += 25; // Different country
      riskFactors.push({
        name: 'Location',
        status: 'warning',
        points: 25,
        label: `⚠️ ${city}, ${country}`,
      });
      aiReasonCategory = 'differentCountry';
    }

    // Pillar 4: Behavior - Check for impossible travel
    // Query last login from this user
    const { data: lastLogin } = await supabase
      .from('login_logs')
      .select('created_at, latitude, longitude')
      .eq('email', email)
      .order('created_at', { ascending: false })
      .limit(1)
      .single();

    if (lastLogin && lastLogin.latitude && lastLogin.longitude) {
      const lastLoginTime = new Date(lastLogin.created_at).getTime();
      const currentTime = Date.now();
      timeSinceLastLoginMinutes = Math.floor((currentTime - lastLoginTime) / 60000);

      // Calculate distance between last and current location
      travelDistanceKm = calculateDistance(
        lastLogin.latitude,
        lastLogin.longitude,
        latitude,
        longitude
      );

      // Check if travel is possible (assume max speed of 900 km/h for plane)
      const maxPossibleDistance = (timeSinceLastLoginMinutes / 60) * 900;

      if (travelDistanceKm > maxPossibleDistance && travelDistanceKm > 100) {
        // Impossible travel detected!
        isImpossibleTravel = true;
        riskScore += 60; // High risk for impossible travel
        riskFactors.push({
          name: 'Behavior',
          status: 'danger',
          points: 60,
          label: '🚨 Impossible Travel',
        });
        aiReasonCategory = 'impossibleTravel';
      } else {
        riskScore += 5; // Normal behavior
        riskFactors.push({
          name: 'Behavior',
          status: 'success',
          points: 5,
          label: '✅ Normal Pattern',
        });
      }
    } else {
      // First login or no previous location data
      riskScore += 10; // Slight risk for first login
      riskFactors.push({
        name: 'Behavior',
        status: 'success',
        points: 10,
        label: '✅ First Login',
      });
    }

    // Ensure score stays within 0-100 range (demo accounts already returned above)
    riskScore = Math.max(0, Math.min(100, riskScore));

    // 5. Determine decision based on risk score
    let decision: 'GRANTED' | 'CHALLENGE' | 'BLOCKED';
    if (riskScore <= 30) {
      decision = 'GRANTED';
    } else if (riskScore <= 60) {
      decision = 'CHALLENGE';
    } else {
      decision = 'BLOCKED';
    }

    // 6. Pick appropriate AI reason
    const aiReason = getRandomReason(aiReasonCategory);

    // 7. Write to login_logs table
    const { error: insertError } = await supabase
      .from('login_logs')
      .insert({
        email,
        user_id: user.id,
        ip_address: ip,
        user_agent: userAgent,
        device_fingerprint: deviceFingerprint,
        city,
        country,
        latitude,
        longitude,
        risk_score: riskScore,
        decision,
        risk_factors: riskFactors,
        ai_reason: aiReason,
        is_trusted_device: deviceMatch,
        is_impossible_travel: isImpossibleTravel,
        travel_distance_km: travelDistanceKm,
        time_since_last_login_minutes: timeSinceLastLoginMinutes,
      });

    if (insertError) {
      console.error('Failed to insert login log:', insertError);
    }

    // 8. Return decision to client
    return new Response(
      JSON.stringify({
        decision,
        reason: aiReason,
        riskScore,
        riskFactors,
      }),
      {
        headers: {
          'Content-Type': 'application/json',
          'Access-Control-Allow-Origin': '*',
        },
        status: 200,
      }
    );
  } catch (error) {
    console.error('Error in check-access function:', error);
    return new Response(
      JSON.stringify({
        decision: 'BLOCKED',
        reason: 'An error occurred during security analysis. Please try again.',
        riskScore: 100,
        riskFactors: [],
      }),
      {
        headers: {
          'Content-Type': 'application/json',
          'Access-Control-Allow-Origin': '*',
        },
        status: 500,
      }
    );
  }
});
