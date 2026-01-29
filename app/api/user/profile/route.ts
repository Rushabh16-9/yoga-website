import { NextRequest, NextResponse } from 'next/server';
import { auth } from '@clerk/nextjs/server';
import { prisma } from '@/lib/db';

export async function PUT(req: NextRequest) {
    try {
        const { userId } = await auth();

        if (!userId) {
            return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
        }

        const body = await req.json();
        const { goal, bmi, weight, height } = body;

        // Get user
        const user = await prisma.user.findUnique({
            where: { clerkId: userId },
        });

        if (!user) {
            return NextResponse.json({ error: 'User not found' }, { status: 404 });
        }

        // Update user profile
        const updatedUser = await prisma.user.update({
            where: { id: user.id },
            data: {
                goal,
                bmi: bmi ? parseFloat(bmi) : undefined,
                weight: weight ? parseFloat(weight) : undefined,
                height: height ? parseFloat(height) : undefined,
            },
        });

        return NextResponse.json({
            success: true,
            user: updatedUser,
        });
    } catch (error) {
        console.error('Update profile error:', error);
        return NextResponse.json(
            { error: 'Failed to update profile' },
            { status: 500 }
        );
    }
}

export async function GET(req: NextRequest) {
    try {
        const { userId } = await auth();

        if (!userId) {
            return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
        }

        const user = await prisma.user.findUnique({
            where: { clerkId: userId },
        });

        if (!user) {
            return NextResponse.json({ error: 'User not found' }, { status: 404 });
        }

        return NextResponse.json({ user });
    } catch (error) {
        console.error('Get profile error:', error);
        return NextResponse.json(
            { error: 'Failed to get profile' },
            { status: 500 }
        );
    }
}
