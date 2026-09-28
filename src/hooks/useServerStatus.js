import { useEffect, useState } from "react";

// TODO: point this at your actual nas-server base URL (and a real
// lightweight health route if you add one, e.g. GET /health)
const HEALTH_CHECK_URL = "http://localhost:5000/";
const POLL_INTERVAL_MS = 8000;
const TIMEOUT_MS = 3000;

/**
 * Polls the backend on an interval. Returns:
 *   null  -> still checking (first load)
 *   true  -> server reachable
 *   false -> server unreachable
 */
export default function useServerStatus() {
  const [isOnline, setIsOnline] = useState(null);

  useEffect(() => {
    let cancelled = false;

    const check = async () => {
      try {
        const controller = new AbortController();
        const timeout = setTimeout(() => controller.abort(), TIMEOUT_MS);
        await fetch(HEALTH_CHECK_URL, { signal: controller.signal });
        clearTimeout(timeout);
        if (!cancelled) setIsOnline(true);
      } catch {
        if (!cancelled) setIsOnline(false);
      }
    };

    check();
    const interval = setInterval(check, POLL_INTERVAL_MS);
    return () => {
      cancelled = true;
      clearInterval(interval);
    };
  }, []);

  return isOnline;
}