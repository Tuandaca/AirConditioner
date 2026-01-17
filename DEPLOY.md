# Deployment Guide

## Pre-Deployment Checklist

- [ ] Update `.env` with production values
- [ ] Set strong `NEXTAUTH_SECRET` (use `openssl rand -base64 32`)
- [ ] Change default admin credentials
- [ ] Set up production database (PostgreSQL)
- [ ] Configure image storage (Cloudinary, AWS S3, or Vercel Blob)
- [ ] Update `NEXTAUTH_URL` to production domain

## Vercel Deployment

### Step 1: Prepare Repository
```bash
git add .
git commit -m "Initial commit"
git push origin main
```

### Step 2: Deploy to Vercel

1. Go to [vercel.com](https://vercel.com)
2. Import your GitHub repository
3. Configure environment variables:
   - `DATABASE_URL` - Your PostgreSQL connection string
   - `NEXTAUTH_URL` - Your production URL (e.g., `https://yourdomain.com`)
   - `NEXTAUTH_SECRET` - Generate with: `openssl rand -base64 32`

### Step 3: Set Up Database

**Option A: Vercel Postgres**
1. In Vercel dashboard, go to Storage
2. Create a Postgres database
3. Copy the connection string to `DATABASE_URL`

**Option B: External Database (Supabase, Neon, etc.)**
1. Create database in your provider
2. Copy connection string to `DATABASE_URL`

### Step 4: Run Migrations

After deployment, run:
```bash
# Via Vercel CLI
vercel env pull
npx prisma db push
npm run db:seed
```

Or use Vercel's deployment hooks to run migrations automatically.

## Environment Variables

### Required
```env
DATABASE_URL=postgresql://...
NEXTAUTH_URL=https://yourdomain.com
NEXTAUTH_SECRET=your-secret-here
```

### Optional
```env
ADMIN_EMAIL=admin@yourdomain.com
ADMIN_PASSWORD=your-secure-password
```

## Post-Deployment

1. **Seed Database**
   - Access Vercel deployment
   - Run: `npm run db:seed`

2. **Verify Admin Access**
   - Visit `/admin/login`
   - Login with seeded credentials
   - Change password immediately

3. **Configure Settings**
   - Go to `/admin/settings`
   - Update hotline, Zalo, Facebook links

4. **Add Products**
   - Go to `/admin/products/new`
   - Add your products

## Image Storage

Currently, the app uses image URLs. For production, consider:

1. **Vercel Blob Storage**
   ```bash
   npm install @vercel/blob
   ```

2. **Cloudinary**
   ```bash
   npm install cloudinary
   ```

3. **AWS S3**
   ```bash
   npm install @aws-sdk/client-s3
   ```

Update the media management page to support file uploads.

## Security Recommendations

1. **Rate Limiting**
   - Add rate limiting to API routes
   - Use Vercel's built-in rate limiting or Upstash

2. **CSRF Protection**
   - NextAuth includes CSRF protection
   - Ensure `NEXTAUTH_SECRET` is secure

3. **Password Security**
   - Use strong passwords
   - Consider 2FA for admin accounts

4. **API Security**
   - All admin routes are protected by middleware
   - Verify authentication on all admin API routes

## Monitoring

- Set up Vercel Analytics
- Monitor database connections
- Set up error tracking (Sentry, etc.)
- Monitor API response times

## Backup

- Regular database backups
- Export product data periodically
- Keep environment variables secure

## Troubleshooting

### Database Connection Issues
- Verify `DATABASE_URL` is correct
- Check database allows connections from Vercel IPs
- Ensure SSL is enabled if required

### Authentication Issues
- Verify `NEXTAUTH_SECRET` is set
- Check `NEXTAUTH_URL` matches your domain
- Clear cookies and try again

### Build Errors
- Check Prisma Client is generated
- Verify all environment variables are set
- Check build logs in Vercel dashboard
