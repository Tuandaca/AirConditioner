'use client'

import { Button } from '@/components/ui/button'
import { MessageCircle, Phone, ArrowDown } from 'lucide-react'
import { motion } from 'framer-motion'
import Link from 'next/link'

const ZALO_URL = 'https://zalo.me/0912345678'
const PHONE_NUMBER = 'tel:0912345678'

export function Hero() {
  return (
    <section className="relative min-h-screen flex items-center justify-center bg-gradient-to-br from-blue-50 via-blue-100 to-cyan-100 overflow-hidden">
      {/* Background Pattern */}
      <div className="absolute inset-0 opacity-5">
        <div className="absolute inset-0" style={{
          backgroundImage: 'radial-gradient(circle at 2px 2px, rgb(0,0,0) 1px, transparent 0)',
          backgroundSize: '40px 40px'
        }} />
      </div>

      <div className="container relative z-10 px-4 py-20 md:py-32">
        <div className="max-w-4xl mx-auto text-center">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
          >
            <h1 className="text-4xl md:text-6xl lg:text-7xl font-bold mb-6 text-gray-900 leading-tight">
              Máy lạnh chính hãng
              <span className="block text-primary mt-2">Lắp đặt tận nơi</span>
              <span className="block text-primary mt-2">Bảo hành dài hạn</span>
            </h1>
          </motion.div>

          <motion.p
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.2 }}
            className="text-xl md:text-2xl text-gray-700 mb-8 max-w-2xl mx-auto"
          >
            Tiết kiệm điện • Lắp đặt nhanh • Hỗ trợ kỹ thuật 24/7
          </motion.p>

          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.4 }}
            className="flex flex-col sm:flex-row gap-4 justify-center items-center mb-12"
          >
            <a href={ZALO_URL} target="_blank" rel="noopener noreferrer">
              <Button
                size="lg"
                className="bg-[#0068FF] hover:bg-[#0052CC] text-white px-8 py-6 text-lg h-auto shadow-lg hover:shadow-xl transition-all duration-300 hover:scale-105"
              >
                <MessageCircle className="mr-2 h-5 w-5" />
                Tư vấn Zalo
              </Button>
            </a>
            <a href={PHONE_NUMBER}>
              <Button
                size="lg"
                variant="outline"
                className="bg-white hover:bg-gray-50 text-gray-900 border-2 border-gray-300 px-8 py-6 text-lg h-auto shadow-lg hover:shadow-xl transition-all duration-300 hover:scale-105"
              >
                <Phone className="mr-2 h-5 w-5" />
                Gọi ngay
              </Button>
            </a>
          </motion.div>

          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.8, delay: 0.6 }}
            className="flex flex-wrap justify-center gap-4 text-sm text-gray-600"
          >
            <div className="flex items-center gap-2 bg-white/80 px-4 py-2 rounded-full backdrop-blur-sm">
              <span className="text-green-500">✓</span>
              Chính hãng 100%
            </div>
            <div className="flex items-center gap-2 bg-white/80 px-4 py-2 rounded-full backdrop-blur-sm">
              <span className="text-green-500">✓</span>
              Miễn phí lắp đặt
            </div>
            <div className="flex items-center gap-2 bg-white/80 px-4 py-2 rounded-full backdrop-blur-sm">
              <span className="text-green-500">✓</span>
              Bảo hành 12 tháng
            </div>
          </motion.div>
        </div>

        {/* Scroll Indicator */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 1, delay: 1 }}
          className="absolute bottom-10 left-1/2 -translate-x-1/2"
        >
          <motion.div
            animate={{ y: [0, 10, 0] }}
            transition={{ duration: 2, repeat: Infinity }}
          >
            <ArrowDown className="h-8 w-8 text-gray-400" />
          </motion.div>
        </motion.div>
      </div>
    </section>
  )
}