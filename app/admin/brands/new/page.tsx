import { BrandForm } from '@/components/admin/brand-form'

export default function NewBrandPage() {
    return (
        <div className="space-y-6">
            <div>
                <h1 className="text-3xl font-bold">Thêm hãng mới</h1>
                <p className="text-muted-foreground">Tạo hãng điều hòa mới</p>
            </div>

            <BrandForm />
        </div>
    )
}
