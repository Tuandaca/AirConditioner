import { NextResponse } from 'next/server'
import { prisma } from '@/lib/prisma'

export const dynamic = 'force-dynamic'

export async function GET() {
    try {
        const [brands, horsepowers] = await Promise.all([
            prisma.product.findMany({
                where: { status: 'active' },
                select: { brand: true },
                distinct: ['brand'],
                orderBy: { brand: 'asc' },
            }),
            prisma.product.findMany({
                where: { status: 'active' },
                select: { horsepower: true },
                distinct: ['horsepower'],
                orderBy: { horsepower: 'asc' },
            }),
        ])

        return NextResponse.json({
            brands: brands.map((b) => b.brand),
            horsepowers: horsepowers.map((h) => h.horsepower),
        })
    } catch (error) {
        console.error('Error fetching filters:', error)
        return NextResponse.json(
            { message: 'Failed to fetch filters' },
            { status: 500 }
        )
    }
}
