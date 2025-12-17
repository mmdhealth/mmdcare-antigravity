"use client";

import {
    Select,
    SelectContent,
    SelectItem,
    SelectTrigger,
    SelectValue,
} from "@/components/ui/select";
import { useRouter, useSearchParams } from "next/navigation";
import { useState, useEffect } from "react";

const timeRanges = [
    { value: "7d", label: "7 dagar" },
    { value: "30d", label: "30 dagar" },
    { value: "6m", label: "6 månader" },
    { value: "12m", label: "12 månader" },
    { value: "5y", label: "5 år" },
    { value: "10y", label: "10 år" },
];

export function PatientHeader() {
    const router = useRouter();
    const searchParams = useSearchParams();
    const currentRange = searchParams.get("range") || "7d";
    const [currentDate, setCurrentDate] = useState("");

    useEffect(() => {
        setCurrentDate(new Date().toISOString().split('T')[0]);
    }, []);

    const handleRangeChange = (val: string) => {
        router.push(`/dashboard?range=${val}`);
    };

    return (
        <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4 border-b pb-6">
            <div>
                <h2 className="text-3xl font-bold text-zinc-900">Patient: Anders Boman</h2>
                <p className="text-zinc-500 mt-1 font-mono text-sm">
                    {currentDate || "2024-09-09"}
                </p>
            </div>

            <div className="w-[180px]">
                <Select value={currentRange} onValueChange={handleRangeChange}>
                    <SelectTrigger>
                        <SelectValue placeholder="Välj tidsperiod" />
                    </SelectTrigger>
                    <SelectContent>
                        {timeRanges.map((range) => (
                            <SelectItem key={range.value} value={range.value}>
                                {range.label}
                            </SelectItem>
                        ))}
                    </SelectContent>
                </Select>
            </div>
        </div>
    );
}
