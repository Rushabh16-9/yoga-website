import { NextRequest, NextResponse } from 'next/server';

const YOGA_API_URL = 'https://yoga-api-nzy4.onrender.com/v1/poses';

export async function GET(
    req: NextRequest,
    { params }: { params: Promise<{ id: string }> }
) {
    try {
        const { id } = await params;

        const response = await fetch(YOGA_API_URL, {
            next: { revalidate: 3600 }
        });

        if (!response.ok) {
            throw new Error('Failed to fetch poses from API');
        }

        const poses = await response.json();
        const pose = poses.find((p: any) => p.id.toString() === id);

        if (!pose) {
            return NextResponse.json({ error: 'Pose not found' }, { status: 404 });
        }

        return NextResponse.json({ pose });
    } catch (error) {
        console.error('Fetch pose error:', error);
        return NextResponse.json(
            { error: 'Failed to fetch pose' },
            { status: 500 }
        );
    }
}
