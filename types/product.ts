export type Brand = 'daikin' | 'panasonic' | 'lg' | 'samsung' | 'toshiba' | 'carrier'

export type Horsepower = '1HP' | '1.5HP' | '2HP' | '2.5HP' | '3HP'

export interface Product {
  id: string
  name: string
  brand: Brand
  price: number
  originalPrice?: number
  horsepower: Horsepower
  inverter: boolean
  images: string[]
  description: string
  specifications: {
    capacity?: string
    powerConsumption?: string
    refrigerant?: string
    dimensions?: string
    weight?: string
    noiseLevel?: string
    warranty?: string
  }
  benefits: string[]
  featured?: boolean
}

export interface ProductFilter {
  brand?: Brand[]
  horsepower?: Horsepower[]
  priceRange?: [number, number]
  inverter?: boolean
}