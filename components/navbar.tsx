'use client'

import Link from 'next/link'
import { Button } from '@/components/ui/button'
import { MessageCircle, Phone } from 'lucide-react'
import { useState, useEffect } from 'react'
import { motion } from 'framer-motion'

const ZALO_URL = 'https://zalo.me/0912345678'
const PHONE_NUMBER = 'tel:0912345678'

export function Navbar() {
  const [scrolled, setScrolled] = useState(false)

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 20)
    }
    window.addEventListener('scroll', handleScroll)
    return () => window.removeEventListener('scroll', handleScroll)
  }, [])

  return (
    <motion.nav
      initial={{ y: -100 }}
      animate={{ y: 0 }}
      transition={{ duration: 0.5 }}
      className={`fixed top-0 left-0 right-0 z-40 transition-all duration-300 ${
        scrolled ? 'bg-white/95 backdrop-blur-md shadow-lg' : 'bg-transparent'
      }`}
    >
      <div className="container px-4">
        <div className="flex items-center justify-between h-16 md:h-20">
          <Link href="/" className="font-bold text-xl md:text-2xl text-gray-900 hover:text-primary transition-colors">
            ❄️ Máy Lạnh
          </Link>
          
          <div className="hidden md:flex items-center gap-6">
            <Link href="/" className="text-gray-700 hover:text-primary transition-colors font-medium">
              Trang chủ
            </Link>
            <Link href="/products" className="text-gray-700 hover:text-primary transition-colors font-medium">
              Sản phẩm
            </Link>
          </div>

          <div className="flex items-center gap-2">
            <a href={ZALO_URL} target="_blank" rel="noopener noreferrer" className="hidden sm:block">
              <Button size="sm" variant="outline" className="border-[#0068FF] text-[#0068FF] hover:bg-[#0068FF] hover:text-white">
                <MessageCircle className="h-4 w-4 mr-2" />
                Zalo
              </Button>
            </a>
            <a href={PHONE_NUMBER}>
              <Button size="sm" className="bg-green-600 hover:bg-green-700 text-white hover:text-white">
                <Phone className="h-4 w-4 mr-2" />
                <span className="hidden sm:inline">Gọi ngay</span>
                <span className="sm:hidden">Call</span>
              </Button>
            </a>
          </div>
        </div>
      </div>
    </motion.nav>
  )
}