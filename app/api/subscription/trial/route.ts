import { NextRequest, NextResponse } from 'next/server';
// import { auth } from '@clerk/nextjs/server'; // TEMPORARY: Disabled for testing
import { prisma } from '@/lib/db';

export async function POST(req: NextRequest) {
    try {
        // TEMPORARY: Authentication disabled for testing
        // Return mock success response
        return NextResponse.json({
            success: true,
            message: 'Trial activation disabled during testing. Authentication will be enabled later.',
        });

        /*
        const { userId } = await auth();

        if (!userId) {
            return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
        }

        // Check if user exists
        const user = await prisma.user.findUnique({
            where: { clerkId: userId },
            include: { subscription: true },
        });

        if (!user) {
            return NextResponse.json({ error: 'User not found' }, { status: 404 });
        }

        // Check if user already has a subscription or trial
        if (user.subscription) {
            return NextResponse.json(
                { error: 'User already has an active subscription or trial' },
                { status: 400 }
            );
        }

        // Get plan from request body (optional)
        const body = await req.json();
        const plan = body.plan || 'starter';

        // Create trial subscription (14 days from now)
        const trialEndsAt = new Date();
        trialEndsAt.setDate(trialEndsAt.getDate() + 14);

        const currentPeriodEnd = new Date(trialEndsAt);

        const subscription = await prisma.subscription.create({
            data: {
                userId: user.id,
                plan,
                status: 'trialing',
                billingCycle: 'monthly',
                currentPeriodStart: new Date(),
                currentPeriodEnd,
                trialEndsAt,
                cancelAtPeriodEnd: false,
            },
        });

        return NextResponse.json({
            success: true,
            subscription,
            message: 'Trial activated successfully',
        });
        */
    } catch (error) {
        console.error('Trial activation error:', error);
        return NextResponse.json(
            { error: 'Failed to activate trial' },
            { status: 500 }
        );
    }
}

export async function GET(req: NextRequest) {
    try {
        // TEMPORARY: Authentication disabled for testing
        // Return mock trial status
        return NextResponse.json({
            subscription: null,
            isTrialActive: false,
            daysRemaining: 0,
        });

        /*
        const { userId } = await auth();

        if (!userId) {
            return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
        }

        const user = await prisma.user.findUnique({
            where: { clerkId: userId },
            include: { subscription: true },
        });

        if (!user || !user.subscription) {
            return NextResponse.json({ subscription: null });
        }

        // Check if trial is still active
        const now = new Date();
        const isTrialActive =
            user.subscription.trialEndsAt && user.subscription.trialEndsAt > now;

        return NextResponse.json({
            subscription: user.subscription,
            isTrialActive,
            daysRemaining: isTrialActive
                ? Math.ceil(
                    (user.subscription.trialEndsAt!.getTime() - now.getTime()) /
                    (1000 * 60 * 60 * 24)
                )
                : 0,
        });
        */
    } catch (error) {
        console.error('Get trial status error:', error);
        return NextResponse.json(
            { error: 'Failed to get trial status' },
            { status: 500 }
        );
    }
}
