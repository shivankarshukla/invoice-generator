# Deployment Guide - Vercel

This guide will help you deploy the Invoice Generator application to Vercel for free.

## Prerequisites

1. A GitHub account (free)
2. A Vercel account (free)

## Step 1: Push Code to GitHub

1. **Create a GitHub repository:**
   - Go to [github.com](https://github.com)
   - Click "New repository"
   - Name it (e.g., "invoice-generator")
   - Make it public or private (your choice)
   - Don't initialize with README
   - Click "Create repository"

2. **Push your code to GitHub:**
   ```bash
   # Initialize git (if not already done)
   git init
   
   # Add all files
   git add .
   
   # Commit
   git commit -m "Initial commit - Invoice Generator"
   
   # Add your GitHub repository as remote (replace YOUR_USERNAME and REPO_NAME)
   git remote add origin https://github.com/YOUR_USERNAME/REPO_NAME.git
   
   # Push to GitHub
   git branch -M main
   git push -u origin main
   ```

## Step 2: Deploy to Vercel

### Option A: Using Vercel Website (Recommended)

1. **Sign up/Login to Vercel:**
   - Go to [vercel.com](https://vercel.com)
   - Sign up with your GitHub account (easiest option)

2. **Import your project:**
   - Click "Add New..." → "Project"
   - Select your GitHub repository
   - Vercel will auto-detect it's a Vite project

3. **Configure build settings:**
   - Framework Preset: Vite (should be auto-detected)
   - Build Command: `npm run build` (should be auto-filled)
   - Output Directory: `dist` (should be auto-filled)
   - Install Command: `npm install` (should be auto-filled)
   - Click "Deploy"

4. **Wait for deployment:**
   - Vercel will build and deploy your app
   - This usually takes 1-2 minutes
   - You'll get a URL like: `https://your-app-name.vercel.app`

### Option B: Using Vercel CLI

1. **Install Vercel CLI:**
   ```bash
   npm install -g vercel
   ```

2. **Login to Vercel:**
   ```bash
   vercel login
   ```

3. **Deploy:**
   ```bash
   vercel
   ```
   - Follow the prompts
   - It will ask if you want to link to an existing project or create new
   - Choose your settings and deploy

## Step 3: Access Your App

Once deployed, you'll get:
- **Production URL**: `https://your-app-name.vercel.app`
- **Preview URLs**: For each commit/pull request

## Custom Domain (Optional)

You can add a custom domain in Vercel dashboard:
1. Go to your project settings
2. Click "Domains"
3. Add your custom domain

## Automatic Deployments

Vercel automatically:
- Deploys on every push to main branch
- Creates preview deployments for pull requests
- Updates production when you merge PRs

## Troubleshooting

If build fails:
- Check build logs in Vercel dashboard
- Ensure all dependencies are in `package.json`
- Make sure `npm run build` works locally first

## Free Tier Limits

Vercel free tier includes:
- ✅ Unlimited deployments
- ✅ 100GB bandwidth per month
- ✅ Automatic HTTPS
- ✅ Custom domains
- ✅ Preview deployments

Perfect for your invoice generator app!


