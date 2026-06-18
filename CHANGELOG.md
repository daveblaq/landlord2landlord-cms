# Changelog

All notable changes to this project will be documented in this file.

## [0.0.0.1] — 2026-06-18

### Added

- **Style system** — `src/styles/theme.css` rebuilt with Untitled UI semantic tokens (color, spacing, radius, shadow, typography). All components now resolve to design-system variables instead of hardcoded Tailwind utilities, enabling light/dark-mode switching and theme consistency.
- **App shell components** — `SlowConnectionBanner`, `AuthHandler` added to `src/components/app/`. The banner appears after 8 s if no successful API response is received and dismisses automatically on the first `api:online` event. `AuthHandler` listens for `auth:expired` and redirects to `/auth/login` via router.replace (no browser reload needed).
- **Event constants** — `src/lib/api/events.ts` exports `API_EVENTS.ONLINE` and `API_EVENTS.AUTH_EXPIRED` as a single source of truth, eliminating bare string literals across dispatch and listener sites.
- **API client improvements** — `src/lib/api/client.ts` now dispatches typed events via `API_EVENTS`, protects against concurrent 401 races with the `isHandling401` guard, and adds `.catch()` before `.finally()` to prevent unhandled Promise rejections if `clearAuthData` throws.
- **Unit tests** — `src/lib/api/client.test.ts` covers the 401 de-duplication guard, `api:online` on success, and all `serializeParams` branches (arrays, empty values, scalars, single-element arrays).
- **Test configuration** — `vitest.config.ts` adds a dedicated `unit` project (`src/**/*.test.ts`) for fast bun-native test runs.
- **Font integration** — Fontshare CDN link added to `src/app/layout.tsx` for General Sans. `SlowConnectionBanner` and `AuthHandler` wired into the root layout.
- **TODOS.md** — Captures three explicitly-deferred items: component tests for AuthHandler/AppSidebar/SlowConnectionBanner (needs JSDOM), Fontshare CDN/CSP hardening (P3), and Leads tab button DRY (P4).

### Changed

- **Login page** (`src/app/auth/login/page.tsx`) — Restyled using design-system tokens; layout tightened.
- **Dashboard pages** — Leads, Properties (list, detail, edit, new), Settings, and root dashboard all updated to use semantic className tokens from the new theme.
- **Button component** (`src/components/base/buttons/button.tsx`) — Variant map updated to use semantic token classes.
- **Input component** (`src/components/base/input/input.tsx`) — Border and focus ring updated to design-system ring tokens.
- **Leads API** (`src/lib/api/leads.ts`) — Minor param serialization alignment.

### Infrastructure

- `.gitignore` — Added `coverage/` exclusion for Vitest output.
- `bun.lockb` — Lockfile updated for new test dependencies.
