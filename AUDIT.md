# Project Audit

Audit date: 2026-10-31

## Executive summary

The production build and the focused source/API lint both pass. The repository still has four significant audit gaps:

1. `npm run lint` scans generated dependencies and build output instead of application source.
2. Production dependencies include four low-severity vulnerabilities through the installed `resend` dependency chain.
3. Client IP selection trusts `x-real-ip` before Vercel's forwarded headers, which can weaken rate limiting when that header is client-controlled.
4. There are no automated tests or CI configuration in the repository.

## Findings

| Severity | Area | Finding | Evidence | Recommendation |
|---|---|---|---|---|
| Medium | Lint configuration | The default lint script exits with 167 errors and 11 warnings because generated `node_modules` and `dist` files are included. | `eslint.config.js`; `npm run lint`; focused `npx eslint src api` passes. | Add explicit ignores for `node_modules/**` and `dist/**`, then keep `npm run lint` green. |
| Medium | Rate limiting | `api/contact.js` reads `x-real-ip` before Vercel forwarded-IP headers. A deployment that forwards this header without overwriting it could allow an attacker to rotate an apparent source IP and bypass the three-per-15-minute limit. | `api/contact.js:57-65` | Prefer the platform-controlled Vercel header, validate/normalize it, and document which proxy headers are trusted. |
| Low | Dependencies | `npm audit --omit=dev` reports four low-severity vulnerabilities in `resend`'s `html-to-text`/`deepmerge` chain. | `npm audit --omit=dev` | Upgrade `resend` to a compatible fixed release and run the contact API integration tests. The audit's suggested upgrade is breaking. |
| Low | Testing | No test script, test files, or CI workflow are present. | `package.json`; repository file inventory | Add focused tests for validation, rate-limit identity selection, and successful/failing email dispatch, then run them in CI. |
| Low | Privacy | Development submission logs include the complete contact payload, including the visitor email address. | `src/components/sections/Contact.jsx:212-215` | Remove payload logging or log a sanitized event identifier that cannot contain personal data. |
| Informational | Resilience | The API deliberately proceeds without rate limiting if Upstash is unavailable. This preserves lead capture but allows abuse during Redis outages. | `api/contact.js:88-94` | Track degraded limiter events and use a platform-level fallback or fail closed for repeated submissions if abuse is observed. |

## Checks performed

- Production build: passed (`npm run build`)
- Application source/API lint: passed (`npx eslint src api`)
- Full repository lint: failed because generated content is not ignored (`npm run lint`)
- Production dependency audit: failed with four low-severity findings (`npm audit --omit=dev`)
- Git whitespace check: passed (`git diff --check`)
- Working tree: clean on branch `main`

## Positive observations

- Server-side input validation is duplicated from the browser, with length and format checks in the API.
- Contact HTML is escaped before rendering in email and Telegram templates.
- Security response headers are configured in `vercel.json`.
- External project links use `noopener noreferrer`.
- The application uses a dedicated honeypot field and consistent API validation.
- There is no evidence of user-controlled HTML being rendered as an application UI.

## Not checked

- Runtime behavior against deployed Vercel and third-party Resend/Upstash/Telegram services.
- Browser accessibility with automated axe/lighthouse tooling.
- Visual regression across browsers and responsive breakpoints.
- Exploitability of the dependency advisory against this application.
- Production secrets or live environment variables.

The main operational risk is the repository's lint/dependency/test gaps: production behavior can change without automated coverage, and code in generated folders currently makes the lint command noisy rather than actionable.
