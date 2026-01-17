import Link from 'next/link'
import { Button } from '@/components/ui/button'
import { Phone } from 'lucide-react'
import { getSiteSettings } from '@/lib/settings'
import { ModeToggle } from '@/components/mode-toggle'

export async function Navbar() {
  const settings = await getSiteSettings()

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
            <a href={`tel:${settings.phoneNumber}`} className="flex items-center gap-2">
              <Phone className="h-4 w-4" />
              <span className="hidden sm:inline text-sm">{settings.phoneNumber}</span>
            </a>
          </Button>
          <ModeToggle />
        </div>
      </div>
    </nav>
  )
}
