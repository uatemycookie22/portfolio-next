import { NextResponse } from 'next/server';
import type { NextRequest } from 'next/server';

// In-memory store for rate limiting
// Map<IP, Array<timestamp>>
const requestStore = new Map<string, number[]>();

const RATE_LIMIT_WINDOW = 10 * 1000; // 10 seconds in milliseconds
const MAX_REQUESTS = 10; // 10 requests per window

function getIP(request: NextRequest): string {
  const forwardedFor = request.headers.get('x-forwarded-for');
  if (forwardedFor) {
    return forwardedFor.split(',')[0] ?? '0.0.0.0';
  }
  return request.headers.get('x-real-ip') ?? '0.0.0.0';
}

function isRateLimited(ip: string): { limited: boolean; retryAfter?: number } {
  const now = Date.now();
  const requests = requestStore.get(ip) || [];
  
  // Remove requests outside the window
  const recentRequests = requests.filter(time => now - time < RATE_LIMIT_WINDOW);
  
  if (recentRequests.length >= MAX_REQUESTS) {
    // Calculate retry after (when oldest request expires)
    const oldestRequest = Math.min(...recentRequests);
    const retryAfter = Math.ceil((oldestRequest + RATE_LIMIT_WINDOW - now) / 1000);
    return { limited: true, retryAfter };
  }
  
  // Add current request
  recentRequests.push(now);
  requestStore.set(ip, recentRequests);
  
  // Cleanup old IPs periodically (every 100th request)
  if (Math.random() < 0.01) {
    for (const [storedIp, times] of requestStore.entries()) {
      const validTimes = times.filter(time => now - time < RATE_LIMIT_WINDOW);
      if (validTimes.length === 0) {
        requestStore.delete(storedIp);
      } else {
        requestStore.set(storedIp, validTimes);
      }
    }
  }
  
  return { limited: false };
}

export function proxy(request: NextRequest) {
  // Only apply rate limiting to POST requests (server actions)
  if (request.method === 'POST') {
    const ip = getIP(request);
    const { limited, retryAfter } = isRateLimited(ip);
    
    if (limited) {
      return NextResponse.json(
        { 
          error: `Rate limit exceeded. Try again in ${retryAfter} seconds.` 
        },
        { status: 429 }
      );
    }
  }
  
  return NextResponse.next();
}

// Apply to all routes (proxy will filter POST requests)
export const config = {
  matcher: [
    '/((?!_next/static|_next/image|favicon.ico|.*\\.(?:svg|png|jpg|jpeg|gif|webp)$).*)',
  ],
};