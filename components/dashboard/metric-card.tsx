"use client";

import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/card";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger, DialogDescription } from "@/components/ui/dialog";
import { cn } from "@/lib/utils";
import { ResponsiveContainer, LineChart, Line, YAxis, XAxis, Tooltip, CartesianGrid } from "recharts";
import { formatXAxis } from "@/lib/data-filter";
import { useSearchParams } from "next/navigation";

interface MetricCardProps {
    title: string;
    value?: string | number | null;
    className?: string;
    missingText?: string;
    data?: { date: string; value: number }[];
    fullData?: { date: string; value: number }[];
    color?: string;
}

export function MetricCard({ title, value, className, missingText = "Värde saknas", data, fullData, color = "#2563eb" }: MetricCardProps) {
    const displayValue = value ?? missingText;
    const isMissing = displayValue === missingText || displayValue === "-";

    // Sparkline shows filtered data
    const hasSparklineData = data && data.length > 1;

    // Modal shows full data if available, or filtered data if substantial
    // User requested: "overlay won't display any data graphs if it's not available for that period"
    // So we should strictly use 'data' (filtered) for the modal graph as well if we want to respect the period.
    // However, usually detailed view might want context. But strictly following "won't display... if not available for that period":
    // We will use 'data' for the modal.
    const modalData = data;
    const hasModalData = modalData && modalData.length > 0;

    // We still allow opening the modal if there is *some* history generally, to maybe show empty state details?
    // Or just disable if no data in period? 
    // "Indicate to the user... make sure overlay won't display".
    // I will show the "No data" message IN the modal if opened.

    // But if we disable the modal trigger, we should still indicate on the card.

    const searchParams = useSearchParams();
    const range = searchParams.get("range") || "7d";

    const ChartContent = (
        <div className="h-16 w-full -mb-1">
            <ResponsiveContainer width="100%" height="100%">
                <LineChart data={data}>
                    <Line
                        type="monotone"
                        dataKey="value"
                        stroke={color}
                        strokeWidth={2}
                        dot={false}
                    />
                </LineChart>
            </ResponsiveContainer>
        </div>
    );

    const NoDataContent = (
        <div className="h-16 w-full -mb-1 flex items-center justify-center bg-zinc-50/50">
            <span className="text-xs text-zinc-400 italic">Ingen data för perioden</span>
        </div>
    );

    return (
        <Dialog>
            <DialogTrigger asChild>
                <Card className={cn("overflow-hidden flex flex-col justify-between h-full transition-shadow hover:shadow-md cursor-pointer", className)}>
                    <div>
                        <CardHeader className="pb-2">
                            <CardTitle className="text-sm font-medium text-muted-foreground uppercase tracking-wide">{title}</CardTitle>
                        </CardHeader>
                        <CardContent className="pb-2">
                            <div className={cn("text-2xl font-bold truncate", isMissing && "text-muted-foreground/50 text-base font-normal h-8 flex items-center")}>
                                {displayValue}
                            </div>
                        </CardContent>
                    </div>
                    {hasSparklineData ? ChartContent : NoDataContent}
                </Card>
            </DialogTrigger>

            <DialogContent className="sm:max-w-2xl">
                <DialogHeader>
                    <DialogTitle>{title} - Detaljerad Vy</DialogTitle>
                    <DialogDescription>
                        Data för de senaste {range}.
                    </DialogDescription>
                </DialogHeader>
                <div className="h-[300px] w-full mt-4 flex items-center justify-center border rounded-md bg-zinc-50/20">
                    {hasModalData ? (
                        <ResponsiveContainer width="100%" height="100%">
                            <LineChart data={modalData}>
                                <CartesianGrid strokeDasharray="3 3" vertical={false} />
                                <XAxis
                                    dataKey="date"
                                    tickFormatter={(val) => formatXAxis(val, range)}
                                    stroke="#888888"
                                    fontSize={12}
                                    tickLine={false}
                                    axisLine={false}
                                    minTickGap={30}
                                />
                                <YAxis
                                    stroke="#888888"
                                    fontSize={12}
                                    tickLine={false}
                                    axisLine={false}
                                    domain={['auto', 'auto']}
                                />
                                <Tooltip
                                    contentStyle={{ borderRadius: '8px', border: 'none', boxShadow: '0 4px 12px rgba(0,0,0,0.1)' }}
                                    labelFormatter={(val) => new Date(val).toLocaleDateString()}
                                />
                                <Line
                                    type="monotone"
                                    dataKey="value"
                                    stroke={color}
                                    strokeWidth={3}
                                    dot={{ r: 4, strokeWidth: 2 }}
                                    activeDot={{ r: 6 }}
                                />
                            </LineChart>
                        </ResponsiveContainer>
                    ) : (
                        <div className="flex flex-col items-center gap-2 text-zinc-500">
                            <span className="font-semibold">Ingen data tillgänglig</span>
                            <span className="text-sm">Det finns inga registrerade värden för den valda tidsperioden ({range}).</span>
                        </div>
                    )}
                </div>
            </DialogContent>
        </Dialog>
    );
}

