'use client'

import { useEffect, useState } from 'react'
import { ProductCard } from '@/components/product-card'

interface Product {
  id: string
  name: string
  slug: string
  price: number
  originalPrice?: number
  brand: string
  horsepower: string
  inverter: boolean
  images: string[]
  status: string
}

interface ProductGridProps {
  products: Product[]
}

export function ProductGrid({ products }: ProductGridProps) {
  const [phoneNumber, setPhoneNumber] = useState<string>('')

  useEffect(() => {
    // Fetch phone number from settings
    fetch('/api/settings')
      .then((res) => res.json())
      .then((data) => setPhoneNumber(data.phoneNumber))
      .catch(() => setPhoneNumber('0917940833'))
  }, [])

  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 md:gap-6">
      {products.map((product) => (
        <ProductCard
          key={product.id}
          id={product.id}
          name={product.name}
          slug={product.slug}
          price={product.price}
          originalPrice={product.originalPrice}
          brand={product.brand}
          horsepower={product.horsepower}
          inverter={product.inverter}
          images={product.images}
          phoneNumber={phoneNumber}
        />
      ))}
    </div>
  )
}
