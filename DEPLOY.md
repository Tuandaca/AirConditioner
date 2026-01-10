# 🚀 Hướng dẫn Deploy Website Lên Online

## Phương án 1: Deploy lên Vercel (KHUYẾN NGHỊ - Miễn phí & Dễ nhất)

Vercel là platform được tối ưu đặc biệt cho Next.js, hoàn toàn miễn phí và rất dễ sử dụng.

### Bước 1: Chuẩn bị GitHub Repository

1. **Tạo repository mới trên GitHub:**
   - Vào [github.com](https://github.com) và đăng nhập
   - Click "New repository"
   - Đặt tên: `air-conditioner-shop` (hoặc tên khác)
   - Chọn Public hoặc Private
   - **KHÔNG** tích "Initialize with README" (vì đã có code rồi)
   - Click "Create repository"

2. **Push code lên GitHub:**

```bash
# Khởi tạo git (nếu chưa có)
git init

# Thêm tất cả files
git add .

# Commit code
git commit -m "Initial commit: Air Conditioner E-commerce Website"

# Thêm remote repository (thay YOUR_USERNAME và YOUR_REPO_NAME)
git remote add origin https://github.com/YOUR_USERNAME/YOUR_REPO_NAME.git

# Push code lên GitHub
git branch -M main
git push -u origin main
```

### Bước 2: Deploy lên Vercel

1. **Đăng ký tài khoản Vercel:**
   - Vào [vercel.com](https://vercel.com)
   - Click "Sign Up" và đăng nhập bằng GitHub account

2. **Import Project:**
   - Trong Vercel dashboard, click "Add New..." → "Project"
   - Chọn repository vừa push lên GitHub
   - Click "Import"

3. **Cấu hình Project:**
   - **Framework Preset**: Next.js (tự động detect)
   - **Root Directory**: `./` (mặc định)
   - **Build Command**: `npm run build` (mặc định)
   - **Output Directory**: `.next` (mặc định)
   - **Install Command**: `npm install` (mặc định)

4. **Deploy:**
   - Click "Deploy"
   - Đợi 1-2 phút để build và deploy
   - Xong! Website sẽ có URL dạng: `https://your-project-name.vercel.app`

### Bước 3: Cập nhật Domain (Tùy chọn)

1. Trong Vercel dashboard → Project Settings → Domains
2. Thêm domain của bạn (ví dụ: `maylanh.com`)
3. Cấu hình DNS theo hướng dẫn của Vercel

---

## Phương án 2: Deploy lên Netlify (Miễn phí)

### Bước 1: Build Project

```bash
npm run build
npm run export  # Nếu cần static export
```

### Bước 2: Deploy

1. Vào [netlify.com](https://netlify.com)
2. Drag & drop thư mục `.next` vào Netlify
3. Hoặc kết nối GitHub repository tương tự Vercel

---

## Phương án 3: Deploy lên Server riêng (VPS/Cloud)

### Yêu cầu:
- Node.js 18+ installed
- PM2 hoặc process manager khác

### Các bước:

1. **Clone code lên server:**
```bash
git clone https://github.com/YOUR_USERNAME/YOUR_REPO_NAME.git
cd air-conditioner-shop
```

2. **Cài đặt dependencies:**
```bash
npm install --production
```

3. **Build project:**
```bash
npm run build
```

4. **Chạy production server:**
```bash
npm start
```

5. **Dùng PM2 để chạy background (khuyến nghị):**
```bash
npm install -g pm2
pm2 start npm --name "air-conditioner-shop" -- start
pm2 save
pm2 startup
```

6. **Cấu hình Nginx (reverse proxy):**
```nginx
server {
    listen 80;
    server_name your-domain.com;

    location / {
        proxy_pass http://localhost:3000;
        proxy_http_version 1.1;
        proxy_set_header Upgrade $http_upgrade;
        proxy_set_header Connection 'upgrade';
        proxy_set_header Host $host;
        proxy_cache_bypass $http_upgrade;
    }
}
```

---

## 📋 Checklist Trước Khi Deploy

- [ ] Build thành công (`npm run build`)
- [ ] Kiểm tra không có lỗi linting (`npm run lint`)
- [ ] Cập nhật thông tin liên hệ (Zalo, Phone, Email) trong code
- [ ] Thay placeholder images bằng ảnh thật
- [ ] Cập nhật product data với dữ liệu thật
- [ ] Kiểm tra responsive trên mobile
- [ ] Test tất cả các trang (Homepage, Products, Product Detail)

---

## 🔧 Environment Variables (Nếu cần)

Nếu muốn dùng environment variables, tạo file `.env.local`:

```env
NEXT_PUBLIC_ZALO_URL=https://zalo.me/your-zalo-id
NEXT_PUBLIC_PHONE_NUMBER=tel:your-phone-number
NEXT_PUBLIC_FACEBOOK_URL=https://m.me/your-facebook-page
```

Sau đó update code để dùng:
```typescript
const ZALO_URL = process.env.NEXT_PUBLIC_ZALO_URL || 'https://zalo.me/0912345678'
```

Trong Vercel: Project Settings → Environment Variables → Thêm các biến

---

## 🎯 Deploy Nhanh Nhất (Vercel CLI)

1. **Cài đặt Vercel CLI:**
```bash
npm install -g vercel
```

2. **Login:**
```bash
vercel login
```

3. **Deploy:**
```bash
vercel
```

4. **Deploy production:**
```bash
vercel --prod
```

---

## ⚡ Performance Tips

1. **Enable Image Optimization:** Đã có sẵn với Next.js Image component
2. **Enable Compression:** Vercel tự động enable
3. **CDN:** Vercel tự động dùng CDN global
4. **Analytics:** Có thể thêm Vercel Analytics (miễn phí)

---

## 🆘 Troubleshooting

### Lỗi build trên Vercel:
- Kiểm tra Node.js version (cần 18+)
- Kiểm tra `package.json` có đúng dependencies
- Xem build logs trong Vercel dashboard

### Website không load:
- Kiểm tra domain DNS settings
- Kiểm tra Vercel deployment status
- Xem logs trong Vercel dashboard

### Environment variables không hoạt động:
- Đảm bảo prefix với `NEXT_PUBLIC_` cho client-side variables
- Redeploy sau khi thay đổi env variables

---

## 📞 Hỗ trợ

Nếu gặp vấn đề, kiểm tra:
- [Next.js Documentation](https://nextjs.org/docs)
- [Vercel Documentation](https://vercel.com/docs)
- [Vercel Community](https://github.com/vercel/next.js/discussions)

---

**🎉 Chúc mừng! Website của bạn đã online!**