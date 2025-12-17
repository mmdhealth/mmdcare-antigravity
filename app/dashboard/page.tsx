import { PatientHeader } from "@/components/dashboard/patient-header";
import { UploadedFilesCard } from "@/components/dashboard/uploaded-files";
import { MetricCard } from "@/components/dashboard/metric-card";
import { GPTSection } from "@/components/dashboard/gpt-section";
import { StatusPanel } from "@/components/dashboard/status-panel";
import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/card";
import { getHealthData } from "@/lib/excel-parser";
import { filterDataByRange } from "@/lib/data-filter";
import { generateInsights } from "@/lib/insights";

export default async function DashboardPage({
    searchParams,
}: {
    searchParams: { range?: string };
}) {
    const { latest, history } = await getHealthData();
    const range = searchParams.range || "7d";

    const getFilteredHistory = (data: any[]) => filterDataByRange(data, range);

    const filteredSteps = getFilteredHistory(history.steps);
    const filteredWeight = getFilteredHistory(history.weight);
    const filteredOxygen = getFilteredHistory(history.oxygen);
    const filteredHeartRate = getFilteredHistory(history.heartRate);
    const filteredLdl = getFilteredHistory(history.ldl);
    const filteredGlucose = getFilteredHistory(history.glucose);
    const filteredEgfr = getFilteredHistory(history.egfr);

    const insights = generateInsights(history);

    return (
        <div className="space-y-8 pb-10">
            <PatientHeader />

            <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
                {/* Main Content Column (2/3) */}
                <div className="lg:col-span-2 space-y-8">
                    <div>
                        <UploadedFilesCard />
                    </div>

                    <section className="space-y-4">
                        <h3 className="text-xl font-bold text-zinc-900">Mätvärden</h3>
                        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4">
                            <MetricCard
                                title="Steg"
                                value={latest.steps?.value}
                                data={filteredSteps}
                                fullData={history.steps}
                                color="#10b981" // Emerald
                            />
                            <MetricCard
                                title="Vikt"
                                value={latest.weight?.value ? latest.weight.value + " kg" : undefined}
                                data={filteredWeight}
                                fullData={history.weight}
                                color="#f59e0b" // Amber
                            />
                            <MetricCard
                                title="Blodtryck"
                                // No data in excel for BP
                                value={undefined}
                            />
                            <MetricCard
                                title="Syresättning"
                                value={latest.oxygen?.value ? latest.oxygen.value + "%" : undefined}
                                data={filteredOxygen}
                                fullData={history.oxygen}
                                color="#3b82f6" // Blue
                            />
                            <MetricCard
                                title="Hjärtfrekvens"
                                value={latest.heartRate?.value ? latest.heartRate.value + " bpm" : undefined}
                                data={filteredHeartRate}
                                fullData={history.heartRate}
                                color="#ef4444" // Red
                            />
                        </div>
                    </section>

                    <GPTSection />

                    <section className="space-y-4">
                        {/* Biomarkers title is inferred from structure, usually "Biomarkörer" or similar */}
                        <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
                            <MetricCard
                                title="LDL-kolesterol"
                                value={latest.ldl?.value}
                                data={filteredLdl}
                                fullData={history.ldl}
                                color="#8b5cf6" // Violet
                            />
                            <MetricCard
                                title="HbA1c / Glukos"
                                value={latest.glucose?.value}
                                data={filteredGlucose}
                                fullData={history.glucose}
                                color="#ec4899" // Pink
                            />
                            <MetricCard
                                title="eGFR"
                                value={latest.egfr?.value}
                                data={filteredEgfr}
                                fullData={history.egfr}
                                color="#6366f1" // Indigo
                            />
                        </div>
                    </section>

                    <GPTSection />

                    <section className="space-y-4">
                        <h3 className="text-xl font-bold text-zinc-900 border-b pb-2">Trendavvikelser</h3>
                        {insights.length > 0 ? (
                            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                                {insights.map((insight, idx) => (
                                    <Card key={idx} className="bg-zinc-50/50 border-zinc-200">
                                        <CardHeader className="pb-2">
                                            <div className="flex items-center gap-2">
                                                {insight.type === "warning" && <div className="h-2 w-2 rounded-full bg-amber-500" />}
                                                {insight.type === "positive" && <div className="h-2 w-2 rounded-full bg-emerald-500" />}
                                                {insight.type === "neutral" && <div className="h-2 w-2 rounded-full bg-blue-500" />}
                                                <CardTitle className="text-sm font-semibold text-zinc-900">
                                                    {insight.title}
                                                </CardTitle>
                                            </div>
                                        </CardHeader>
                                        <CardContent>
                                            <p className="text-sm text-zinc-600">
                                                {insight.description}
                                            </p>
                                        </CardContent>
                                    </Card>
                                ))}
                            </div>
                        ) : (
                            <div className="text-zinc-500 italic">
                                Inga avvikelser identifierade.
                            </div>
                        )}
                    </section>

                    <section className="space-y-4">
                        <h3 className="text-xl font-bold text-zinc-900 border-b pb-2">Föreslagna åtgärder</h3>
                        <Card>
                            <CardHeader className="pb-2">
                                <CardTitle className="text-base font-bold text-zinc-900">Viktövervakning</CardTitle>
                            </CardHeader>
                            <CardContent className="pb-6">
                                <div className="text-sm text-zinc-500">
                                    Patienten har nyligen ökat i vikt. Rekommenderar extra övervakning och kostrådgivning.
                                </div>
                            </CardContent>
                        </Card>
                    </section>
                </div>

                {/* Sidebar Column (1/3) */}
                <div className="space-y-8">
                    <StatusPanel />
                </div>
            </div>
        </div>
    );
}
