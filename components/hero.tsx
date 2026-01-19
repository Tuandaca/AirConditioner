import { Button } from '@/components/ui/button'
import { Phone, ShoppingBag } from 'lucide-react'
import Link from 'next/link'
import { getSiteSettings } from '@/lib/settings'
import { prisma } from '@/lib/prisma'
import Image from 'next/image'

export async function Hero() {
  const [settings, banners] = await Promise.all([
    getSiteSettings(),
    prisma.banner.findMany({
      where: { active: true },
      orderBy: { order: 'asc' },
      take: 1
    })
  ])

  const banner = banners[0]

  return (
    <section className="relative bg-gradient-to-br from-blue-50 to-cyan-50 dark:from-slate-900 dark:to-slate-800 py-12 sm:py-16 md:py-20 lg:py-32">
      <div className="container px-4 md:px-6">
        <div className="grid md:grid-cols-2 gap-8 md:gap-12 items-center">
          <div>
            <h1 className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-bold mb-4 md:mb-6">
              {banner?.title ? (
                <>
                  {banner.title}
                </>
              ) : (
                <>
                  Điều Hòa Chính Hãng
                  <span className="text-primary block">Giá Tốt Nhất</span>
                </>
              )}
            </h1>
            <p className="text-base sm:text-lg text-muted-foreground mb-6 md:mb-8">
              Chuyên cung cấp điều hòa Daikin, Mitsubishi, Panasonic và nhiều thương hiệu khác.
              Cam kết giá tốt nhất thị trường, bảo hành chính hãng.
            </p>
            <div className="flex flex-col sm:flex-row gap-3 sm:gap-4">
              <Button asChild size="lg" className="text-base sm:text-lg px-6 sm:px-8 w-full sm:w-auto">
                <Link href={banner?.link || "/products"}>
                  <ShoppingBag className="mr-2 h-5 w-5" />
                  {banner?.link ? "Xem chi tiết" : "Xem sản phẩm"}
                </Link>
              </Button>
              <Button asChild size="lg" variant="outline" className="text-base sm:text-lg px-6 sm:px-8 w-full sm:w-auto">
                <a href={`tel:${settings.phoneNumber}`}>
                  <Phone className="mr-2 h-4 w-4 sm:h-5 sm:w-5" />
                  <span className="hidden sm:inline">Gọi ngay: </span>{settings.phoneNumber}
                </a>
              </Button>
            </div>
          </div>
          <div className="hidden md:block">
            <div className="relative">
              {banner?.imageUrl ? (
                <div className="aspect-[4/3] relative rounded-lg overflow-hidden shadow-2xl">
                  <Image
                    src={banner.imageUrl}
                    alt={banner.title || "Banner"}
                    fill
                    className="object-cover"
                    priority
                  />
                </div>
              ) : (
                <div className="aspect-[4/3] rounded-lg bg-gradient-to-br from-blue-100 to-cyan-100 dark:from-slate-800 dark:to-slate-700 flex items-center justify-center">
                  <ShoppingBag className="h-48 w-48 text-primary/20" />
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}
