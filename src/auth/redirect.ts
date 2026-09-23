// Only follow redirects to pages on this site (blocks "//evil.com" and full URLs).
export const safeRedirect = (value: string | null, fallback = "/account") =>
  value && value.startsWith("/") && !value.startsWith("//") ? value : fallback;

// Link to the login page that sends the user back to the current page afterwards.
export const loginHref = (mode: "login" | "register", returnTo: string) =>
  `/${mode}?redirect=${encodeURIComponent(returnTo)}`;
