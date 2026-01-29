# Database Setup Guide

This guide will help you set up the PostgreSQL database for the Yofit yoga platform.

## Prerequisites

- Node.js installed
- PostgreSQL installed (or use a cloud provider like Neon, Supabase, or Railway)

## Option 1: Local PostgreSQL Setup

### Windows

1. **Download and Install PostgreSQL**
   - Download from: https://www.postgresql.org/download/windows/
   - Run the installer and follow the setup wizard
   - Remember the password you set for the `postgres` user

2. **Create Database**
   ```powershell
   # Open PowerShell and connect to PostgreSQL
   psql -U postgres
   
   # Create the database
   CREATE DATABASE yofit;
   
   # Exit psql
   \q
   ```

3. **Update .env file**
   ```
   DATABASE_URL="postgresql://postgres:YOUR_PASSWORD@localhost:5432/yofit"
   ```

## Option 2: Cloud Database (Recommended for Quick Setup)

### Using Neon (Free Tier Available)

1. Go to https://neon.tech
2. Sign up for a free account
3. Create a new project named "yofit"
4. Copy the connection string
5. Update your `.env` file:
   ```
   DATABASE_URL="postgresql://username:password@hostname/database?sslmode=require"
   ```

### Using Supabase (Free Tier Available)

1. Go to https://supabase.com
2. Create a new project
3. Go to Settings → Database
4. Copy the "Connection string" (URI format)
5. Update your `.env` file with the connection string

## Running Migrations and Seed

Once your database is set up:

```powershell
# Run database migration
npx prisma migrate dev --name initial_setup

# Seed the database with yoga classes
npx prisma db seed
```

## Verify Setup

```powershell
# Open Prisma Studio to view your data
npx prisma studio
```

This will open a browser window where you can see all your seeded yoga classes.

## Troubleshooting

### "Can't reach database server"
- Make sure PostgreSQL is running
- Check that the port (5432) is correct
- Verify your username and password

### "Environment variable not found: DATABASE_URL"
- Make sure you have a `.env` file in the root directory
- Copy from `.env.example` if needed
- Restart your development server after updating `.env`

### Migration fails
- Make sure the database exists
- Check that your user has proper permissions
- Try running `npx prisma db push` instead for development

## Next Steps

After successful setup:

1. Start the development server: `npm run dev`
2. Navigate to `/pricing` and click "Start Free Trial"
3. You'll be redirected to `/classes` with access to all seeded classes
4. Click on any class to watch the video

## Database Schema Overview

- **User**: Stores user profiles with personalization data (goal, BMI, weight, height)
- **Subscription**: Tracks trial and paid subscriptions with `trialEndsAt` for 14-day trials
- **Class**: Yoga classes with videos, thumbnails, and goal-based filtering
- **Progress**: Tracks which classes users have completed
- **Booking**: For scheduling 1-on-1 sessions
- **PracticeStreak**: Gamification for tracking practice consistency
