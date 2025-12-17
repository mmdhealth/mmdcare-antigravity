import { Card, CardContent } from "@/components/ui/card";
import { Upload } from "lucide-react";

export function UploadedFilesCard() {
    return (
        <Card>
            <CardContent className="p-4 flex items-center justify-between">
                <div className="flex items-center gap-3">
                    <div className="h-10 w-10 bg-zinc-100 rounded-lg flex items-center justify-center text-zinc-500">
                        <Upload className="h-5 w-5" />
                    </div>
                    <div>
                        <p className="text-sm font-medium text-zinc-600">Uppladdade filer</p>
                        <p className="text-2xl font-bold text-zinc-900">0</p>
                    </div>
                </div>
            </CardContent>
        </Card>
    );
}
