'use client'

import { useState } from 'react'
import { useRouter } from 'next/navigation'
import { Button } from '@/components/ui/button'
import { Trash2, Star } from 'lucide-react'
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select'
import { ConfirmDialog } from '@/components/ui/confirm-dialog'
import { toast } from 'sonner'

interface ProductActionsProps {
  productId: string
  currentStatus: string
  currentFeatured: boolean
}

export function ProductActions({ productId, currentStatus, currentFeatured }: ProductActionsProps) {
  const router = useRouter()
  const [loading, setLoading] = useState(false)
  const [showDeleteConfirm, setShowDeleteConfirm] = useState(false)
  const [status, setStatus] = useState(currentStatus)
  const [featured, setFeatured] = useState(currentFeatured)

  const handleStatusChange = async (newStatus: string) => {
    setStatus(newStatus)
    setLoading(true)

    try {
      const response = await fetch(`/api/admin/products/${productId}`, {
        method: 'PATCH',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ status: newStatus }),
      })

      if (response.ok) {
        toast.success('Đã cập nhật trạng thái')
        router.refresh()
      } else {
        toast.error('Có lỗi xảy ra')
        setStatus(currentStatus) // Revert
      }
    } catch (error) {
      toast.error('Có lỗi xảy ra')
      setStatus(currentStatus) // Revert
    } finally {
      setLoading(false)
    }
  }

  const handleFeaturedToggle = async () => {
    const newFeatured = !featured
    setFeatured(newFeatured)
    setLoading(true)

    try {
      const response = await fetch(`/api/admin/products/${productId}`, {
        method: 'PATCH',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ featured: newFeatured }),
      })

      if (response.ok) {
        toast.success(newFeatured ? 'Đã đánh dấu nổi bật' : 'Đã bỏ nổi bật')
        router.refresh()
      } else {
        toast.error('Có lỗi xảy ra')
        setFeatured(!newFeatured) // Revert
      }
    } catch (error) {
      toast.error('Có lỗi xảy ra')
      setFeatured(!newFeatured) // Revert
    } finally {
      setLoading(false)
    }
  }

  const handleDelete = async () => {
    setLoading(true)
    setShowDeleteConfirm(false)

    try {
      const response = await fetch(`/api/admin/products/${productId}`, {
        method: 'DELETE',
      })

      if (response.ok) {
        toast.success('Đã xóa sản phẩm')
        router.refresh()
      } else {
        toast.error('Có lỗi xảy ra khi xóa sản phẩm')
      }
    } catch (error) {
      toast.error('Có lỗi xảy ra khi xóa sản phẩm')
    } finally {
      setLoading(false)
    }
  }

  return (
    <div className="flex items-center gap-2">
      {/* Status Dropdown */}
      <Select value={status} onValueChange={handleStatusChange} disabled={loading}>
        <SelectTrigger className="w-[140px]">
          <SelectValue />
        </SelectTrigger>
        <SelectContent>
          <SelectItem value="active">Còn hàng</SelectItem>
          <SelectItem value="out_of_stock">Hết hàng</SelectItem>
          <SelectItem value="inactive">Ẩn</SelectItem>
        </SelectContent>
      </Select>

      {/* Featured Toggle */}
      <Button
        variant={featured ? 'default' : 'outline'}
        size="sm"
        onClick={handleFeaturedToggle}
        disabled={loading}
      >
        <Star className={`h-4 w-4 ${featured ? 'fill-current' : ''}`} />
      </Button>

      {/* Delete Button */}
      <Button
        variant="destructive"
        size="sm"
        onClick={() => setShowDeleteConfirm(true)}
        disabled={loading}
      >
        <Trash2 className="h-4 w-4" />
      </Button>

      {/* Delete Confirmation Dialog */}
      <ConfirmDialog
        open={showDeleteConfirm}
        onOpenChange={setShowDeleteConfirm}
        onConfirm={handleDelete}
        title="Xóa sản phẩm"
        description="Bạn có chắc chắn muốn xóa sản phẩm này? Hành động này không thể hoàn tác."
        confirmText="Xóa"
        cancelText="Hủy"
      />
    </div>
  )
}
