'use client'

import { useEffect, useState } from 'react'
import Link from 'next/link'
import { Button } from '@/components/ui/button'
import { Phone } from 'lucide-react'
import { ThemeToggle } from '@/components/theme-toggle'
import { CONTACT_INFO } from '@/lib/constants'

export function Navbar() {
  const [phoneNumber, setPhoneNumber] = useState(CONTACT_INFO.phone)

  useEffect(() => {
    // Fetch settings from API
    fetch('/api/settings')
      .then((res) => res.json())
      .then((data) => {
        if (data.phoneNumber) {
          setPhoneNumber(data.phoneNumber)
        }
      })
      .catch((error) => {
        console.error('Error fetching settings:', error)
        // Keep default value on error
      })
  }, [])

  return (
    <nav className="sticky top-0 z-50 w-full border-b bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
      <div className="container px-4 md:px-6 flex h-14 sm:h-16 items-center justify-between">
        {/* Left: Logo + Phone */}
        <div className="flex items-center gap-4">
          <Link href="/" className="flex items-center space-x-2">
            <span className="text-2xl sm:text-3xl font-bold text-primary">Vỹ - máy lạnh nội địa</span>
          </Link>

          <Button asChild variant="outline" size="sm" className="hidden lg:flex">
            <a href={`tel:${phoneNumber}`} className="flex items-center gap-2">
              <Phone className="h-4 w-4" />
              <span className="text-sm">{phoneNumber}</span>
            </a>
          </Button>
        </div>

        {/* Center: Nav Links */}
        <div className="hidden md:flex items-center space-x-6">
          <Link href="/" className="text-base font-medium transition-colors hover:text-primary">
            Trang chủ
          </Link>
          <Link href="/products" className="text-base font-medium transition-colors hover:text-primary">
            Sản phẩm
          </Link>
        </div>

        {/* Right: Admin + Theme Toggle */}
        <div className="flex items-center space-x-4">
          <Button asChild variant="ghost" size="sm" className="hidden md:flex">
            <Link href="/login">
              Quản trị
            </Link>
          </Button>

          <ThemeToggle />
        </div>
      </div>
    </nav>
  )
}
