import { NextRequest, NextResponse } from 'next/server'
import { getProducts } from '@/lib/products'

export async function GET(request: NextRequest) {
  try {
    const searchParams = request.nextUrl.searchParams
    const filters = {
      brand: searchParams.get('brand') || undefined,
      horsepower: searchParams.get('horsepower') || undefined,
      inverter: searchParams.get('inverter')
        ? searchParams.get('inverter') === 'true'
        : undefined,
      minPrice: searchParams.get('minPrice')
        ? parseFloat(searchParams.get('minPrice')!)
        : undefined,
      maxPrice: searchParams.get('maxPrice')
        ? parseFloat(searchParams.get('maxPrice')!)
        : undefined,
      search: searchParams.get('search') || undefined,
    }

    const products = await getProducts(filters)
    return NextResponse.json(products)
  } catch (error) {
    console.error('Error fetching products:', error)
    return NextResponse.json(
      { message: error instanceof Error ? error.message : 'Internal server error' },
      { status: 500 }
    )
  }
}
