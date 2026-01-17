import { prisma } from '@/lib/prisma'
import { Button } from '@/components/ui/button'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { Badge } from '@/components/ui/badge'
import { formatPrice } from '@/lib/utils'
import Link from 'next/link'
import { Plus, Edit, Trash2 } from 'lucide-react'
import { ProductActions } from '@/components/admin/product-actions'

export const dynamic = 'force-dynamic'

export default async function AdminProductsPage() {
  const products = await prisma.product.findMany({
    orderBy: { createdAt: 'desc' },
  })

  return (
    <div>
      <div className="flex items-center justify-between mb-8">
        <h1 className="text-3xl font-bold">Quản lý sản phẩm</h1>
        <Button asChild>
          <Link href="/admin/products/new">
            <Plus className="mr-2 h-4 w-4" />
            Thêm sản phẩm
          </Link>
        </Button>
      </div>

      <div className="grid gap-4">
        {products.length === 0 ? (
          <Card>
            <CardContent className="py-12 text-center">
              <p className="text-muted-foreground mb-4">
                Chưa có sản phẩm nào
              </p>
              <Button asChild>
                <Link href="/admin/products/new">Thêm sản phẩm đầu tiên</Link>
              </Button>
            </CardContent>
          </Card>
        ) : (
          <div className="space-y-4">
            {products.map((product) => (
              <Card key={product.id}>
                <CardContent className="p-6">
                  <div className="flex items-start justify-between">
                    <div className="flex-1">
                      <div className="flex items-center gap-2 mb-2">
                        <h3 className="text-lg font-semibold">{product.name}</h3>
                        <Badge
                          variant={
                            product.status === 'active'
                              ? 'default'
                              : product.status === 'out_of_stock'
                                ? 'destructive'
                                : 'secondary'
                          }
                        >
                          {product.status}
                        </Badge>
                        {product.featured && (
                          <Badge variant="outline">Nổi bật</Badge>
                        )}
                      </div>
                      <div className="flex items-center gap-4 text-sm text-muted-foreground mb-2">
                        <span>{product.brand}</span>
                        <span>•</span>
                        <span>{product.horsepower}</span>
                        {product.inverter && (
                          <>
                            <span>•</span>
                            <span>Inverter</span>
                          </>
                        )}
                      </div>
                      <div className="text-lg font-semibold">
                        {formatPrice(product.price)}
                        {product.originalPrice && (
                          <span className="text-sm text-muted-foreground line-through ml-2">
                            {formatPrice(product.originalPrice)}
                          </span>
                        )}
                      </div>
                    </div>
                    <div className="flex items-center gap-2">
                      <Button asChild variant="outline" size="sm">
                        <Link href={`/admin/products/${product.id}`}>
                          <Edit className="h-4 w-4" />
                        </Link>
                      </Button>
                      <ProductActions productId={product.id} />
                    </div>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        )}
      </div>
    </div>
  )
}
