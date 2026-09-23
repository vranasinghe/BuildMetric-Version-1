export class ValidationError extends Error {
  constructor(message) {
    super(message);
    this.status = 400;
  }
}

const EMAIL_RE = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

export function text(value, label, { required = false, max = 255 } = {}) {
  const v = typeof value === "string" ? value.trim() : "";
  if (required && !v) throw new ValidationError(`${label} is required.`);
  if (v.length > max) throw new ValidationError(`${label} must be ${max} characters or fewer.`);
  return v || null;
}

export function email(value) {
  const v = text(value, "Email", { required: true, max: 255 }).toLowerCase();
  if (!EMAIL_RE.test(v)) throw new ValidationError("Please enter a valid email address.");
  return v;
}

export function password(value) {
  if (typeof value !== "string" || value.length < 8) {
    throw new ValidationError("Password must be at least 8 characters.");
  }
  if (value.length > 128) throw new ValidationError("Password must be 128 characters or fewer.");
  return value;
}

export function oneOf(value, label, allowed) {
  if (!allowed.includes(value)) throw new ValidationError(`${label} must be one of: ${allowed.join(", ")}.`);
  return value;
}
