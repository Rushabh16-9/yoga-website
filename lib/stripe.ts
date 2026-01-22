import Stripe from 'stripe';

if (!process.env.STRIPE_SECRET_KEY) {
    throw new Error('STRIPE_SECRET_KEY is not defined');
}

export const stripe = new Stripe(process.env.STRIPE_SECRET_KEY, {
    apiVersion: '2024-12-18.acacia',
    typescript: true,
});

export const PLANS = {
    starter: {
        monthly: {
            priceId: process.env.STRIPE_STARTER_MONTHLY_PRICE_ID || '',
            amount: 1900, // $19.00 in cents
        },
        yearly: {
            priceId: process.env.STRIPE_STARTER_YEARLY_PRICE_ID || '',
            amount: 19000, // $190.00 in cents
        },
    },
    pro: {
        monthly: {
            priceId: process.env.STRIPE_PRO_MONTHLY_PRICE_ID || '',
            amount: 3900, // $39.00 in cents
        },
        yearly: {
            priceId: process.env.STRIPE_PRO_YEARLY_PRICE_ID || '',
            amount: 39000, // $390.00 in cents
        },
    },
    elite: {
        monthly: {
            priceId: process.env.STRIPE_ELITE_MONTHLY_PRICE_ID || '',
            amount: 7900, // $79.00 in cents
        },
        yearly: {
            priceId: process.env.STRIPE_ELITE_YEARLY_PRICE_ID || '',
            amount: 79000, // $790.00 in cents
        },
    },
} as const;

export type PlanType = keyof typeof PLANS;
export type BillingCycle = 'monthly' | 'yearly';
