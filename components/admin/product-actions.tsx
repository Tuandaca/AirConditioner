'use client'

import { useState } from 'react'
import { useRouter } from 'next/navigation'
import { Button } from '@/components/ui/button'
import { Trash2 } from 'lucide-react'

interface ProductActionsProps {
  productId: string
}

export function ProductActions({ productId }: ProductActionsProps) {
  const router = useRouter()
  const [loading, setLoading] = useState(false)

  const handleDelete = async () => {
    if (!confirm('Bạn có chắc chắn muốn xóa sản phẩm này?')) {
      return
    }

    setLoading(true)
    try {
      const response = await fetch(`/api/admin/products/${productId}`, {
        method: 'DELETE',
      })

      if (response.ok) {
        router.refresh()
      } else {
        alert('Có lỗi xảy ra khi xóa sản phẩm')
      }
    } catch (error) {
      alert('Có lỗi xảy ra khi xóa sản phẩm')
    } finally {
      setLoading(false)
    }
  }

  return (
    <Button
      variant="destructive"
      size="sm"
      onClick={handleDelete}
      disabled={loading}
    >
      <Trash2 className="h-4 w-4" />
    </Button>
  )
}
