import { HealthMetric, HistoricalData } from "./excel-parser";

export interface Insight {
    title: string;
    description: string;
    type: "warning" | "positive" | "neutral";
}

export function generateInsights(history: HistoricalData): Insight[] {
    const insights: Insight[] = [];

    // Trend 1: Weight
    // Check last 2 values if available
    if (history.weight.length >= 2) {
        const last = history.weight[history.weight.length - 1].value;
        const prev = history.weight[history.weight.length - 2].value;

        const diff = last - prev;
        if (diff > 1) {
            insights.push({
                title: "Viktökning",
                description: `Patienten har ökat ${diff.toFixed(1)} kg sedan föregående mätning.`,
                type: "warning"
            });
        } else if (diff < -1) {
            insights.push({
                title: "Viktnedgång",
                description: `Patienten har minskat ${Math.abs(diff).toFixed(1)} kg sedan föregående mätning.`,
                type: "positive" // Assuming weight loss might be good, or neutral. Context dependent. Let's say positive for now or adjust logic.
            });
        }
    }

    // Trend 2: Steps (Activity)
    // Check average of last 7 entries vs entries before that
    if (history.steps.length >= 14) {
        const last7 = history.steps.slice(-7);
        const prev7 = history.steps.slice(-14, -7);

        const avgLast = last7.reduce((acc, curr) => acc + curr.value, 0) / 7;
        const avgPrev = prev7.reduce((acc, curr) => acc + curr.value, 0) / 7;

        if (avgLast < avgPrev * 0.8) { // 20% drop
            insights.push({
                title: "Minskad aktivitet",
                description: "Genomsnittligt antal steg har minskat med över 20% den senaste veckan.",
                type: "warning"
            });
        } else if (avgLast > avgPrev * 1.2) {
            insights.push({
                title: "Ökad aktivitet",
                description: "Patienten rör sig mer än föregående period. Positiv trend.",
                type: "positive"
            });
        }
    }

    // Trend 3: Heart Rate Stability (Mock logic since data is sparse/old)
    // Just check if the latest few are high
    if (history.heartRate.length > 0) {
        const last = history.heartRate[history.heartRate.length - 1].value;
        if (last > 100) {
            insights.push({
                title: "Hög vilopuls",
                description: "Senaste pulsnoteringen var över 100 bpm.",
                type: "warning"
            });
        } else {
            // Maybe just a general observation if we need 3 items
            // insights.push({
            //    title: "Stabil hjärtfrekvens",
            //    description: "Inga anmärkningsvärda avvikelser i de senaste mätningarna.",
            //    type: "neutral"
            // });
        }
    }

    // Always ensure we have at least items if possible, or fallback
    if (insights.length === 0) {
        insights.push({
            title: "Inga avvikelser",
            description: "Patientens värden ser stabila ut baserat på tillgänglig data.",
            type: "positive"
        });
    }

    return insights.slice(0, 3);
}
