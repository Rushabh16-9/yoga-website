import type { NextConfig } from "next";

const nextConfig: NextConfig = {
    images: {
        remotePatterns: [
            {
                protocol: "https",
                hostname: "images.unsplash.com",
            },
            {
                protocol: "https",
                hostname: "res.cloudinary.com",
            },
            {
                protocol: "https",
                hostname: "**.pexels.com",
            },
        ],
    },
    async headers() {
        return [
            {
                source: "/:path*",
                headers: [
                    {
                        key: "Content-Security-Policy",
                        value: [
                            "default-src 'self'",
                            "script-src 'self' 'unsafe-eval' 'unsafe-inline' https://challenges.cloudflare.com",
                            "style-src 'self' 'unsafe-inline' https://fonts.googleapis.com",
                            "img-src 'self' data: https: blob:",
                            "font-src 'self' https://fonts.gstatic.com",
                            "connect-src 'self' https://*.clerk.accounts.dev https://api.stripe.com https://api.cloudinary.com",
                            "frame-src 'self' https://challenges.cloudflare.com https://js.stripe.com",
                            "media-src 'self' https://res.cloudinary.com blob:",
                        ].join("; "),
                    },
                    {
                        key: "X-Frame-Options",
                        value: "DENY",
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
                        value: "camera=(), microphone=(), geolocation=(self)",
                    },
                ],
            },
        ];
    },
};

export default nextConfig;
