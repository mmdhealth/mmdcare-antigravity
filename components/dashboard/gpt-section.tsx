import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Sparkles } from "lucide-react";

export function GPTSection() {
    return (
        <Card className="bg-gradient-to-r from-indigo-50/50 to-purple-50/50 border-indigo-100">
            <CardContent className="p-4 flex flex-col sm:flex-row items-center justify-between gap-4">
                <div className="flex items-center gap-4">
                    <div className="h-10 w-10 bg-white rounded-full flex items-center justify-center text-indigo-600 shadow-sm border border-indigo-50">
                        <Sparkles className="h-5 w-5 fill-current" />
                    </div>
                    <div>
                        <h3 className="font-semibold text-indigo-950">Hälsa+ GPT</h3>
                        <p className="text-sm text-indigo-900/70">Analyserar hälsodata...</p>
                    </div>
                </div>
                <Button variant="ghost" className="text-indigo-700 font-semibold hover:bg-white/50 hover:text-indigo-900 shrink-0">
                    Analysera vidare med Hälsa+GPT ›
                </Button>
            </CardContent>
        </Card>
    );
}
