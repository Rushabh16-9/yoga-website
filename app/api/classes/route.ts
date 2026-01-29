import { NextRequest, NextResponse } from 'next/server';
import { prisma } from '@/lib/db';
// import { auth } from '@clerk/nextjs/server'; // TEMPORARY: Disabled for testing

export async function GET(req: NextRequest) {
    try {
        // TEMPORARY: Authentication disabled for testing
        // TODO: Re-enable authentication later
        /*
        const { userId } = await auth();

        if (!userId) {
            return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
        }

        // Get user to check subscription status
        const user = await prisma.user.findUnique({
            where: { clerkId: userId },
            include: { subscription: true },
        });

        if (!user) {
            return NextResponse.json({ error: 'User not found' }, { status: 404 });
        }

        // Check if user has active subscription or trial
        const now = new Date();
        const hasActiveSubscription =
            user.subscription &&
            (user.subscription.status === 'active' ||
                (user.subscription.status === 'trialing' &&
                    user.subscription.trialEndsAt &&
                    user.subscription.trialEndsAt > now));

        if (!hasActiveSubscription) {
            return NextResponse.json(
                { error: 'Active subscription or trial required' },
                { status: 403 }
            );
        }
        */

        // Get query parameters
        const { searchParams } = new URL(req.url);
        const goal = searchParams.get('goal');
        const level = searchParams.get('level');
        const limit = searchParams.get('limit');

        // Build query filters
        const where: any = {};

        if (goal) {
            // Since goals is now a JSON string, we need to use contains
            where.goals = {
                contains: goal,
            };
        }

        if (level && level !== 'all') {
            where.level = level;
        }

        // Fetch classes
        const classes = await prisma.class.findMany({
            where,
            take: limit ? parseInt(limit) : undefined,
            orderBy: {
                createdAt: 'desc',
            },
        });

        return NextResponse.json({
            classes,
            total: classes.length,
        });
    } catch (error) {
        console.error('Fetch classes error:', error);
        return NextResponse.json(
            { error: 'Failed to fetch classes' },
            { status: 500 }
        );
    }
}
