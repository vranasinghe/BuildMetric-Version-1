// Only follow redirects to pages on this site. Blocks full URLs and "//evil.com",
// plus "/\evil.com" (browsers read a backslash as a slash) and control characters.
export const safeRedirect = (value: string | null, fallback = "/account") =>
  value &&
  value.startsWith("/") &&
  !value.startsWith("//") &&
  !value.includes("\\") &&
  // eslint-disable-next-line no-control-regex
  !/[\u0000-\u001f\u007f]/.test(value)
    ? value
    : fallback;

// Link to the login page that sends the user back to the current page afterwards.
export const loginHref = (mode: "login" | "register", returnTo: string) =>
  `/${mode}?redirect=${encodeURIComponent(returnTo)}`;
