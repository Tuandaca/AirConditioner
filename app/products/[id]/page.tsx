import { products } from '@/data/products'
import { notFound } from 'next/navigation'
import type { Metadata } from 'next'
import { ProductDetailClient } from './product-detail-client'

const ZALO_URL = 'https://zalo.me/0912345678'
const PHONE_NUMBER = 'tel:0912345678'

interface ProductDetailPageProps {
  params: Promise<{ id: string }>
}

export async function generateMetadata({ params }: ProductDetailPageProps): Promise<Metadata> {
  const { id } = await params
  const product = products.find((p) => p.id === id)

  if (!product) {
    return {
      title: 'Không tìm thấy sản phẩm',
    }
  }

  return {
    title: `${product.name} - Máy lạnh chính hãng`,
    description: product.description,
    keywords: `${product.brand}, máy lạnh ${product.horsepower}, ${product.inverter ? 'inverter' : ''}, ${product.name}`,
    openGraph: {
      title: product.name,
      description: product.description,
      images: product.images,
    },
  }
}

export default async function ProductDetailPage({ params }: ProductDetailPageProps) {
  const { id } = await params
  const product = products.find((p) => p.id === id)

  if (!product) {
    notFound()
  }

  return <ProductDetailClient product={product} zaloUrl={ZALO_URL} phoneNumber={PHONE_NUMBER} />
}