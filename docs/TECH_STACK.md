# Technology Stack & Infrastructure Document

## MOIZ.UX — Technical Tooling, Libraries & Hosting Matrix

* **Document Version:** 1.0
* **Author:** Lead Systems Architect
* **Target Audience:** Engineering Team & Maintenance Engineers

---

## 1. Stack Overview & Core Philosophy

The technology choices for MOIZ.UX prioritize **lightweight execution, long-term stability, zero infrastructure costs, high developer velocity, and aggressive search engine indexing**. 

---

## 2. Comprehensive Core Technology Matrix

```
+-----------------------------------------------------------------------+
|                             FRONTEND STACK                            |
|  +-------------------+  +-------------------+  +-------------------+  |
|  |     React 19      |  |     Vite 6.x      |  |  Tailwind CSS 4.x |  |
|  | (UI View Engine)  |  | (Build & Bundler) |  | (Styling System)  |  |
|  +-------------------+  +-------------------+  +-------------------+  |
+-----------------------------------------------------------------------+
                                    |
                                    v
+-----------------------------------------------------------------------+
|                         UTILITY & ICON LIBRARIES                      |
|  +-------------------+  +-------------------+  +-------------------+  |
|  |   Lucide React    |  |   Framer Motion   |  |   DOMPurify Client|  |
|  | (Icon System)     |  | (Micro-Animations)|  | (XSS Sanitizer)   |  |
|  +-------------------+  +-------------------+  +-------------------+  |
+-----------------------------------------------------------------------+
                                    |
                                    v
+-----------------------------------------------------------------------+
|                      BACKEND & API INFRASTRUCTURE                     |
|  +-------------------+  +-------------------+  +-------------------+  |
|  | Vercel Serverless |  |    Resend SDK     |  | Upstash Redis API |  |
|  | (Node/Edge API)   |  | (Email Gateway)   |  | (Rate Limiting)   |  |
|  +-------------------+  +-------------------+  +-------------------+  |
+-----------------------------------------------------------------------+
                                    |
                                    v
+-----------------------------------------------------------------------+
|                    CI/CD & HOSTING PROVIDER LAYER                     |
|  +-------------------+  +-------------------+  +-------------------+  |
|  |   Vercel Edge     |  |   GitHub Actions  |  | Cloudflare DNS    |  |
|  | (Global Hosting)  |  | (Lighthouse CI)   |  | (Edge Proxy & WAF)|  |
|  +-------------------+  +-------------------+  +-------------------+  |
+-----------------------------------------------------------------------+
```

---

## 3. Detailed Technology Justifications

### 3.1 Core Framework & Build Tooling
* **React 19:** Chosen for component reusability, modular abstraction, and developer familiarity. Component composition enables rapid updates to project showcases and service grids.
* **Vite 6.x:** Provides fast Hot Module Replacement (HMR) during development and outputs optimized static bundles via Rollup.

### 3.2 Styling & Visual Design Engine
* **Tailwind CSS 4.x:** Utility-first CSS framework allowing inline design token application without CSS bloat.
* **PostCSS & Autoprefixer:** Automatically vendor-prefixes CSS rules for consistent cross-browser performance.

### 3.3 Micro-Animations & UI Icons
* **Lucide React:** Accessible, minimal SVG icon set containing zero runtime layout shifts.
* **Framer Motion:** Used sparingly for scroll-triggered entrance animations (`fadeInUp`, card scale highlights) respecting `prefers-reduced-motion` settings.

### 3.4 API & Form Communication Infrastructure
* **Vercel Edge Functions:** Provides serverless Node.js endpoints with sub-10ms cold start times.
* **Resend API:** Transactional email dispatch service guaranteeing high inbox deliverability without managing custom SMTP servers.
* **DOMPurify Client/Server:** Industry-standard XSS sanitizer clearing malicious script injections from form fields.

---

## 4. Package Configuration (`package.json` Manifest)

```json
{
  "name": "moiz-ux-portfolio",
  "private": true,
  "version": "1.0.0",
  "type": "module",
  "scripts": {
    "dev": "vite",
    "build": "vite build",
    "lint": "eslint . --ext js,jsx --report-unused-disable-directives --max-warnings 0",
    "preview": "vite preview"
  },
  "dependencies": {
    "dompurify": "^3.2.4",
    "framer-motion": "^12.4.7",
    "lucide-react": "^0.475.0",
    "react": "^19.0.0",
    "react-dom": "^19.0.0"
  },
  "devDependencies": {
    "@types/react": "^19.0.8",
    "@types/react-dom": "^19.0.3",
    "@vitejs/plugin-react": "^4.3.4",
    "autoprefixer": "^10.4.20",
    "eslint": "^9.20.1",
    "eslint-plugin-react": "^7.37.4",
    "postcss": "^8.5.2",
    "tailwindcss": "^4.0.6",
    "vite": "^6.1.0"
  }
}
```

---

## 5. Development & Production Environment Requirements

| Environment | Tool | Version Requirement |
| :--- | :--- | :--- |
| **Runtime** | Node.js | `>= 20.x.x LTS` |
| **Package Manager** | npm | `>= 10.x.x` |
| **Hosting Platform** | Vercel Platform | Default Edge Tier |
| **Version Control** | Git | Standard GitHub Repository |