# Architecture & System Design Document

## MOIZ.UX — Technical Infrastructure & Component Hierarchy

* **Document Version:** 1.0
* **Author:** Principal Lead Systems Architect
* **Target Audience:** Frontend Engineers, DevOps Engineers, System Integrators

---

## 1. System Overview & Core Principles

The MOIZ.UX web application is architected as an **Edge-Rendered Static Web Application (JAMstack architecture)** with serverless backend capabilities for form processing. The fundamental design priority is maximum performance, security, instant global visual delivery (Sub-second FCP), and zero dynamic backend overhead for portfolio browsing.

### Key Architecture Principles:
1. **Decoupled Architecture:** Presentation logic is fully separated from portfolio project datasets (`projects.json` / `services.json`).
2. **Zero Client-Side Heavy Dependencies:** Minimizes bundle size (<80KB gzip total JS execution context).
3. **Edge-First Delivery:** Static assets served from Vercel/Cloudflare Edge CDN nodes worldwide.
4. **Resilient Form Processing:** Serverless function handling lead capture with rate-limiting, CAPTCHAless honeypot verification, and failover notifications.

---

## 2. High-Level Architecture Diagram

```
+-----------------------------------------------------------------------------+
|                                VISITOR BROWSER                              |
|   (Mobile Safari / Chrome Desktop / Instagram Embedded Browser / Web View)  |
+-----------------------------------------------------------------------------+
                                      |
                                HTTPS / HTTP2
                                      v
+-----------------------------------------------------------------------------+
|                            GLOBAL EDGE CDN (Vercel)                         |
|  - DNS & SSL Termination                                                    |
|  - Edge Caching (HTML/CSS/JS/WebP/AVIF Assets)                              |
|  - Security Headers (CSP, HSTS, X-Frame-Options)                            |
+-----------------------------------------------------------------------------+
                                      |
                   +------------------+------------------+
                   |                                     |
        [Static Content Payload]                 [Dynamic API Route]
                   |                                     |
                   v                                     v
+-------------------------------------+ +-------------------------------------+
|         CLIENT-SIDE SPA/SSG         | |      VERCEL SERVERLESS FUNCTION     |
| - React 19 App Context              | |           (/api/contact)            |
| - Tailwind Layout & Render Engine   | | - Express/Edge Runtime Context       |
| - Client-Side Form Validation       | | - Honeypot & Rate-Limit Check     |
| - Analytics Telemetry (Privacy-First)| | - Input Sanitization (DOMPurify)    |
+-------------------------------------+ +-------------------------------------+
                                                         |
                                                         | HTTPS Payload
                                                         v
                                        +-------------------------------------+
                                        |         EMAIL / NOTIFICATION        |
                                        |          SERVICE (Resend API)       |
                                        | - Direct Email Delivery to Developer|
                                        | - Telegram Webhook Notification     |
                                        +-------------------------------------+
```

---

## 3. Component Hierarchy & Module Breakdown

The frontend application follows standard Atomic Component Isolation within standard React architecture:

```
src/
├── assets/                  # Scalable SVG vectors, brand assets, site icons
├── components/              # Modular UI components
│   ├── common/              # Shared atomic visual components
│   │   ├── Button.jsx       # Custom accessible button wrapper
│   │   ├── Card.jsx         # Glassmorphism container card
│   │   ├── SectionHeading.jsx # SEO H2 semantic wrapper
│   │   └── Badge.jsx        # Pill tags for technologies and categories
│   ├── layout/              # Macro page wrapper layouts
│   │   ├── Header.jsx       # Dynamic sticky desktop & mobile slide menu
│   │   ├── Footer.jsx       # Structured schema markup footer
│   │   └── MobileNav.jsx    # Accessible modal navigation sheet
│   └── sections/            # Feature page sections
│       ├── Hero.jsx         # Section A: Primary CTA & Value Prop
│       ├── Projects.jsx     # Section B: Portfolio Grid with Filters
│       ├── ProjectCard.jsx  # Individual project item renderer
│       ├── Services.jsx     # Section C: Service Offerings Grid
│       ├── Process.jsx      # Section D: Interactive 5-Step Roadmap
│       ├── About.jsx        # Section E: Personal Credibility Showcase
│       ├── WhyUs.jsx        # Section F: Value Proposition Checklist
│       └── Contact.jsx      # Section G: Form & Direct Contact Rails
├── data/                    # Pure decoupled content structures
│   ├── projects.js          # Raw JSON list of portfolio work
│   ├── services.js          # Raw JSON list of service tiers
│   └── siteConfig.js        # Global environment configuration (Socials/Emails)
├── hooks/                   # Custom React Hooks
│   ├── useFormValidation.js # Contact form state and sanity validation
│   └── useScrollSpy.js      # Active navigation link indicator on scroll
├── utils/                   # Technical utility modules
│   ├── analytics.js         # Privacy-focused pageview event dispatcher
│   └── sanitize.js          # Client-side input cleaning helper
├── App.jsx                  # Single Page Application Composition Root
└── main.jsx                 # Vite Entrypoint & DOM Attachment
```

---

## 4. State Management Strategy

To ensure zero unnecessary re-renders and maximum execution speeds:
* **Global UI State:** None required. Avoid Context API or Redux overhead.
* **Local Component State (`useState` / `useReducer`):**
  * `MobileNav`: Boolean state toggling full-screen overlay menu.
  * `ContactForm`: Managed form payload, field error states, submitting status (`idle` | `submitting` | `success` | `error`).
  * `ProjectFilter`: Filter state selecting active project tags (`All` | `Landing Page` | `Web App`).

---

## 5. Performance Optimization & Asset Strategy

| Strategy Area | Implementation Specification | Target Outcome |
| :--- | :--- | :--- |
| **Images** | WebP format with PNG fallbacks. Explicit inline `width` and `height` attributes. | Zero Cumulative Layout Shift (CLS < 0.05). |
| **Fonts** | Modern CSS system font stack (`Inter`, system-ui, `-apple-system`). Zero webfont network fetch latency. | Instant First Contentful Paint (FCP < 0.4s). |
| **Styles** | Tailwind CSS JIT compiler purging unused classes. Output atomic file size <12KB gzip. | Minimal render-blocking CSS. |
| **JavaScript** | Modern ES2022 output via Vite. Tree-shaking enabled. | Low execution script memory profile. |

---

## 6. Serverless API Endpoint Specification

### `POST /api/contact`
* **Execution Context:** Edge Runtime Serverless Function
* **Rate Limit:** 3 submissions per IP address per 15-minute sliding window.

#### Request Header & Body Structure:
```json
{
  "name": "Jane Doe",
  "business_name": "Apex Commerce",
  "email": "jane@apexcommerce.io",
  "preferred_contact": "email",
  "website_type": "Landing Page Development",
  "description": "Looking for a high-converting landing page for our direct-to-consumer launch.",
  "budget_range": "$500 - $1500",
  "desired_timeline": "2 Weeks",
  "website_hp_field": "" 
}
```
*Note: `website_hp_field` is an invisible honeypot input field. If populated, the request is silently discarded with a fake `200 OK` response to trick malicious spam scripts.*