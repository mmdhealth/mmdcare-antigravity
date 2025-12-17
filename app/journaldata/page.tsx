import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { FileText, Eye } from "lucide-react";
import Link from "next/link";

export default function JournalDataPage() {
    return (
        <div className="space-y-6">
            <h1 className="text-3xl font-bold">Journaldata</h1>

            <Tabs defaultValue="anteckningar" className="w-full">
                <TabsList className="w-full justify-start h-auto flex-wrap gap-2 bg-transparent p-0 mb-6">
                    <TabsTrigger value="anteckningar" className="data-[state=active]:bg-zinc-900 data-[state=active]:text-white border border-zinc-200 bg-white">Journalanteckningar</TabsTrigger>
                    <TabsTrigger value="diagnoser" className="data-[state=active]:bg-zinc-900 data-[state=active]:text-white border border-zinc-200 bg-white">Diagnoser</TabsTrigger>
                    <TabsTrigger value="lakemedel" className="data-[state=active]:bg-zinc-900 data-[state=active]:text-white border border-zinc-200 bg-white">Läkemedel</TabsTrigger>
                    <TabsTrigger value="larm" className="data-[state=active]:bg-zinc-900 data-[state=active]:text-white border border-zinc-200 bg-white">Larm</TabsTrigger>
                    <TabsTrigger value="symtom" className="data-[state=active]:bg-zinc-900 data-[state=active]:text-white border border-zinc-200 bg-white">Symtom</TabsTrigger>
                    <TabsTrigger value="filer" className="data-[state=active]:bg-zinc-900 data-[state=active]:text-white border border-zinc-200 bg-white">Files list</TabsTrigger>
                </TabsList>

                <TabsContent value="anteckningar" className="mt-0">
                    <Card>
                        <CardContent className="p-6">
                            <div className="flex items-center justify-between border rounded-lg p-4 hover:bg-zinc-50 transition-colors">
                                <div className="flex items-center gap-4">
                                    <div className="h-12 w-12 bg-red-100 text-red-600 rounded-lg flex items-center justify-center">
                                        <FileText className="h-6 w-6" />
                                    </div>
                                    <div>
                                        <h3 className="font-semibold text-zinc-900">Journalen_ 19990821-9471, Samuel Oldmark</h3>
                                        <p className="text-sm text-zinc-500">Uppladdad 2024-09-09</p>
                                    </div>
                                </div>
                                <Button asChild variant="outline" size="sm">
                                    <Link href="/assets/journal_note.pdf" target="_blank" prefetch={false}>
                                        <Eye className="mr-2 h-4 w-4" />
                                        Förhandsgranska
                                    </Link>
                                </Button>
                            </div>
                        </CardContent>
                    </Card>
                </TabsContent>

                {["diagnoser", "lakemedel", "larm", "symtom"].map((val) => (
                    <TabsContent key={val} value={val} className="mt-0">
                        <Card>
                            <CardContent className="p-8 flex items-center justify-center text-zinc-500 min-h-[200px]">
                                Ingen data tillgänglig
                            </CardContent>
                        </Card>
                    </TabsContent>
                ))}

                <TabsContent value="filer" className="mt-0">
                    <Card>
                        <CardContent className="p-8 flex items-center justify-center text-zinc-500 min-h-[200px]">
                            Inga filer att visa
                        </CardContent>
                    </Card>
                </TabsContent>
            </Tabs>
        </div>
    );
}
