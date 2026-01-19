import { notFound } from 'next/navigation'
import { prisma } from '@/lib/prisma'
import { BrandForm } from '@/components/admin/brand-form'

export const dynamic = 'force-dynamic'

export default async function EditBrandPage({
    params,
}: {
    params: { id: string }
}) {
    const brand = await prisma.brand.findUnique({
        where: { id: params.id },
    })

    if (!brand) {
        notFound()
    }

    return (
        <div className="space-y-6">
            <div>
                <h1 className="text-3xl font-bold">Sửa hãng</h1>
                <p className="text-muted-foreground">Cập nhật thông tin hãng {brand.name}</p>
            </div>

            <BrandForm brand={brand} />
        </div>
    )
}
