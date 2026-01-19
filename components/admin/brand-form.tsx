'use client'

import { useEffect, useState } from 'react'
import { useForm } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'
import * as z from 'zod'
import { useRouter } from 'next/navigation'
import { toast } from 'sonner'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { Textarea } from '@/components/ui/textarea'
import { Checkbox } from '@/components/ui/checkbox'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'

const brandSchema = z.object({
    name: z.string().min(1, 'Tên hãng là bắt buộc'),
    slug: z.string().min(1, 'Slug là bắt buộc'),
    logo: z.string().optional(),
    description: z.string().optional(),
    order: z.number().min(0).default(0),
    active: z.boolean().default(true),
})

type BrandFormValues = z.infer<typeof brandSchema>

interface BrandFormProps {
    brand?: any
    onSubmit?: (data: BrandFormValues) => void
}

function generateSlug(text: string): string {
    return text
        .toLowerCase()
        .normalize('NFD')
        .replace(/[\u0300-\u036f]/g, '')
        .replace(/đ/g, 'd')
        .replace(/[^a-z0-9]+/g, '-')
        .replace(/^-+|-+$/g, '')
}

export function BrandForm({ brand, onSubmit }: BrandFormProps) {
    const router = useRouter()
    const [isSubmitting, setIsSubmitting] = useState(false)

    const {
        register,
        handleSubmit,
        setValue,
        watch,
        reset,
        formState: { errors },
    } = useForm<BrandFormValues>({
        resolver: zodResolver(brandSchema),
        defaultValues: brand || {
            name: '',
            slug: '',
            logo: '',
            description: '',
            order: 0,
            active: true,
        },
    })

    // Auto-generate slug from name for new brands
    useEffect(() => {
        const subscription = watch((value, { name }) => {
            if (name === 'name' && value.name && !brand) {
                setValue('slug', generateSlug(value.name))
            }
        })
        return () => subscription.unsubscribe()
    }, [watch, setValue, brand])

    const defaultSubmitHandler = async (data: BrandFormValues) => {
        setIsSubmitting(true)
        try {
            const url = brand ? `/api/admin/brands/${brand.id}` : '/api/admin/brands'
            const method = brand ? 'PUT' : 'POST'

            const response = await fetch(url, {
                method,
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify(data),
            })

            if (!response.ok) {
                const error = await response.json()
                throw new Error(error.error || 'Failed to save brand')
            }

            toast.success(brand ? 'Đã cập nhật hãng' : 'Đã tạo hãng mới')
            router.push('/admin/brands')
            router.refresh()
        } catch (error: any) {
            console.error('Error saving brand:', error)
            toast.error(error.message || 'Có lỗi xảy ra khi lưu hãng')
        } finally {
            setIsSubmitting(false)
        }
    }

    return (
        <form onSubmit={handleSubmit(onSubmit || defaultSubmitHandler)} className="space-y-6">
            <Card>
                <CardHeader>
                    <CardTitle>Thông tin hãng</CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                    <div>
                        <Label>Tên hãng</Label>
                        <Input {...register('name')} placeholder="Daikin" />
                        {errors.name && <p className="text-sm text-destructive mt-1">{errors.name.message}</p>}
                    </div>

                    <div>
                        <Label>Slug</Label>
                        <Input {...register('slug')} placeholder="daikin" />
                        {errors.slug && <p className="text-sm text-destructive mt-1">{errors.slug.message}</p>}
                    </div>

                    <div>
                        <Label>Logo URL (tùy chọn)</Label>
                        <Input {...register('logo')} placeholder="https://..." />
                    </div>

                    <div>
                        <Label>Mô tả (tùy chọn)</Label>
                        <Textarea {...register('description')} rows={3} placeholder="Mô tả về hãng..." />
                    </div>

                    <div>
                        <Label>Thứ tự hiển thị</Label>
                        <Input type="number" {...register('order', { valueAsNumber: true })} />
                    </div>

                    <div className="flex items-center space-x-2">
                        <Checkbox
                            id="active"
                            checked={watch('active')}
                            onCheckedChange={(checked) => setValue('active', checked as boolean)}
                        />
                        <Label htmlFor="active" className="cursor-pointer">Kích hoạt</Label>
                    </div>
                </CardContent>
            </Card>

            <div className="flex gap-4">
                <Button type="submit" disabled={isSubmitting}>
                    {isSubmitting ? 'Đang lưu...' : brand ? 'Cập nhật' : 'Tạo mới'}
                </Button>
                <Button type="button" variant="outline" onClick={() => router.back()}>
                    Hủy
                </Button>
            </div>
        </form>
    )
}
