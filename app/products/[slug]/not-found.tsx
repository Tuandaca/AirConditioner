import Link from 'next/link'
import { Button } from '@/components/ui/button'

export default function NotFound() {
  return (
    <div className="container py-16 text-center">
      <h1 className="text-4xl font-bold mb-4">Không tìm thấy sản phẩm</h1>
      <p className="text-muted-foreground mb-8">
        Sản phẩm bạn đang tìm kiếm không tồn tại hoặc đã bị xóa.
      </p>
      <Button asChild>
        <Link href="/products">Quay lại danh sách sản phẩm</Link>
      </Button>
    </div>
  )
}
