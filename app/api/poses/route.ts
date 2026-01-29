import { NextRequest, NextResponse } from 'next/server';

// Yoga Poses API endpoint
const YOGA_API_URL = 'https://yoga-api-nzy4.onrender.com/v1/poses';

export async function GET(req: NextRequest) {
    try {
        const response = await fetch(YOGA_API_URL, {
            next: { revalidate: 3600 } // Cache for 1 hour
        });

        if (!response.ok) {
            throw new Error('Failed to fetch poses from API');
        }

        const poses = await response.json();

        // Get query parameters for filtering
        const { searchParams } = new URL(req.url);
        const search = searchParams.get('search')?.toLowerCase();
        const difficulty = searchParams.get('difficulty');

        let filteredPoses = poses;

        // Filter by search term
        if (search) {
            filteredPoses = filteredPoses.filter((pose: any) =>
                pose.english_name.toLowerCase().includes(search) ||
                pose.sanskrit_name_adapted.toLowerCase().includes(search) ||
                pose.pose_benefits.toLowerCase().includes(search)
            );
        }

        // Note: The API doesn't have difficulty levels, but we can add them later
        // For now, we'll return all poses

        return NextResponse.json({
            poses: filteredPoses,
            total: filteredPoses.length,
        });
    } catch (error) {
        console.error('Fetch poses error:', error);
        return NextResponse.json(
            { error: 'Failed to fetch poses' },
            { status: 500 }
        );
    }
}
