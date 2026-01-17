import { NextResponse } from 'next/server'
import { prisma } from '@/lib/prisma'

export async function DELETE(
    request: Request,
    { params }: { params: { id: string } }
) {
    try {
        await prisma.banner.delete({
            where: { id: params.id },
        })
        return NextResponse.json({ message: 'Banner deleted' })
    } catch (error: any) {
        return NextResponse.json(
            { message: error.message || 'Internal Error' },
            { status: 500 }
        )
    }
}
