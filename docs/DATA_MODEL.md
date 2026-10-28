# Data Schemas & Model Specifications

## MOIZ.UX — Structured Models & Type Definitions

* **Document Version:** 1.0
* **Author:** Principal Database & Data Architect
* **Target Audience:** Frontend Engineers, API Developers

---

## 1. Overview & Data Architecture

In accordance with the PRD requirements, **Version 1.0 (MVP) operates without a traditional relational database** to minimize latency and hosting overhead. All project and service content is stored in clean, immutable JSON data arrays.

However, data structures are strictly specified below using **TypeScript Definitions & JSON Schema Standards** to allow smooth future integration into Supabase/Firebase if persistent client databases are required.

---

## 2. TypeScript Interfaces & Schemas

### 2.1 `Project` Model Specification

```typescript
/**
 * Interface representing a showcase project card.
 */
export interface IProject {
  id: string;                  // Unique key identifier (e.g., "prj-001")
  title: string;               // Display title of the website project
  slug: string;                // URL friendly string
  shortDescription: string;    // Concise summary for project cards (max 150 chars)
  category: ProjectCategory;   // Categorization tag
  thumbnailUrl: string;        // Path to WebP preview image
  technologies: string[];      // List of tech stack labels (e.g., ["React", "Tailwind"])
  liveUrl?: string;            // External active website URL (optional)
  caseStudyUrl?: string;       // Detailed breakdown link (optional)
  projectType: 'client' | 'concept'; // Explicit labeling for transparency
  isFeatured: boolean;         // Hero or top grid placement indicator
  order: number;               // Sorting order on showcase grid
}

export type ProjectCategory = 
  | 'Landing Page' 
  | 'Business Website' 
  | 'Functional Web App' 
  | 'Portfolio';
```

#### Example Project Data Context (`projects.json`):
```json
[
  {
    "id": "prj-001",
    "title": "Aura Cosmetics Landing Page",
    "slug": "aura-cosmetics",
    "shortDescription": "High-converting single page storefront showcase with interactive color variant selection.",
    "category": "Landing Page",
    "thumbnailUrl": "/assets/projects/aura-preview.webp",
    "technologies": ["React", "Tailwind CSS", "Framer Motion"],
    "liveUrl": "https://aura-demo.moizux.dev",
    "projectType": "concept",
    "isFeatured": true,
    "order": 1
  }
]
```

---

### 2.2 `Service` Model Specification

```typescript
/**
 * Interface representing a core service offering.
 */
export interface IService {
  id: string;                  // Unique identifier (e.g., "srv-landing")
  title: string;               // Display title of service tier
  subtitle: string;            // Quick target audience description
  targetAudience: string;      // Clear statement of who this is for
  deliverables: string[];      // Bullet point features included in service
  problemSolved: string;       // Outcome value proposition
  ctaLabel: string;            // CTA button text link to contact section
  iconName: string;            // Lucide Icon key string identifier
}
```

---

### 2.3 `EnquiryPayload` (Contact Form) Model Specification

```typescript
/**
 * Interface for lead capture payload submitted via contact endpoint.
 */
export interface IEnquiryPayload {
  name: string;                // Mandatory full name of client
  businessName?: string;       // Optional company or brand name
  email: string;               // Mandatory client contact email
  preferredContact: 'email' | 'whatsapp'; // Client preference channel
  websiteType: string;         // Selected service package tier
  description: string;         // Mandatory summary of project requirements
  budgetRange?: string;        // Optional budget expectations range
  desiredTimeline?: string;    // Optional deadline expectations
  honeypot: string;            // Spam prevention hidden field (MUST BE EMPTY)
  submittedAt: string;         // ISO 8601 Timestamp generated at submission
}
```

---

## 3. Storage & JSON Schema Validation

If persistent database storage is added in Version 2.0, the PostgreSQL schema definition for Supabase is ready for immediate deployment:

```sql
-- Dynamic SQL Schema for Future Supabase/Postgres Deployment
CREATE TABLE public.enquiries (
    id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
    name VARCHAR(255) NOT NULL,
    business_name VARCHAR(255),
    email VARCHAR(255) NOT NULL,
    preferred_contact VARCHAR(50) DEFAULT 'email',
    website_type VARCHAR(100) NOT NULL,
    description TEXT NOT NULL,
    budget_range VARCHAR(100),
    desired_timeline VARCHAR(100),
    created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
    status VARCHAR(50) DEFAULT 'new'
);

-- Secure Row Level Security (RLS) Policy
ALTER TABLE public.enquiries ENABLE ROW LEVEL SECURITY;
CREATE POLICY "Allow Anonymous Insert Only" ON public.enquiries 
    FOR INSERT TO anon WITH CHECK (true);
```