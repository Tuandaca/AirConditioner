import Link from 'next/link'
import { Button } from '@/components/ui/button'
import { ArrowLeft } from 'lucide-react'

export default function NotFound() {
  return (
    <div className="min-h-screen pt-24 pb-12 flex items-center justify-center bg-gray-50">
      <div className="text-center px-4">
        <h1 className="text-6xl font-bold text-gray-900 mb-4">404</h1>
        <h2 className="text-2xl font-semibold text-gray-700 mb-4">
          Không tìm thấy sản phẩm
        </h2>
        <p className="text-gray-600 mb-8 max-w-md mx-auto">
          Sản phẩm bạn đang tìm kiếm không tồn tại hoặc đã bị xóa.
        </p>
        <Link href="/products">
          <Button size="lg">
            <ArrowLeft className="h-4 w-4 mr-2" />
            Quay lại danh sách sản phẩm
          </Button>
        </Link>
      </div>
    </div>
  )
}