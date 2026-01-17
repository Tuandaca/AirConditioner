# Database Setup Guide

## Quick Start

1. **Create a PostgreSQL database**
   ```bash
   # Using psql
   createdb airconditioner
   
   # Or using SQL
   CREATE DATABASE airconditioner;
   ```

2. **Set DATABASE_URL in .env**
   ```env
   DATABASE_URL="postgresql://user:password@localhost:5432/airconditioner?schema=public"
   ```

3. **Run Prisma commands**
   ```bash
   # Generate Prisma Client
   npx prisma generate

   # Push schema to database
   npx prisma db push

   # Seed with sample data
   npm run db:seed
   ```

## Using Prisma Studio

View and edit your database with Prisma Studio:

```bash
npm run db:studio
```

This opens a GUI at http://localhost:5555

## Manual Setup (Alternative)

If you prefer migrations:

```bash
# Create migration
npx prisma migrate dev --name init

# Apply migrations
npx prisma migrate deploy
```

## Reset Database

To reset and reseed:

```bash
# Reset database (WARNING: Deletes all data)
npx prisma migrate reset

# Or manually
npx prisma db push --force-reset
npm run db:seed
```
