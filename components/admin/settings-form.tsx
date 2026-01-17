'use client'

import { useState } from 'react'
import { useRouter } from 'next/navigation'
import { useForm } from 'react-hook-form'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'

interface SettingsFormProps {
  initialValues: {
    phoneNumber: string
    zaloNumber: string
    facebookUrl: string
  }
}

export function SettingsForm({ initialValues }: SettingsFormProps) {
  const router = useRouter()
  const [loading, setLoading] = useState(false)
  const { register, handleSubmit } = useForm({
    defaultValues: initialValues,
  })

  const onSubmit = async (data: any) => {
    setLoading(true)
    try {
      const response = await fetch('/api/admin/settings', {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(data),
      })

      if (response.ok) {
        router.refresh()
        alert('Cài đặt đã được lưu thành công!')
      } else {
        alert('Có lỗi xảy ra khi lưu cài đặt')
      }
    } catch (error) {
      alert('Có lỗi xảy ra khi lưu cài đặt')
    } finally {
      setLoading(false)
    }
  }

  return (
    <Card>
      <CardHeader>
        <CardTitle>Thông tin liên hệ</CardTitle>
      </CardHeader>
      <CardContent>
        <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
          <div>
            <Label htmlFor="phoneNumber">Số điện thoại</Label>
            <Input
              id="phoneNumber"
              {...register('phoneNumber', { required: 'Số điện thoại là bắt buộc' })}
              placeholder="0917940833"
            />
            <p className="text-xs text-muted-foreground mt-1">
              Số điện thoại dùng để hiển thị và gọi điện
            </p>
          </div>

          <div>
            <Label htmlFor="zaloNumber">Số Zalo</Label>
            <Input
              id="zaloNumber"
              {...register('zaloNumber', { required: 'Số Zalo là bắt buộc' })}
              placeholder="0917940833"
            />
            <p className="text-xs text-muted-foreground mt-1">
              Số Zalo để mở chat trực tiếp (chỉ cần nhập số, không cần link)
            </p>
          </div>

          <div>
            <Label htmlFor="facebookUrl">Link Facebook</Label>
            <Input
              id="facebookUrl"
              {...register('facebookUrl', { required: 'Link Facebook là bắt buộc' })}
              placeholder="https://www.facebook.com/ngobongsu"
            />
            <p className="text-xs text-muted-foreground mt-1">
              Link đầy đủ đến trang Facebook của bạn
            </p>
          </div>

          <Button type="submit" disabled={loading}>
            {loading ? 'Đang lưu...' : 'Lưu cài đặt'}
          </Button>
        </form>
      </CardContent>
    </Card>
  )
}
