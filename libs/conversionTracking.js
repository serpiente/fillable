// Conversion tracking utilities using cookies
// Tracks how many free conversions a user has used

const COOKIE_NAME = "pdf_conversions";
const EMAIL_COOKIE_NAME = "pdf_email_provided";
const COOKIE_MAX_AGE = 60 * 60 * 24 * 365; // 1 year

export function getConversionCount() {
  if (typeof window === "undefined") return 0;

  const cookieValue = document.cookie
    .split("; ")
    .find((row) => row.startsWith(`${COOKIE_NAME}=`))
    ?.split("=")[1];

  return cookieValue ? parseInt(cookieValue, 10) || 0 : 0;
}

export function incrementConversionCount() {
  const current = getConversionCount();
  const newCount = current + 1;
  document.cookie = `${COOKIE_NAME}=${newCount}; max-age=${COOKIE_MAX_AGE}; path=/; SameSite=Lax`;
  return newCount;
}

export function hasProvidedEmail() {
  if (typeof window === "undefined") return false;
  return document.cookie.includes(`${EMAIL_COOKIE_NAME}=true`);
}

export function markEmailProvided() {
  document.cookie = `${EMAIL_COOKIE_NAME}=true; max-age=${COOKIE_MAX_AGE}; path=/; SameSite=Lax`;
}
