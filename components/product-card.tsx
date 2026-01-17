import Link from 'next/link'
import Image from 'next/image'
import { Card, CardContent, CardFooter, CardHeader } from '@/components/ui/card'
import { Badge } from '@/components/ui/badge'
import { Button } from '@/components/ui/button'
import { formatPrice } from '@/lib/utils'
import { Phone } from 'lucide-react'
import { CONTACT_INFO } from '@/lib/constants'

interface ProductCardProps {
  id: string
  name: string
  slug: string
  price: number
  originalPrice?: number
  brand: string
  horsepower: string
  inverter: boolean
  images: string[]
  phoneNumber?: string // Optional phone number passed from parent
}

export function ProductCard({
  id,
  name,
  slug,
  price,
  originalPrice,
  brand,
  horsepower,
  inverter,
  images,
  phoneNumber = CONTACT_INFO.phone, // Default fallback
}: ProductCardProps) {
  const displayPhone = phoneNumber

  const discount = originalPrice
    ? Math.round(((originalPrice - price) / originalPrice) * 100)
    : 0

  return (
    <Card className="group hover:shadow-lg transition-shadow h-full flex flex-col">
      <Link href={`/products/${slug}`}>
        <CardHeader className="p-0 relative">
          <div className="relative aspect-square overflow-hidden rounded-t-lg">
            <Image
              src={images[0] || '/placeholder.jpg'}
              alt={name}
              fill
              className="object-cover group-hover:scale-105 transition-transform duration-300"
              sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw"
            />
            {discount > 0 && (
              <Badge className="absolute top-2 right-2 bg-red-500">
                -{discount}%
              </Badge>
            )}
            {inverter && (
              <Badge variant="secondary" className="absolute top-2 left-2">
                Inverter
              </Badge>
            )}
          </div>
        </CardHeader>
      </Link>
      <CardContent className="p-4 flex-1">
        <Link href={`/products/${slug}`}>
          <h3 className="font-semibold text-base sm:text-lg mb-2 hover:text-primary transition-colors line-clamp-2 min-h-[3rem]">
            {name}
          </h3>
        </Link>
        <div className="flex flex-wrap items-center gap-2 mb-2">
          <Badge variant="outline" className="text-xs">{brand}</Badge>
          <Badge variant="outline" className="text-xs">{horsepower}</Badge>
        </div>
        <div className="flex flex-wrap items-baseline gap-2 mb-4">
          <span className="text-xl sm:text-2xl font-bold text-primary">
            {formatPrice(price)}
          </span>
          {originalPrice && (
            <span className="text-sm text-muted-foreground line-through">
              {formatPrice(originalPrice)}
            </span>
          )}
        </div>
      </CardContent>
      <CardFooter className="p-4 pt-0 flex gap-2">
        <Button asChild className="flex-1 text-sm" size="sm">
          <Link href={`/products/${slug}`}>Xem chi tiết</Link>
        </Button>
        <Button asChild variant="outline" size="sm" className="px-3">
          <a href={`tel:${displayPhone}`} aria-label="Gọi điện">
            <Phone className="h-4 w-4" />
          </a>
        </Button>
      </CardFooter>
    </Card>
  )
}
