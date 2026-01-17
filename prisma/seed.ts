import { PrismaClient, ProductStatus } from '@prisma/client'

const prisma = new PrismaClient()

import bcrypt from 'bcryptjs'

async function main() {
  // Create default admin user (password: admin123)
  const hashedPassword = await bcrypt.hash('admin123', 10)
  const admin = await prisma.user.upsert({
    where: { email: 'admin@example.com' },
    update: {},
    create: {
      email: 'admin@example.com',
      password: hashedPassword,
      name: 'Admin User',
      role: 'admin',
    },
  })

  // Create default settings
  await prisma.settings.upsert({
    where: { key: 'hotline' },
    update: {},
    create: {
      key: 'hotline',
      value: '1900-1234',
    },
  })

  await prisma.settings.upsert({
    where: { key: 'zalo' },
    update: {},
    create: {
      key: 'zalo',
      value: 'https://zalo.me/0123456789',
    },
  })

  await prisma.settings.upsert({
    where: { key: 'facebook' },
    update: {},
    create: {
      key: 'facebook',
      value: 'https://facebook.com/yourpage',
    },
  })

  // Create sample products
  const products = [
    {
      name: 'Daikin Inverter 1HP FTKC35',
      slug: 'daikin-inverter-1hp-ftkc35',
      description: 'Điều hòa Daikin Inverter 1HP với công nghệ tiết kiệm điện năng vượt trội, làm lạnh nhanh và êm ái. Phù hợp cho phòng ngủ, phòng khách diện tích nhỏ đến trung bình.',
      price: 8990000,
      originalPrice: 10990000,
      brand: 'Daikin',
      horsepower: '1HP',
      inverter: true,
      status: ProductStatus.active,
      images: [
        'https://images.unsplash.com/photo-1631543915447-0b8b8b8b8b8b?w=800',
        'https://images.unsplash.com/photo-1631543915448-0b8b8b8b8b8b?w=800',
      ],
      specifications: {
        'Công suất làm lạnh': '9000 BTU',
        'Diện tích làm lạnh': '15-20 m²',
        'Tiết kiệm điện': '40%',
        'Gas sử dụng': 'R32',
        'Bảo hành': '12 tháng',
        'Xuất xứ': 'Thái Lan',
      },
      benefits: [
        'Tiết kiệm điện năng lên đến 40%',
        'Làm lạnh nhanh trong 3 phút',
        'Vận hành êm ái, không gây ồn',
        'Công nghệ Inverter tiên tiến',
        'Bảo hành chính hãng 12 tháng',
      ],
      featured: true,
    },
    {
      name: 'Mitsubishi Electric Inverter 1.5HP MSZ-AP12VG',
      slug: 'mitsubishi-electric-inverter-15hp-msz-ap12vg',
      description: 'Điều hòa Mitsubishi Electric Inverter 1.5HP với công nghệ làm lạnh nhanh và tiết kiệm điện. Thiết kế sang trọng, phù hợp mọi không gian.',
      price: 12990000,
      originalPrice: 14990000,
      brand: 'Mitsubishi Electric',
      horsepower: '1.5HP',
      inverter: true,
      status: ProductStatus.active,
      images: [
        'https://images.unsplash.com/photo-1631543915449-0b8b8b8b8b8b?w=800',
      ],
      specifications: {
        'Công suất làm lạnh': '12000 BTU',
        'Diện tích làm lạnh': '20-30 m²',
        'Tiết kiệm điện': '35%',
        'Gas sử dụng': 'R410A',
        'Bảo hành': '12 tháng',
        'Xuất xứ': 'Thái Lan',
      },
      benefits: [
        'Tiết kiệm điện năng 35%',
        'Làm lạnh nhanh và mạnh mẽ',
        'Thiết kế đẹp, sang trọng',
        'Công nghệ Inverter hiện đại',
      ],
      featured: true,
    },
    {
      name: 'Panasonic Inverter 2HP CU/CS-XU18XKH-8',
      slug: 'panasonic-inverter-2hp-cu-cs-xu18xkh-8',
      description: 'Điều hòa Panasonic Inverter 2HP công suất lớn, phù hợp cho phòng khách, văn phòng diện tích lớn. Công nghệ nanoeX khử mùi, diệt khuẩn.',
      price: 16990000,
      originalPrice: 19990000,
      brand: 'Panasonic',
      horsepower: '2HP',
      inverter: true,
      status: ProductStatus.active,
      images: [
        'https://images.unsplash.com/photo-1631543915450-0b8b8b8b8b8b?w=800',
      ],
      specifications: {
        'Công suất làm lạnh': '18000 BTU',
        'Diện tích làm lạnh': '30-45 m²',
        'Tiết kiệm điện': '30%',
        'Gas sử dụng': 'R410A',
        'Bảo hành': '12 tháng',
        'Xuất xứ': 'Malaysia',
      },
      benefits: [
        'Công suất lớn, làm lạnh nhanh',
        'Công nghệ nanoeX khử mùi',
        'Tiết kiệm điện 30%',
        'Phù hợp không gian lớn',
      ],
      featured: false,
    },
  ]

  for (const product of products) {
    await prisma.product.upsert({
      where: { slug: product.slug },
      update: {},
      create: product,
    })
  }

  console.log('Seed data created successfully!')
}

main()
  .catch((e) => {
    console.error(e)
    process.exit(1)
  })
  .finally(async () => {
    await prisma.$disconnect()
  })
