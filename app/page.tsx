import { Hero } from '@/components/hero'
import { ProductCard } from '@/components/product-card'
import { prisma } from '@/lib/prisma'
import { Button } from '@/components/ui/button'
import Link from 'next/link'
import { getSiteSettings } from '@/lib/settings'

export const dynamic = 'force-dynamic'

type Product = {
  id: string
  name: string
  slug: string
  price: number
  originalPrice: number | null
  brand: string
  horsepower: string
  inverter: boolean
  images: string[]
  status: string
}

export default async function HomePage() {
  const [featuredProducts, settings] = await Promise.all([
    prisma.product.findMany({
      where: {
        featured: true,
        status: 'active',
      },
      take: 6,
      orderBy: {
        createdAt: 'desc',
      },
    }),
    getSiteSettings(),
  ])

  return (
    <>
      <Hero />

      <section className="py-12 sm:py-16 bg-background">
        <div className="container px-4 md:px-6">
          <div className="text-center mb-8 md:mb-12">
            <h2 className="text-2xl sm:text-3xl md:text-4xl font-bold mb-2 md:mb-4">
              Sản Phẩm Nổi Bật
            </h2>
            <p className="text-muted-foreground text-base sm:text-lg">
              Những sản phẩm được yêu thích nhất
            </p>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 md:gap-6 mb-6 md:mb-8">
            {featuredProducts.map((product: Product) => (
              <ProductCard
                key={product.id}
                id={product.id}
                name={product.name}
                slug={product.slug}
                price={product.price}
                originalPrice={product.originalPrice || undefined}
                brand={product.brand}
                horsepower={product.horsepower}
                inverter={product.inverter}
                images={product.images}
                phoneNumber={settings.phoneNumber}
              />
            ))}
          </div>

          <div className="text-center">
            <Button asChild size="lg">
              <Link href="/products">Xem tất cả sản phẩm</Link>
            </Button>
          </div>
        </div>
      </section>

      <section className="py-12 sm:py-16 bg-muted/50">
        <div className="container px-4 md:px-6">
          <div className="max-w-3xl mx-auto text-center">
            <h2 className="text-2xl sm:text-3xl md:text-4xl font-bold mb-4 md:mb-6">
              Tại sao chọn chúng tôi?
            </h2>
            <div className="grid sm:grid-cols-2 md:grid-cols-3 gap-6 md:gap-8 mt-8 md:mt-12">
              <div>
                <div className="text-4xl mb-4">🏆</div>
                <h3 className="font-semibold text-lg mb-2">Chính hãng 100%</h3>
                <p className="text-muted-foreground">
                  Cam kết sản phẩm chính hãng, có đầy đủ giấy tờ bảo hành
                </p>
              </div>
              <div>
                <div className="text-4xl mb-4">💰</div>
                <h3 className="font-semibold text-lg mb-2">Giá tốt nhất</h3>
                <p className="text-muted-foreground">
                  Giá cạnh tranh nhất thị trường, nhiều ưu đãi hấp dẫn
                </p>
              </div>
              <div>
                <div className="text-4xl mb-4">🚚</div>
                <h3 className="font-semibold text-lg mb-2">Giao hàng nhanh</h3>
                <p className="text-muted-foreground">
                  Miễn phí vận chuyển và lắp đặt trong nội thành
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>
    </>
  )
}
