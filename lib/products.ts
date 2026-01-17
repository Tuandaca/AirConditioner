import { prisma } from './prisma'
import { slugify } from './utils'

export async function getProducts(filters?: {
  brand?: string
  horsepower?: string
  inverter?: boolean
  minPrice?: number
  maxPrice?: number
  search?: string
}) {
  const where: any = {
    status: 'active',
  }

  if (filters?.brand) {
    where.brand = filters.brand
  }

  if (filters?.horsepower) {
    where.horsepower = filters.horsepower
  }

  if (filters?.inverter !== undefined) {
    where.inverter = filters.inverter
  }

  if (filters?.minPrice || filters?.maxPrice) {
    where.price = {}
    if (filters.minPrice) {
      where.price.gte = filters.minPrice
    }
    if (filters.maxPrice) {
      where.price.lte = filters.maxPrice
    }
  }

  if (filters?.search) {
    where.OR = [
      { name: { contains: filters.search, mode: 'insensitive' } },
      { description: { contains: filters.search, mode: 'insensitive' } },
    ]
  }

  return prisma.product.findMany({
    where,
    orderBy: {
      createdAt: 'desc',
    },
  })
}

export async function getProductBySlug(slug: string) {
  return prisma.product.findUnique({
    where: { slug },
  })
}

export async function createProduct(data: {
  name: string
  description: string
  price: number
  originalPrice?: number
  brand: string
  horsepower: string
  inverter: boolean
  images: string[]
  specifications?: Record<string, string>
  benefits?: string[]
  featured?: boolean
}) {
  const slug = slugify(data.name)
  
  return prisma.product.create({
    data: {
      ...data,
      slug,
      status: 'active',
    },
  })
}

export async function updateProduct(
  id: string,
  data: {
    name?: string
    description?: string
    price?: number
    originalPrice?: number
    brand?: string
    horsepower?: string
    inverter?: boolean
    images?: string[]
    specifications?: Record<string, string>
    benefits?: string[]
    featured?: boolean
    status?: string
  }
) {
  const updateData: any = { ...data }
  
  if (data.name) {
    updateData.slug = slugify(data.name)
  }

  return prisma.product.update({
    where: { id },
    data: updateData,
  })
}

export async function deleteProduct(id: string) {
  return prisma.product.delete({
    where: { id },
  })
}
