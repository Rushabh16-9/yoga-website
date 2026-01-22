export async function detectUserLocation() {
    try {
        const response = await fetch('https://ipapi.co/json/');
        const data = await response.json();

        return {
            country: data.country_name,
            countryCode: data.country_code,
            currency: data.currency,
            timezone: data.timezone,
        };
    } catch (error) {
        console.error('Failed to detect location:', error);
        return {
            country: 'United States',
            countryCode: 'US',
            currency: 'USD',
            timezone: 'America/New_York',
        };
    }
}

export function getCurrencySymbol(currencyCode: string): string {
    const symbols: Record<string, string> = {
        USD: '$',
        EUR: '€',
        GBP: '£',
        INR: '₹',
        JPY: '¥',
        AUD: 'A$',
        CAD: 'C$',
    };

    return symbols[currencyCode] || '$';
}

export function convertCurrency(amount: number, fromCurrency: string, toCurrency: string): number {
    // Simplified conversion rates (in production, use a real-time API)
    const rates: Record<string, number> = {
        USD: 1,
        INR: 83,
        EUR: 0.92,
        GBP: 0.79,
        JPY: 149,
        AUD: 1.52,
        CAD: 1.36,
    };

    const fromRate = rates[fromCurrency] || 1;
    const toRate = rates[toCurrency] || 1;

    return Math.round((amount / fromRate) * toRate);
}
