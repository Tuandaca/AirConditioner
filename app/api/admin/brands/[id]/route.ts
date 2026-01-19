import { NextRequest, NextResponse } from 'next/server'
import { getServerSession } from 'next-auth'
import { authOptions } from '@/lib/auth'
import { prisma } from '@/lib/prisma'

export const dynamic = 'force-dynamic'

// GET single brand
export async function GET(
    request: NextRequest,
    { params }: { params: { id: string } }
) {
    try {
        const brand = await prisma.brand.findUnique({
            where: { id: params.id },
        })

        if (!brand) {
            return NextResponse.json({ error: 'Brand not found' }, { status: 404 })
        }

        return NextResponse.json(brand)
    } catch (error) {
        console.error('Error fetching brand:', error)
        return NextResponse.json({ error: 'Failed to fetch brand' }, { status: 500 })
    }
}

// PUT update brand
export async function PUT(
    request: NextRequest,
    { params }: { params: { id: string } }
) {
    try {
        const session = await getServerSession(authOptions)
        if (!session) {
            return NextResponse.json({ error: 'Unauthorized' }, { status: 401 })
        }

        const data = await request.json()

        const brand = await prisma.brand.update({
            where: { id: params.id },
            data: {
                name: data.name,
                slug: data.slug,
                logo: data.logo || null,
                description: data.description || null,
                order: data.order,
                active: data.active,
            },
        })

        return NextResponse.json(brand)
    } catch (error: any) {
        console.error('Error updating brand:', error)
        return NextResponse.json({ error: error.message || 'Failed to update brand' }, { status: 500 })
    }
}

// DELETE brand
export async function DELETE(
    request: NextRequest,
    { params }: { params: { id: string } }
) {
    try {
        const session = await getServerSession(authOptions)
        if (!session) {
            return NextResponse.json({ error: 'Unauthorized' }, { status: 401 })
        }

        await prisma.brand.delete({
            where: { id: params.id },
        })

        return NextResponse.json({ message: 'Brand deleted successfully' })
    } catch (error: any) {
        console.error('Error deleting brand:', error)
        return NextResponse.json({ error: error.message || 'Failed to delete brand' }, { status: 500 })
    }
}
