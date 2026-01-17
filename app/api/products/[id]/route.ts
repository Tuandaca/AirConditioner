import { NextRequest, NextResponse } from 'next/server'
import { getProductBySlug } from '@/lib/products'
import { prisma } from '@/lib/prisma'

export async function GET(
  request: NextRequest,
  { params }: { params: { id: string } }
) {
  try {
    // Try to find by ID first, then by slug
    let product = await prisma.product.findUnique({
      where: { id: params.id },
    })

    if (!product) {
      product = await getProductBySlug(params.id)
    }

    if (!product) {
      return NextResponse.json(
        { message: 'Product not found' },
        { status: 404 }
      )
    }

    return NextResponse.json(product)
  } catch (error: any) {
    return NextResponse.json(
      { message: error.message || 'Internal server error' },
      { status: 500 }
    )
  }
}
