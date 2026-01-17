import type { Metadata } from 'next'
import { Inter } from 'next/font/google'
import './globals.css'
import { Navbar } from '@/components/navbar'
import { Footer } from '@/components/footer'
import { FloatingChat } from '@/components/floating-chat'

const inter = Inter({ subsets: ['latin'] })

export const metadata: Metadata = {
  title: 'Điều Hòa Chính Hãng - Giá Tốt Nhất',
  description: 'Mua điều hòa chính hãng với giá tốt nhất. Daikin, Mitsubishi, Panasonic và nhiều thương hiệu khác.',
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="vi">
      <body className={inter.className}>
        <Navbar />
        <main className="min-h-screen">{children}</main>
        <Footer />
        <FloatingChat />
      </body>
    </html>
  )
}
