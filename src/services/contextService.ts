/**
 * Context Analysis Service - Pillar 3
 * 
 * PRODUCTION IMPLEMENTATION:
 * This service analyzes contextual factors including geolocation,
 * impossible travel detection, time-based patterns, and network analysis.
 * 
 * Recommended APIs/Libraries:
 * - IP-API.io or MaxMind GeoIP2 for IP geolocation
 * - ipinfo.io for VPN/Proxy detection
 * - Haversine formula for distance calculation
 * - Custom ML model for behavioral patterns
 */

import type { RiskFactor } from '@/contexts/DashboardContext';

export interface ContextAnalysisResult {
  safe: boolean;
  riskScore: number;
  factors: RiskFactor[];
  location: GeoLocation;
  impossibleTravel: ImpossibleTravelResult | null;
}

export interface GeoLocation {
  ip: string;
  city: string;
  country: string;
  countryCode: string;
  latitude: number;
  longitude: number;
  timezone: string;
  isp: string;
  isVPN: boolean;
  isProxy: boolean;
}

export interface ImpossibleTravelResult {
  detected: boolean;
  previousLocation: string;
  currentLocation: string;
  distanceKm: number;
  timeDifferenceMinutes: number;
  maxPossibleSpeedKmh: number;
}

export interface LoginHistoryEntry {
  timestamp: Date;
  latitude: number;
  longitude: number;
  city: string;
  country: string;
}

/**
 * Analyze contextual factors for security assessment
 * 
 * PRODUCTION FLOW:
 * 1. Get IP geolocation from MaxMind/IP-API
 * 2. Check for VPN/Proxy usage
 * 3. Fetch last login location from database
 * 4. Calculate if travel is physically possible
 * 5. Analyze time-of-day patterns
 * 6. Return composite context risk score
 */
