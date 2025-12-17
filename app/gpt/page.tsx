"use client";

import { useState, useRef, useEffect } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { ScrollArea } from "@/components/ui/scroll-area";
import { Sparkles, Send, User, Bot } from "lucide-react";
import { cn } from "@/lib/utils";

interface Message {
    role: "user" | "ai";
    content: string;
}

const INITIAL_MESSAGE: Message = {
    role: "ai",
    content: "Hej! Jag är Hälsa+GPT. Jag kan hjälpa dig att analysera patientdata och identifiera trender. Vad vill du undersöka idag?"
};

export default function GPTPage() {
    const [messages, setMessages] = useState<Message[]>([INITIAL_MESSAGE]);
    const [input, setInput] = useState("");
    const [isTyping, setIsTyping] = useState(false);
    const scrollRef = useRef<HTMLDivElement>(null);

    useEffect(() => {
        if (scrollRef.current) {
            scrollRef.current.scrollIntoView({ behavior: "smooth" });
        }
    }, [messages, isTyping]);

    const handleSend = async () => {
        if (!input.trim()) return;

        const userMsg: Message = { role: "user", content: input };
        setMessages(prev => [...prev, userMsg]);
        setInput("");
        setIsTyping(true);

        // Simulate network delay
        setTimeout(() => {
            // Mock response logic
            let responseText = "Jag förstår. Utifrån patientens data ser jag att...";

            const lowerInput = userMsg.content.toLowerCase();
            if (lowerInput.includes("vikt")) {
                responseText = "Patientens vikt har ökat stadigt de senaste 6 månaderna. Det kan vara värt att diskutera kost och motion, speciellt med tanke på de stabila men höga blodfetterna.";
            } else if (lowerInput.includes("hjärta") || lowerInput.includes("puls")) {
                responseText = "Hjärtfrekvensen ligger inom normalintervallet, men vi ser vissa toppar under dagtid som kan indikera stress eller aktivitet. Vilopulsen är stabil.";
            } else if (lowerInput.includes("diabetes") || lowerInput.includes("glukos")) {
                responseText = "Glukosvärdena varierar. HbA1c visar en viss ökning vilket kan tyda på pre-diabetes. Rekommenderar uppföljning av kosthållning.";
            }

            const words = responseText.split(" ");
            let currentText = "";
            let i = 0;

            // Simulate streaming
            const streamInterval = setInterval(() => {
                if (i < words.length) {
                    currentText += (i > 0 ? " " : "") + words[i];
                    // Update the last message (which is the AI response placeholder)
                    // Actually better to just append the AI message once typing starts
                    // But for simplicity let's just add the full message after 'typing' delay 
                    // and maybe simulate typing effect in a simpler way or real way.
                    // Let's go with a simple "Typing..." -> "Full Message" for reliability in this demo,
                    // or chunked updates. 

                    i++;
                } else {
                    clearInterval(streamInterval);
                    setMessages(prev => [...prev, { role: "ai", content: responseText }]);
                    setIsTyping(false);
                }
            }, 50); // Fast typing

        }, 1000); // 1s think time
    };

    return (
        <div className="h-[calc(100vh-8rem)] flex flex-col gap-4">
            <div className="flex items-center gap-3 border-b pb-4">
                <div className="h-10 w-10 bg-indigo-100 rounded-full flex items-center justify-center text-indigo-600">
                    <Sparkles className="h-5 w-5" />
                </div>
                <h1 className="text-2xl font-bold text-zinc-900">Hälsa+ GPT</h1>
            </div>

            <Card className="flex-1 flex flex-col overflow-hidden bg-zinc-50/50">
                <ScrollArea className="flex-1 p-4">
                    <div className="space-y-4 max-w-3xl mx-auto">
                        {messages.map((msg, idx) => (
                            <div key={idx} className={cn("flex gap-3", msg.role === "user" ? "flex-row-reverse" : "flex-row")}>
                                <div className={cn(
                                    "h-8 w-8 rounded-full flex items-center justify-center shrink-0",
                                    msg.role === "ai" ? "bg-indigo-600 text-white" : "bg-zinc-200 text-zinc-600"
                                )}>
                                    {msg.role === "ai" ? <Sparkles className="h-4 w-4" /> : <User className="h-4 w-4" />}
                                </div>
                                <div className={cn(
                                    "p-4 rounded-2xl max-w-[80%] text-sm",
                                    msg.role === "ai" ? "bg-white border border-indigo-100 text-zinc-800 shadow-sm rounded-tl-none" : "bg-zinc-900 text-white rounded-tr-none"
                                )}>
                                    {msg.content}
                                </div>
                            </div>
                        ))}
                        {isTyping && (
                            <div className="flex gap-3">
                                <div className="h-8 w-8 rounded-full bg-indigo-600 text-white flex items-center justify-center">
                                    <Sparkles className="h-4 w-4" />
                                </div>
                                <div className="bg-white border border-indigo-100 p-4 rounded-2xl rounded-tl-none shadow-sm flex items-center gap-1">
                                    <span className="h-2 w-2 bg-indigo-400 rounded-full animate-bounce [animation-delay:-0.3s]"></span>
                                    <span className="h-2 w-2 bg-indigo-400 rounded-full animate-bounce [animation-delay:-0.15s]"></span>
                                    <span className="h-2 w-2 bg-indigo-400 rounded-full animate-bounce"></span>
                                </div>
                            </div>
                        )}
                        <div ref={scrollRef} />
                    </div>
                </ScrollArea>
                <div className="p-4 bg-white border-t">
                    <div className="max-w-3xl mx-auto flex gap-2">
                        <Input
                            placeholder="Ställ en fråga om patientens hälsa..."
                            value={input}
                            onChange={(e) => setInput(e.target.value)}
                            onKeyDown={(e) => e.key === "Enter" && handleSend()}
                            className="bg-zinc-50 border-zinc-200 focus-visible:ring-indigo-500"
                        />
                        <Button onClick={handleSend} disabled={isTyping || !input.trim()} className="bg-indigo-600 hover:bg-indigo-700">
                            <Send className="h-4 w-4" />
                        </Button>
                    </div>
                </div>
            </Card>
        </div>
    );
}
