'use client'

import { useState, useMemo } from 'react'
import { ProductCard } from '@/components/product-card'
import { products, brands, horsepowerOptions } from '@/data/products'
import { Brand, Horsepower } from '@/types/product'
import { Button } from '@/components/ui/button'
import { Badge } from '@/components/ui/badge'
import { X, Filter } from 'lucide-react'
import { motion } from 'framer-motion'

export default function ProductsPage() {
  const [selectedBrands, setSelectedBrands] = useState<Brand[]>([])
  const [selectedHorsepower, setSelectedHorsepower] = useState<Horsepower[]>([])
  const [priceRange, setPriceRange] = useState<[number, number]>([0, 50000000])
  const [inverterOnly, setInverterOnly] = useState<boolean | undefined>(undefined)
  const [showFilters, setShowFilters] = useState(false)

  const filteredProducts = useMemo(() => {
    return products.filter((product) => {
      if (selectedBrands.length > 0 && !selectedBrands.includes(product.brand)) {
        return false
      }
      if (selectedHorsepower.length > 0 && !selectedHorsepower.includes(product.horsepower)) {
        return false
      }
      if (product.price < priceRange[0] || product.price > priceRange[1]) {
        return false
      }
      if (inverterOnly !== undefined && product.inverter !== inverterOnly) {
        return false
      }
      return true
    })
  }, [selectedBrands, selectedHorsepower, priceRange, inverterOnly])

  const toggleBrand = (brand: Brand) => {
    setSelectedBrands((prev) =>
      prev.includes(brand) ? prev.filter((b) => b !== brand) : [...prev, brand]
    )
  }

  const toggleHorsepower = (hp: Horsepower) => {
    setSelectedHorsepower((prev) =>
      prev.includes(hp) ? prev.filter((h) => h !== hp) : [...prev, hp]
    )
  }

  const clearFilters = () => {
    setSelectedBrands([])
    setSelectedHorsepower([])
    setPriceRange([0, 50000000])
    setInverterOnly(undefined)
  }

  const activeFiltersCount =
    selectedBrands.length + selectedHorsepower.length + (inverterOnly !== undefined ? 1 : 0)

  return (
    <div className="min-h-screen pt-24 pb-12 bg-gray-50">
      <div className="container px-4">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
        >
          <h1 className="text-4xl md:text-5xl font-bold mb-4 text-gray-900">
            Tất cả sản phẩm
          </h1>
          <p className="text-lg text-gray-600 mb-8">
            {filteredProducts.length} sản phẩm
          </p>
        </motion.div>

        <div className="flex flex-col lg:flex-row gap-6">
          {/* Filters Sidebar */}
          <aside
            className={`lg:w-64 space-y-6 ${
              showFilters ? 'block' : 'hidden lg:block'
            }`}
          >
            <motion.div
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.5 }}
              className="bg-white rounded-lg p-6 shadow-sm sticky top-24"
            >
              <div className="flex items-center justify-between mb-6">
                <h2 className="text-xl font-semibold flex items-center gap-2">
                  <Filter className="h-5 w-5" />
                  Bộ lọc
                </h2>
                {activeFiltersCount > 0 && (
                  <Button
                    variant="ghost"
                    size="sm"
                    onClick={clearFilters}
                    className="text-xs"
                  >
                    <X className="h-4 w-4 mr-1" />
                    Xóa
                  </Button>
                )}
              </div>

              {/* Brand Filter */}
              <div className="mb-6">
                <h3 className="font-semibold mb-3 text-gray-900">Hãng</h3>
                <div className="space-y-2">
                  {brands.map((brand) => (
                    <label
                      key={brand.value}
                      className="flex items-center gap-2 cursor-pointer hover:text-primary transition-colors"
                    >
                      <input
                        type="checkbox"
                        checked={selectedBrands.includes(brand.value as Brand)}
                        onChange={() => toggleBrand(brand.value as Brand)}
                        className="w-4 h-4 text-primary rounded border-gray-300 focus:ring-primary"
                      />
                      <span>{brand.label}</span>
                    </label>
                  ))}
                </div>
              </div>

              {/* Horsepower Filter */}
              <div className="mb-6">
                <h3 className="font-semibold mb-3 text-gray-900">Công suất</h3>
                <div className="space-y-2">
                  {horsepowerOptions.map((hp) => (
                    <label
                      key={hp.value}
                      className="flex items-center gap-2 cursor-pointer hover:text-primary transition-colors"
                    >
                      <input
                        type="checkbox"
                        checked={selectedHorsepower.includes(hp.value as Horsepower)}
                        onChange={() => toggleHorsepower(hp.value as Horsepower)}
                        className="w-4 h-4 text-primary rounded border-gray-300 focus:ring-primary"
                      />
                      <span>{hp.label}</span>
                    </label>
                  ))}
                </div>
              </div>

              {/* Price Range */}
              <div className="mb-6">
                <h3 className="font-semibold mb-3 text-gray-900">Giá</h3>
                <div className="space-y-2">
                  <input
                    type="range"
                    min="0"
                    max="50000000"
                    step="1000000"
                    value={priceRange[1]}
                    onChange={(e) =>
                      setPriceRange([priceRange[0], Number(e.target.value)])
                    }
                    className="w-full"
                  />
                  <div className="flex justify-between text-sm text-gray-600">
                    <span>Dưới {(priceRange[1] / 1000000).toFixed(0)} triệu</span>
                  </div>
                </div>
              </div>

              {/* Inverter Filter */}
              <div>
                <h3 className="font-semibold mb-3 text-gray-900">Loại</h3>
                <div className="space-y-2">
                  <label className="flex items-center gap-2 cursor-pointer hover:text-primary transition-colors">
                    <input
                      type="radio"
                      name="inverter"
                      checked={inverterOnly === undefined}
                      onChange={() => setInverterOnly(undefined)}
                      className="w-4 h-4 text-primary border-gray-300 focus:ring-primary"
                    />
                    <span>Tất cả</span>
                  </label>
                  <label className="flex items-center gap-2 cursor-pointer hover:text-primary transition-colors">
                    <input
                      type="radio"
                      name="inverter"
                      checked={inverterOnly === true}
                      onChange={() => setInverterOnly(true)}
                      className="w-4 h-4 text-primary border-gray-300 focus:ring-primary"
                    />
                    <span>Inverter</span>
                  </label>
                  <label className="flex items-center gap-2 cursor-pointer hover:text-primary transition-colors">
                    <input
                      type="radio"
                      name="inverter"
                      checked={inverterOnly === false}
                      onChange={() => setInverterOnly(false)}
                      className="w-4 h-4 text-primary border-gray-300 focus:ring-primary"
                    />
                    <span>Thường</span>
                  </label>
                </div>
              </div>
            </motion.div>
          </aside>

          {/* Products Grid */}
          <div className="flex-1">
            {/* Mobile Filter Toggle */}
            <div className="lg:hidden mb-4">
              <Button
                onClick={() => setShowFilters(!showFilters)}
                variant="outline"
                className="w-full"
              >
                <Filter className="h-4 w-4 mr-2" />
                Bộ lọc
                {activeFiltersCount > 0 && (
                  <Badge className="ml-2 bg-primary">
                    {activeFiltersCount}
                  </Badge>
                )}
              </Button>
            </div>

            {filteredProducts.length === 0 ? (
              <div className="bg-white rounded-lg p-12 text-center">
                <p className="text-lg text-gray-600 mb-4">
                  Không tìm thấy sản phẩm phù hợp
                </p>
                <Button onClick={clearFilters} variant="outline">
                  Xóa bộ lọc
                </Button>
              </div>
            ) : (
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {filteredProducts.map((product, index) => (
                  <ProductCard key={product.id} product={product} index={index} />
                ))}
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  )
}