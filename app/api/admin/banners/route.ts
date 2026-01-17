import { NextResponse } from 'next/server'
import { prisma } from '@/lib/prisma'

export async function POST(request: Request) {
    try {
        const json = await request.json()
        const banner = await prisma.banner.create({
            data: json,
        })
        return NextResponse.json(banner)
    } catch (error: any) {
        return NextResponse.json(
            { message: error.message || 'Internal Error' },
            { status: 500 }
        )
    }
}

export async function GET() {
    try {
        const banners = await prisma.banner.findMany({
            orderBy: { order: 'asc' },
        })
        return NextResponse.json(banners)
    } catch (error: any) {
        return NextResponse.json(
            { message: error.message || 'Internal Error' },
            { status: 500 }
        )
    }
}
