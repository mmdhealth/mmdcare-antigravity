"use client"
import { Button } from "@/components/ui/button";
import { Dialog, DialogContent, DialogDescription, DialogFooter, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog";
import { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";

export default function SettingsPage() {
    const [open, setOpen] = useState(false);

    return (
        <div className="space-y-6">
            <h1 className="text-3xl font-bold">Inställningar</h1>
            <Card>
                <CardHeader>
                    <CardTitle>Session</CardTitle>
                    <CardDescription>Hantering av din nuvarande session.</CardDescription>
                </CardHeader>
                <CardContent>
                    <Dialog open={open} onOpenChange={setOpen}>
                        <DialogTrigger asChild>
                            <Button variant="destructive">Avsluta session</Button>
                        </DialogTrigger>
                        <DialogContent>
                            <DialogHeader>
                                <DialogTitle>Avsluta session</DialogTitle>
                                <DialogDescription>
                                    Är du säker på att du vill avsluta sessionen?
                                </DialogDescription>
                            </DialogHeader>
                            <DialogFooter>
                                <Button variant="outline" onClick={() => setOpen(false)}>Avbryt</Button>
                                <Button variant="destructive" onClick={() => {
                                    setOpen(false);
                                    // Mock logout
                                }}>Avsluta session</Button>
                            </DialogFooter>
                        </DialogContent>
                    </Dialog>
                </CardContent>
            </Card>
        </div>
    );
}
