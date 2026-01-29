import { NextRequest, NextResponse } from 'next/server';
import { auth } from '@clerk/nextjs/server';
import { prisma } from '@/lib/db';

export async function POST(
    req: NextRequest,
    { params }: { params: Promise<{ id: string }> }
) {
    try {
        const { userId } = await auth();

        if (!userId) {
            return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
        }

        const { id } = await params;
        const body = await req.json();
        const { duration } = body;

        // Get user
        const user = await prisma.user.findUnique({
            where: { clerkId: userId },
        });

        if (!user) {
            return NextResponse.json({ error: 'User not found' }, { status: 404 });
        }

        // Upsert progress
        const progress = await prisma.progress.upsert({
            where: {
                userId_classId: {
                    userId: user.id,
                    classId: id,
                },
            },
            update: {
                completed: true,
                completedAt: new Date(),
                duration: duration || 0,
            },
            create: {
                userId: user.id,
                classId: id,
                completed: true,
                completedAt: new Date(),
                duration: duration || 0,
            },
        });

        return NextResponse.json({
            success: true,
            progress,
        });
    } catch (error) {
        console.error('Mark complete error:', error);
        return NextResponse.json(
            { error: 'Failed to mark as complete' },
            { status: 500 }
        );
    }
}
