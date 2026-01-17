'use client'

import { useEffect, useState } from 'react'
import { useForm } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'
import * as z from 'zod'
import type { Product as PrismaProduct } from '@prisma/client'
import { useRouter } from 'next/navigation'

import { Button } from '@/components/ui/button'
import { Checkbox } from '@/components/ui/checkbox'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { Textarea } from '@/components/ui/textarea'
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select'
import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
} from '@/components/ui/card'

/* ================= SCHEMA ================= */

const productSchema = z.object({
  name: z.string().min(1, 'Tên sản phẩm là bắt buộc'),
  slug: z.string().min(1, 'Slug là bắt buộc'),
  price: z.number().min(0),
  originalPrice: z.number().optional(),
  brand: z.string().min(1),
  horsepower: z.string(),
  inverter: z.boolean(),
  featured: z.boolean().optional().default(false),
  status: z.enum(['active', 'inactive', 'out_of_stock']),
  description: z.string().optional(),
})

type ProductFormValues = z.infer<typeof productSchema>

interface ProductFormProps {
  product?: PrismaProduct;
  onSubmit?: (data: ProductFormValues & { images: string[] }) => void;
}

/* ================= COMPONENT ================= */

export function ProductForm({ product, onSubmit }: ProductFormProps) {
  const router = useRouter()
  const {
    register,
    handleSubmit,
    setValue,
    watch,
    reset,
    formState: { errors },
  } = useForm<ProductFormValues>({
    resolver: zodResolver(productSchema),
    // defaultValues will be set by reset() in useEffect
  });

  const [images, setImages] = useState<string[]>(product?.images || []);
  const [imageUrl, setImageUrl] = useState('');
  const [selectedFiles, setSelectedFiles] = useState<File[]>([]);
  const [isUploading, setIsUploading] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);

  // Effect to reset form with product data when product prop changes
  useEffect(() => {
    if (product) {
      reset({
        name: product.name,
        slug: product.slug,
        price: product.price,
        originalPrice: product.originalPrice ?? undefined,
        brand: product.brand,
        horsepower: product.horsepower,
        inverter: product.inverter,
        featured: product.featured,
        status: product.status as 'active' | 'inactive' | 'out_of_stock',
        description: product.description || '',
      });
      setImages(product.images || []);
      // Clear selected files when product changes (e.g., switching from edit to new product)
      setSelectedFiles([]);
    }
  }, [product, reset]);

  /* ================= IMAGE HANDLERS ================= */

  const addImage = () => {
    if (!imageUrl.trim()) return
    setImages((prev) => [...prev, imageUrl.trim()])
    setImageUrl('')
  }

  const removeImage = (index: number) => {
    setImages((prev) => prev.filter((_, i) => i !== index))
  }

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files) {
      // Convert FileList to Array and update state
      setSelectedFiles(Array.from(e.target.files));
    }
  };

  const handleUploadImages = async () => {
    if (selectedFiles.length === 0) return;

    setIsUploading(true);
    const uploadedUrls: string[] = [];

    for (const file of selectedFiles) {
      const formData = new FormData();
      formData.append('file', file);

      try {
        const response = await fetch('/api/admin/upload', {
          method: 'POST',
          body: formData,
        });

        if (response.ok) {
          const data = await response.json();
          uploadedUrls.push(data.url);
        } else {
          const errorData = await response.json();
          console.error(`Failed to upload ${file.name}:`, errorData.message);
          // Optionally, show an error message to the user
        }
      } catch (error) {
        console.error(`Error uploading ${file.name}:`, error);
        // Optionally, show an error message to the user
      }
    }

    setImages((prev) => [...prev, ...uploadedUrls]);
    setSelectedFiles([]); // Clear selected files after upload
    setIsUploading(false);
  };

  const defaultSubmitHandler = async (data: ProductFormValues) => {
    setIsSubmitting(true);
    try {
      const payload = {
        ...data,
        images,
        specifications: {},
        benefits: [],
      };

      const url = product
        ? `/api/admin/products/${product.id}`
        : '/api/admin/products';

      const method = product ? 'PUT' : 'POST';

      const response = await fetch(url, {
        method,
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(payload),
      });

      if (!response.ok) {
        throw new Error('Failed to save product');
      }

      router.push('/admin/products');
      router.refresh();
    } catch (error) {
      console.error('Error saving product:', error);
      alert('Có lỗi xảy ra khi lưu sản phẩm');
    } finally {
      setIsSubmitting(false);
    }
  };

  const submitHandler = (data: ProductFormValues) => {
    if (onSubmit) {
      onSubmit({
        ...data,
        images,
      });
    } else {
      defaultSubmitHandler(data);
    }
  }

  /* ================= RENDER ================= */

  return (
    <form onSubmit={handleSubmit(submitHandler)} className="space-y-6">
      {/* ===== BASIC INFO ===== */}
      <Card>
        <CardHeader>
          <CardTitle>Thông tin cơ bản</CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          <div>
            <Label>Tên sản phẩm</Label>
            <Input {...register('name')} />
            {errors.name && (
              <p className="text-sm text-red-500">{errors.name.message}</p>
            )}
          </div>

          <div>
            <Label>Slug</Label>
            <Input {...register('slug')} />
          </div>

          <div className="grid grid-cols-2 gap-4">
            <div>
              <Label>Giá bán</Label>
              <Input
                type="number"
                {...register('price', { valueAsNumber: true })}
              />
            </div>

            <div>
              <Label>Giá gốc</Label>
              <Input
                type="number"
                {...register('originalPrice', { valueAsNumber: true })}
              />
            </div>
          </div>
        </CardContent>
      </Card>

      {/* ===== ATTRIBUTES ===== */}
      <Card>
        <CardHeader>
          <CardTitle>Thuộc tính</CardTitle>
        </CardHeader>
        <CardContent className="grid gap-4 md:grid-cols-2">
          <div>
            <Label>Hãng</Label>
            <Input {...register('brand')} />
          </div>

          <div>
            <Label>Công suất</Label>
            <Select
              value={watch('horsepower') || '1HP'} // Use watch and provide fallback
              onValueChange={(value) => setValue('horsepower', value)}
            >
              <SelectTrigger>
                <SelectValue placeholder="Chọn công suất">
                  {watch('horsepower') || 'Chọn công suất'}
                </SelectValue>
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="1HP">1 HP</SelectItem>
                <SelectItem value="1.5HP">1.5 HP</SelectItem>
                <SelectItem value="2HP">2 HP</SelectItem>
                <SelectItem value="2.5HP">2.5 HP</SelectItem>
              </SelectContent>
            </Select>
          </div>

          <div>
            <Label>Inverter</Label>
            <Select
              value={watch('inverter')?.toString() ?? 'false'} // Use watch and provide fallback
              onValueChange={(value) =>
                setValue('inverter', value === 'true')
              }
            >
              <SelectTrigger>
                <SelectValue>{watch('inverter')?.toString() === 'true' ? 'Có' : 'Không'}</SelectValue>
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="true">Có</SelectItem>
                <SelectItem value="false">Không</SelectItem>
              </SelectContent>
            </Select>
          </div>

          <div>
            <Label>Trạng thái</Label>
            <Select
              value={watch('status') || 'active'} // Use watch and provide fallback
              onValueChange={(value) =>
                setValue(
                  'status',
                  value as 'active' | 'inactive' | 'out_of_stock'
                )
              }
            >
              <SelectTrigger>
                <SelectValue>
                  {watch('status') === 'active' ? 'Đang bán' : watch('status') === 'inactive' ? 'Ẩn' : 'Hết hàng'}
                </SelectValue>
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="active">Đang bán</SelectItem>
                <SelectItem value="inactive">Ẩn</SelectItem>
                <SelectItem value="out_of_stock">Hết hàng</SelectItem>
              </SelectContent>
            </Select>
          </div>

          <div className="flex items-center space-x-2">
            <Checkbox
              id="featured"
              checked={watch('featured')}
              onCheckedChange={(checked) => setValue('featured', checked as boolean)}
            />
            <Label htmlFor="featured">Sản phẩm nổi bật</Label>
          </div>
        </CardContent>
      </Card>

      {/* ===== DESCRIPTION ===== */}
      <Card>
        <CardHeader>
          <CardTitle>Mô tả</CardTitle>
        </CardHeader>
        <CardContent>
          <Textarea rows={5} {...register('description')} />
        </CardContent>
      </Card>

      {/* ===== IMAGES ===== */}
      <Card>
        <CardHeader>
          <CardTitle>Hình ảnh</CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="mb-4 space-y-2">
            <Label htmlFor="image-upload">Tải ảnh lên từ thiết bị</Label>
            <div className="flex gap-2">
              <Input
                id="image-upload"
                type="file"
                multiple
                accept="image/jpeg,image/png,image/webp"
                onChange={handleFileChange}
                className="flex-grow"
              />
              <Button onClick={handleUploadImages} type="button" disabled={selectedFiles.length === 0 || isUploading}>
                {isUploading ? 'Đang tải...' : 'Tải lên'}
              </Button>
            </div>
            {selectedFiles.length > 0 && (
              <div className="text-sm text-gray-500">Đã chọn {selectedFiles.length} file.</div>
            )}
          </div>

          <div className="flex gap-2">
            <Input
              placeholder="Dán URL hình ảnh"
              value={imageUrl}
              onChange={(e) => setImageUrl(e.target.value)}
            />
            <Button type="button" onClick={addImage}>
              Thêm
            </Button>
          </div>

          {(images.length > 0 || selectedFiles.length > 0) && (
            <>
              <div className="border-t pt-4">
                <Label className="block mb-2">
                  Hình ảnh đã thêm ({images.length + selectedFiles.length})
                </Label>

                <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-2">
                  {/* Previews for selected but not yet uploaded files */}
                  {selectedFiles.map((file, index) => (
                    <div key={`selected-${index}`} className="relative group">
                      <img
                        src={URL.createObjectURL(file)}
                        alt={`Selected image ${index + 1}`}
                        className="w-full aspect-square object-cover rounded-md opacity-60"
                      />
                      <span className="absolute inset-0 flex items-center justify-center text-white text-sm bg-black bg-opacity-50">Đang chờ tải lên</span>
                    </div>
                  ))}

                  {/* Existing and newly uploaded images */}
                  {images.map((image, index) => (
                    <div key={index} className="relative group">
                      <img
                        src={image}
                        alt={`Image ${index + 1}`}
                        className="w-full aspect-square object-cover rounded-md"
                      />
                      <Button
                        type="button"
                        variant="destructive"
                        size="sm"
                        className="absolute top-2 right-2 opacity-0 group-hover:opacity-100"
                        onClick={() => removeImage(index)}
                      >
                        ×
                      </Button>
                    </div>
                  ))}
                </div>
              </div>
            </>
          )}
        </CardContent>
      </Card>

      {/* ===== SUBMIT ===== */}
      <div className="flex justify-end">
        <Button type="submit" size="lg" disabled={isSubmitting || isUploading}>
          {isSubmitting ? 'Đang lưu...' : 'Lưu sản phẩm'}
        </Button>
      </div>
    </form>
  )
}
