'use client'

import { useEffect, useState } from 'react'
import Link from 'next/link'
import { getZaloChatUrl } from '@/lib/settings'
import { CONTACT_INFO } from '@/lib/constants'

export function Footer() {
  const [settings, setSettings] = useState({
    phoneNumber: CONTACT_INFO.phone,
    zaloNumber: CONTACT_INFO.zalo,
    facebookUrl: CONTACT_INFO.facebook,
  })

  useEffect(() => {
    // Fetch settings from API
    fetch('/api/settings')
      .then((res) => res.json())
      .then((data) => {
        if (data) {
          setSettings(data)
        }
      })
      .catch((error) => {
        console.error('Error fetching settings:', error)
        // Keep default values on error
      })
  }, [])

  return (
    <footer className="border-t bg-muted/50">
      <div className="container px-4 md:px-6 py-8 md:py-12">
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-6 md:gap-8">
          <div>
            <h3 className="text-lg font-semibold mb-4">AC Store</h3>
            <p className="text-sm text-muted-foreground">
              Chuyên cung cấp điều hòa chính hãng với giá tốt nhất thị trường.
            </p>
          </div>

          <div>
            <h4 className="font-semibold mb-4">Sản phẩm</h4>
            <ul className="space-y-2 text-sm">
              <li>
                <Link href="/products?brand=Daikin" className="text-muted-foreground hover:text-primary">
                  Daikin
                </Link>
              </li>
              <li>
                <Link href="/products?brand=Mitsubishi Electric" className="text-muted-foreground hover:text-primary">
                  Mitsubishi Electric
                </Link>
              </li>
              <li>
                <Link href="/products?brand=Panasonic" className="text-muted-foreground hover:text-primary">
                  Panasonic
                </Link>
              </li>
            </ul>
          </div>

          <div>
            <h4 className="font-semibold mb-4">Liên hệ</h4>
            <ul className="space-y-2 text-sm text-muted-foreground">
              <li>
                <a href={`tel:${settings.phoneNumber}`} className="hover:text-primary">
                  Hotline: {settings.phoneNumber}
                </a>
              </li>
              <li>Giờ làm việc: 8:00 - 20:00</li>
            </ul>
          </div>

          <div>
            <h4 className="font-semibold mb-4">Theo dõi</h4>
            <ul className="space-y-2 text-sm">
              <li>
                <a href={settings.facebookUrl} target="_blank" rel="noopener noreferrer" className="text-muted-foreground hover:text-primary">
                  Facebook
                </a>
              </li>
              <li>
                <a href={getZaloChatUrl(settings.zaloNumber)} target="_blank" rel="noopener noreferrer" className="text-muted-foreground hover:text-primary">
                  Zalo
                </a>
              </li>
            </ul>
          </div>
        </div>

        <div className="mt-8 pt-8 border-t text-center text-sm text-muted-foreground">
          <p>&copy; 2024 AC Store. All rights reserved.</p>
        </div>
      </div>
    </footer>
  )
}
