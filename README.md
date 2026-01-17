# Air Conditioner E-Commerce Website

A production-ready air conditioner e-commerce website built with Next.js, featuring separate customer and admin sites.

## Features

### Customer Site (Public)
- 🏠 Modern homepage with hero section and featured products
- 📦 Product listing page with advanced filters (brand, price, HP, inverter)
- 🔍 Product detail pages with image gallery, specifications, and benefits
- 💬 Floating chat buttons for Zalo and Facebook
- 📱 Mobile-first, responsive design
- ⚡ High performance with Next.js App Router

### Admin Site (Protected)
- 🔐 Secure authentication with NextAuth.js
- 📊 Dashboard with product overview and statistics
- ✏️ Full CRUD operations for products
- 🖼️ Media management (upload, preview, delete images)
- ⚙️ Site configuration (hotline, social links)
- 🎨 Clean, intuitive admin interface

## Tech Stack

- **Framework**: Next.js 14 (App Router)
- **Styling**: Tailwind CSS
- **UI Components**: Shadcn UI
- **Database**: PostgreSQL (via Prisma ORM)
- **Authentication**: NextAuth.js
- **Type Safety**: TypeScript

## Getting Started

### Prerequisites

- Node.js 18+ and npm/yarn
- PostgreSQL database
- Git

### Installation

1. **Clone the repository**
   ```bash
   git clone <repository-url>
   cd AirConditioner
   ```

2. **Install dependencies**
   ```bash
   npm install
   ```

3. **Set up environment variables**
   
   Create a `.env` file in the root directory:
   ```env
   # Database
   DATABASE_URL="postgresql://user:password@localhost:5432/airconditioner?schema=public"

   # NextAuth
   NEXTAUTH_URL=http://localhost:3000
   NEXTAUTH_SECRET=your-secret-key-here-change-in-production

   # Admin credentials (for initial setup)
   ADMIN_EMAIL=admin@example.com
   ADMIN_PASSWORD=admin123
   ```

4. **Set up the database**
   ```bash
   # Generate Prisma Client
   npx prisma generate

   # Push schema to database
   npx prisma db push

   # Seed the database with sample data
   npm run db:seed
   ```

5. **Run the development server**
   ```bash
   npm run dev
   ```

6. **Open your browser**
   - Customer site: http://localhost:3000
   - Admin site: http://localhost:3000/admin
   - Login with: `admin@example.com` / `admin123`

## Project Structure

```
├── app/
│   ├── admin/              # Admin site pages
│   │   ├── login/          # Admin login
│   │   ├── products/       # Product management
│   │   ├── media/          # Media management
│   │   └── settings/       # Site settings
│   ├── api/                # API routes
│   │   ├── admin/          # Admin API endpoints
│   │   ├── auth/           # Authentication
│   │   └── products/       # Product API
│   ├── products/           # Customer product pages
│   └── page.tsx            # Homepage
├── components/
│   ├── admin/              # Admin components
│   └── ui/                 # Shadcn UI components
├── lib/                    # Shared utilities
├── prisma/
│   ├── schema.prisma       # Database schema
│   └── seed.ts             # Database seed
└── types/                  # TypeScript types
```

## Database Schema

### Product
- Basic info: name, slug, description, price
- Specifications: brand, horsepower, inverter
- Media: images array
- Metadata: status, featured, specifications (JSON), benefits

### User
- Authentication: email, password (hashed)
- Role-based access control

### Settings
- Key-value pairs for site configuration

## API Routes

### Public API
- `GET /api/products` - List products with filters
- `GET /api/products/[id]` - Get product by ID or slug
- `GET /api/settings` - Get site settings

### Admin API (Protected)
- `POST /api/admin/products` - Create product
- `PUT /api/admin/products/[id]` - Update product
- `DELETE /api/admin/products/[id]` - Delete product
- `PUT /api/admin/settings` - Update settings

## Deployment

### Vercel (Recommended)

1. Push your code to GitHub
2. Import project in Vercel
3. Add environment variables
4. Set up PostgreSQL database (Vercel Postgres or external)
5. Deploy!

### Environment Variables for Production

Make sure to set:
- `DATABASE_URL` - Your production database URL
- `NEXTAUTH_URL` - Your production domain
- `NEXTAUTH_SECRET` - A strong random secret (use `openssl rand -base64 32`)

## Development

### Available Scripts

- `npm run dev` - Start development server
- `npm run build` - Build for production
- `npm run start` - Start production server
- `npm run db:push` - Push Prisma schema to database
- `npm run db:studio` - Open Prisma Studio
- `npm run db:seed` - Seed database with sample data

### Adding New Products

1. Go to `/admin/products/new`
2. Fill in product information
3. Add images (URLs for now - can integrate with cloud storage)
4. Add benefits and specifications
5. Save!

## Customization

### Styling
- Modify `tailwind.config.ts` for theme customization
- Update `app/globals.css` for global styles

### Components
- All UI components are in `components/ui/` (Shadcn UI)
- Customize or extend as needed

### Database
- Modify `prisma/schema.prisma` for schema changes
- Run `npx prisma db push` to apply changes

## Security Notes

- ⚠️ Change default admin credentials in production
- ⚠️ Use strong `NEXTAUTH_SECRET` in production
- ⚠️ Implement proper password hashing (bcrypt is included)
- ⚠️ Add rate limiting for API routes
- ⚠️ Implement image upload validation
- ⚠️ Add CSRF protection

## License

MIT

## Support

For issues and questions, please open an issue on GitHub.
