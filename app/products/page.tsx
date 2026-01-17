'use client'

import { useEffect, useState } from 'react'
import { ProductGrid } from '@/components/product-grid'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select'
import { Search } from 'lucide-react'
import { useRouter, useSearchParams } from 'next/navigation'
import { Breadcrumbs } from '@/components/breadcrumbs'

interface Product {
  id: string
  name: string
  slug: string
  price: number
  originalPrice?: number
  brand: string
  horsepower: string
  inverter: boolean
  images: string[]
  status: string
}

export default function ProductsPage() {
  const router = useRouter()
  const searchParams = useSearchParams()
  const [products, setProducts] = useState<Product[]>([])
  const [loading, setLoading] = useState(true)
  const [brands, setBrands] = useState<string[]>([])
  const [horsepowers, setHorsepowers] = useState<string[]>([])

  const [filters, setFilters] = useState({
    search: searchParams.get('search') || '',
    brand: searchParams.get('brand') || 'all',
    horsepower: searchParams.get('horsepower') || 'all',
    inverter: searchParams.get('inverter') || 'all',
  })

  useEffect(() => {
    const fetchProducts = async () => {
      setLoading(true)
      try {
        const params = new URLSearchParams()
        if (filters.search) params.set('search', filters.search)
        if (filters.brand && filters.brand !== 'all') params.set('brand', filters.brand)
        if (filters.horsepower && filters.horsepower !== 'all') params.set('horsepower', filters.horsepower)
        if (filters.inverter && filters.inverter !== 'all') params.set('inverter', filters.inverter)

        const response = await fetch(`/api/products?${params.toString()}`)
        const data = await response.json()
        setProducts(data)
      } catch (error) {
        console.error('Error fetching products:', error)
      } finally {
        setLoading(false)
      }
    }

    fetchProducts()
  }, [filters])

  // Fetch filter options 
  useEffect(() => {
    fetch('/api/products/filters')
      .then((res) => res.json())
      .then((data) => {
        if (data.brands) setBrands(data.brands)
        if (data.horsepowers) setHorsepowers(data.horsepowers)
      })
      .catch((error) => console.error('Error fetching filters:', error))
  }, [])

  // Sync state with URL params
  useEffect(() => {
    setFilters({
      search: searchParams.get('search') || '',
      brand: searchParams.get('brand') || 'all',
      horsepower: searchParams.get('horsepower') || 'all',
      inverter: searchParams.get('inverter') || 'all',
    })
  }, [searchParams])

  const handleFilterChange = (key: string, value: string) => {
    setFilters((prev) => ({ ...prev, [key]: value }))
    const params = new URLSearchParams(searchParams.toString())
    if (value && value !== 'all') {
      params.set(key, value)
    } else {
      params.delete(key)
    }
    router.push(`/products?${params.toString()}`)
  }

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    const params = new URLSearchParams()
    Object.entries(filters).forEach(([key, value]) => {
      if (value && value !== 'all') params.set(key, value)
    })
    router.push(`/products?${params.toString()}`)
  }

  return (
    <div className="container py-8">
      <Breadcrumbs />
      <div className="mb-8">
        <h1 className="text-3xl md:text-4xl font-bold mb-4">Tất cả sản phẩm</h1>
        <p className="text-muted-foreground">
          Tìm kiếm điều hòa phù hợp với nhu cầu của bạn
        </p>
      </div>

      <div className="grid lg:grid-cols-4 gap-4 lg:gap-8">
        <aside className="lg:col-span-1">
          <div className="bg-card border rounded-lg p-4 md:p-6 sticky top-20 lg:top-24">
            <h2 className="font-semibold text-lg mb-4">Bộ lọc</h2>

            <form onSubmit={handleSubmit} className="space-y-4">
              <div>
                <label className="text-sm font-medium mb-2 block">Tìm kiếm</label>
                <div className="relative">
                  <Input
                    value={filters.search}
                    onChange={(e) => setFilters((prev) => ({ ...prev, search: e.target.value }))}
                    placeholder="Tên sản phẩm..."
                    className="pl-10"
                  />
                  <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
                </div>
              </div>

              <div>
                <label className="text-sm font-medium mb-2 block">Thương hiệu</label>
                <Select
                  value={filters.brand}
                  onValueChange={(value) => handleFilterChange('brand', value)}
                >
                  <SelectTrigger>
                    <SelectValue placeholder="Tất cả" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="all">Tất cả</SelectItem>
                    {brands.map((brand) => (
                      <SelectItem key={brand} value={brand}>
                        {brand}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>

              <div>
                <label className="text-sm font-medium mb-2 block">Công suất</label>
                <Select
                  value={filters.horsepower}
                  onValueChange={(value) => handleFilterChange('horsepower', value)}
                >
                  <SelectTrigger>
                    <SelectValue placeholder="Tất cả" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="all">Tất cả</SelectItem>
                    {horsepowers.map((hp) => (
                      <SelectItem key={hp} value={hp}>
                        {hp}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>

              <div>
                <label className="text-sm font-medium mb-2 block">Loại</label>
                <Select
                  value={filters.inverter}
                  onValueChange={(value) => handleFilterChange('inverter', value)}
                >
                  <SelectTrigger>
                    <SelectValue placeholder="Tất cả" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="all">Tất cả</SelectItem>
                    <SelectItem value="true">Inverter</SelectItem>
                    <SelectItem value="false">Không Inverter</SelectItem>
                  </SelectContent>
                </Select>
              </div>

              <Button type="submit" className="w-full">Áp dụng bộ lọc</Button>
            </form>
          </div>
        </aside>

        <div className="lg:col-span-3">
          <div className="mb-6">
            <p className="text-muted-foreground">
              {loading ? 'Đang tải...' : `Tìm thấy ${products.length} sản phẩm`}
            </p>
          </div>

          {loading ? (
            <div className="text-center py-12">
              <p className="text-muted-foreground">Đang tải sản phẩm...</p>
            </div>
          ) : products.length === 0 ? (
            <div className="text-center py-12">
              <p className="text-muted-foreground text-lg">
                Không tìm thấy sản phẩm nào
              </p>
            </div>
          ) : (
            <ProductGrid products={products} />
          )}
        </div>
      </div>
    </div>
  )
}
