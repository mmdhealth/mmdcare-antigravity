import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/card";
import { Info } from "lucide-react";

export function StatusPanel() {
    return (
        <Card className="h-full">
            <CardHeader>
                <CardTitle>Status & Risköversikt</CardTitle>
            </CardHeader>
            <CardContent className="space-y-6">
                <div className="space-y-1">
                    <div className="flex items-center justify-between">
                        <span className="font-medium text-zinc-600">Klinisk Riskpoäng</span>
                        <div className="flex items-center gap-2">
                            <span className="h-2 w-2 rounded-full bg-yellow-400"></span>
                            <span className="font-bold text-zinc-900">Låg-Medel</span>
                        </div>
                    </div>
                    <p className="text-xs text-zinc-500 flex items-center gap-1">
                        <Info className="h-3 w-3" />
                        Baserat på stabila värden men minskad aktivitet.
                    </p>
                </div>

                <div className="flex items-center justify-between">
                    <span className="font-medium text-zinc-600">Patientstatus</span>
                    <span className="font-bold text-emerald-600 bg-emerald-50 px-2 py-1 rounded text-sm">Stabilt</span>
                </div>

                <div className="flex items-center justify-between">
                    <span className="font-medium text-zinc-600">Förväntat vårdbehov</span>
                    <span className="font-bold text-zinc-900">Oförändrat</span>
                </div>
                <p className="text-xs text-zinc-400 -mt-4 pl-1">(14 dagars prognos)</p>

                <div className="flex items-center justify-between pt-2">
                    <span className="font-medium text-zinc-600">Datakvalitetsindex</span>
                    <span className="font-bold text-zinc-900">85%</span>
                </div>
            </CardContent>
        </Card>
    );
}
