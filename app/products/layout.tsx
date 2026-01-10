import type { Metadata } from 'next'

export const metadata: Metadata = {
  title: 'Danh sách sản phẩm - Máy lạnh chính hãng',
  description: 'Xem tất cả các sản phẩm máy lạnh chính hãng Daikin, Panasonic, LG, Samsung. Lọc theo hãng, công suất, giá.',
  keywords: 'danh sách máy lạnh, máy lạnh daikin, máy lạnh panasonic, máy lạnh lg, máy lạnh samsung',
}

export default function ProductsLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return <>{children}</>
}