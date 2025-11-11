
## Quick Start

### 1. Install Dependencies

```bash
npm install
```

### 2. Set Up Supabase

1. Create a new Supabase project at [supabase.com](https://supabase.com)
2. Go to your project's SQL Editor
3. Run the SQL script from `supabase-setup.sql` to create tables and seed data
4. Go to Settings > API to get your credentials

### 3. Configure Environment Variables

Create a `.env.local` file in the root directory with:

```env
NEXT_PUBLIC_SUPABASE_URL=your_supabase_project_url
NEXT_PUBLIC_SUPABASE_ANON_KEY=your_supabase_anon_key
```

**Where to find these values:**
- Go to your Supabase project dashboard
- Navigate to Settings > API
- Copy the "Project URL" → `NEXT_PUBLIC_SUPABASE_URL`
- Copy the "anon public" key → `NEXT_PUBLIC_SUPABASE_ANON_KEY`

### 4. Run the Development Server

```bash
npm run dev
```

Open [http://localhost:3000](http://localhost:3000) in your browser.

### 5. Test the Application

1. **Test Invitation Page:**
   - Visit: `http://localhost:3000?email=guest1@example.com`
   - You should see the RSVP form
   - Try responding with "Yes or "No"

2. **Test Admin Dashboard:**
   - Visit: `http://localhost:3000/admin`
   - View all responses and statistics

## 🚀 Deploying to Vercel

### Step 1: Push to GitHub

```bash
git init
git add .
git commit -m "Initial commit"
git remote add origin your-github-repo-url
git push -u origin main
```

### Step 2: Deploy on Vercel

1. Go to [vercel.com](https://vercel.com)
2. Click "New Project"
3. Import your GitHub repository
4. Add environment variables:
   - `NEXT_PUBLIC_SUPABASE_URL`
   - `NEXT_PUBLIC_SUPABASE_ANON_KEY`
5. Click "Deploy"

### Step 3: Update Email Addresses

## 📧 Sending Invitations

After deployment, send invitation links to guests:
```
https://your-app.vercel.app?email=guest@example.com
```
## 🐛 Troubleshooting

### "This invitation is not valid"
- Check that the email exists in the `responses` table in Supabase
- Verify the email parameter in the URL matches exactly (case-sensitive)

### Admin login not working
- Verify the email and password exist in the `admins` table
- Check browser console for errors
- Ensure Supabase connection is working

### Database connection errors
- Verify all environment variables are set correctly
- Check that Supabase project is active
- Ensure RLS policies allow necessary operations (or disable RLS for these tables)