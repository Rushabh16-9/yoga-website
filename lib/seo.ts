export function generateLocalBusinessSchema(name: string, description: string) {
    return {
        '@context': 'https://schema.org',
        '@type': 'LocalBusiness',
        name: name,
        description: description,
        url: process.env.NEXT_PUBLIC_APP_URL,
        logo: `${process.env.NEXT_PUBLIC_APP_URL}/logo.png`,
        image: `${process.env.NEXT_PUBLIC_APP_URL}/og-image.jpg`,
        priceRange: '$$',
        address: {
            '@type': 'PostalAddress',
            addressCountry: 'US',
        },
        aggregateRating: {
            '@type': 'AggregateRating',
            ratingValue: '4.9',
            reviewCount: '1250',
        },
    };
}

export function generateCourseSchema(
    courseName: string,
    description: string,
    instructor: string,
    duration: number
) {
    return {
        '@context': 'https://schema.org',
        '@type': 'Course',
        name: courseName,
        description: description,
        provider: {
            '@type': 'Organization',
            name: 'Yofit',
            url: process.env.NEXT_PUBLIC_APP_URL,
        },
        instructor: {
            '@type': 'Person',
            name: instructor,
        },
        timeRequired: `PT${duration}M`,
        educationalLevel: 'All Levels',
        inLanguage: 'en',
    };
}

export function generateBreadcrumbSchema(items: { name: string; url: string }[]) {
    return {
        '@context': 'https://schema.org',
        '@type': 'BreadcrumbList',
        itemListElement: items.map((item, index) => ({
            '@type': 'ListItem',
            position: index + 1,
            name: item.name,
            item: item.url,
        })),
    };
}

export function generateArticleSchema(
    title: string,
    description: string,
    author: string,
    publishedDate: string,
    imageUrl: string
) {
    return {
        '@context': 'https://schema.org',
        '@type': 'Article',
        headline: title,
        description: description,
        image: imageUrl,
        author: {
            '@type': 'Person',
            name: author,
        },
        publisher: {
            '@type': 'Organization',
            name: 'Yofit',
            logo: {
                '@type': 'ImageObject',
                url: `${process.env.NEXT_PUBLIC_APP_URL}/logo.png`,
            },
        },
        datePublished: publishedDate,
        dateModified: publishedDate,
    };
}

/**
 * Generate JSON-LD schema for SoftwareApplication
 * Used on homepage for better app discovery in search
 */
export function generateSoftwareApplicationSchema() {
    return {
        '@context': 'https://schema.org',
        '@type': 'SoftwareApplication',
        name: 'Yofit',
        applicationCategory: 'HealthApplication',
        operatingSystem: 'Web, iOS, Android',
        offers: {
            '@type': 'Offer',
            price: '0',
            priceCurrency: 'USD',
            description: '14-day free trial, then starting at $29/month',
        },
        aggregateRating: {
            '@type': 'AggregateRating',
            ratingValue: '4.8',
            ratingCount: '1250',
            bestRating: '5',
            worstRating: '1',
        },
        description: 'Transform your practice with Yofit - the premier online yoga platform with personalized plans, world-class instructors, and comprehensive progress tracking.',
        url: process.env.NEXT_PUBLIC_APP_URL,
    };
}

