"use client";

import { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { Label } from "@/components/ui/label";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { Switch } from "@/components/ui/switch";
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "@/components/ui/accordion";
import { Button } from "@/components/ui/button";
import { Separator } from "@/components/ui/separator";
import { Dialog, DialogContent, DialogDescription, DialogFooter, DialogHeader, DialogTitle, DialogTrigger, DialogClose } from "@/components/ui/dialog";
import { LogOut } from "lucide-react";

export default function SettingsPage() {
    // State management for settings
    const [language, setLanguage] = useState("svenska");
    const [emailNotif, setEmailNotif] = useState(false);
    const [warningsNotif, setWarningsNotif] = useState(false);
    const [dailySummary, setDailySummary] = useState(false);
    const [timeFormat, setTimeFormat] = useState("24h");
    const [dateFormat, setDateFormat] = useState("yyyy-mm-dd");
    const [autoUpdate, setAutoUpdate] = useState(false);
    const [cacheData, setCacheData] = useState(false);

    return (
        <div className="max-w-4xl space-y-8 pb-10">
            <div>
                <h1 className="text-3xl font-bold tracking-tight text-zinc-900 dark:text-zinc-100">Inställningar</h1>
                <p className="text-zinc-500 dark:text-zinc-400">Hantera dina plattformspreferenser och inställningar</p>
            </div>

            {/* 1. Språk */}
            <Card>
                <CardHeader>
                    <CardTitle>Språk</CardTitle>
                </CardHeader>
                <CardContent>
                    <div className="space-y-4">
                        <Label className="text-base">Välj språk</Label>
                        <p className="text-sm text-muted-foreground">Välj önskat språk för plattformen</p>
                        <RadioGroup defaultValue="svenska" value={language} onValueChange={setLanguage} className="grid gap-2">
                            <div className="flex items-center space-x-2">
                                <RadioGroupItem value="svenska" id="lang-sv" />
                                <Label htmlFor="lang-sv">Svenska</Label>
                            </div>
                            <div className="flex items-center space-x-2">
                                <RadioGroupItem value="english" id="lang-en" />
                                <Label htmlFor="lang-en">English</Label>
                            </div>
                            <div className="flex items-center space-x-2">
                                <RadioGroupItem value="norsk" id="lang-no" />
                                <Label htmlFor="lang-no">Norsk</Label>
                            </div>
                            <div className="flex items-center space-x-2">
                                <RadioGroupItem value="dansk" id="lang-dk" />
                                <Label htmlFor="lang-dk">Dansk</Label>
                            </div>
                        </RadioGroup>
                    </div>
                </CardContent>
            </Card>

            {/* 2. Notiser */}
            <Card>
                <CardHeader>
                    <CardTitle>Notiser</CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                    <div className="flex items-center justify-between space-x-2">
                        <Label htmlFor="email-notif" className="flex flex-col space-y-1">
                            <span>E-postnotiser</span>
                            <span className="font-normal leading-snug text-muted-foreground">Få notiser via e-post när nya data mottas</span>
                        </Label>
                        <Switch id="email-notif" checked={emailNotif} onCheckedChange={setEmailNotif} />
                    </div>
                    <Separator />
                    <div className="flex items-center justify-between space-x-2">
                        <Label htmlFor="warn-notif" className="flex flex-col space-y-1">
                            <span>Varningar och larm</span>
                            <span className="font-normal leading-snug text-muted-foreground">Få omedelbara notiser för kritiska värden</span>
                        </Label>
                        <Switch id="warn-notif" checked={warningsNotif} onCheckedChange={setWarningsNotif} />
                    </div>
                    <Separator />
                    <div className="flex items-center justify-between space-x-2">
                        <Label htmlFor="daily-notif" className="flex flex-col space-y-1">
                            <span>Daglig sammanfattning</span>
                            <span className="font-normal leading-snug text-muted-foreground">Få en daglig sammanfattning av patientdata</span>
                        </Label>
                        <Switch id="daily-notif" checked={dailySummary} onCheckedChange={setDailySummary} />
                    </div>
                </CardContent>
            </Card>

            {/* 3. Visning */}
            <Card>
                <CardHeader>
                    <CardTitle>Visning</CardTitle>
                </CardHeader>
                <CardContent className="space-y-6">
                    <div className="space-y-3">
                        <Label className="text-base">Tidsformat</Label>
                        <p className="text-sm text-muted-foreground">Välj hur tider ska visas</p>
                        <RadioGroup defaultValue="24h" value={timeFormat} onValueChange={setTimeFormat} className="grid gap-2">
                            <div className="flex items-center space-x-2">
                                <RadioGroupItem value="24h" id="time-24" />
                                <Label htmlFor="time-24">24-timmarsformat</Label>
                            </div>
                            <div className="flex items-center space-x-2">
                                <RadioGroupItem value="12h" id="time-12" />
                                <Label htmlFor="time-12">12-timmarsformat</Label>
                            </div>
                        </RadioGroup>
                    </div>
                    <Separator />
                    <div className="space-y-3">
                        <Label className="text-base">Datumformat</Label>
                        <p className="text-sm text-muted-foreground">Välj hur datum ska visas</p>
                        <RadioGroup defaultValue="yyyy-mm-dd" value={dateFormat} onValueChange={setDateFormat} className="grid gap-2">
                            <div className="flex items-center space-x-2">
                                <RadioGroupItem value="yyyy-mm-dd" id="date-iso" />
                                <Label htmlFor="date-iso">YYYY-MM-DD</Label>
                            </div>
                            <div className="flex items-center space-x-2">
                                <RadioGroupItem value="dd/mm/yyyy" id="date-eu" />
                                <Label htmlFor="date-eu">DD/MM/YYYY</Label>
                            </div>
                            <div className="flex items-center space-x-2">
                                <RadioGroupItem value="mm/dd/yyyy" id="date-us" />
                                <Label htmlFor="date-us">MM/DD/YYYY</Label>
                            </div>
                        </RadioGroup>
                    </div>
                </CardContent>
            </Card>

            {/* 4. Data */}
            <Card>
                <CardHeader>
                    <CardTitle>Data</CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                    <div className="flex items-center justify-between space-x-2">
                        <Label htmlFor="auto-update" className="flex flex-col space-y-1">
                            <span>Automatisk uppdatering</span>
                            <span className="font-normal leading-snug text-muted-foreground">Uppdatera data automatiskt var 5:e minut</span>
                        </Label>
                        <Switch id="auto-update" checked={autoUpdate} onCheckedChange={setAutoUpdate} />
                    </div>
                    <Separator />
                    <div className="flex items-center justify-between space-x-2">
                        <Label htmlFor="cache-data" className="flex flex-col space-y-1">
                            <span>Cachelagring</span>
                            <span className="font-normal leading-snug text-muted-foreground">Spara data lokalt för snabbare laddning</span>
                        </Label>
                        <Switch id="cache-data" checked={cacheData} onCheckedChange={setCacheData} />
                    </div>
                </CardContent>
            </Card>

            {/* 5. FAQ */}
            <Card>
                <CardHeader>
                    <CardTitle>Vanliga frågor (FAQ)</CardTitle>
                </CardHeader>
                <CardContent>
                    <Accordion type="single" collapsible className="w-full">
                        <AccordionItem value="item-1">
                            <AccordionTrigger>Hur laddar jag upp patientdata?</AccordionTrigger>
                            <AccordionContent>
                                Du kan ladda upp patientdata genom att använda mobilappen. Data synkroniseras automatiskt när filerna har laddats upp.
                            </AccordionContent>
                        </AccordionItem>
                        <AccordionItem value="item-2">
                            <AccordionTrigger>Vad är Hälsa+GPT och hur fungerar det?</AccordionTrigger>
                            <AccordionContent>
                                Hälsa+GPT är en AI-driven vårdassistent som analyserar patientdata och ger insikter och rekommendationer.
                            </AccordionContent>
                        </AccordionItem>
                        <AccordionItem value="item-3">
                            <AccordionTrigger>Hur tolkar jag riskpoängen?</AccordionTrigger>
                            <AccordionContent>
                                Klinisk riskpoäng beräknas baserat på flera faktorer såsom blodtryck, puls och aktivitetsnivå.
                            </AccordionContent>
                        </AccordionItem>
                        <AccordionItem value="item-4">
                            <AccordionTrigger>Kan jag exportera patientdata?</AccordionTrigger>
                            <AccordionContent>
                                Ja, du kan exportera patientdata i olika format för vidare analys eller dokumentation.
                            </AccordionContent>
                        </AccordionItem>
                        <AccordionItem value="item-5">
                            <AccordionTrigger>Hur ofta uppdateras data automatiskt?</AccordionTrigger>
                            <AccordionContent>
                                Data uppdateras automatiskt var 5:e minut när automatisk uppdatering är aktiverad.
                            </AccordionContent>
                        </AccordionItem>
                        <AccordionItem value="item-6">
                            <AccordionTrigger>Vad gör jag om jag ser avvikande värden?</AccordionTrigger>
                            <AccordionContent>
                                Om du ser avvikande värden bör du först kontrollera mätningen och därefter kontakta ansvarig vårdpersonal vid behov.
                            </AccordionContent>
                        </AccordionItem>
                        <AccordionItem value="item-7">
                            <AccordionTrigger>Hur säker är min data?</AccordionTrigger>
                            <AccordionContent>
                                All patientdata är krypterad och skyddad enligt gällande dataskyddslagstiftning.
                            </AccordionContent>
                        </AccordionItem>
                        <AccordionItem value="item-8">
                            <AccordionTrigger>Kan jag använda plattformen på mobilen?</AccordionTrigger>
                            <AccordionContent>
                                Ja, plattformen är responsiv och fungerar på både surfplattor och mobila enheter.
                            </AccordionContent>
                        </AccordionItem>
                    </Accordion>
                </CardContent>
            </Card>

            {/* 6. Avsluta Session */}
            <Card className="border-red-200 dark:border-red-900 bg-red-50/10 dark:bg-red-900/10">
                <CardHeader>
                    <CardTitle className="text-red-600 dark:text-red-400">Avsluta session</CardTitle>
                </CardHeader>
                <CardContent>
                    <Dialog>
                        <DialogTrigger asChild>
                            <Button variant="destructive" className="w-full sm:w-auto">
                                <LogOut className="mr-2 h-4 w-4" />
                                Avsluta session
                            </Button>
                        </DialogTrigger>
                        <DialogContent>
                            <DialogHeader>
                                <DialogTitle>Avsluta session</DialogTitle>
                                <DialogDescription>
                                    Är du säker på att du vill avsluta sessionen?
                                </DialogDescription>
                            </DialogHeader>
                            <DialogFooter>
                                <DialogClose asChild>
                                    <Button variant="outline">Avbryt</Button>
                                </DialogClose>
                                <Button variant="destructive">Avsluta session</Button>
                            </DialogFooter>
                        </DialogContent>
                    </Dialog>
                </CardContent>
            </Card>
        </div>
    );
}
