
"use client"

import Link from "next/link"
import { ChevronRight } from "lucide-react"
import { cn } from "@/lib/utils"

export type BreadcrumbItem = {
    label: string;
    href: string;
}

type BreadcrumbsProps = {
    items: BreadcrumbItem[];
    className?: string;
}

export function Breadcrumbs({ items, className }: BreadcrumbsProps) {
    return (
        <nav aria-label="Breadcrumb" className={cn("mb-4", className)}>
            <ol className="flex items-center gap-1 text-sm text-muted-foreground">
                 {items.map((item, index) => (
                    <li key={index} className="flex items-center gap-1">
                        <Link 
                            href={item.href}
                            className={cn(
                                "hover:text-primary",
                                { "font-semibold text-foreground": index === items.length - 1 }
                            )}
                            aria-current={index === items.length - 1 ? "page" : undefined}
                        >
                            {item.label}
                        </Link>
                        {index < items.length - 1 && <ChevronRight className="h-4 w-4" />}
                    </li>
                ))}
            </ol>
        </nav>
    )
}
