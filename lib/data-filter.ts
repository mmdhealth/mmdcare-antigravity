import { HealthMetric } from "./excel-parser";

const ONE_DAY = 24 * 60 * 60 * 1000;

export function filterDataByRange(data: HealthMetric[], range: string): HealthMetric[] {
    if (!data || data.length === 0) return [];

    const now = new Date("2025-11-20"); // Mock "current" date based on file name or fixed point for demo. 
    // Ideally use real Date.now() but the data is historical (2017-2025). 
    // Let's use the last date in data or a fixed forward date for stability.
    // The excel file name suggests 2025-11-19. Let's assume 'now' is slightly after.

    let daysToSubtract = 7;

    switch (range) {
        case "7d": daysToSubtract = 7; break;
        case "30d": daysToSubtract = 30; break;
        case "6m": daysToSubtract = 180; break;
        case "12m": daysToSubtract = 365; break;
        case "5y": daysToSubtract = 365 * 5; break;
        case "10y": daysToSubtract = 365 * 10; break;
        default: daysToSubtract = 7; break;
    }

    const cutoff = new Date(now.getTime() - (daysToSubtract * ONE_DAY));

    return data.filter(d => new Date(d.date) >= cutoff);
}

export function formatXAxis(dateStr: string, range: string): string {
    const date = new Date(dateStr);
    if (range === "7d" || range === "30d") {
        return date.toLocaleDateString('sv-SE', { day: 'numeric', month: 'short' });
    }
    return date.toLocaleDateString('sv-SE', { year: 'numeric', month: 'short' });
}
