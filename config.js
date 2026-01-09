const config = {
  // REQUIRED
  appName: "Fillable",
  // REQUIRED: a short description of your app for SEO tags (can be overwritten)
  appDescription:
    "Turn any PDF into a fillable form. Our AI detects text fields, checkboxes, and signature areas. Fill forms in your browser and download instantly.",
  // REQUIRED (no https://, not trialing slash at the end, just the naked domain)
  domainName: "fillapdf.com",
  crisp: {
    // Crisp website ID. IF YOU DON'T USE CRISP: just remove this => Then add a support email in this config file (resend.supportEmail) otherwise customer support won't work.
    id: "",
    // Hide Crisp by default, except on route "/". Crisp is toggled with <ButtonSupport/>. If you want to show Crisp on every routes, just remove this below
    onlyShowOnRoutes: ["/"],
  },
  stripe: {
    // Create multiple plans in your Stripe dashboard, then add them here. You can add as many plans as you want, just make sure to add the priceId
    plans: [
      {
        priceId:
          process.env.NODE_ENV === "development"
            ? "price_1Niyy5AxyNprDp7iZIqEyD2h"
            : "price_456",
        name: "Starter",
        description: "For occasional use",
        price: 9,
        priceAnchor: 15,
        features: [
          { name: "10 PDF conversions/month" },
          { name: "AI field detection" },
          { name: "Fill & download forms" },
          { name: "Basic support" },
        ],
      },
      {
        isFeatured: true,
        priceId:
          process.env.NODE_ENV === "development"
            ? "price_1O5KtcAxyNprDp7iftKnrrpw"
            : "price_456",
        name: "Pro",
        description: "For professionals",
        price: 29,
        priceAnchor: 49,
        features: [
          { name: "100 PDF conversions/month" },
          { name: "AI field detection" },
          { name: "Fill & download forms" },
          { name: "Batch convert (up to 10)" },
          { name: "AI auto-fill forms" },
          { name: "Priority support" },
        ],
      },
      {
        priceId:
          process.env.NODE_ENV === "development"
            ? "price_1O5KtcAxyNprDp7iftKnrrpw"
            : "price_789",
        name: "Business",
        description: "For teams & high volume",
        price: 99,
        priceAnchor: 149,
        features: [
          { name: "Unlimited conversions" },
          { name: "AI field detection" },
          { name: "Fill & download forms" },
          { name: "Batch convert (unlimited)" },
          { name: "AI auto-fill forms" },
          { name: "Batch AI fill (CSV/Excel)" },
          { name: "API access" },
          { name: "24/7 priority support" },
        ],
      },
    ],
  },
  aws: {
    // If you use AWS S3/Cloudfront, put values in here
    bucket: "bucket-name",
    bucketUrl: `https://bucket-name.s3.amazonaws.com/`,
    cdn: "https://cdn-id.cloudfront.net/",
  },
  resend: {
    // REQUIRED — Email 'From' field to be used when sending magic login links
    fromNoReply: `Fillable <noreply@fillapdf.com>`,
    // REQUIRED — Email 'From' field to be used when sending other emails, like abandoned carts, updates etc..
    fromAdmin: `Fillable <hello@fillapdf.com>`,
    // Email shown to customer if need support. Leave empty if not needed => if empty, set up Crisp above, otherwise you won't be able to offer customer support."
    supportEmail: "support@fillapdf.com",
  },
  colors: {
    // REQUIRED — The DaisyUI theme to use (added to the main layout.js). Leave blank for default (light & dark mode).
    theme: "light",
    // REQUIRED — This color will be reflected on the whole app outside of the document (loading bar, Chrome tabs, etc..).
    // For DaisyUI v5, we use a standard primary color
    main: "#570df8",
  },
  auth: {
    // REQUIRED — the path to log in users. It's use to protect private routes (like /dashboard). It's used in apiClient (/libs/api.js) upon 401 errors from our API
    loginUrl: "/signin",
    // REQUIRED — the path you want to redirect users after successfull login (i.e. /dashboard, /private). This is normally a private page for users to manage their accounts. It's used in apiClient (/libs/api.js) upon 401 errors from our API & in ButtonSignin.js
    callbackUrl: "/dashboard",
  },
};

export default config;
