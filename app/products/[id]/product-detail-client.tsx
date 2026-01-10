'use client'

import { useState } from 'react'
import Image from 'next/image'
import { Product } from '@/types/product'
import { formatPrice } from '@/lib/utils'
import { Button } from '@/components/ui/button'
import { Badge } from '@/components/ui/badge'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { MessageCircle, Phone, Check, ArrowLeft, ChevronLeft, ChevronRight } from 'lucide-react'
import { motion } from 'framer-motion'
import Link from 'next/link'

interface ProductDetailClientProps {
  product: Product
  zaloUrl: string
  phoneNumber: string
}

export function ProductDetailClient({ product, zaloUrl, phoneNumber }: ProductDetailClientProps) {
  const [currentImageIndex, setCurrentImageIndex] = useState(0)

  const nextImage = () => {
    setCurrentImageIndex((prev) => (prev + 1) % product.images.length)
  }

  const prevImage = () => {
    setCurrentImageIndex((prev) => (prev - 1 + product.images.length) % product.images.length)
  }

  return (
    <div className="min-h-screen pt-24 pb-12 bg-gray-50">
      <div className="container px-4">
        <Link href="/products">
          <Button variant="ghost" className="mb-6">
            <ArrowLeft className="h-4 w-4 mr-2" />
            Quay lại danh sách
          </Button>
        </Link>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 mb-12">
          {/* Image Gallery */}
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.5 }}
          >
            <Card className="overflow-hidden">
              <div className="relative aspect-square bg-gray-100">
                <Image
                  src={product.images[currentImageIndex]}
                  alt={product.name}
                  fill
                  className="object-cover"
                  sizes="(max-width: 1024px) 100vw, 50vw"
                  priority
                />
                {product.images.length > 1 && (
                  <>
                    <button
                      onClick={prevImage}
                      className="absolute left-4 top-1/2 -translate-y-1/2 bg-white/80 hover:bg-white rounded-full p-2 shadow-lg transition-all"
                      aria-label="Previous image"
                    >
                      <ChevronLeft className="h-6 w-6" />
                    </button>
                    <button
                      onClick={nextImage}
                      className="absolute right-4 top-1/2 -translate-y-1/2 bg-white/80 hover:bg-white rounded-full p-2 shadow-lg transition-all"
                      aria-label="Next image"
                    >
                      <ChevronRight className="h-6 w-6" />
                    </button>
                  </>
                )}
              </div>
              {/* Thumbnail Navigation */}
              {product.images.length > 1 && (
                <div className="p-4 grid grid-cols-4 gap-2">
                  {product.images.map((image, index) => (
                    <button
                      key={index}
                      onClick={() => setCurrentImageIndex(index)}
                      className={`relative aspect-square rounded-lg overflow-hidden border-2 transition-all ${
                        currentImageIndex === index
                          ? 'border-primary ring-2 ring-primary ring-offset-2'
                          : 'border-transparent hover:border-gray-300'
                      }`}
                    >
                      <Image
                        src={image}
                        alt={`${product.name} ${index + 1}`}
                        fill
                        className="object-cover"
                        sizes="(max-width: 1024px) 25vw, 12.5vw"
                      />
                    </button>
                  ))}
                </div>
              )}
            </Card>
          </motion.div>

          {/* Product Info */}
          <motion.div
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.5, delay: 0.2 }}
            className="space-y-6"
          >
            <div>
              <div className="flex items-center gap-2 mb-4">
                <Badge variant="outline" className="text-sm">
                  {product.brand.toUpperCase()}
                </Badge>
                <Badge variant="secondary" className="text-sm">
                  {product.horsepower}
                </Badge>
                {product.inverter && (
                  <Badge className="bg-primary text-sm">Inverter</Badge>
                )}
              </div>
              <h1 className="text-3xl md:text-4xl font-bold mb-4 text-gray-900">
                {product.name}
              </h1>
              <p className="text-lg text-gray-600 leading-relaxed">
                {product.description}
              </p>
            </div>

            {/* Price */}
            <div className="bg-gradient-to-br from-blue-50 to-cyan-50 rounded-xl p-6">
              {product.originalPrice && (
                <p className="text-lg text-gray-500 line-through mb-2">
                  {formatPrice(product.originalPrice)}
                </p>
              )}
              <p className="text-4xl md:text-5xl font-bold text-primary mb-2">
                {formatPrice(product.price)}
              </p>
              {product.originalPrice && (
                <p className="text-sm text-green-600 font-semibold">
                  Tiết kiệm {formatPrice(product.originalPrice - product.price)}
                </p>
              )}
            </div>

            {/* Key Benefits */}
            <Card>
              <CardHeader>
                <CardTitle>Lợi ích nổi bật</CardTitle>
              </CardHeader>
              <CardContent>
                <ul className="space-y-3">
                  {product.benefits.map((benefit, index) => (
                    <li key={index} className="flex items-start gap-3">
                      <Check className="h-5 w-5 text-green-500 mt-0.5 flex-shrink-0" />
                      <span className="text-gray-700">{benefit}</span>
                    </li>
                  ))}
                </ul>
              </CardContent>
            </Card>

            {/* CTA Buttons */}
            <div className="space-y-4 pt-6">
              <a href={zaloUrl} target="_blank" rel="noopener noreferrer" className="block group">
                <div className="relative w-full bg-gradient-to-r from-[#0068FF] to-[#0052CC] hover:from-[#0052CC] hover:to-[#0040A0] text-white font-semibold h-16 text-lg rounded-xl shadow-lg hover:shadow-2xl transition-all duration-300 hover:scale-[1.02] hover:-translate-y-0.5 flex items-center justify-between px-6 cursor-pointer overflow-hidden">
                  <div className="absolute inset-0 bg-gradient-to-r from-white/0 via-white/10 to-white/0 opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
                  <div className="flex items-center z-10">
                    <MessageCircle className="h-6 w-6 mr-3 group-hover:scale-110 transition-transform duration-300" />
                    <span>Chat Zalo tư vấn</span>
                  </div>
                  <span className="text-xl opacity-80 group-hover:opacity-100 group-hover:translate-x-1 transition-all duration-300 z-10">→</span>
                </div>
              </a>
              <a href={phoneNumber} className="block group">
                <div className="relative w-full bg-gradient-to-r from-green-600 to-green-700 hover:from-green-700 hover:to-green-800 text-white font-semibold h-16 text-lg rounded-xl shadow-lg hover:shadow-2xl transition-all duration-300 hover:scale-[1.02] hover:-translate-y-0.5 flex items-center justify-between px-6 cursor-pointer overflow-hidden">
                  <div className="absolute inset-0 bg-gradient-to-r from-white/0 via-white/10 to-white/0 opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
                  <div className="flex items-center z-10">
                    <Phone className="h-6 w-6 mr-3 group-hover:scale-110 transition-transform duration-300" />
                    <span>Gọi ngay: 0912 345 678</span>
                  </div>
                  <span className="text-xl opacity-80 group-hover:opacity-100 group-hover:translate-x-1 transition-all duration-300 z-10">→</span>
                </div>
              </a>
            </div>
          </motion.div>
        </div>

        {/* Specifications Table */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.4 }}
        >
          <Card className="mb-12">
            <CardHeader>
              <CardTitle>Thông số kỹ thuật</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="overflow-x-auto">
                <table className="w-full border-collapse">
                  <tbody className="divide-y">
                    {product.specifications.capacity && (
                      <tr className="hover:bg-gray-50">
                        <td className="py-3 px-4 font-semibold text-gray-700 w-1/3">
                          Công suất làm lạnh
                        </td>
                        <td className="py-3 px-4 text-gray-600">{product.specifications.capacity}</td>
                      </tr>
                    )}
                    {product.specifications.powerConsumption && (
                      <tr className="hover:bg-gray-50">
                        <td className="py-3 px-4 font-semibold text-gray-700">Tiêu thụ điện</td>
                        <td className="py-3 px-4 text-gray-600">{product.specifications.powerConsumption}</td>
                      </tr>
                    )}
                    {product.specifications.refrigerant && (
                      <tr className="hover:bg-gray-50">
                        <td className="py-3 px-4 font-semibold text-gray-700">Gas sử dụng</td>
                        <td className="py-3 px-4 text-gray-600">{product.specifications.refrigerant}</td>
                      </tr>
                    )}
                    {product.specifications.dimensions && (
                      <tr className="hover:bg-gray-50">
                        <td className="py-3 px-4 font-semibold text-gray-700">Kích thước</td>
                        <td className="py-3 px-4 text-gray-600">{product.specifications.dimensions}</td>
                      </tr>
                    )}
                    {product.specifications.weight && (
                      <tr className="hover:bg-gray-50">
                        <td className="py-3 px-4 font-semibold text-gray-700">Trọng lượng</td>
                        <td className="py-3 px-4 text-gray-600">{product.specifications.weight}</td>
                      </tr>
                    )}
                    {product.specifications.noiseLevel && (
                      <tr className="hover:bg-gray-50">
                        <td className="py-3 px-4 font-semibold text-gray-700">Độ ồn</td>
                        <td className="py-3 px-4 text-gray-600">{product.specifications.noiseLevel}</td>
                      </tr>
                    )}
                    {product.specifications.warranty && (
                      <tr className="hover:bg-gray-50">
                        <td className="py-3 px-4 font-semibold text-gray-700">Bảo hành</td>
                        <td className="py-3 px-4 text-gray-600">{product.specifications.warranty}</td>
                      </tr>
                    )}
                  </tbody>
                </table>
              </div>
            </CardContent>
          </Card>
        </motion.div>

        {/* Guarantees Section */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.6 }}
          className="grid grid-cols-1 md:grid-cols-3 gap-6"
        >
          <Card className="text-center">
            <CardContent className="pt-6">
              <div className="w-16 h-16 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-4">
                <Check className="h-8 w-8 text-green-600" />
              </div>
              <h3 className="font-semibold text-lg mb-2">Chính hãng 100%</h3>
              <p className="text-sm text-gray-600">
                Sản phẩm chính hãng, có đầy đủ giấy tờ chứng nhận
              </p>
            </CardContent>
          </Card>
          <Card className="text-center">
            <CardContent className="pt-6">
              <div className="w-16 h-16 bg-blue-100 rounded-full flex items-center justify-center mx-auto mb-4">
                <Phone className="h-8 w-8 text-blue-600" />
              </div>
              <h3 className="font-semibold text-lg mb-2">Lắp đặt tận nơi</h3>
              <p className="text-sm text-gray-600">
                Miễn phí lắp đặt trong khu vực TP.HCM và Hà Nội
              </p>
            </CardContent>
          </Card>
          <Card className="text-center">
            <CardContent className="pt-6">
              <div className="w-16 h-16 bg-purple-100 rounded-full flex items-center justify-center mx-auto mb-4">
                <MessageCircle className="h-8 w-8 text-purple-600" />
              </div>
              <h3 className="font-semibold text-lg mb-2">Hỗ trợ kỹ thuật</h3>
              <p className="text-sm text-gray-600">
                Hỗ trợ kỹ thuật trọn đời, sửa chữa nhanh chóng
              </p>
            </CardContent>
          </Card>
        </motion.div>
      </div>
    </div>
  )
}