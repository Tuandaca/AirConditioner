'use client'

import Image from 'next/image'
import Link from 'next/link'
import { Card, CardContent, CardFooter, CardHeader } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { Badge } from '@/components/ui/badge'
import { Product } from '@/types/product'
import { formatPrice } from '@/lib/utils'
import { ChevronRight } from 'lucide-react'
import { motion } from 'framer-motion'

interface ProductCardProps {
  product: Product
  index?: number
}

export function ProductCard({ product, index = 0 }: ProductCardProps) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.5, delay: index * 0.1 }}
    >
      <Card className="group overflow-hidden hover:shadow-xl transition-all duration-300 h-full flex flex-col">
        <Link href={`/products/${product.id}`}>
          <div className="relative h-64 overflow-hidden bg-gray-100">
            <Image
              src={product.images[0]}
              alt={product.name}
              fill
              className="object-cover group-hover:scale-110 transition-transform duration-500"
              sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
              loading="lazy"
            />
            {product.originalPrice && (
              <Badge className="absolute top-2 right-2 bg-red-500">
                -{Math.round(((product.originalPrice - product.price) / product.originalPrice) * 100)}%
              </Badge>
            )}
            {product.inverter && (
              <Badge variant="secondary" className="absolute top-2 left-2">
                Inverter
              </Badge>
            )}
          </div>
        </Link>
        <CardHeader>
          <div className="flex items-center justify-between mb-2">
            <Badge variant="outline" className="text-xs">
              {product.brand.toUpperCase()}
            </Badge>
            <Badge variant="secondary" className="text-xs">
              {product.horsepower}
            </Badge>
          </div>
          <h3 className="font-semibold text-lg line-clamp-2 min-h-[3.5rem] group-hover:text-primary transition-colors">
            {product.name}
          </h3>
        </CardHeader>
        <CardContent className="flex-1">
          <div className="space-y-2">
            {product.originalPrice && (
              <p className="text-sm text-muted-foreground line-through">
                {formatPrice(product.originalPrice)}
              </p>
            )}
            <p className="text-2xl font-bold text-primary">
              {formatPrice(product.price)}
            </p>
            <p className="text-sm text-muted-foreground line-clamp-2">
              {product.description}
            </p>
          </div>
        </CardContent>
        <CardFooter className="pt-4">
          <Link href={`/products/${product.id}`} className="w-full">
            <Button className="w-full group/btn" size="lg">
              Xem chi tiết
              <ChevronRight className="ml-2 h-4 w-4 group-hover/btn:translate-x-1 transition-transform" />
            </Button>
          </Link>
        </CardFooter>
      </Card>
    </motion.div>
  )
}