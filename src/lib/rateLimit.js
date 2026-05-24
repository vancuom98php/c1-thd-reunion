// In-memory rate limit keyed by IP. Process-local — restarts wipe state, and
// multiple Node processes (workers, edge) each keep their own counters.
//
// ─── YOUR TURN ─────────────────────────────────────────────────────────────
// Decide the policy for guestbook posts. The requirement says "max 3 lần/phút/IP".
// But there are real trade-offs you should weigh in:
//   • Window length: 60s rolling vs 60s fixed bucket
//   • Counting unit: per IP (NAT/family share?) vs per IP + name
//   • What to return when over the limit: 429 + retry-after, or pretend success?
//   • Memory: how do entries get cleaned up so the Map does not leak?
//
// Implement `checkRateLimit(ip)` so it returns `{ ok: true }` when allowed and
// `{ ok: false, retryAfter: <seconds> }` when blocked. Keep it to ~10 lines.
//
// Examples of what you might do:
//   • const WINDOW_MS = 60_000, MAX = 3;
//   • const hits = new Map(); // ip -> array of timestamps
//   • Filter timestamps older than WINDOW_MS, push now, check length.
// ───────────────────────────────────────────────────────────────────────────

export function checkRateLimit(/* ip */) {
  // TODO: replace this stub with the policy you choose.
  return { ok: true };
}
