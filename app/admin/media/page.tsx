'use client'

import { useState } from 'react'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Trash2, Upload } from 'lucide-react'
import Image from 'next/image'

export default function MediaPage() {
  const [images, setImages] = useState<string[]>([])
  const [newImageUrl, setNewImageUrl] = useState('')

  const addImage = () => {
    if (newImageUrl.trim()) {
      setImages([...images, newImageUrl.trim()])
      setNewImageUrl('')
    }
  }

  const removeImage = (index: number) => {
    setImages(images.filter((_, i) => i !== index))
  }

  return (
    <div>
      <h1 className="text-3xl font-bold mb-8">Quản lý Media</h1>

      <Card className="mb-6">
        <CardHeader>
          <CardTitle>Thêm hình ảnh</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="flex gap-2">
            <Input
              value={newImageUrl}
              onChange={(e) => setNewImageUrl(e.target.value)}
              placeholder="Nhập URL hình ảnh hoặc upload file"
            />
            <Button onClick={addImage}>
              <Upload className="mr-2 h-4 w-4" />
              Thêm
            </Button>
          </div>
          <p className="text-sm text-muted-foreground mt-2">
            Lưu ý: Hiện tại chỉ hỗ trợ thêm hình ảnh qua URL. 
            Để upload file, bạn cần tích hợp với dịch vụ lưu trữ như Cloudinary, AWS S3, hoặc Vercel Blob Storage.
          </p>
        </CardContent>
      </Card>

      <div className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-6 gap-4">
        {images.map((image, index) => (
          <Card key={index} className="relative group">
            <CardContent className="p-0">
              <div className="aspect-square relative">
                <Image
                  src={image}
                  alt={`Media ${index + 1}`}
                  fill
                  className="object-cover rounded-t-lg"
                />
                <Button
                  variant="destructive"
                  size="sm"
                  className="absolute top-2 right-2 opacity-0 group-hover:opacity-100 transition-opacity"
                  onClick={() => removeImage(index)}
                >
                  <Trash2 className="h-4 w-4" />
                </Button>
              </div>
              <div className="p-2">
                <p className="text-xs text-muted-foreground truncate">
                  {image}
                </p>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>

      {images.length === 0 && (
        <Card>
          <CardContent className="py-12 text-center">
            <p className="text-muted-foreground">
              Chưa có hình ảnh nào. Thêm hình ảnh để bắt đầu.
            </p>
          </CardContent>
        </Card>
      )}
    </div>
  )
}
