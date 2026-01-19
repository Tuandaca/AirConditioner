import { prisma } from '@/lib/prisma'
import { ProductsListClient } from '@/components/admin/products-list-client'

export const dynamic = 'force-dynamic'

export default async function AdminProductsPage() {
  const products = await prisma.product.findMany({
    orderBy: { createdAt: 'desc' },
  })

  return <ProductsListClient products={products} />
}
