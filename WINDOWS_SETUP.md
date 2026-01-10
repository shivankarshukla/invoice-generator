# Windows Setup & Deployment Guide

This guide will help you set up the project on your Windows laptop and deploy it to Vercel.

## Step 1: Transfer Files to Windows

1. **Copy the zip file** (`invoice-generator.zip`) to your Windows laptop
   - Use USB drive, email, cloud storage (Google Drive, Dropbox), or any method you prefer

2. **Extract the zip file** on Windows
   - Right-click the zip file → "Extract All"
   - Choose a location (e.g., `C:\Users\YourName\Desktop\invoice-generator`)
   - Click "Extract"

## Step 2: Install Required Software on Windows

### Install Node.js

1. **Download Node.js:**
   - Go to [nodejs.org](https://nodejs.org/)
   - Download the **LTS version** (recommended)
   - Choose Windows Installer (.msi)

2. **Install Node.js:**
   - Run the downloaded installer
   - Click "Next" through the installation
   - Make sure "Add to PATH" is checked
   - Click "Install"
   - Restart your computer if prompted

3. **Verify Installation:**
   - Open Command Prompt (Press `Win + R`, type `cmd`, press Enter)
   - Type: `node --version` (should show version like v20.x.x)
   - Type: `npm --version` (should show version like 10.x.x)

### Install Git (if not already installed)

1. **Download Git:**
   - Go to [git-scm.com/download/win](https://git-scm.com/download/win)
   - Download the Windows installer

2. **Install Git:**
   - Run the installer
   - Use default settings (just keep clicking "Next")
   - Choose "Git from the command line and also from 3rd-party software"
   - Click "Install"

3. **Verify Installation:**
   - Open Command Prompt
   - Type: `git --version` (should show version like git version 2.x.x)

## Step 3: Install Project Dependencies

1. **Open Command Prompt:**
   - Navigate to your project folder
   - Press `Win + R`, type `cmd`, press Enter
   - Or right-click in the project folder → "Open in Terminal" / "Git Bash Here"

2. **Navigate to project folder:**
   ```cmd
   cd C:\Users\YourName\Desktop\invoice-generator
   ```
   (Replace with your actual path)

3. **Install dependencies:**
   ```cmd
   npm install
   ```
   - This will take 1-2 minutes
   - Wait for it to complete

4. **Test the app locally (optional):**
   ```cmd
   npm run dev
   ```
   - Open browser to `http://localhost:5173`
   - Press `Ctrl + C` to stop when done testing

## Step 4: Create GitHub Repository

1. **Go to GitHub:**
   - Visit [github.com](https://github.com)
   - Sign in or create a free account

2. **Create new repository:**
   - Click the "+" icon (top right) → "New repository"
   - Repository name: `invoice-generator` (or any name you like)
   - Description: "Invoice Generator Web App"
   - Choose **Public** or **Private** (your choice)
   - **DO NOT** check "Initialize with README"
   - Click "Create repository"

3. **Copy the repository URL:**
   - You'll see a page with setup instructions
   - Copy the HTTPS URL (looks like: `https://github.com/yourusername/invoice-generator.git`)

## Step 5: Push Code to GitHub from Windows

1. **Open Command Prompt in project folder:**
   - Navigate to your project folder in Command Prompt

2. **Initialize Git:**
   ```cmd
   git init
   ```

3. **Add all files:**
   ```cmd
   git add .
   ```

4. **Create first commit:**
   ```cmd
   git commit -m "Initial commit - Invoice Generator"
   ```

5. **Add GitHub repository:**
   ```cmd
   git remote add origin https://github.com/YOUR_USERNAME/YOUR_REPO_NAME.git
   ```
   (Replace YOUR_USERNAME and YOUR_REPO_NAME with your actual GitHub username and repository name)

6. **Rename branch to main:**
   ```cmd
   git branch -M main
   ```

7. **Push to GitHub:**
   ```cmd
   git push -u origin main
   ```
   - You'll be asked for GitHub username and password
   - **Note:** If you have 2FA enabled, use a Personal Access Token instead of password
   - To create a token: GitHub → Settings → Developer settings → Personal access tokens → Generate new token

## Step 6: Deploy to Vercel

1. **Go to Vercel:**
   - Visit [vercel.com](https://vercel.com)
   - Click "Sign Up" or "Log In"
   - Choose "Continue with GitHub" (easiest option)

2. **Import your project:**
   - Click "Add New..." → "Project"
   - You'll see your GitHub repositories
   - Find and click "Import" next to your `invoice-generator` repository

3. **Configure deployment:**
   - Framework Preset: **Vite** (should be auto-detected)
   - Build Command: `npm run build` (should be auto-filled)
   - Output Directory: `dist` (should be auto-filled)
   - Install Command: `npm install` (should be auto-filled)
   - Click "Deploy"

4. **Wait for deployment:**
   - Vercel will build your app (takes 1-2 minutes)
   - You'll see build logs in real-time
   - When done, you'll get a URL like: `https://invoice-generator-xyz.vercel.app`

5. **Your app is live! 🎉**
   - Share the URL with anyone
   - It works on mobile and desktop
   - Updates automatically when you push to GitHub

## Troubleshooting

### If `npm install` fails:
- Make sure Node.js is installed correctly
- Try: `npm cache clean --force` then `npm install` again

### If `git push` fails:
- Check your GitHub username and repository name
- Make sure you're logged into GitHub
- If using 2FA, use Personal Access Token instead of password

### If Vercel build fails:
- Check the build logs in Vercel dashboard
- Make sure `npm run build` works locally first
- Check that all files are committed to GitHub

## Quick Command Reference

```cmd
# Navigate to project
cd C:\path\to\invoice-generator

# Install dependencies
npm install

# Test locally
npm run dev

# Git commands
git init
git add .
git commit -m "Your message"
git remote add origin https://github.com/username/repo.git
git push -u origin main
```

## Need Help?

If you encounter any issues:
1. Check the error message carefully
2. Make sure all software is installed correctly
3. Verify you're in the correct folder
4. Check that all steps were followed in order

Good luck with your deployment! 🚀


