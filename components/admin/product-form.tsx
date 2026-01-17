'use client'

import { useEffect, useState } from 'react'
import { useForm } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'
import * as z from 'zod'
import type { Product as PrismaProduct } from '@prisma/client'
import { useRouter } from 'next/navigation'
import { toast } from 'sonner'

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
  status: z.enum(['active', 'inactive', 'out_of_stock']).default('active'),
  description: z.string().optional(),
  specifications: z.object({
    warranty: z.string().optional(),
    origin: z.string().optional(),
    gas: z.string().optional(),
    energySaving: z.string().optional(),
    coolingCapacity: z.string().optional(),
    coolingArea: z.string().optional(),
  }).optional(),
})

type ProductFormValues = z.infer<typeof productSchema>

interface ProductFormProps {
  product?: PrismaProduct;
  onSubmit?: (data: ProductFormValues & { images: string[] }) => void;
}

/* ================= HELPERS ================= */

function generateSlug(text: string): string {
  return text
    .toLowerCase()
    .normalize('NFD')
    .replace(/[\u0300-\u036f]/g, '')
    .replace(/đ/g, 'd')
    .replace(/[^a-z0-9]+/g, '-')
    .replace(/^-+|-+$/g, '')
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
        specifications: product.specifications as any || {},
      });
      setImages(product.images || []);
    }
  }, [product, reset]);

  // Auto-generate slug from name for new products
  useEffect(() => {
    const subscription = watch((value, { name }) => {
      if (name === 'name' && value.name && !product) {
        setValue('slug', generateSlug(value.name))
      }
    })
    return () => subscription.unsubscribe()
  }, [watch, setValue, product])

  /* ================= IMAGE HANDLERS ================= */

  const addImage = () => {
    if (!imageUrl.trim()) return
    setImages((prev) => [...prev, imageUrl.trim()])
    setImageUrl('')
  }

  const removeImage = (index: number) => {
    setImages((prev) => prev.filter((_, i) => i !== index))
  }

  const handleFileChange = async (e: React.ChangeEvent<HTMLInputElement>) => {
    if (!e.target.files || e.target.files.length === 0) return;

    const files = Array.from(e.target.files);
    const remainingSlots = 3 - images.length;

    // Check if adding these files would exceed 3 images
    if (files.length > remainingSlots) {
      toast.warning(`Chỉ có thể tải tối đa 3 ảnh. Bạn còn ${remainingSlots} vị trí trống.`);
      e.target.value = ''; // Reset input
      return;
    }

    // Auto-upload immediately
    setIsUploading(true);
    const uploadedUrls: string[] = [];

    for (const file of files) {
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
          toast.error(`Lỗi tải ${file.name}: ${errorData.message}`);
        }
      } catch (error) {
        console.error(`Error uploading ${file.name}:`, error);
        toast.error(`Lỗi tải ${file.name}`);
      }
    }

    setImages((prev) => [...prev, ...uploadedUrls]);
    setIsUploading(false);
    e.target.value = ''; // Reset input for next upload
  };

  const defaultSubmitHandler = async (data: ProductFormValues) => {
    setIsSubmitting(true);
    try {
      const payload = {
        ...data,
        images,
        specifications: data.specifications || null,
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
      toast.error('Có lỗi xảy ra khi lưu sản phẩm');
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

      {/* ===== TECHNICAL SPECIFICATIONS ===== */}
      <Card>
        <CardHeader>
          <CardTitle>Thông số kỹ thuật</CardTitle>
        </CardHeader>
        <CardContent className="grid gap-4 md:grid-cols-2">
          <div>
            <Label>Bảo hành</Label>
            <Input {...register('specifications.warranty')} placeholder="12 tháng" />
          </div>
          <div>
            <Label>Xuất xứ</Label>
            <Input {...register('specifications.origin')} placeholder="Malaysia" />
          </div>
          <div>
            <Label>Gas sử dụng</Label>
            <Input {...register('specifications.gas')} placeholder="R410A" />
          </div>
          <div>
            <Label>Tiết kiệm điện</Label>
            <Input {...register('specifications.energySaving')} placeholder="30%" />
          </div>
          <div>
            <Label>Công suất làm lạnh</Label>
            <Input {...register('specifications.coolingCapacity')} placeholder="18000 BTU" />
          </div>
          <div>
            <Label>Diện tích làm lạnh</Label>
            <Input {...register('specifications.coolingArea')} placeholder="30-45 m²" />
          </div>
        </CardContent>
      </Card>

      {/* ===== IMAGES ===== */}
      <Card>
        <CardHeader>
          <CardTitle>Hình ảnh</CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="mb-4 space-y-2">
            <Label htmlFor="image-upload">Tải ảnh lên từ thiết bị (Tối đa 3 ảnh)</Label>
            <input
              id="image-upload"
              type="file"
              accept="image/*"
              multiple
              onChange={handleFileChange}
              disabled={images.length >= 3 || isUploading}
              className="block w-full text-sm text-gray-500 file:mr-4 file:py-2 file:px-4 file:rounded-md file:border-0 file:text-sm file:font-semibold file:bg-primary file:text-primary-foreground hover:file:bg-primary/90 disabled:opacity-50 disabled:cursor-not-allowed"
            />
            <div className="flex items-center gap-2 text-sm">
              <span className="text-muted-foreground">
                Đã tải: {images.length}/3 ảnh
              </span>
              {isUploading && (
                <span className="text-primary">Đang tải lên...</span>
              )}
              {images.length >= 3 && (
                <span className="text-destructive">Đã đạt giới hạn</span>
              )}
            </div>
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

          {images.length > 0 && (
            <>
              <div className="border-t pt-4">
                <Label className="block mb-2">
                  Hình ảnh đã thêm ({images.length})
                </Label>

                <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-2">
                  {/* Uploaded images */}
                  {images.map((url, index) => (
                    <div key={index} className="relative group">
                      <img
                        src={url}
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
