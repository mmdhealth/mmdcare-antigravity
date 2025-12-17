
"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/button";
import {
    LayoutDashboard,
    FileText,
    MessageSquare,
    Settings,
    User,
    LogOut,
    Menu
} from "lucide-react";
import { ModeToggle } from "@/components/mode-toggle";
import { useState } from "react";

const navItems = [
    { name: "Översikt", href: "/dashboard", icon: LayoutDashboard },
    { name: "Journaldata", href: "/journaldata", icon: FileText },
    { name: "Hälsa+ GPT", href: "/gpt", icon: MessageSquare },
    { name: "Inställningar", href: "/inställningar", icon: Settings },
];

export function Sidebar() {
    const pathname = usePathname();
    const [isOpen, setIsOpen] = useState(false);

    return (
        <>
            <button
                onClick={() => setIsOpen(!isOpen)}
                className="md:hidden fixed top-4 left-4 z-50 p-2 bg-background border rounded-md shadow-sm"
            >
                <Menu className="h-5 w-5" />
            </button>

            {/* Screen Overlay for mobile */}
            {isOpen && (
                <div
                    className="fixed inset-0 z-30 bg-black/50 md:hidden"
                    onClick={() => setIsOpen(false)}
                />
            )}

            <div
                className={cn(
                    "fixed inset-y-0 left-0 z-40 w-64 bg-zinc-50 border-r border-zinc-200 transform transition-transform duration-200 md:translate-x-0 bg-background flex flex-col",
                    isOpen ? "translate-x-0" : "-translate-x-full"
                )}
            >
                <div className="p-6 border-b border-zinc-100 flex items-center gap-2">
                    <div className="h-8 w-8 bg-zinc-900 rounded flex items-center justify-center">
                        <span className="text-white font-bold">M</span>
                    </div>
                    <span className="text-lg font-bold">MMDCare</span>
                </div>

                <nav className="flex-1 p-4 space-y-1">
                    {navItems.map((item) => {
                        const isActive = pathname === item.href || (item.href !== "/" && pathname?.startsWith(item.href));
                        return (
                            <Link
                                key={item.href}
                                href={item.href}
                                className={cn(
                                    "flex items-center gap-3 px-3 py-2 text-sm font-medium rounded-md transition-colors",
                                    isActive
                                        ? "bg-zinc-200 text-zinc-900"
                                        : "text-zinc-500 hover:text-zinc-900 hover:bg-zinc-100"
                                )}
                                onClick={() => setIsOpen(false)}
                            >
                                <item.icon className="h-4 w-4" />
                                {item.name}
                            </Link>
                        );
                    })}
                </nav>

                <div className="p-4 border-t border-zinc-200 dark:border-zinc-800">
                    <div className="flex items-center gap-3 mb-4">
                        <div className="h-10 w-10 rounded-full bg-zinc-100 dark:bg-zinc-800 flex items-center justify-center">
                            <User className="h-5 w-5 text-zinc-500" />
                        </div>
                        <div>
                            <p className="text-sm font-medium text-zinc-900 dark:text-zinc-100">Dr. Samuel</p>
                            <p className="text-xs text-zinc-500">Överläkare</p>
                        </div>
                        <div className="ml-auto">
                            <ModeToggle />
                        </div>
                    </div>
                </div>
            </div>
        </>
    );
}

