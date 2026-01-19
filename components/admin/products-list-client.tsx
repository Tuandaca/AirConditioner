'use client'

import { useState } from 'react'
import { Button } from '@/components/ui/button'
import { Card, CardContent } from '@/components/ui/card'
import { Badge } from '@/components/ui/badge'
import { formatPrice } from '@/lib/utils'
import Link from 'next/link'
import { Plus, Edit, Trash2, Star, Save } from 'lucide-react'
import {
    Select,
    SelectContent,
    SelectItem,
    SelectTrigger,
    SelectValue,
} from '@/components/ui/select'
import { ConfirmDialog } from '@/components/ui/confirm-dialog'
import { toast } from 'sonner'
import { useRouter } from 'next/navigation'

interface Product {
    id: string
    name: string
    brand: string
    horsepower: string
    inverter: boolean
    price: number
    originalPrice: number | null
    status: string
    featured: boolean
}

interface ProductsListClientProps {
    products: Product[]
}

export function ProductsListClient({ products }: ProductsListClientProps) {
    const router = useRouter()
    const [changes, setChanges] = useState<Record<string, { status?: string; featured?: boolean }>>({})
    const [deleteId, setDeleteId] = useState<string | null>(null)
    const [saving, setSaving] = useState(false)

    const handleStatusChange = (productId: string, newStatus: string) => {
        setChanges(prev => ({
            ...prev,
            [productId]: { ...prev[productId], status: newStatus }
        }))
    }

    const handleFeaturedToggle = (productId: string, currentFeatured: boolean) => {
        setChanges(prev => ({
            ...prev,
            [productId]: { ...prev[productId], featured: !currentFeatured }
        }))
    }

    const handleSaveAll = async () => {
        if (Object.keys(changes).length === 0) {
            toast.info('Không có thay đổi nào để lưu')
            return
        }

        setSaving(true)
        try {
            const updates = Object.entries(changes).map(([productId, data]) =>
                fetch(`/api/admin/products/${productId}`, {
                    method: 'PATCH',
                    headers: { 'Content-Type': 'application/json' },
                    body: JSON.stringify(data),
                })
            )

            await Promise.all(updates)

            toast.success(`Đã lưu ${Object.keys(changes).length} sản phẩm`)
            setChanges({})
            router.refresh()
        } catch (error) {
            toast.error('Có lỗi xảy ra khi lưu')
        } finally {
            setSaving(false)
        }
    }

    const handleDelete = async (productId: string) => {
        try {
            const response = await fetch(`/api/admin/products/${productId}`, {
                method: 'DELETE',
            })

            if (response.ok) {
                toast.success('Đã xóa sản phẩm')
                router.refresh()
            } else {
                toast.error('Có lỗi xảy ra')
            }
        } catch (error) {
            toast.error('Có lỗi xảy ra')
        }
        setDeleteId(null)
    }

    const hasChanges = Object.keys(changes).length > 0

    return (
        <>
            <div className="flex items-center justify-between mb-8">
                <h1 className="text-3xl font-bold">Quản lý sản phẩm</h1>
                <div className="flex gap-2">
                    {hasChanges && (
                        <Button
                            onClick={handleSaveAll}
                            disabled={saving}
                            className="bg-green-600 hover:bg-green-700"
                        >
                            <Save className="mr-2 h-4 w-4" />
                            Lưu ({Object.keys(changes).length})
                        </Button>
                    )}
                    <Button asChild>
                        <Link href="/admin/products/new">
                            <Plus className="mr-2 h-4 w-4" />
                            Thêm sản phẩm
                        </Link>
                    </Button>
                </div>
            </div>

            <div className="grid gap-4">
                {products.length === 0 ? (
                    <Card>
                        <CardContent className="py-12 text-center">
                            <p className="text-muted-foreground mb-4">Chưa có sản phẩm nào</p>
                            <Button asChild>
                                <Link href="/admin/products/new">Thêm sản phẩm đầu tiên</Link>
                            </Button>
                        </CardContent>
                    </Card>
                ) : (
                    <div className="space-y-4">
                        {products.map((product) => {
                            const currentStatus = changes[product.id]?.status ?? product.status
                            const currentFeatured = changes[product.id]?.featured ?? product.featured
                            const hasProductChanges = !!changes[product.id]

                            return (
                                <Card key={product.id} className={hasProductChanges ? 'ring-2 ring-green-500' : ''}>
                                    <CardContent className="p-6">
                                        <div className="flex items-start justify-between">
                                            <div className="flex-1">
                                                <div className="flex items-center gap-2 mb-2">
                                                    <h3 className="text-lg font-semibold">{product.name}</h3>
                                                    <Badge
                                                        variant={
                                                            currentStatus === 'active'
                                                                ? 'default'
                                                                : currentStatus === 'out_of_stock'
                                                                    ? 'destructive'
                                                                    : 'secondary'
                                                        }
                                                    >
                                                        {currentStatus === 'active' ? 'Còn hàng' : currentStatus === 'out_of_stock' ? 'Hết hàng' : 'Ẩn'}
                                                    </Badge>
                                                    {currentFeatured && (
                                                        <Badge variant="outline">Nổi bật</Badge>
                                                    )}
                                                </div>
                                                <div className="flex items-center gap-4 text-sm text-muted-foreground mb-2">
                                                    <span>{product.brand}</span>
                                                    <span>•</span>
                                                    <span>{product.horsepower}</span>
                                                    {product.inverter && (
                                                        <>
                                                            <span>•</span>
                                                            <span>Inverter</span>
                                                        </>
                                                    )}
                                                </div>
                                                <div className="text-lg font-semibold">
                                                    {formatPrice(product.price)}
                                                    {product.originalPrice && (
                                                        <span className="text-sm text-muted-foreground line-through ml-2">
                                                            {formatPrice(product.originalPrice)}
                                                        </span>
                                                    )}
                                                </div>
                                            </div>
                                            <div className="flex items-center gap-2">
                                                {/* Status Dropdown */}
                                                <Select
                                                    value={currentStatus}
                                                    onValueChange={(value) => handleStatusChange(product.id, value)}
                                                >
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
                                                    variant={currentFeatured ? 'default' : 'outline'}
                                                    size="sm"
                                                    onClick={() => handleFeaturedToggle(product.id, currentFeatured)}
                                                >
                                                    <Star className={`h-4 w-4 ${currentFeatured ? 'fill-current' : ''}`} />
                                                </Button>

                                                {/* Edit Button */}
                                                <Button asChild variant="outline" size="sm">
                                                    <Link href={`/admin/products/${product.id}`}>
                                                        <Edit className="h-4 w-4" />
                                                    </Link>
                                                </Button>

                                                {/* Delete Button */}
                                                <Button
                                                    variant="destructive"
                                                    size="sm"
                                                    onClick={() => setDeleteId(product.id)}
                                                >
                                                    <Trash2 className="h-4 w-4" />
                                                </Button>
                                            </div>
                                        </div>
                                    </CardContent>
                                </Card>
                            )
                        })}
                    </div>
                )}
            </div>

            {/* Delete Confirmation */}
            <ConfirmDialog
                open={!!deleteId}
                onOpenChange={(open) => !open && setDeleteId(null)}
                onConfirm={() => deleteId && handleDelete(deleteId)}
                title="Xóa sản phẩm"
                description="Bạn có chắc chắn muốn xóa sản phẩm này? Hành động này không thể hoàn tác."
                confirmText="Xóa"
                cancelText="Hủy"
            />
        </>
    )
}
