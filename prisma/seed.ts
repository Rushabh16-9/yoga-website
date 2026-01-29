import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

async function main() {
    console.log('🌱 Starting database seed...');

    // Clear existing classes
    await prisma.class.deleteMany({});
    console.log('✅ Cleared existing classes');

    // Yoga classes data
    const classes = [
        // Weight Loss Classes
        {
            title: 'Power Vinyasa Flow',
            description: 'High-intensity vinyasa flow designed to boost metabolism and build lean muscle. Dynamic sequences with minimal rest.',
            instructorName: 'Sarah Chen',
            duration: 45,
            level: 'intermediate',
            category: 'Vinyasa',
            goals: ['weight_loss', 'strength'],
            videoUrl: 'https://www.youtube.com/embed/v7AYKMP6rOE',
            thumbnailUrl: 'https://images.unsplash.com/photo-1544367567-0f2fcb009e0b?w=800&q=80',
        },
        {
            title: 'Fat Burning Core Flow',
            description: 'Intense core-focused practice combining planks, twists, and dynamic movements to ignite your metabolism.',
            instructorName: 'Michael Rodriguez',
            duration: 30,
            level: 'intermediate',
            category: 'Power Yoga',
            goals: ['weight_loss', 'strength'],
            videoUrl: 'https://www.youtube.com/embed/Eml2xnoLpYE',
            thumbnailUrl: 'https://images.unsplash.com/photo-1571019614242-c5c5dee9f50b?w=800&q=80',
        },
        {
            title: 'Cardio Yoga Blast',
            description: 'Fast-paced yoga combining sun salutations with cardio bursts. Perfect for weight loss and endurance.',
            instructorName: 'Emma Thompson',
            duration: 40,
            level: 'beginner',
            category: 'Vinyasa',
            goals: ['weight_loss'],
            videoUrl: 'https://www.youtube.com/embed/4pKly2JojMw',
            thumbnailUrl: 'https://images.unsplash.com/photo-1599901860904-17e6ed7083a0?w=800&q=80',
        },
        {
            title: 'Morning Metabolism Booster',
            description: 'Energizing morning practice to kickstart your metabolism and burn calories throughout the day.',
            instructorName: 'Lisa Wang',
            duration: 20,
            level: 'beginner',
            category: 'Vinyasa',
            goals: ['weight_loss'],
            videoUrl: 'https://www.youtube.com/embed/UEEsdXn8oG8',
            thumbnailUrl: 'https://images.unsplash.com/photo-1544367563-12123d815d19?w=800&q=80',
        },

        // Flexibility Classes
        {
            title: 'Deep Hip Openers',
            description: 'Slow-paced practice focusing on releasing tight hips through sustained holds and gentle stretches.',
            instructorName: 'Raj Patel',
            duration: 40,
            level: 'all',
            category: 'Yin',
            goals: ['flexibility', 'stress'],
            videoUrl: 'https://www.youtube.com/embed/02AOaqJMnxU',
            thumbnailUrl: 'https://images.unsplash.com/photo-1506126613408-eca07ce68773?w=800&q=80',
        },
        {
            title: 'Full Body Flexibility Flow',
            description: 'Comprehensive stretching routine targeting all major muscle groups for improved flexibility and mobility.',
            instructorName: 'Jennifer Lee',
            duration: 50,
            level: 'intermediate',
            category: 'Hatha',
            goals: ['flexibility'],
            videoUrl: 'https://www.youtube.com/embed/Yzm3fA2HhkQ',
            thumbnailUrl: 'https://images.unsplash.com/photo-1552196563-55cd4e45efb3?w=800&q=80',
        },
        {
            title: 'Yin Yoga Deep Stretch',
            description: 'Hold poses for 3-5 minutes to release deep fascial tension and dramatically improve flexibility.',
            instructorName: 'Sarah Chen',
            duration: 60,
            level: 'all',
            category: 'Yin',
            goals: ['flexibility', 'stress'],
            videoUrl: 'https://www.youtube.com/embed/dIAfnS8q5lM',
            thumbnailUrl: 'https://images.unsplash.com/photo-1588286840104-8957b019727f?w=800&q=80',
        },
        {
            title: 'Spine Awakening',
            description: 'Gentle morning practice to improve spinal flexibility and relieve back tension.',
            instructorName: 'Michael Rodriguez',
            duration: 15,
            level: 'beginner',
            category: 'Hatha',
            goals: ['flexibility'],
            videoUrl: 'https://www.youtube.com/embed/qX9FSZJu448',
            thumbnailUrl: 'https://images.unsplash.com/photo-1545389336-cf090694435e?w=800&q=80',
        },

        // Strength Classes
        {
            title: 'Warrior Sequence Builder',
            description: 'Build functional strength through warrior poses, balances, and standing sequences.',
            instructorName: 'Emma Thompson',
            duration: 35,
            level: 'intermediate',
            category: 'Power Yoga',
            goals: ['strength'],
            videoUrl: 'https://www.youtube.com/embed/v7AYKMP6rOE',
            thumbnailUrl: 'https://images.unsplash.com/photo-1599058945522-28d584b6f0ff?w=800&q=80',
        },
        {
            title: 'Arm Balance Mastery',
            description: 'Progressive practice to build upper body strength and master challenging arm balances.',
            instructorName: 'Lisa Wang',
            duration: 30,
            level: 'advanced',
            category: 'Power Yoga',
            goals: ['strength'],
            videoUrl: 'https://www.youtube.com/embed/Eml2xnoLpYE',
            thumbnailUrl: 'https://images.unsplash.com/photo-1518611012118-696072aa579a?w=800&q=80',
        },
        {
            title: 'Core Strength Foundation',
            description: 'Targeted core work to build stability, strength, and support for advanced poses.',
            instructorName: 'Raj Patel',
            duration: 25,
            level: 'beginner',
            category: 'Power Yoga',
            goals: ['strength', 'weight_loss'],
            videoUrl: 'https://www.youtube.com/embed/4pKly2JojMw',
            thumbnailUrl: 'https://images.unsplash.com/photo-1571019613454-1cb2f99b2d8b?w=800&q=80',
        },
        {
            title: 'Ashtanga Primary Series',
            description: 'Traditional Ashtanga practice building strength, flexibility, and mental focus through set sequences.',
            instructorName: 'Jennifer Lee',
            duration: 90,
            level: 'advanced',
            category: 'Ashtanga',
            goals: ['strength', 'flexibility'],
            videoUrl: 'https://www.youtube.com/embed/UEEsdXn8oG8',
            thumbnailUrl: 'https://images.unsplash.com/photo-1545389336-cf090694435e?w=800&q=80',
        },

        // Stress Relief Classes
        {
            title: 'Restorative Evening Practice',
            description: 'Gentle, supported poses to release tension and prepare your body for deep, restful sleep.',
            instructorName: 'Sarah Chen',
            duration: 30,
            level: 'all',
            category: 'Restorative',
            goals: ['stress'],
            videoUrl: 'https://www.youtube.com/embed/02AOaqJMnxU',
            thumbnailUrl: 'https://images.unsplash.com/photo-1588286840104-8957b019727f?w=800&q=80',
        },
        {
            title: 'Yoga Nidra for Sleep',
            description: 'Guided meditation and body scan to lower cortisol, reduce anxiety, and improve sleep quality.',
            instructorName: 'Michael Rodriguez',
            duration: 20,
            level: 'all',
            category: 'Meditation',
            goals: ['stress'],
            videoUrl: 'https://www.youtube.com/embed/dIAfnS8q5lM',
            thumbnailUrl: 'https://images.unsplash.com/photo-1528319725582-ddc096101511?w=800&q=80',
        },
        {
            title: 'Breathwork for Anxiety',
            description: 'Pranayama techniques specifically designed to calm the nervous system and reduce stress.',
            instructorName: 'Emma Thompson',
            duration: 15,
            level: 'beginner',
            category: 'Pranayama',
            goals: ['stress'],
            videoUrl: 'https://www.youtube.com/embed/qX9FSZJu448',
            thumbnailUrl: 'https://images.unsplash.com/photo-1506126613408-eca07ce68773?w=800&q=80',
        },
        {
            title: 'Gentle Morning Flow',
            description: 'Slow, mindful movements to start your day with calm energy and reduced stress.',
            instructorName: 'Lisa Wang',
            duration: 20,
            level: 'beginner',
            category: 'Hatha',
            goals: ['stress', 'flexibility'],
            videoUrl: 'https://www.youtube.com/embed/v7AYKMP6rOE',
            thumbnailUrl: 'https://images.unsplash.com/photo-1506126613408-eca07ce68773?w=800&q=80',
        },

        // Balanced/Default Classes
        {
            title: 'Sun Salutations A & B',
            description: 'Classic sun salutation sequences - the foundation of any yoga practice. Perfect for beginners.',
            instructorName: 'Raj Patel',
            duration: 15,
            level: 'beginner',
            category: 'Vinyasa',
            goals: ['weight_loss', 'flexibility', 'strength'],
            videoUrl: 'https://www.youtube.com/embed/UEEsdXn8oG8',
            thumbnailUrl: 'https://images.unsplash.com/photo-1544367563-12123d815d19?w=800&q=80',
        },
        {
            title: 'Hatha Basics',
            description: 'Learn fundamental poses with proper alignment and breathing techniques.',
            instructorName: 'Jennifer Lee',
            duration: 45,
            level: 'beginner',
            category: 'Hatha',
            goals: ['flexibility', 'strength'],
            videoUrl: 'https://www.youtube.com/embed/Yzm3fA2HhkQ',
            thumbnailUrl: 'https://images.unsplash.com/photo-1552196563-55cd4e45efb3?w=800&q=80',
        },
        {
            title: 'Balanced Flow',
            description: 'Well-rounded practice combining strength, flexibility, and mindfulness.',
            instructorName: 'Sarah Chen',
            duration: 50,
            level: 'intermediate',
            category: 'Vinyasa',
            goals: ['weight_loss', 'flexibility', 'strength', 'stress'],
            videoUrl: 'https://www.youtube.com/embed/v7AYKMP6rOE',
            thumbnailUrl: 'https://images.unsplash.com/photo-1544367567-0f2fcb009e0b?w=800&q=80',
        },
        {
            title: 'Evening Wind Down',
            description: 'Gentle stretches and relaxation to release the day\'s tension.',
            instructorName: 'Michael Rodriguez',
            duration: 20,
            level: 'all',
            category: 'Restorative',
            goals: ['stress', 'flexibility'],
            videoUrl: 'https://www.youtube.com/embed/02AOaqJMnxU',
            thumbnailUrl: 'https://images.unsplash.com/photo-1552196563-55cd4e45efb3?w=800&q=80',
        },
    ];

    // Create classes
    for (const classData of classes) {
        await prisma.class.create({
            data: {
                ...classData,
                goals: JSON.stringify(classData.goals), // Convert array to JSON string
            },
        });
    }

    console.log(`✅ Created ${classes.length} yoga classes`);
    console.log('🌱 Seed completed successfully!');
}

main()
    .catch((e) => {
        console.error('❌ Seed failed:', e);
        process.exit(1);
    })
    .finally(async () => {
        await prisma.$disconnect();
    });
