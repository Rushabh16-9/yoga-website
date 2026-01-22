import { z } from 'zod';

export const userSchema = z.object({
    email: z.string().email('Invalid email address'),
    firstName: z.string().min(2, 'First name must be at least 2 characters'),
    lastName: z.string().min(2, 'Last name must be at least 2 characters'),
});

export const bookingSchema = z.object({
    instructorName: z.string().min(1, 'Instructor name is required'),
    sessionType: z.enum(['1-on-1', 'group', 'workshop']),
    scheduledAt: z.string().datetime('Invalid date format'),
    duration: z.number().min(15, 'Duration must be at least 15 minutes').max(180, 'Duration cannot exceed 180 minutes'),
    notes: z.string().optional(),
});

export const progressSchema = z.object({
    classId: z.string().cuid('Invalid class ID'),
    completed: z.boolean(),
    duration: z.number().min(1, 'Duration must be at least 1 minute'),
});

export const subscriptionSchema = z.object({
    plan: z.enum(['starter', 'pro', 'elite']),
    billingCycle: z.enum(['monthly', 'yearly']),
});

// Sanitize user input to prevent XSS
export function sanitizeInput(input: string): string {
    return input
        .replace(/</g, '&lt;')
        .replace(/>/g, '&gt;')
        .replace(/"/g, '&quot;')
        .replace(/'/g, '&#x27;')
        .replace(/\//g, '&#x2F;');
}

// Validate and sanitize email
export function validateEmail(email: string): boolean {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailRegex.test(email);
}
