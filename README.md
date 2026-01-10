# 🏠 Máy Lạnh E-commerce Website

Website bán máy lạnh chính hãng được thiết kế tối ưu cho thị trường Việt Nam với focus vào conversion qua chat (Zalo/Facebook).

## ✨ Tính năng

- 🎨 **Modern UI/UX**: Thiết kế hiện đại, premium với blue tones, tech-inspired
- 📱 **Mobile-First**: Tối ưu 100% cho mobile, responsive hoàn hảo
- ⚡ **High Performance**: Lazy loading, optimized images, smooth animations
- 🎯 **Conversion-Focused**: Floating chat buttons (Zalo/Facebook), sticky CTAs
- 🔍 **SEO Optimized**: Metadata, structured data, Vietnamese language support
- 🎭 **Smooth Animations**: Framer Motion cho animations mượt mà

## 🛠️ Tech Stack

- **Framework**: Next.js 14 (App Router)
- **Styling**: Tailwind CSS
- **UI Components**: Shadcn UI
- **Animations**: Framer Motion
- **Icons**: Lucide React
- **Language**: TypeScript

## 📦 Cài đặt

1. **Clone repository và cài đặt dependencies:**

```bash
npm install
# hoặc
yarn install
# hoặc
pnpm install
```

2. **Chạy development server:**

```bash
npm run dev
# hoặc
yarn dev
# hoặc
pnpm dev
```

3. **Mở trình duyệt tại:** [http://localhost:3000](http://localhost:3000)

## 🏗️ Cấu trúc Project

```
├── app/
│   ├── layout.tsx              # Root layout với Navbar, Footer, FloatingChat
│   ├── page.tsx                # Homepage
│   ├── globals.css             # Global styles với Tailwind
│   └── products/
│       ├── page.tsx            # Product listing với filters
│       └── [id]/
│           ├── page.tsx        # Product detail (Server Component)
│           ├── product-detail-client.tsx  # Client Component
│           └── not-found.tsx   # 404 page
├── components/
│   ├── ui/                     # Shadcn UI components
│   │   ├── button.tsx
│   │   ├── card.tsx
│   │   └── badge.tsx
│   ├── navbar.tsx              # Navigation bar
│   ├── hero.tsx                # Hero section
│   ├── product-card.tsx        # Product card component
│   ├── benefits-section.tsx    # Benefits section
│   ├── footer.tsx              # Footer component
│   └── floating-chat.tsx       # Floating Zalo/Facebook buttons
├── data/
│   └── products.ts             # Sample product data
├── lib/
│   └── utils.ts                # Utility functions (cn, formatPrice)
├── types/
│   └── product.ts              # TypeScript types
└── public/                     # Static assets
```

## 📄 Pages

### 1. Homepage (`/`)
- Hero section với value proposition mạnh
- CTA buttons: "Chat Zalo", "Gọi ngay"
- Quick categories (1HP, 1.5HP, 2HP)
- Featured products grid
- Benefits section
- CTA section cuối trang

### 2. Product Listing (`/products`)
- Grid layout responsive
- Filters:
  - Hãng (Daikin, Panasonic, LG, Samsung, Toshiba, Carrier)
  - Công suất (1HP, 1.5HP, 2HP, 2.5HP, 3HP)
  - Giá (price range slider)
  - Loại (Inverter / Thường)
- Mobile-friendly filter sidebar

### 3. Product Detail (`/products/[id]`)
- Image gallery với thumbnail navigation
- Price highlight với discount badge
- Technical specifications table
- Key benefits list
- Sticky CTA buttons (Zalo chat, Phone call)
- Guarantees section

## 🎨 Design System

### Colors
- **Primary**: Cool blue tones (`hsl(198, 93%, 60%)`)
- **Accent**: Green for CTAs (`green-600`)
- **Background**: White / Gray-50
- **Text**: Gray-900 (headings), Gray-600 (body)

### Typography
- **Font**: Inter (with Vietnamese support)
- **Sizes**: Responsive (text-4xl on mobile → text-6xl on desktop)

### Components
- Buttons: Primary (blue), Secondary (outline), Success (green for phone)
- Cards: Rounded corners, shadow on hover
- Badges: For discounts, brand labels, features

## 🔧 Configuration

### Update Contact Information

Trong các file sau, cập nhật thông tin liên hệ:

1. **Zalo URL**: `components/floating-chat.tsx`, `components/navbar.tsx`, `app/page.tsx`
   ```typescript
   const ZALO_URL = 'https://zalo.me/YOUR_ZALO_ID'
   ```

2. **Phone Number**: `components/floating-chat.tsx`, `components/navbar.tsx`, `app/page.tsx`
   ```typescript
   const PHONE_NUMBER = 'tel:YOUR_PHONE_NUMBER'
   ```

3. **Facebook Messenger**: `components/floating-chat.tsx`
   ```typescript
   const FACEBOOK_URL = 'https://m.me/YOUR_FACEBOOK_PAGE'
   ```

4. **Email & Address**: `components/footer.tsx`

### Update Product Data

Chỉnh sửa `data/products.ts` để thêm/sửa/xóa sản phẩm.

## 🚀 Deployment

### Deploy trên Vercel (Recommended)

1. Push code lên GitHub/GitLab/Bitbucket
2. Import project vào [Vercel](https://vercel.com)
3. Vercel sẽ tự động detect Next.js và deploy
4. Cập nhật environment variables nếu cần

### Build for Production

```bash
npm run build
npm start
```

## 📱 Features Details

### Floating Chat Buttons
- Zalo button (màu xanh #0068FF)
- Facebook Messenger button
- Phone button (màu xanh lá)
- Smooth animations khi scroll
- Sticky ở góc dưới bên phải

### SEO Optimization
- Metadata cho mỗi page
- Open Graph tags
- Vietnamese language support
- Semantic HTML structure
- Optimized images với Next.js Image component

### Performance
- Image lazy loading
- Code splitting tự động
- Optimized bundle size
- Lighthouse score > 90 (target)

## 🎯 Business Logic

### User Flow
1. User vào homepage → xem featured products
2. Click vào category hoặc "Xem tất cả" → vào product listing
3. Filter products theo nhu cầu
4. Click vào product → xem chi tiết
5. Click "Chat Zalo" hoặc "Gọi ngay" → chuyển đổi

### Conversion Strategy
- **No cart**: Focus vào chat/phone để tư vấn
- **Trust signals**: Chính hãng, bảo hành, lắp đặt nhanh
- **Clear CTAs**: Zalo và Phone luôn visible
- **Mobile-first**: Ưu tiên mobile experience

## 📝 Notes

- Sản phẩm hiện tại là sample data, cần cập nhật với dữ liệu thực
- Hình ảnh đang dùng Unsplash placeholder, cần thay bằng ảnh thật
- Cần cấu hình Zalo Official Account để tích hợp chat widget chính thức
- Có thể tích hợp Facebook Messenger SDK để chat tốt hơn

## 🤝 Contributing

Feel free to submit issues and enhancement requests!

## 📄 License

MIT License

## 👨‍💻 Author

Built with ❤️ for Vietnamese e-commerce market

---

**Ready to deploy on Vercel! 🚀**