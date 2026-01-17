"use client"

import Link from "next/link"
import { useCompare } from "@/lib/compare-context"
import { Button } from "@/components/ui/button"
import { X, ArrowRight } from "lucide-react"

export function CompareBar() {
    const { items, removeItem, clearCompare } = useCompare()

    if (items.length === 0) return null

    return (
        <div className="fixed bottom-20 left-1/2 -translate-x-1/2 z-40 w-full max-w-xl px-4 animate-in slide-in-from-bottom-5">
            <div className="bg-background border shadow-xl rounded-lg p-4 flex items-center justify-between gap-4">
                <div className="flex items-center gap-2 overflow-x-auto pb-1">
                    {items.map((item) => (
                        <div key={item.id} className="relative flex-shrink-0 group">
                            <div className="w-12 h-12 rounded border bg-muted overflow-hidden">
                                <img
                                    src={item.image}
                                    alt={item.name}
                                    className="w-full h-full object-cover"
                                />
                            </div>
                            <button
                                onClick={() => removeItem(item.id)}
                                className="absolute -top-2 -right-2 bg-destructive text-destructive-foreground rounded-full p-0.5 opacity-0 group-hover:opacity-100 transition-opacity"
                            >
                                <X className="w-3 h-3" />
                            </button>
                        </div>
                    ))}
                    <div className="text-sm font-medium whitespace-nowrap ml-2">
                        So sánh ({items.length}/3)
                    </div>
                </div>

                <div className="flex items-center gap-2">
                    <Button variant="ghost" size="sm" onClick={clearCompare}>
                        Xóa
                    </Button>
                    <Button asChild size="sm">
                        <Link href="/compare">
                            So sánh <ArrowRight className="ml-2 w-4 h-4" />
                        </Link>
                    </Button>
                </div>
            </div>
        </div>
    )
}
