# Frontend Implementation & Style Standards

## MOIZ.UX — Code Quality & Engineering Best Practices

* **Document Version:** 1.0
* **Author:** Principal Frontend Software Engineer
* **Target Audience:** All Software Engineers & Code Reviewers

---

## 1. Core Engineering Directives

All code committed to the **MOIZ.UX** codebase must adhere strictly to the following standards to ensure high maintainability, performance, accessibility, and consistency.

---

## 2. Naming Conventions & Code Style

### 2.1 File & Directory Naming
* **React Components:** PascalCase (e.g., `ProjectCard.jsx`, `HeaderNav.jsx`).
* **Utility Files & Hooks:** camelCase (e.g., `useFormValidation.js`, `sanitizeInput.js`).
* **Data JSON Files:** camelCase (e.g., `projectsData.js`, `siteConfig.js`).
* **CSS / Asset Files:** kebab-case (e.g., `main-style.css`, `hero-bg.webp`).

### 2.2 Component Structure Standard

Every React component must follow this single-file layout structure:

```jsx
import React, { useState } from 'react';
import PropTypes from 'prop-types';
import { ArrowUpRight } from 'lucide-react';

/**
 * ProjectCard Component
 * Renders individual project showcases with responsive fallback handling.
 */
export const ProjectCard = ({ title, description, category, tags, liveUrl }) => {
  const [isHovered, setIsHovered] = useState(false);

  return (
    <article 
      className="group relative rounded-xl border border-slate-800 bg-slate-900/50 p-6 transition-all duration-300 hover:border-cyan-500/50"
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
    >
      <div className="flex items-center justify-between">
        <span className="text-xs font-medium text-cyan-400">{category}</span>
        {liveUrl && (
          <a 
            href={liveUrl} 
            target="_blank" 
            rel="noopener noreferrer"
            aria-label={`View live website for ${title}`}
            className="text-slate-400 transition-colors hover:text-white"
          >
            <ArrowUpRight className="h-5 w-5" />
          </a>
        )}
      </div>
      <h3 className="mt-3 text-xl font-semibold text-slate-50">{title}</h3>
      <p className="mt-2 text-sm text-slate-400 leading-relaxed">{description}</p>
      <div className="mt-4 flex flex-wrap gap-2">
        {tags.map((tag) => (
          <span key={tag} className="rounded-full bg-slate-800 px-3 py-1 text-xs text-slate-300">
            {tag}
          </span>
        ))}
      </div>
    </article>
  );
};

ProjectCard.propTypes = {
  title: PropTypes.string.isRequired,
  description: PropTypes.string.isRequired,
  category: PropTypes.string.isRequired,
  tags: PropTypes.arrayOf(PropTypes.string).isRequired,
  liveUrl: PropTypes.string,
};
```

---

## 3. Accessibility & Markup Rules

1. **Semantic HTML Elements Only:** Use `<header>`, `<main>`, `<nav>`, `<section>`, `<article>`, `<aside>`, and `<footer>`. **Never** build interactive layouts using unsemantic `<div>` wrapper chains exclusively.
2. **Accessible Form Inputs:** Every `<input>`, `<textarea>`, and `<select>` element **must** be bound to a matching `<label htmlFor="...">` identifier.
3. **Alt Text Policy:** Every static or dynamic `<img>` element must include descriptive `alt` text explaining the visual context. Decorative images must explicitly pass `alt="" aria-hidden="true"`.
4. **Keyboard Focus Verification:** Never set CSS rules to `outline: none` without providing a custom visible focus ring style (e.g., `focus-visible:ring-2 focus-visible:ring-cyan-400`).

---

## 4. Performance & React Rendering Guidance

* **Prevent Unnecessary Re-Renders:** Large static objects (e.g., arrays in `siteConfig.js`) must be declared outside component render loops to avoid re-allocation on every state change.
* **Image Optimization:** Always define explicit width and height attributes or explicit layout aspect-ratios to allow space allocation during document parsing and eliminate layout shifts.