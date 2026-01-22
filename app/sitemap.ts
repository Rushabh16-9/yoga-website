import { MetadataRoute } from 'next';

export default function sitemap(): MetadataRoute.Sitemap {
    const baseUrl = process.env.NEXT_PUBLIC_APP_URL || 'http://localhost:3000';

    const routes = [
        '',
        '/about',
        '/classes',
        '/pricing',
        '/blog',
        '/sign-in',
        '/sign-up',
    ];

    return routes.map((route) => ({
        url: `${baseUrl}${route}`,
        lastModified: new Date(),
        changeFrequency: route === '' ? 'daily' : 'weekly' as const,
        priority: route === '' ? 1 : 0.8,
    }));
}
