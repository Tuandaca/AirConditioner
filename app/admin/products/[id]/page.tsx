import { notFound } from 'next/navigation'
import { prisma } from '@/lib/prisma'
import { ProductForm } from '@/components/admin/product-form'

export default async function EditProductPage({
  params,
}: {
  params: { id: string }
}) {
  const product = await prisma.product.findUnique({
    where: { id: params.id },
  })

  if (!product) {
    notFound()
  }

  return (
    <div>
      <h1 className="text-3xl font-bold mb-8">Chỉnh sửa sản phẩm</h1>
      <ProductForm product={product} />
    </div>
  )
}
