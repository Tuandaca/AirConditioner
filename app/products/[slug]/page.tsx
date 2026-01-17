import { notFound } from 'next/navigation'
import { prisma } from '@/lib/prisma'
import Image from 'next/image'
import { Badge } from '@/components/ui/badge'
import { Button } from '@/components/ui/button'
import { formatPrice } from '@/lib/utils'
import { Phone, ShoppingBag, Check } from 'lucide-react'
import Link from 'next/link'
import { getSiteSettings } from '@/lib/settings'
import { Breadcrumbs } from '@/components/breadcrumbs'
import { ProductImageGallery } from '@/components/product-image-gallery'

export const dynamic = 'force-dynamic'

export default async function ProductDetailPage({
  params,
}: {
  params: { slug: string }
}) {
  const [product, settings] = await Promise.all([
    prisma.product.findUnique({
      where: { slug: params.slug },
    }),
    getSiteSettings(),
  ])

  if (!product || product.status !== 'active') {
    notFound()
  }

  const specifications = product.specifications as Record<string, string> | null

  return (
    <div className="container py-4 md:py-8 px-4 md:px-6">
      <Breadcrumbs items={[
        { label: 'Sản phẩm', href: '/products' },
        { label: product.brand, href: `/products?brand=${product.brand}` },
        { label: product.name }
      ]} />
      <div className="grid lg:grid-cols-2 gap-6 lg:gap-12">
        {/* Image Gallery */}
        {/* Image Gallery */}
        <div>
          <ProductImageGallery images={product.images} productName={product.name} />
        </div>

        {/* Product Info */}
        <div className="space-y-4 sm:space-y-6">
          <div className="flex flex-wrap items-center gap-2">
            <Badge variant="outline" className="text-xs sm:text-sm">{product.brand}</Badge>
            <Badge variant="outline" className="text-xs sm:text-sm">{product.horsepower}</Badge>
            {product.inverter && <Badge className="text-xs sm:text-sm">Inverter</Badge>}
          </div>

          <h1 className="text-2xl sm:text-3xl md:text-4xl font-bold leading-tight">{product.name}</h1>

          <div className="flex flex-col sm:flex-row sm:items-baseline gap-2 sm:gap-4">
            <span className="text-3xl sm:text-4xl font-bold text-primary">
              {formatPrice(product.price)}
            </span>
            {product.originalPrice && (
              <span className="text-xl text-muted-foreground line-through">
                {formatPrice(product.originalPrice)}
              </span>
            )}
          </div>

          <div className="prose max-w-none">
            <p className="text-muted-foreground leading-relaxed text-sm sm:text-base">
              {product.description}
            </p>
          </div>

          {/* Benefits */}
          {product.benefits && product.benefits.length > 0 && (
            <div className="mb-8">
              <h3 className="font-semibold text-lg mb-4">Điểm nổi bật</h3>
              <ul className="space-y-2">
                {product.benefits.map((benefit, index) => (
                  <li key={index} className="flex items-start gap-2">
                    <Check className="h-5 w-5 text-primary mt-0.5 flex-shrink-0" />
                    <span>{benefit}</span>
                  </li>
                ))}
              </ul>
            </div>
          )}

          {/* CTA Buttons - Sticky on mobile */}
          <div className="sticky bottom-0 left-0 right-0 bg-background/95 backdrop-blur border-t p-4 -mx-4 md:-mx-6 lg:mx-0 lg:border-0 lg:p-0 lg:static flex flex-col sm:flex-row gap-3 z-10 lg:z-auto">
            <Button asChild size="lg" className="flex-1 h-12 sm:h-11">
              <a href={`tel:${settings.phoneNumber}`}>
                <Phone className="mr-2 h-5 w-5" />
                <span className="text-base sm:text-sm">Gọi ngay: {settings.phoneNumber}</span>
              </a>
            </Button>
            <Button asChild size="lg" variant="outline" className="flex-1">
              <Link href="/products">
                <ShoppingBag className="mr-2 h-5 w-5" />
                Xem thêm sản phẩm
              </Link>
            </Button>
          </div>
        </div>
      </div>

      {/* Specifications */}
      {specifications && Object.keys(specifications).length > 0 && (
        <div className="mt-8 lg:mt-12 border-t pt-8 lg:pt-12">
          <h2 className="text-xl sm:text-2xl font-bold mb-4 md:mb-6">Thông số kỹ thuật</h2>
          <div className="grid sm:grid-cols-2 gap-3 md:gap-4">
            {Object.entries(specifications).map(([key, value]) => {
              const labels: Record<string, string> = {
                warranty: 'Bảo hành',
                origin: 'Xuất xứ',
                gas: 'Gas sử dụng',
                energySaving: 'Tiết kiệm điện',
                coolingCapacity: 'Công suất làm lạnh',
                coolingArea: 'Diện tích làm lạnh',
              }

              return (
                <div key={key} className="flex justify-between py-3 border-b">
                  <span className="font-medium text-muted-foreground">{labels[key] || key}</span>
                  <span className="font-semibold">{value}</span>
                </div>
              )
            })}
          </div>
        </div>
      )}
    </div>
  )
}
