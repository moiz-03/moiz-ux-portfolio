# Security Policy, Compliance & Data Protection Matrix

## MOIZ.UX — Application Security & Lead Protection Standards

* **Document Version:** 1.0
* **Author:** Chief Information Security Officer (CISO) & DevOps Lead
* **Target Audience:** Engineering Team, System Administrators

---

## 1. Security Overview & Threat Model

Although MOIZ.UX is primarily a static presentation website, lead capture forms present exposure vectors for **spam injection, XSS attacks, rate-abuse, and header exploitation**. 

The security architecture enforces a **Defense-in-Depth strategy** across network edge controls, browser execution security, client input validation, and serverless API handling.

---

## 2. Browser & HTTP Security Headers Matrix

All HTTP responses served from Vercel Edge CDN must include mandatory security headers configured in `vercel.json`:

```json
{
  "headers": [
    {
      "source": "/(.*)",
      "headers": [
        {
          "key": "Content-Security-Policy",
          "value": "default-src 'self'; script-src 'self' 'unsafe-inline' https://va.vercel-scripts.com; style-src 'self' 'unsafe-inline'; img-src 'self' data: https:; font-src 'self' data:; connect-src 'self' https://vitals.vercel-insights.com;"
        },
        {
          "key": "X-Frame-Options",
          "value": "DENY"
        },
        {
          "key": "X-Content-Type-Options",
          "value": "nosniff"
        },
        {
          "key": "Referrer-Policy",
          "value": "strict-origin-when-cross-origin"
        },
        {
          "key": "Permissions-Policy",
          "value": "camera=(), microphone=(), geolocation=()"
        },
        {
          "key": "Strict-Transport-Security",
          "value": "max-age=31536000; includeSubDomains; preload"
        }
      ]
    }
  ]
}
```

---

## 3. Data Protection & Sanitization Standard

### 3.1 Cross-Site Scripting (XSS) Prevention
* All user inputs captured through the Contact Form (`name`, `description`, `businessName`) are passed through DOMPurify sanitization before processing.
* React’s default JSX escaping mechanism is enforced. Direct DOM manipulation via `dangerouslySetInnerHTML` is **strictly prohibited**.

### 3.2 Anti-Spam Strategy (Honeypot Architecture)
To eliminate intrusive CAPTCHAs while preventing automated bot submissions:
1. An invisible input field `website_hp_field` is injected into the DOM with visual hiding via CSS (`display: none; position: absolute; left: -9999px;`).
2. Human users navigating via visual browsers or screen readers will not fill out this hidden input field.
3. Automated spam bots crawling HTML forms populate all inputs indiscriminately.
4. Serverless API inspects `website_hp_field`. If populated, the endpoint drops processing immediately and returns a dummy `200 OK` response to mislead spam routines.

---

## 4. API Endpoints Rate Limiting

To prevent Denial of Service (DoS) attacks on transactional email endpoints:
* API endpoints track submission counts per IP address.
* Maximum quota: **3 form submissions per IP per 15-minute window**.
* Exceeded limits trigger an HTTP `429 Too Many Requests` response.

---

## 5. Secret Management & Compliance Standard

* **Zero Hardcoded Secrets Policy:** API keys for email dispatch engines (`RESEND_API_KEY`) or webhook endpoints must reside exclusively inside environment variables.
* **Git Versioning Rules:** `.env` and `.env.local` files are included in `.gitignore`.
* **Privacy Compliance (GDPR/CCPA Alignment):**
  * Portfolio analytics must operate without persistent tracking cookies.
  * Personal client information provided via the contact form is used strictly for project evaluation.