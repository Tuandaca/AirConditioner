import { prisma } from '@/lib/prisma'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { Package, DollarSign, TrendingUp, AlertCircle } from 'lucide-react'
import Link from 'next/link'
import { Button } from '@/components/ui/button'
import { formatPrice } from '@/lib/utils'

export default async function AdminDashboard() {
  const [
    totalProducts,
    activeProducts,
    totalValue,
    lowStockProducts,
  ] = await Promise.all([
    prisma.product.count(),
    prisma.product.count({ where: { status: 'active' } }),
    prisma.product.aggregate({
      _sum: { price: true },
      where: { status: 'active' },
    }),
    prisma.product.count({ where: { status: 'out_of_stock' } }),
  ])

  const stats = [
    {
      title: 'Tổng sản phẩm',
      value: totalProducts,
      icon: Package,
      description: `${activeProducts} đang hoạt động`,
    },
    {
      title: 'Tổng giá trị',
      value: formatPrice(totalValue._sum.price || 0),
      icon: DollarSign,
      description: 'Tổng giá trị kho hàng',
    },
    {
      title: 'Sản phẩm nổi bật',
      value: await prisma.product.count({ where: { featured: true } }),
      icon: TrendingUp,
      description: 'Đang được hiển thị',
    },
    {
      title: 'Hết hàng',
      value: lowStockProducts,
      icon: AlertCircle,
      description: 'Cần bổ sung',
    },
  ]

  const recentProducts = await prisma.product.findMany({
    take: 5,
    orderBy: { createdAt: 'desc' },
    select: {
      id: true,
      name: true,
      price: true,
      status: true,
      createdAt: true,
    },
  })

  return (
    <div>
      <div className="flex items-center justify-between mb-8">
        <h1 className="text-3xl font-bold">Dashboard</h1>
        <Button asChild>
          <Link href="/admin/products/new">Thêm sản phẩm mới</Link>
        </Button>
      </div>

      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4 mb-8">
        {stats.map((stat) => {
          const Icon = stat.icon
          return (
            <Card key={stat.title}>
              <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                <CardTitle className="text-sm font-medium">
                  {stat.title}
                </CardTitle>
                <Icon className="h-4 w-4 text-muted-foreground" />
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold">{stat.value}</div>
                <p className="text-xs text-muted-foreground">
                  {stat.description}
                </p>
              </CardContent>
            </Card>
          )
        })}
      </div>

      <Card>
        <CardHeader>
          <CardTitle>Sản phẩm gần đây</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            {recentProducts.map((product) => (
              <div
                key={product.id}
                className="flex items-center justify-between border-b pb-4 last:border-0"
              >
                <div>
                  <Link
                    href={`/admin/products/${product.id}`}
                    className="font-medium hover:text-primary"
                  >
                    {product.name}
                  </Link>
                  <p className="text-sm text-muted-foreground">
                    {new Date(product.createdAt).toLocaleDateString('vi-VN')}
                  </p>
                </div>
                <div className="text-right">
                  <div className="font-semibold">
                    {formatPrice(product.price)}
                  </div>
                  <span
                    className={`text-xs ${product.status === 'active'
                      ? 'text-green-600'
                      : 'text-muted-foreground'
                      }`}
                  >
                    {product.status}
                  </span>
                </div>
              </div>
            ))}
          </div>
          <div className="mt-4">
            <Button asChild variant="outline" className="w-full">
              <Link href="/admin/products">Xem tất cả sản phẩm</Link>
            </Button>
          </div>
        </CardContent>
      </Card>
    </div>
  )
}
