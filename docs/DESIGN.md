# Design System & UI/UX Guidelines

## MOIZ.UX — Visual Identity & Component Specification

* **Document Version:** 1.0
* **Author:** Lead UI/UX Visual Designer
* **Target Audience:** Frontend Engineers, UI Designers, Content Authors

---

## 1. Visual Direction & Aesthetic Philosophy

The visual design language of **MOIZ.UX** is engineered to project **modern technical capability, high precision, and digital clarity**. 

### Style Attributes:
* **Dark Navy Foundation:** Deep midnight blues and slate hues represent stability, engineering focus, and modern web software.
* **Electric Cyan Accents:** High-energy neon blue/cyan highlights draw immediate focal attention to primary CTAs and interactive links.
* **Minimalist Typography:** Clean layout hierarchy that reduces cognitive friction for prospective business owners.

---

## 2. Design Tokens & Color Palette Matrix

```
+---------------------------------------------------------------------------------+
|                                COLOR PALETTE MATRIX                             |
+----------------------+--------------------+-----------------+-------------------+
| Role                 | Color Name         | Hex Code        | Tailwind Class    |
+----------------------+--------------------+-----------------+-------------------+
| Primary Background   | Midnight Slate     | #0B0F17         | bg-slate-950      |
| Secondary Card Background| Deep Navy Dark  | #111827         | bg-slate-900      |
| Card Border Accent   | Glass Slate Border | #1E293B         | border-slate-800  |
| Primary Text (Headings)| Pure Ice White   | #F8FAFC         | text-slate-50     |
| Secondary Text (Body)| Muted Cool Grey    | #94A3B8         | text-slate-400    |
| Accent Primary       | Electric Cyan      | #00F0FF         | text-cyan-400     |
| Accent Gradient End  | Cobalt Blue        | #3B82F6         | to-blue-500       |
| Success Notification | Emerald Green      | #10B981         | text-emerald-400  |
| Danger / Error Alert | Crimson Red        | #EF4444         | text-red-500      |
+----------------------+--------------------+-----------------+-------------------+
```

---

## 3. Typography System & Font Scale

The interface uses a clean, zero-latency system font stack to prevent Layout Shift during page rendering.

```css
/* System Font Stack Definition */
font-family: 'Inter', system-ui, -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, Oxygen, Ubuntu, Cantarell, sans-serif;
```

### Type Scale Breakdown:

| Level | Desktop Size / Weight | Mobile Size / Weight | Line Height | HTML Semantic Tag |
| :--- | :--- | :--- | :--- | :--- |
| **Hero Title** | 48px (`3rem`) / Bold (700) | 32px (`2rem`) / Bold (700) | 1.1 | `<h1>` |
| **Section Title** | 36px (`2.25rem`) / SemiBold (600) | 24px (`1.5rem`) / SemiBold (600) | 1.2 | `<h2>` |
| **Card Heading** | 20px (`1.25rem`) / Medium (500) | 18px (`1.125rem`) / Medium (500) | 1.3 | `<h3>` |
| **Body Lead** | 18px (`1.125rem`) / Regular (400) | 16px (`1rem`) / Regular (400) | 1.6 | `<p>` |
| **Body Regular** | 16px (`1rem`) / Regular (400) | 14px (`0.875rem`) / Regular (400) | 1.5 | `<p>` |
| **Caption / Badge**| 12px (`0.75rem`) / Medium (500) | 12px (`0.75rem`) / Medium (500) | 1.4 | `<span>` |

---

## 4. UI Component Specifications

### 4.1 Primary CTA Button (`Button.jsx`)
* **Background:** Linear Gradient (`bg-gradient-to-r from-cyan-500 to-blue-600`).
* **Hover State:** Scale scale-105 (`hover:scale-[1.02]`), brightness increase, outer cyan glow shadow (`shadow-[0_0_20px_rgba(0,240,255,0.4)]`).
* **Active State:** Scale down 98% (`active:scale-95`).
* **Focus State:** Visible outline offset (`focus-visible:ring-2 focus-visible:ring-cyan-400`).

### 4.2 Glassmorphism Container Card (`Card.jsx`)
* **Background:** `rgba(17, 24, 39, 0.7)` with `backdrop-filter: blur(12px)`.
* **Border:** 1px solid `rgba(30, 41, 59, 0.8)`.
* **Hover Effect:** Border transitions to `rgba(0, 240, 255, 0.3)`.

---

## 5. Accessibility & Readability Guidelines (WCAG 2.1 AA)

* **Contrast Ratios:** Text color `#F8FAFC` against `#0B0F17` delivers a contrast ratio of **17.8:1** (exceeding the 4.5:1 requirement).
* **Focus Rings:** All buttons, links, and form inputs must display a 2px bright cyan outline on keyboard navigation.
* **Touch Targets:** Minimum touch target area for mobile tap elements is **44x44px**.