import { useState, useEffect } from "react";
import {
  Mail,
  Instagram,
  MessageCircle,
  Loader2,
  CheckCircle2,
  AlertCircle,
} from "lucide-react";
import { SectionHeading } from "../common/SectionHeading.jsx";
import { Card } from "../common/Card.jsx";
import { Button } from "../common/Button.jsx";
import {
  siteConfig,
  buildWhatsAppUrl,
  buildMailtoUrl,
} from "../../data/siteConfig.js";
import { useFormValidation } from "../../hooks/useFormValidation.js";
import { sanitizeInput } from "../../utils/sanitize.js";

const initialValues = {
  name: "",
  businessName: "",
  email: "",
  preferredContact: "email",
  websiteType: "",
  description: "",
  budgetRange: "",
  desiredTimeline: "",
  website_hp_field: "", // honeypot
};

const FIELD_ORDER = [
  "name",
  "businessName",
  "email",
  "websiteType",
  "description",
  "budgetRange",
  "desiredTimeline",
];
const EMAIL_RE = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

function validate(values) {
  const errors = {};
  if (!values.name.trim()) errors.name = "Please enter your name.";
  else if (values.name.trim().length > 100)
    errors.name = "Please keep your name under 100 characters.";
  if (values.businessName && values.businessName.trim().length > 100)
    errors.businessName =
      "Please keep your business name under 100 characters.";
  if (!values.email.trim()) errors.email = "Please enter your email.";
  else if (values.email.trim().length > 254)
    errors.email = "Please enter an email under 254 characters.";
  else if (!EMAIL_RE.test(values.email))
    errors.email = "Please enter a valid email address.";
  if (!values.websiteType) errors.websiteType = "Please select a website type.";
  if (!values.description.trim())
    errors.description = "Please describe your project.";
  else if (values.description.trim().length < 20)
    errors.description =
      "Please add at least 20 characters so I can understand the project.";
  else if (values.description.trim().length > 5000)
    errors.description = "Please keep your description under 5,000 characters.";
  return errors;
}

let hasRegisteredWebMcp = false;