export async function analyzeContext(ipAddress: string, userId: string): Promise<ContextAnalysisResult> {

  // ============================================================
  // PRODUCTION IMPLEMENTATION (Currently disabled for demo)
  // ============================================================

  /*
  // Step 1: Get geolocation from IP
  const geoResponse = await fetch(`https://api.ipapi.io/${ipAddress}?api-key=${process.env.IPAPI_KEY}`);
  const geoData = await geoResponse.json();
  
  const location: GeoLocation = {
    ip: ipAddress,
    city: geoData.city,
    country: geoData.country_name,
    countryCode: geoData.country_code,
    latitude: geoData.latitude,
    longitude: geoData.longitude,
    timezone: geoData.timezone,
    isp: geoData.org,
    isVPN: geoData.security?.vpn || false,
    isProxy: geoData.security?.proxy || false,
  };
  
  // Step 2: Check VPN/Proxy
  let riskScore = 0;
  const factors: RiskFactor[] = [];
  
  if (location.isVPN || location.isProxy) {
    riskScore += 15;
    factors.push({ 
      name: 'Network', 
      status: 'warning', 
      points: 15, 
      label: '⚠️ VPN/Proxy Detected' 
    });
  }
  
  // Step 3: Fetch last login
  const lastLogin = await db.loginHistory.findFirst({
    where: { userId },
    orderBy: { timestamp: 'desc' },
  });
  
  // Step 4: Check for impossible travel
  let impossibleTravel: ImpossibleTravelResult | null = null;
  
  if (lastLogin) {
    const distanceKm = haversineDistance(
      lastLogin.latitude, lastLogin.longitude,
      location.latitude, location.longitude
    );
    
    const timeDiffMs = Date.now() - lastLogin.timestamp.getTime();
    const timeDiffMinutes = timeDiffMs / (1000 * 60);
    const timeDiffHours = timeDiffMinutes / 60;
    
    // Max commercial flight speed ~900 km/h
    const maxPossibleDistance = timeDiffHours * 900;
    
    if (distanceKm > maxPossibleDistance && timeDiffMinutes < 720) { // 12 hours
      impossibleTravel = {
        detected: true,
        previousLocation: `${lastLogin.city}, ${lastLogin.country}`,
        currentLocation: `${location.city}, ${location.country}`,
        distanceKm: Math.round(distanceKm),
        timeDifferenceMinutes: Math.round(timeDiffMinutes),
        maxPossibleSpeedKmh: Math.round(distanceKm / timeDiffHours),
      };
      
      riskScore += 60;
      factors.push({ 
        name: 'Travel', 
        status: 'danger', 
        points: 60, 
        label: `🚨 Impossible Travel: ${Math.round(distanceKm)}km in ${Math.round(timeDiffMinutes)}min` 
      });
    } else {
      factors.push({ 
        name: 'Location', 
        status: 'success', 
        points: 5, 
        label: `✅ ${location.city}, ${location.country}` 
      });
      riskScore += 5;
    }
  }
  
  // Step 5: Time-of-day analysis
  const userLocalHour = new Date().toLocaleString('en-US', { 
    timeZone: location.timezone, 
    hour: 'numeric', 
    hour12: false 
  });
  const hour = parseInt(userLocalHour);
  
  if (hour >= 1 && hour <= 5) {
    riskScore += 10;
    factors.push({ 
      name: 'Time', 
      status: 'warning', 
      points: 10, 
      label: '⚠️ Unusual Login Time' 
    });
  }
  
  // Step 6: Store login for future analysis
  await db.loginHistory.create({
    data: {
      userId,
      ip: ipAddress,
      latitude: location.latitude,
      longitude: location.longitude,
      city: location.city,
      country: location.country,
      timestamp: new Date(),
    }
  });
  
  return {
    safe: riskScore < 30 && !impossibleTravel?.detected,
    riskScore,
    factors,
    location,
    impossibleTravel,
  };
  */

  // ============================================================
  // DEMO MODE: Simulated response for presentation
  // ============================================================

  console.log('🌍 [DEMO] Context analysis for IP:', ipAddress);

  // Simulate API delay
  await new Promise(resolve => setTimeout(resolve, 400));

  return {
    safe: true,
    riskScore: 5,
    factors: [{
      name: 'Location',
      status: 'success',
      points: 5,
      label: '✅ Lagos, Nigeria',
    }],
    location: {
      ip: ipAddress,
      city: 'Lagos',
      country: 'Nigeria',
      countryCode: 'NG',
      latitude: 6.5244,
      longitude: 3.3792,
      timezone: 'Africa/Lagos',
      isp: 'Demo ISP',
      isVPN: false,
      isProxy: false,
    },
    impossibleTravel: null,
  };
}

/**
 * Calculate distance between two coordinates using Haversine formula
 * 
 * This is the actual production formula - kept active for reference
 */
export function haversineDistance(
  lat1: number,
  lon1: number,
  lat2: number,
  lon2: number
): number {
  const R = 6371; // Earth's radius in km
  const dLat = toRad(lat2 - lat1);
  const dLon = toRad(lon2 - lon1);

  const a =
    Math.sin(dLat / 2) * Math.sin(dLat / 2) +
    Math.cos(toRad(lat1)) * Math.cos(toRad(lat2)) *
    Math.sin(dLon / 2) * Math.sin(dLon / 2);

  const c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));
  return R * c;
}

function toRad(deg: number): number {
  return deg * (Math.PI / 180);
}

/**
 * Check if travel between two locations in given time is physically possible
 * 
 * Uses max commercial flight speed of 900 km/h as baseline
 */
export function isImpossibleTravel(
  location1: { lat: number; lng: number; time: Date },
  location2: { lat: number; lng: number; time: Date }
): boolean {
  const distance = haversineDistance(
    location1.lat, location1.lng,
    location2.lat, location2.lng
  );

  const timeDiffMs = Math.abs(location2.time.getTime() - location1.time.getTime());
  const timeDiffHours = timeDiffMs / (1000 * 60 * 60);

  const maxPossibleDistance = timeDiffHours * 900; // km at max flight speed

  return distance > maxPossibleDistance;
}

/**
 * Get IP address of current client
 * 
 * PRODUCTION: Use server-side request headers
 * const ip = req.headers['x-forwarded-for'] || req.socket.remoteAddress;
 */
export async function getClientIP(): Promise<string> {
  // In production, this would be server-side
  // For demo, return a mock Nigerian IP
  return '197.210.76.45';
}
