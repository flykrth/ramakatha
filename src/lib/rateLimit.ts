import { logger } from './logger'

// In-memory store for rate limits (IP address -> Array of timestamps)
const rateLimits = new Map<string, number[]>()

// Cleanup interval to avoid memory leaks (runs every 5 minutes)
if (typeof window === 'undefined') {
  setInterval(() => {
    const now = Date.now()
    const fiveMinutesAgo = now - 5 * 60 * 1000
    for (const [ip, timestamps] of rateLimits.entries()) {
      const active = timestamps.filter((t) => t > fiveMinutesAgo)
      if (active.length === 0) {
        rateLimits.delete(ip)
      } else {
        rateLimits.set(ip, active)
      }
    }
  }, 5 * 60 * 1000)
}

/**
 * Checks if the client has exceeded the request limits.
 * @param ip The IP address of the requester.
 * @param limit Maximum number of requests allowed in the window.
 * @param windowMs Time window in milliseconds.
 * @returns boolean true if the request is allowed, false if rate limited.
 */
export function checkRateLimit(ip: string, limit = 10, windowMs = 60000): boolean {
  const now = Date.now()
  const timestamps = rateLimits.get(ip) || []
  
  // Filter timestamps that fall within the current window
  const activeTimestamps = timestamps.filter((t) => now - t < windowMs)
  
  if (activeTimestamps.length >= limit) {
    logger.warn('Rate limit exceeded', { ip, limit, windowMs, count: activeTimestamps.length })
    return false
  }
  
  activeTimestamps.push(now)
  rateLimits.set(ip, activeTimestamps)
  return true
}
