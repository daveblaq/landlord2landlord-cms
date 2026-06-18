# TODOS

## Tests: AppSidebar, SlowConnectionBanner, AuthHandler

**What:** Unit tests for the three new app-shell components added in the L2L style guide branch.

**Why:** `AppSidebar` contains badge logic (`newCount > 0` → badge appears), `SlowConnectionBanner` has a timer that affects perceived performance, and `AuthHandler` has security-critical redirect behavior (`router.replace`). All are currently tested only manually.

**Context:** These components live in `src/components/app/`. The `vitest.config.ts` unit project is already configured (`src/**/*.test.ts`). The pattern from `client.test.ts` can be followed. `AuthHandler` is the highest priority — a bug there silently traps users in a broken session.

**Depends on:** Nothing. Can be done independently any time.

---

## Security: Fontshare CDN / CSP

**What:** Fontshare CDN loaded without SRI hash or Content-Security-Policy restricting `style-src`. A compromised CDN could inject malicious CSS.

**Why:** SRI is impractical on a dynamic CDN URL (query params vary). Proper fix is to self-host General Sans font files (`/public/fonts/`) and remove the CDN link, OR add a `Content-Security-Policy` header in `next.config.js` restricting `style-src` to `'self' https://api.fontshare.com`.

**Priority:** P3

**Depends on:** Self-hosting fonts requires obtaining the font files from Fontshare.

---

## Maintainability: Leads page tab button DRY

**What:** The two tab `<button>` elements in `src/app/dashboard/leads/page.tsx` share identical className logic. The `activeTab === 'buyer'` ternary also appears three times in JSX (active state, title, description).

**Why:** Not a bug, but a copy-paste pattern that makes adding a third tab or changing the active style a multi-point edit.

**Fix:** Extract a `TabButton` component or map over a `tabs` config array.

**Priority:** P4

---
