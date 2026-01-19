import { NextRequest, NextResponse } from 'next/server'
import { getServerSession } from 'next-auth'
import { authOptions } from '@/lib/auth'
import { prisma } from '@/lib/prisma'

export const dynamic = 'force-dynamic'

// GET all brands
export async function GET() {
    try {
        const brands = await prisma.brand.findMany({
            orderBy: [{ order: 'asc' }, { name: 'asc' }],
        })
        return NextResponse.json(brands)
    } catch (error) {
        console.error('Error fetching brands:', error)
        return NextResponse.json({ error: 'Failed to fetch brands' }, { status: 500 })
    }
}

// POST create new brand
export async function POST(request: NextRequest) {
    try {
        const session = await getServerSession(authOptions)
        if (!session) {
            return NextResponse.json({ error: 'Unauthorized' }, { status: 401 })
        }

        const data = await request.json()

        const brand = await prisma.brand.create({
            data: {
                name: data.name,
                slug: data.slug,
                logo: data.logo || null,
                description: data.description || null,
                order: data.order || 0,
                active: data.active !== undefined ? data.active : true,
            },
        })

        return NextResponse.json(brand, { status: 201 })
    } catch (error: any) {
        console.error('Error creating brand:', error)
        return NextResponse.json({ error: error.message || 'Failed to create brand' }, { status: 500 })
    }
}
