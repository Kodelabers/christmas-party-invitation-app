
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
SUPABASE_SERVICE_ROLE_KEY=your_supabase_service_role_key
SENDGRID_API_KEY=your_sendgrid_api_key
SENDGRID_FROM_EMAIL=sender@example.com
NEXT_PUBLIC_APP_URL=http://localhost:3000
```

**Where to find these values:**
- Supabase dashboard → Settings → API
- SendGrid dashboard → Settings → API Keys
- `NEXT_PUBLIC_APP_URL` should match the deployed URL guests will open

### 4. Run the Development Server

```bash
npm run dev
```

Open [http://localhost:3000](http://localhost:3000) in your browser.

### 5. Test the Application

1. **Test Invitation Page:**
   - After seeding the database, copy a guest `id`
   - Visit: `http://localhost:3000/{id}`
   - You should see their personalised invite page

2. **Test Admin Dashboard:**
   - Visit: `http://localhost:3000/admin`
   - Send yourself an invite and confirm the email arrives

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