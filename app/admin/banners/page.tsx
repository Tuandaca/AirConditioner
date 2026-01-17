import { prisma } from '@/lib/prisma'
import { Button } from '@/components/ui/button'
import { Card, CardContent } from '@/components/ui/card'
import { Badge } from '@/components/ui/badge'
import Link from 'next/link'
import { Plus } from 'lucide-react'
import { BannerActions } from '@/components/admin/banner-actions'
import Image from 'next/image'

export const dynamic = 'force-dynamic'

export default async function AdminBannersPage() {
    const banners = await prisma.banner.findMany({
        orderBy: { order: 'asc' },
    })

    return (
        <div>
            <div className="flex items-center justify-between mb-8">
                <h1 className="text-3xl font-bold">Quản lý Banners</h1>
                <Button asChild>
                    <Link href="/admin/banners/new">
                        <Plus className="mr-2 h-4 w-4" />
                        Thêm banner
                    </Link>
                </Button>
            </div>

            <div className="grid gap-4">
                {banners.length === 0 ? (
                    <Card>
                        <CardContent className="py-12 text-center">
                            <p className="text-muted-foreground mb-4">
                                Chưa có banner nào
                            </p>
                            <Button asChild>
                                <Link href="/admin/banners/new">Thêm banner đầu tiên</Link>
                            </Button>
                        </CardContent>
                    </Card>
                ) : (
                    <div className="space-y-4">
                        {banners.map((banner) => (
                            <Card key={banner.id}>
                                <CardContent className="p-6">
                                    <div className="flex items-start justify-between">
                                        <div className="flex items-center gap-4">
                                            <div className="relative h-24 w-48 rounded-md overflow-hidden bg-muted">
                                                <Image
                                                    src={banner.imageUrl}
                                                    alt={banner.title || 'Banner'}
                                                    fill
                                                    className="object-cover"
                                                />
                                            </div>
                                            <div>
                                                <div className="flex items-center gap-2 mb-2">
                                                    <h3 className="text-lg font-semibold">{banner.title || 'Banner không tiêu đề'}</h3>
                                                    <Badge variant={banner.active ? 'default' : 'secondary'}>
                                                        {banner.active ? 'Hiển thị' : 'Ẩn'}
                                                    </Badge>
                                                </div>
                                                <div className="text-sm text-muted-foreground">
                                                    Thứ tự: {banner.order} • Link: {banner.link || 'Không có'}
                                                </div>
                                            </div>
                                        </div>
                                        <div className="flex items-center gap-2">
                                            <BannerActions bannerId={banner.id} />
                                        </div>
                                    </div>
                                </CardContent>
                            </Card>
                        ))}
                    </div>
                )}
            </div>
        </div>
    )
}
