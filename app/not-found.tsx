import Link from 'next/link'
import { Button } from '@/components/ui/button'

export default function NotFound() {
  return (
    <div className="container py-16 text-center">
      <h1 className="text-4xl font-bold mb-4">404 - Trang không tồn tại</h1>
      <p className="text-muted-foreground mb-8">
        Trang bạn đang tìm kiếm không tồn tại.
      </p>
      <Button asChild>
        <Link href="/">Về trang chủ</Link>
      </Button>
    </div>
  )
}
