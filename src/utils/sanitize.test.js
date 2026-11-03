// @vitest-environment jsdom
import { describe, it, expect } from 'vitest';
import { sanitizeInput } from './sanitize.js';

describe('sanitizeInput', () => {
  it('strips HTML tags', () => {
    expect(sanitizeInput('<script>alert(1)</script>Hello')).toBe('Hello');
  });

  it('returns empty string for non-strings', () => {
    expect(sanitizeInput(null)).toBe('');
    expect(sanitizeInput(123)).toBe('');
  });
});
