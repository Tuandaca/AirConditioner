'use client'

import { useEffect, useState } from 'react'
import Link from 'next/link'
import { Button } from '@/components/ui/button'
import { Phone } from 'lucide-react'
import { ModeToggle } from '@/components/mode-toggle'
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
        <Link href="/" className="flex items-center space-x-2">
          <span className="text-2xl sm:text-3xl font-bold text-primary">Vỹ - máy lạnh nội địa</span>
        </Link>

        <div className="hidden md:flex items-center space-x-6">
          <Link href="/" className="text-base font-medium transition-colors hover:text-primary">
            Trang chủ
          </Link>
          <Link href="/products" className="text-base font-medium transition-colors hover:text-primary">
            Sản phẩm
          </Link>
        </div>

        <div className="flex items-center space-x-4">
          <Button asChild variant="outline" size="sm">
            <a href={`tel:${phoneNumber}`} className="flex items-center gap-2">
              <Phone className="h-4 w-4" />
              <span className="hidden sm:inline text-sm">{phoneNumber}</span>
            </a>
          </Button>
          <ModeToggle />
        </div>
      </div>
    </nav>
  )
}