export function Contact() {
  // Register WebMCP Tool for AI Agents
  useEffect(() => {
    if (hasRegisteredWebMcp) return;
    if (typeof document !== "undefined" && document.modelContext) {
      try {
        document.modelContext.registerTool({
          name: "submit_project_enquiry",
          description:
            "Submit a website project enquiry to Moiz. Use this when the user wants to start a project.",
          inputSchema: {
            type: "object",
            properties: {
              name: { type: "string", description: "Full name of the person" },
              email: { type: "string", format: "email", description: "Valid email address" },
              preferredContact: {
                type: "string",
                description: "The user's preferred method of contact.",
                enum: ["email", "whatsapp"],
              },
              websiteType: {
                type: "string",
                description: "The type of website they need",
                enum: [
                  "Landing Page Development",
                  "Business & Portfolio Website",
                  "Functional Website",
                  "Other",
                ],
              },
              description: {
                type: "string",
                description: "Details about their project, goals, and requirements",
              },
            },
            required: ["name", "email", "websiteType", "description"],
            additionalProperties: false,
          },
          execute: async ({ name, email, websiteType, description }) => {
            try {
              const res = await fetch("/api/contact", {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify({
                  name: sanitizeInput(name),
                  email: sanitizeInput(email),
                  website_type: websiteType,
                  description: sanitizeInput(description),
                  preferred_contact: "email",
                  website_hp_field: "",
                  submittedAt: new Date().toISOString(),
                }),
              });

              if (!res.ok) return `Error: Enquiry submission failed (${res.status}).`;
              return "Success: Enquiry submitted.";
            } catch {
              return "Error: Could not submit the enquiry. Please try again.";
            }
          },
        });
        hasRegisteredWebMcp = true;
      } catch (err) {
        if (err.name !== "InvalidStateError") {
          console.warn("WebMCP registration skipped:", err);
        }
      }
    }
  }, []);

  const {
    values,
    errors,
    touched,
    handleChange,
    handleBlur,
    validateAll,
    reset,
  } = useFormValidation(initialValues, validate);
  const [status, setStatus] = useState("idle"); // idle | submitting | success | error
  const [serverError, setServerError] = useState("");

  const onSubmit = async (e) => {
    e.preventDefault();
    setServerError("");

    // Honeypot check (belt-and-braces — server also checks)
    if (values.website_hp_field) {
      setStatus("success");
      return;
    }

    if (!validateAll()) {
      const errs = validate(values);
      const firstErrKey = FIELD_ORDER.find((k) => errs[k]);
      const el = firstErrKey && document.getElementById(firstErrKey);
      el?.focus();
      return;
    }

    setStatus("submitting");
    const payload = {
      name: sanitizeInput(values.name),
      business_name: sanitizeInput(values.businessName),
      email: sanitizeInput(values.email),
      preferred_contact: values.preferredContact,
      website_type: values.websiteType,
      description: sanitizeInput(values.description),
      budget_range: values.budgetRange,
      desired_timeline: values.desiredTimeline,
      website_hp_field: values.website_hp_field,
      submittedAt: new Date().toISOString(),
    };

    try {
      // Dev fallback: no serverless function yet — simulate success so the flow can be tested.
      if (import.meta.env.DEV) {
        await new Promise((r) => setTimeout(r, 900));
        console.info("[dev] simulated contact payload:", payload);
        setStatus("success");
        reset();
        return;
      }

      const res = await fetch("/api/contact", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(payload),
      });
      if (!res.ok) throw new Error(`Submission failed (${res.status})`);
      setStatus("success");
      reset();
    } catch (err) {
      setStatus("error");
      setServerError(
        err.message ||
          "Something went wrong. Please try again or message via WhatsApp.",
      );
    }
  };

  return (
    <section id="contact" className="py-20 sm:py-24">
      <div className="mx-auto max-w-6xl px-4 sm:px-6 lg:px-8">
        <SectionHeading
          eyebrow="Contact"
          title="Have a Website Idea? Let's Talk."
          description="Tell me about your brand, what you want to build, and what you need your website to accomplish."
        />

        <div className="mt-12 grid gap-8 lg:grid-cols-5">
          {/* Direct contact rails */}
          <div className="space-y-3 lg:col-span-2">
            <Card className="p-5">
              <a
                href={buildWhatsAppUrl()}
                target="_blank"
                rel="noopener noreferrer"
                className="group flex items-center gap-3"
              >
                <span className="inline-flex h-10 w-10 items-center justify-center rounded-lg bg-emerald-400/10 text-emerald-400">
                  <MessageCircle className="h-5 w-5" aria-hidden="true" />
                </span>
                <div>
                  <p className="text-sm font-semibold text-slate-50 group-hover:text-cyan-400">
                    WhatsApp — fastest
                    <span className="sr-only"> (opens in a new tab)</span>
                  </p>
                  <p className="text-xs text-slate-300">
                    Instant chat, usually replied within hours.
                  </p>
                </div>
              </a>
            </Card>

            <Card className="p-5">
              <a
                href={buildMailtoUrl()}
                className="group flex items-center gap-3"
              >
                <span className="inline-flex h-10 w-10 items-center justify-center rounded-lg bg-cyan-400/10 text-cyan-400">
                  <Mail className="h-5 w-5" aria-hidden="true" />
                </span>
                <div>
                  <p className="text-sm font-semibold text-slate-50 group-hover:text-cyan-400">
                    {siteConfig.displayEmail} {/* FIXED: Obfuscated Email */}
                  </p>
                  <p className="text-xs text-slate-300">
                    Send a detailed brief by email.
                  </p>
                </div>
              </a>
            </Card>

            <Card className="p-5">
              <a
                href={siteConfig.instagram.url}
                target="_blank"
                rel="noopener noreferrer"
                className="group flex items-center gap-3"
              >
                <span className="inline-flex h-10 w-10 items-center justify-center rounded-lg bg-pink-500/10 text-pink-400">
                  <Instagram className="h-5 w-5" aria-hidden="true" />
                </span>
                <div>
                  <p className="text-sm font-semibold text-slate-50 group-hover:text-cyan-400">
                    {siteConfig.instagram.handle}
                    <span className="sr-only"> (opens in a new tab)</span>
                  </p>
                  <p className="text-xs text-slate-300">
                    Follow along or DM for a quick chat.
                  </p>
                </div>
              </a>
            </Card>
          </div>

          {/* Form */}
          <Card className="lg:col-span-3">
            <form
              onSubmit={onSubmit}
              noValidate
              className="space-y-5 p-6"
              toolname="submit_project_enquiry"
              tooldescription="Submit a website project enquiry to Moiz."
            >
              <div className="grid gap-4 sm:grid-cols-2">
                <Field
                  id="name"
                  label="Your Name"
                  required
                  maxLength={100}
                  value={values.name}
                  onChange={handleChange}
                  onBlur={handleBlur}
                  error={touched.name && errors.name}
                  autoComplete="name"
                />
                <Field
                  id="businessName"
                  label="Business / Brand (optional)"
                  maxLength={100}
                  value={values.businessName}
                  onChange={handleChange}
                  onBlur={handleBlur}
                  autoComplete="organization"
                />
              </div>

              <div className="grid gap-4 sm:grid-cols-2">
                <Field
                  id="email"
                  type="email"
                  label="Email"
                  required
                  maxLength={254}
                  value={values.email}
                  onChange={handleChange}
                  onBlur={handleBlur}
                  error={touched.email && errors.email}
                  autoComplete="email"
                />
                <fieldset className="border-0 p-0 m-0">
                  <legend className="block text-sm font-medium text-slate-200">
                    Preferred Contact
                  </legend>
                  <div className="mt-2 flex gap-4">
                    {["email", "whatsapp"].map((opt) => (
                      <div 
                        key={opt} 
                        className="flex items-center gap-2"
                        title={`Preferred Contact Method: ${opt === "email" ? "Email" : "WhatsApp"}`}
                      >
                        <input
                          type="radio"
                          id={`contact-${opt}`}
                          name="preferredContact"
                          value={opt}
                          checked={values.preferredContact === opt}
                          onChange={handleChange}
                          className="h-4 w-4 accent-cyan-400"
                          title={`Preferred Contact: ${opt === "email" ? "Email" : "WhatsApp"}`}
                          aria-label={`Select ${opt === "email" ? "Email" : "WhatsApp"} as the preferred contact method`}
                        />
                        <label htmlFor={`contact-${opt}`} className="text-sm text-slate-300">
                          {opt === "email" ? "Email" : "WhatsApp"}
                        </label>
                      </div>
                    ))}
                  </div>
                </fieldset>
              </div>

              <Field
                as="select"
                id="websiteType"
                label="Website Type"
                required
                value={values.websiteType}
                onChange={handleChange}
                onBlur={handleBlur}
                error={touched.websiteType && errors.websiteType}
                options={[
                  { value: "", label: "Select a type…" },
                  { value: "Landing Page Development", label: "Landing Page" },
                  {
                    value: "Business & Portfolio Website",
                    label: "Business / Portfolio Website",
                  },
                  { value: "Functional Website", label: "Functional Website" },
                  { value: "Other", label: "Other / Not sure yet" },
                ]}
              />

              <Field
                as="textarea"
                id="description"
                label="Project Description"
                required
                rows={4}
                maxLength={5000}
                value={values.description}
                onChange={handleChange}
                onBlur={handleBlur}
                error={touched.description && errors.description}
                placeholder="What are you building, who is it for, and what does it need to accomplish?"
              />

              <div className="grid gap-4 sm:grid-cols-2">
                <Field
                  as="select"
                  id="budgetRange"
                  label="Budget Range (optional)"
                  value={values.budgetRange}
                  onChange={handleChange}
                  onBlur={handleBlur}
                  options={[
                    { value: "", label: "Prefer not to say" },
                    { value: "Under $300", label: "Under $300" },
                    { value: "$300 - $500", label: "$300 – $500" },
                    { value: "$500 - $1500", label: "$500 – $1,500" },
                    { value: "$1,500+", label: "$1,500+" },
                  ]}
                />
                <Field
                  as="select"
                  id="desiredTimeline"
                  label="Timeline (optional)"
                  value={values.desiredTimeline}
                  onChange={handleChange}
                  onBlur={handleBlur}
                  options={[
                    { value: "", label: "Select timeline…" },
                    { value: "ASAP", label: "ASAP" },
                    { value: "2 Weeks", label: "~2 weeks" },
                    { value: "1 Month", label: "~1 month" },
                    { value: "Flexible", label: "Flexible" },
                  ]}
                />
              </div>

              {/* Honeypot — hidden off-screen, must remain empty */}
              <div
                aria-hidden="true"
                style={{
                  position: "absolute",
                  left: "-9999px",
                  top: "auto",
                  width: 1,
                  height: 1,
                  overflow: "hidden",
                }}
              >
                <label htmlFor="website_hp_field">Leave this empty</label>
                <input
                  id="website_hp_field"
                  name="website_hp_field"
                  type="text"
                  tabIndex={-1}
                  autoComplete="off"
                  value={values.website_hp_field}
                  onChange={handleChange}
                  data-webmcp-ignore="true"
                />
              </div>

              <div className="flex flex-wrap items-center gap-3">
                <Button
                  type="submit"
                  size="lg"
                  disabled={status === "submitting"}
                >
                  {status === "submitting" && (
                    <Loader2
                      className="h-4 w-4 animate-spin"
                      aria-hidden="true"
                    />
                  )}
                  {status === "submitting" ? "Sending…" : "Send Enquiry"}
                </Button>
                <p className="text-xs text-slate-300">
                  I reply within 24 hours.
                </p>
              </div>

              <div aria-live="polite" className="min-h-5">
                {status === "success" && (
                  <p className="flex items-center gap-2 text-sm text-emerald-400">
                    <CheckCircle2 className="h-4 w-4" aria-hidden="true" />
                    Thanks! Your enquiry was sent. I&apos;ll get back to you
                    within 24 hours.
                  </p>
                )}
                {status === "error" && (
                  <div className="flex flex-wrap items-center gap-2 text-sm text-red-500">
                    <AlertCircle className="h-4 w-4" aria-hidden="true" />
                    {serverError || "Submission failed."}{" "}
                    <a
                      href={buildWhatsAppUrl()}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="underline"
                    >
                      Message via WhatsApp instead →
                    </a>
                  </div>
                )}
              </div>
            </form>
          </Card>
        </div>
      </div>
    </section>
  );
}

