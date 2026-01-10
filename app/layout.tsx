import type { Metadata } from 'next'
import { Inter } from 'next/font/google'
import './globals.css'
import { FloatingChat } from '@/components/floating-chat'
import { Footer } from '@/components/footer'
import { Navbar } from '@/components/navbar'

const inter = Inter({ subsets: ['latin', 'vietnamese'], variable: '--font-inter' })

export const metadata: Metadata = {
  title: 'Máy lạnh chính hãng - Lắp đặt tận nơi - Bảo hành dài hạn',
  description: 'Chuyên cung cấp máy lạnh chính hãng Daikin, Panasonic, LG, Samsung. Lắp đặt tận nơi, bảo hành 12 tháng. Giao hàng nhanh, giá tốt nhất thị trường.',
  keywords: 'máy lạnh, điều hòa, daikin, panasonic, lg, samsung, máy lạnh inverter, lắp đặt máy lạnh',
  authors: [{ name: 'Máy lạnh Việt Nam' }],
  openGraph: {
    title: 'Máy lạnh chính hãng - Lắp đặt tận nơi',
    description: 'Chuyên cung cấp máy lạnh chính hãng, lắp đặt tận nơi, bảo hành dài hạn',
    type: 'website',
    locale: 'vi_VN',
  },
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="vi" className={inter.variable}>
      <body className="antialiased">
        <Navbar />
        {children}
        <FloatingChat />
        <Footer />
      </body>
    </html>
  )
}