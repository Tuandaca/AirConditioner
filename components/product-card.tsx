'use client'

import Link from 'next/link'
import Image from 'next/image'
import { Badge } from '@/components/ui/badge'
import { Button } from '@/components/ui/button'
import { formatPrice, cn } from '@/lib/utils'
import { Phone, Check } from 'lucide-react'
import { Checkbox } from '@/components/ui/checkbox'
import { useCompare } from '@/lib/compare-context'
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
  phoneNumber?: string
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
  phoneNumber = CONTACT_INFO.phone,
}: ProductCardProps) {
  const discount = originalPrice ? Math.round(((originalPrice - price) / originalPrice) * 100) : 0
  const { isInCompare, addItem, removeItem } = useCompare()
  const isSelected = isInCompare(id)

  const handleCompareChange = (checked: boolean) => {
    if (checked) {
      addItem({
        id,
        name,
        slug,
        image: images[0],
        price,
        brand
      })
    } else {
      removeItem(id)
    }
  }

  return (
    <div className="group relative bg-card border rounded-lg overflow-hidden flex flex-col hover:shadow-lg transition-shadow">
      <Link href={`/products/${slug}`} className="aspect-square relative block overflow-hidden">
        <div className="relative aspect-square overflow-hidden rounded-t-lg bg-muted">
          {images && images.length > 0 ? (
            <Image
              src={images[0]}
              alt={name}
              fill
              className="object-cover transition-transform hover:scale-105"
              sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
            />
          ) : (
            <div className="flex h-full items-center justify-center bg-muted">
              <p className="text-sm text-muted-foreground">Chưa cập nhật ảnh</p>
            </div>
          )}
        </div>
        {discount > 0 && (
          <div className="absolute top-2 right-2 bg-destructive text-destructive-foreground text-xs font-bold px-2 py-1 rounded">
            -{discount}%
          </div>
        )}
        {inverter && (
          <div className="absolute top-2 left-2 bg-primary text-primary-foreground text-xs font-bold px-2 py-1 rounded">
            Inverter
          </div>
        )}
      </Link>

      <div className="p-4 flex flex-col flex-1">
        <div className="mb-2 flex items-center gap-2">
          <Badge variant="outline" className="text-xs">{brand}</Badge>
          <Badge variant="outline" className="text-xs">{horsepower}</Badge>
        </div>

        <Link href={`/products/${slug}`} className="flex-1">
          <h3 className="font-semibold text-base mb-2 line-clamp-2 group-hover:text-primary transition-colors">
            {name}
          </h3>
        </Link>

        <div className="mt-2 space-y-2">
          <div className="flex items-baseline gap-2">
            <span className="text-lg font-bold text-primary">{formatPrice(price)}</span>
            {originalPrice && (
              <span className="text-sm text-muted-foreground line-through">
                {formatPrice(originalPrice)}
              </span>
            )}
          </div>

          <div className="grid grid-cols-2 gap-2">
            <Button asChild size="sm" variant="secondary" className="w-full">
              <a href={`tel:${phoneNumber}`} className="flex items-center justify-center gap-1.5">
                <Phone className="h-3.5 w-3.5" />
                <span>Liên hệ</span>
              </a>
            </Button>
            <div className="flex items-center justify-center gap-2 border rounded-md px-2 bg-background/50">
              <Checkbox
                id={`compare-${id}`}
                checked={isSelected}
                onCheckedChange={(c) => handleCompareChange(c as boolean)}
              />
              <label
                htmlFor={`compare-${id}`}
                className="text-xs font-medium cursor-pointer select-none"
              >
                So sánh
              </label>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
