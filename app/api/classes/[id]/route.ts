import { NextRequest, NextResponse } from 'next/server';
import { prisma } from '@/lib/db';
// import { auth } from '@clerk/nextjs/server'; // TEMPORARY: Disabled for testing

export async function GET(
    req: NextRequest,
    { params }: { params: Promise<{ id: string }> }
) {
    try {
        // TEMPORARY: Authentication disabled for testing
        // TODO: Re-enable authentication later
        /*
        const { userId } = await auth();

        if (!userId) {
            return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
        }

        const { id } = await params;

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

        const { id } = await params;

        // Fetch the class
        const yogaClass = await prisma.class.findUnique({
            where: { id },
        });

        if (!yogaClass) {
            return NextResponse.json({ error: 'Class not found' }, { status: 404 });
        }

        return NextResponse.json({ class: yogaClass });
    } catch (error) {
        console.error('Fetch class error:', error);
        return NextResponse.json(
            { error: 'Failed to fetch class' },
            { status: 500 }
        );
    }
}
