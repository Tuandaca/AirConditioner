import type { Metadata } from 'next'
import { Inter } from 'next/font/google'
import './globals.css'
import { Navbar } from '@/components/navbar'
import { Footer } from '@/components/footer'
import { FloatingChat } from '@/components/floating-chat'
import { ThemeProvider } from '@/components/theme-provider'
import { CompareProvider } from '@/lib/compare-context'
import { CompareBar } from '@/components/compare-bar'

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
    <html lang="vi" suppressHydrationWarning>
      <body className={inter.className}>
        <ThemeProvider
          attribute="class"
          defaultTheme="light"
          enableSystem={false}
          disableTransitionOnChange
        >
          <CompareProvider>
            <Navbar />
            <main className="min-h-screen">{children}</main>
            <Footer />
            <CompareBar />
            <FloatingChat />
          </CompareProvider>
        </ThemeProvider>
      </body>
    </html>
  )
}
