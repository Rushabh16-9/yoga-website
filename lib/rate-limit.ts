import { NextResponse } from 'next/server';

const rateLimit = new Map<string, { count: number; resetTime: number }>();

const RATE_LIMIT_WINDOW = 60 * 1000; // 1 minute
const MAX_REQUESTS = 60; // 60 requests per minute

export function rateLimiter(identifier: string): boolean {
    const now = Date.now();
    const userLimit = rateLimit.get(identifier);

    if (!userLimit || now > userLimit.resetTime) {
        rateLimit.set(identifier, {
            count: 1,
            resetTime: now + RATE_LIMIT_WINDOW,
        });
        return true;
    }

    if (userLimit.count >= MAX_REQUESTS) {
        return false;
    }

    userLimit.count++;
    return true;
}

export function rateLimitResponse() {
    return NextResponse.json(
        { error: 'Too many requests. Please try again later.' },
        {
            status: 429,
            headers: {
                'Retry-After': '60',
            },
        }
    );
}

// Clean up old entries periodically
setInterval(() => {
    const now = Date.now();
    for (const [key, value] of rateLimit.entries()) {
        if (now > value.resetTime) {
            rateLimit.delete(key);
        }
    }
}, RATE_LIMIT_WINDOW);
