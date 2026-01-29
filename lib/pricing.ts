/**
 * Dynamic pricing logic with geo-localization support
 * Supports USD and INR currencies based on user location
 */

import { CURRENCIES } from './constants';

export type Currency = 'USD' | 'INR';
export type PlanType = 'starter' | 'pro' | 'elite';

/**
 * Pricing structure for all plans in different currencies
 */
export const PRICING = {
    starter: {
        USD: {
            monthly: 29,
            yearly: 290, // ~$24/month
        },
        INR: {
            monthly: 2400,
            yearly: 24000, // ~₹2000/month
        },
    },
    pro: {
        USD: {
            monthly: 49,
            yearly: 490, // ~$41/month
        },
        INR: {
            monthly: 4000,
            yearly: 40000, // ~₹3333/month
        },
    },
    elite: {
        USD: {
            monthly: 99,
            yearly: 990, // ~$83/month
        },
        INR: {
            monthly: 8000,
            yearly: 80000, // ~₹6667/month
        },
    },
} as const;

/**
 * Plan features and descriptions
 */
export const PLAN_FEATURES = {
    starter: {
        name: 'Starter',
        description: 'Perfect for beginners starting their yoga journey',
        features: [
            'Access to 100+ beginner classes',
            'Personalized 21-day plan',
            'Progress tracking',
            'Mobile app access',
            'Community support',
        ],
        popular: false,
    },
    pro: {
        name: 'Pro',
        description: 'For dedicated practitioners seeking growth',
        features: [
            'Everything in Starter',
            'Access to 500+ classes (all levels)',
            'Live weekly sessions',
            'Advanced progress analytics',
            'Downloadable content',
            'Priority support',
        ],
        popular: true,
    },
    elite: {
        name: 'Elite',
        description: 'Premium experience with personalized coaching',
        features: [
            'Everything in Pro',
            'Unlimited access to all content',
            '1-on-1 monthly coaching session',
            'Custom meal plans',
            'Early access to new classes',
            'Exclusive workshops',
            'Dedicated support line',
        ],
        popular: false,
    },
} as const;

/**
 * Get price for a specific plan and currency
 */
export function getPriceForRegion(
    plan: PlanType,
    currency: Currency,
    billingCycle: 'monthly' | 'yearly' = 'monthly'
): number {
    return PRICING[plan][currency][billingCycle];
}

/**
 * Format price with currency symbol
 */
export function formatPrice(
    amount: number,
    currency: Currency
): string {
    const currencyInfo = CURRENCIES[currency];
    const formattedAmount = amount.toLocaleString();

    if (currencyInfo.position === 'before') {
        return `${currencyInfo.symbol}${formattedAmount}`;
    } else {
        return `${formattedAmount}${currencyInfo.symbol}`;
    }
}

/**
 * Calculate savings for yearly plan
 */
export function calculateYearlySavings(
    plan: PlanType,
    currency: Currency
): { amount: number; percentage: number } {
    const monthlyPrice = PRICING[plan][currency].monthly;
    const yearlyPrice = PRICING[plan][currency].yearly;
    const monthlyTotal = monthlyPrice * 12;
    const savings = monthlyTotal - yearlyPrice;
    const percentage = Math.round((savings / monthlyTotal) * 100);

    return { amount: savings, percentage };
}

/**
 * Get trial period information
 */
export const TRIAL_INFO = {
    duration: 14, // days
    description: '14-day free trial',
    features: 'Full access to all Starter plan features',
} as const;
