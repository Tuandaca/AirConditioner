import type { Metadata } from 'next'
import { Hero } from '@/components/hero'
import { BenefitsSection } from '@/components/benefits-section'
import { ProductCard } from '@/components/product-card'
import { products } from '@/data/products'
import { Button } from '@/components/ui/button'
import Link from 'next/link'
import { ArrowRight } from 'lucide-react'

export const metadata: Metadata = {
  title: 'Máy lạnh chính hãng - Lắp đặt tận nơi - Bảo hành dài hạn',
  description: 'Chuyên cung cấp máy lạnh chính hãng Daikin, Panasonic, LG, Samsung. Lắp đặt tận nơi, bảo hành 12 tháng.',
}

export default function HomePage() {
  const featuredProducts = products.filter(p => p.featured).slice(0, 6)
  const quickCategories = [
    { href: '/products?horsepower=1HP', label: 'Máy lạnh 1HP', description: 'Phù hợp phòng 12-15m²' },
    { href: '/products?horsepower=1.5HP', label: 'Máy lạnh 1.5HP', description: 'Phù hợp phòng 15-20m²' },
    { href: '/products?horsepower=2HP', label: 'Máy lạnh 2HP', description: 'Phù hợp phòng 20-25m²' },
  ]

  return (
    <main className="min-h-screen">
      <Hero />

      {/* Quick Categories */}
      <section className="py-16 bg-white">
        <div className="container px-4">
          <h2 className="text-3xl md:text-4xl font-bold mb-8 text-center text-gray-900">
            Chọn theo công suất
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 max-w-4xl mx-auto">
            {quickCategories.map((category) => (
              <Link key={category.href} href={category.href}>
                <div className="bg-gradient-to-br from-blue-50 to-cyan-50 rounded-xl p-6 text-center hover:shadow-xl transition-all duration-300 hover:-translate-y-1 group">
                  <h3 className="text-xl font-semibold mb-2 text-gray-900 group-hover:text-primary transition-colors">
                    {category.label}
                  </h3>
                  <p className="text-sm text-gray-600 mb-4">
                    {category.description}
                  </p>
                  <Button variant="outline" size="sm" className="group/btn">
                    Xem ngay
                    <ArrowRight className="ml-2 h-4 w-4 group-hover/btn:translate-x-1 transition-transform" />
                  </Button>
                </div>
              </Link>
            ))}
          </div>
        </div>
      </section>

      {/* Featured Products */}
      <section id="products" className="py-20 bg-gray-50">
        <div className="container px-4">
          <div className="flex items-center justify-between mb-12">
            <div>
              <h2 className="text-3xl md:text-4xl font-bold mb-4 text-gray-900">
                Sản phẩm nổi bật
              </h2>
              <p className="text-lg text-gray-600">
                Máy lạnh chính hãng, giá tốt nhất thị trường
              </p>
            </div>
            <Link href="/products">
              <Button variant="outline" className="hidden md:flex">
                Xem tất cả
                <ArrowRight className="ml-2 h-4 w-4" />
              </Button>
            </Link>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {featuredProducts.map((product, index) => (
              <ProductCard key={product.id} product={product} index={index} />
            ))}
          </div>
          <div className="text-center mt-8 md:hidden">
            <Link href="/products">
              <Button variant="outline" size="lg">
                Xem tất cả sản phẩm
                <ArrowRight className="ml-2 h-4 w-4" />
              </Button>
            </Link>
          </div>
        </div>
      </section>

      <BenefitsSection />

      {/* CTA Section */}
      <section className="py-20 bg-gradient-to-br from-blue-600 to-cyan-600 text-white">
        <div className="container px-4 text-center">
          <h2 className="text-3xl md:text-4xl font-bold mb-4">
            Cần tư vấn chọn máy lạnh phù hợp?
          </h2>
          <p className="text-xl mb-8 text-blue-100 max-w-2xl mx-auto">
            Đội ngũ tư vấn chuyên nghiệp sẵn sàng hỗ trợ bạn chọn máy lạnh phù hợp nhất với nhu cầu và ngân sách.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <a href="https://zalo.me/0912345678" target="_blank" rel="noopener noreferrer">
              <Button size="lg" className="bg-white text-blue-600 hover:bg-gray-100 h-auto px-8 py-6 text-lg">
                Chat Zalo ngay
              </Button>
            </a>
            <a href="tel:0912345678">
              <Button size="lg" variant="outline" className="border-white text-white !text-white hover:bg-white/10 hover:!text-white h-auto px-8 py-6 text-lg">
                Gọi hotline: 0912 345 678
              </Button>
            </a>
          </div>
        </div>
      </section>
    </main>
  )
}