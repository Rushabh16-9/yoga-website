/**
 * Centralized asset path management for Yofit platform
 * All media assets are stored locally in /public/assets/
 */

export const ASSETS = {
    images: {
        hero: {
            main: '/assets/images/hero/main.jpg',
            secondary: '/assets/images/hero/secondary.jpg',
            mobile: '/assets/images/hero/mobile.jpg',
        },
        poses: {
            weightLoss: '/assets/images/poses/weight-loss.jpg',
            flexibility: '/assets/images/poses/flexibility.jpg',
            strength: '/assets/images/poses/strength.jpg',
            stress: '/assets/images/poses/stress.jpg',
            morning: '/assets/images/poses/morning-flow.jpg',
            power: '/assets/images/poses/power-vinyasa.jpg',
            restorative: '/assets/images/poses/restorative.jpg',
        },
        instructors: {
            primary: '/assets/images/instructors/primary.jpg',
            sarah: '/assets/images/instructors/sarah-chen.jpg',
            michael: '/assets/images/instructors/michael-rodriguez.jpg',
            emma: '/assets/images/instructors/emma-thompson.jpg',
        },
        testimonials: {
            jessica: '/assets/images/testimonials/jessica.jpg',
            david: '/assets/images/testimonials/david.jpg',
            maria: '/assets/images/testimonials/maria.jpg',
        },
    },
    videos: {
        loops: {
            hero: '/assets/videos/loops/yoga-flow.mp4',
            meditation: '/assets/videos/loops/meditation.mp4',
        },
        classes: {
            // These will be populated from Cloudinary or local storage
            // Format: classId: cloudinaryUrl or local path
        },
    },
    icons: {
        goals: {
            weightLoss: '/assets/icons/goals/weight-loss.svg',
            flexibility: '/assets/icons/goals/flexibility.svg',
            strength: '/assets/icons/goals/strength.svg',
            stress: '/assets/icons/goals/stress.svg',
        },
    },
} as const;

/**
 * Instructor profiles with bios and credentials
 */
export const INSTRUCTORS = {
    primary: {
        name: 'Rushabh',
        title: 'Lead Yoga Instructor & Founder',
        bio: 'With over 10 years of experience in yoga and mindfulness, I\'ve helped thousands of students transform their practice and their lives. My approach combines traditional yoga philosophy with modern fitness science.',
        credentials: ['RYT-500', 'Certified Meditation Teacher', 'Sports Nutrition Specialist'],
        specialties: ['Vinyasa Flow', 'Power Yoga', 'Mindfulness Meditation'],
        image: ASSETS.images.instructors.primary,
    },
    sarah: {
        name: 'Sarah Chen',
        title: 'Vinyasa & Restorative Specialist',
        bio: 'Sarah brings a gentle yet powerful approach to yoga, focusing on breath work and mindful movement.',
        credentials: ['RYT-200', 'Yin Yoga Certified'],
        specialties: ['Vinyasa', 'Restorative', 'Breathwork'],
        image: ASSETS.images.instructors.sarah,
    },
    michael: {
        name: 'Michael Rodriguez',
        title: 'Power Yoga & Strength Expert',
        bio: 'Michael combines athletic training with yoga to create dynamic, strength-building flows.',
        credentials: ['RYT-500', 'Personal Training Certified'],
        specialties: ['Power Yoga', 'Athletic Flow', 'Core Strength'],
        image: ASSETS.images.instructors.michael,
    },
    emma: {
        name: 'Emma Thompson',
        title: 'Meditation & Wellness Coach',
        bio: 'Emma specializes in stress reduction and mindfulness practices for busy professionals.',
        credentials: ['RYT-200', 'Mindfulness Coach', 'Stress Management Specialist'],
        specialties: ['Meditation', 'Stress Relief', 'Evening Flows'],
        image: ASSETS.images.instructors.emma,
    },
} as const;

/**
 * Yoga goals with descriptions and recommended practice times
 */
export const YOGA_GOALS = {
    weight_loss: {
        id: 'weight_loss',
        label: 'Weight Loss',
        icon: '🔥',
        description: 'Burn calories and build lean muscle with dynamic flows',
        image: ASSETS.images.poses.weightLoss,
        recommendedMinutes: [30, 60],
        focusAreas: ['Cardio', 'Strength', 'Metabolism'],
    },
    flexibility: {
        id: 'flexibility',
        label: 'Improve Flexibility',
        icon: '🧘‍♀️',
        description: 'Increase range of motion and reduce muscle tension',
        image: ASSETS.images.poses.flexibility,
        recommendedMinutes: [15, 30],
        focusAreas: ['Stretching', 'Mobility', 'Balance'],
    },
    strength: {
        id: 'strength',
        label: 'Build Strength',
        icon: '💪',
        description: 'Develop core strength and muscular endurance',
        image: ASSETS.images.poses.strength,
        recommendedMinutes: [30, 60],
        focusAreas: ['Core', 'Upper Body', 'Lower Body'],
    },
    stress: {
        id: 'stress',
        label: 'Reduce Stress',
        icon: '😌',
        description: 'Find calm and balance through mindful movement',
        image: ASSETS.images.poses.stress,
        recommendedMinutes: [15, 30],
        focusAreas: ['Breathwork', 'Meditation', 'Relaxation'],
    },
} as const;

/**
 * Experience levels with descriptions
 */
export const EXPERIENCE_LEVELS = {
    beginner: {
        id: 'beginner',
        label: "I'm a total beginner",
        description: "Never tried it / tried once",
        difficulty: 1,
    },
    intermediate: {
        id: 'intermediate',
        label: 'I practice sometimes',
        description: 'Know basic poses',
        difficulty: 2,
    },
    advanced: {
        id: 'advanced',
        label: "I'm refreshing my practice",
        description: 'Practiced regularly before',
        difficulty: 3,
    },
    pro: {
        id: 'pro',
        label: "I'm a pro",
        description: 'Advanced practitioner',
        difficulty: 4,
    },
} as const;

/**
 * Daily practice time options (in minutes)
 */
export const PRACTICE_TIMES = [15, 30, 60] as const;

/**
 * Currency symbols and formatting
 */
export const CURRENCIES = {
    USD: {
        symbol: '$',
        code: 'USD',
        position: 'before', // symbol position relative to amount
    },
    INR: {
        symbol: '₹',
        code: 'INR',
        position: 'before',
    },
} as const;
