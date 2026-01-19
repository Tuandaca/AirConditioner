import Link from 'next/link'
import { Button } from '@/components/ui/button'
import { Plus } from 'lucide-react'
import { prisma } from '@/lib/prisma'
import { Badge } from '@/components/ui/badge'

export const dynamic = 'force-dynamic'

export default async function BrandsPage() {
    const brands = await prisma.brand.findMany({
        orderBy: [{ order: 'asc' }, { name: 'asc' }],
    })

    return (
        <div className="space-y-6">
            <div className="flex items-center justify-between">
                <div>
                    <h1 className="text-3xl font-bold">Quản lý Hãng</h1>
                    <p className="text-muted-foreground">Quản lý các hãng điều hòa</p>
                </div>
                <Button asChild>
                    <Link href="/admin/brands/new">
                        <Plus className="mr-2 h-4 w-4" />
                        Thêm hãng
                    </Link>
                </Button>
            </div>

            <div className="border rounded-lg">
                <table className="w-full">
                    <thead>
                        <tr className="border-b bg-muted/50">
                            <th className="text-left p-4 font-medium">Tên hãng</th>
                            <th className="text-left p-4 font-medium">Slug</th>
                            <th className="text-left p-4 font-medium">Thứ tự</th>
                            <th className="text-left p-4 font-medium">Trạng thái</th>
                            <th className="text-right p-4 font-medium">Thao tác</th>
                        </tr>
                    </thead>
                    <tbody>
                        {brands.length === 0 ? (
                            <tr>
                                <td colSpan={5} className="text-center p-8 text-muted-foreground">
                                    Chưa có hãng nào. Hãy thêm hãng đầu tiên!
                                </td>
                            </tr>
                        ) : (
                            brands.map((brand) => (
                                <tr key={brand.id} className="border-b hover:bg-muted/50">
                                    <td className="p-4 font-medium">{brand.name}</td>
                                    <td className="p-4 text-muted-foreground">{brand.slug}</td>
                                    <td className="p-4">{brand.order}</td>
                                    <td className="p-4">
                                        {brand.active ? (
                                            <Badge variant="default">Kích hoạt</Badge>
                                        ) : (
                                            <Badge variant="secondary">Tạm ẩn</Badge>
                                        )}
                                    </td>
                                    <td className="p-4 text-right">
                                        <Button asChild variant="outline" size="sm">
                                            <Link href={`/admin/brands/${brand.id}`}>
                                                Sửa
                                            </Link>
                                        </Button>
                                    </td>
                                </tr>
                            ))
                        )}
                    </tbody>
                </table>
            </div>
        </div>
    )
}