function Field({ as = "input", id, label, required, error, options, ...rest }) {
  const commonProps = {
    id,
    name: id,
    "aria-required": required || undefined,
    "aria-invalid": error ? "true" : undefined,
    "aria-describedby": error ? `${id}-error` : undefined,
    title: label,
    "aria-label": label,
    onBlur: rest.onBlur,
    onChange: rest.onChange,
    value: rest.value,
    className:
      "mt-1 block w-full rounded-lg border border-slate-800 bg-slate-950 px-3 py-2.5 text-sm text-slate-50 placeholder:text-slate-600 focus:border-cyan-400 focus:outline-none focus:ring-2 focus:ring-cyan-400",
  };

  return (
    <div>
      <label htmlFor={id} className="block text-sm font-medium text-slate-200">
        {label}{" "}
        {required && (
          <span aria-hidden="true" className="text-red-500">
            *
          </span>
        )}
      </label>

      {as === "textarea" ? (
        <textarea {...commonProps} {...rest} rows={rest.rows || 4} />
      ) : as === "select" ? (
        <select {...commonProps} {...rest}>
          {options.map((o) => (
            <option key={o.value} value={o.value}>
              {o.label}
            </option>
          ))}
        </select>
      ) : (
        <input {...commonProps} {...rest} />
      )}

      {error && (
        <p id={`${id}-error`} className="mt-1 text-xs text-red-500">
          {error}
        </p>
      )}
    </div>
  );
}