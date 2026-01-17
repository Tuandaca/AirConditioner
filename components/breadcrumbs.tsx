"use client"

import Link from "next/link"
import { usePathname } from "next/navigation"
import {
    Breadcrumb,
    BreadcrumbItem,
    BreadcrumbLink,
    BreadcrumbList,
    BreadcrumbPage,
    BreadcrumbSeparator,
} from "@/components/ui/breadcrumb"

interface BreadcrumbsProps {
    items?: {
        label: string
        href?: string
    }[]
}

export function Breadcrumbs({ items }: BreadcrumbsProps) {
    const pathname = usePathname()

    // Generate breadcrumbs from pathname if items are not provided
    const generatedItems = items || generateBreadcrumbsStart(pathname)

    return (
        <Breadcrumb className="mb-4">
            <BreadcrumbList>
                <BreadcrumbItem>
                    <BreadcrumbLink asChild>
                        <Link href="/">Trang chủ</Link>
                    </BreadcrumbLink>
                </BreadcrumbItem>
                {generatedItems.length > 0 && <BreadcrumbSeparator />}

                {generatedItems.map((item, index) => {
                    const isLast = index === generatedItems.length - 1

                    return (
                        <div key={index} className="flex items-center gap-1.5 sm:gap-2.5">
                            <BreadcrumbItem>
                                {isLast || !item.href ? (
                                    <BreadcrumbPage>{item.label}</BreadcrumbPage>
                                ) : (
                                    <BreadcrumbLink asChild>
                                        <Link href={item.href}>{item.label}</Link>
                                    </BreadcrumbLink>
                                )}
                            </BreadcrumbItem>
                            {!isLast && <BreadcrumbSeparator />}
                        </div>
                    )
                })}
            </BreadcrumbList>
        </Breadcrumb>
    )
}

function generateBreadcrumbsStart(pathname: string) {
    // Simple generation logic, can be customized
    // Remove query params
    const cleanPath = pathname.split('?')[0]
    const segments = cleanPath.split('/').filter(Boolean)

    const crumbs = segments.map((segment, index) => {
        const href = `/${segments.slice(0, index + 1).join('/')}`
        // Capitalize first letter and replace hyphens with spaces
        let label = segment.charAt(0).toUpperCase() + segment.slice(1).replace(/-/g, ' ')

        // Custom mapping for known routes
        if (segment === 'products') label = 'Sản phẩm'
        if (segment === 'admin') label = 'Quản trị'

        return { label, href }
    })

    return crumbs
}
