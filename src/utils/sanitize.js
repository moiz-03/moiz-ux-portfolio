import DOMPurify from 'dompurify';

/** Strip all HTML/attributes — the input is treated as plain text. */
export function sanitizeInput(value) {
  if (typeof value !== 'string') return '';
  return DOMPurify.sanitize(value, { ALLOWED_TAGS: [], ALLOWED_ATTR: [] });
}
