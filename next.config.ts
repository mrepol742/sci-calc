import type { NextConfig } from "next";

const ContentSecurityPolicy = `
  default-src 'self';

  base-uri 'self';
  object-src 'none';

  frame-ancestors 'none';

  style-src 'self' 'unsafe-inline';

  script-src
    'self'
    'unsafe-inline'
    'unsafe-eval'
    https://www.gstatic.com
    https://www.paypal.com;

  font-src
    'self'
    data:
    https://fonts.gstatic.com;

  img-src
    'self'
    data:
    https://www.paypalobjects.com;

  connect-src
    'self'
    https://www.gstatic.com
    https://www.sandbox.paypal.com
    https://www.paypal.com;

  frame-src
    'self'
    https://www.google.com
    https://www.sandbox.paypal.com
    https://www.paypal.com;

  worker-src 'self' blob:;
`.replace(/\n/g, "");

const nextConfig: NextConfig = {
  /* config options here */

  async headers() {
    return [
      {
        source: "/(.*)",
        headers: [
          {
            key: "Content-Security-Policy",
            value: ContentSecurityPolicy,
          },
          {
            key: "X-Frame-Options",
            value: "SAMEORIGIN",
          },
          {
            key: "X-Content-Type-Options",
            value: "nosniff",
          },
          {
            key: "Referrer-Policy",
            value: "strict-origin-when-cross-origin",
          },
          {
            key: "Permissions-Policy",
            value:
              "camera=(), microphone=(), geolocation=(), browsing-topics=()",
          },
          {
            key: "Strict-Transport-Security",
            value: "max-age=31536000; includeSubDomains; preload",
          },
        ],
      },
    ];
  },
};

export default nextConfig;
