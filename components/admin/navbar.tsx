'use client'

import Link from 'next/link'
import { usePathname } from 'next/navigation'
import { signOut } from 'next-auth/react'
import { Button } from '@/components/ui/button'
import { LayoutDashboard, Package, Settings, Image as ImageIcon, LogOut } from 'lucide-react'

export function AdminNavbar() {
  const pathname = usePathname()

  const navItems = [
    { href: '/admin', label: 'Dashboard', icon: LayoutDashboard },
    { href: '/admin/products', label: 'Sản phẩm', icon: Package },
    { href: '/admin/products', label: 'Sản phẩm', icon: Package },
    { href: '/admin/banners', label: 'Banners', icon: ImageIcon },
    { href: '/admin/media', label: 'Media', icon: ImageIcon },
    { href: '/admin/settings', label: 'Cài đặt', icon: Settings },
  ]

  return (
    <nav className="border-b bg-background">
      <div className="container flex h-16 items-center justify-between">
        <div className="flex items-center space-x-8">
          <Link href="/admin" className="font-bold text-xl">
            Admin Panel
          </Link>
          <div className="flex items-center space-x-1">
            {navItems.map((item) => {
              const Icon = item.icon
              const isActive = pathname === item.href ||
                (item.href !== '/admin' && pathname?.startsWith(item.href))

              return (
                <Link
                  key={item.href}
                  href={item.href}
                  className={`flex items-center gap-2 px-4 py-2 rounded-md text-sm font-medium transition-colors ${isActive
                      ? 'bg-primary text-primary-foreground'
                      : 'hover:bg-muted'
                    }`}
                >
                  <Icon className="h-4 w-4" />
                  {item.label}
                </Link>
              )
            })}
          </div>
        </div>
        <Button
          variant="ghost"
          size="sm"
          onClick={() => signOut({ callbackUrl: '/admin/login' })}
        >
          <LogOut className="h-4 w-4 mr-2" />
          Đăng xuất
        </Button>
      </div>
    </nav>
  )
}
