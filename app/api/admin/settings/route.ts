import { NextRequest, NextResponse } from 'next/server'
import { getServerSession } from 'next-auth'
import { authOptions } from '@/lib/auth'
import { prisma } from '@/lib/prisma'

export async function PUT(request: NextRequest) {
  try {
    const session = await getServerSession(authOptions)
    
    if (!session) {
      return NextResponse.json({ message: 'Unauthorized' }, { status: 401 })
    }

    const data = await request.json()

    // Validate required fields
    if (!data.phoneNumber || !data.zaloNumber || !data.facebookUrl) {
      return NextResponse.json(
        { message: 'All fields are required' },
        { status: 400 }
      )
    }

    // Use SiteSettings model (single row, upsert based on first record)
    const existing = await prisma.siteSettings.findFirst()
    
    const siteSettings = existing
      ? await prisma.siteSettings.update({
          where: { id: existing.id },
          data: {
            phoneNumber: data.phoneNumber,
            zaloNumber: data.zaloNumber,
            facebookUrl: data.facebookUrl,
          },
        })
      : await prisma.siteSettings.create({
          data: {
            phoneNumber: data.phoneNumber,
            zaloNumber: data.zaloNumber,
            facebookUrl: data.facebookUrl,
          },
        })

    // Also update legacy Settings for backward compatibility
    await Promise.all([
      prisma.settings.upsert({
        where: { key: 'phoneNumber' },
        update: { value: data.phoneNumber },
        create: { key: 'phoneNumber', value: data.phoneNumber },
      }),
      prisma.settings.upsert({
        where: { key: 'zaloNumber' },
        update: { value: data.zaloNumber },
        create: { key: 'zaloNumber', value: data.zaloNumber },
      }),
      prisma.settings.upsert({
        where: { key: 'facebookUrl' },
        update: { value: data.facebookUrl },
        create: { key: 'facebookUrl', value: data.facebookUrl },
      }),
    ])

    return NextResponse.json({ success: true, settings: siteSettings })
  } catch (error: any) {
    return NextResponse.json(
      { message: error.message || 'Internal server error' },
      { status: 500 }
    )
  }
}
