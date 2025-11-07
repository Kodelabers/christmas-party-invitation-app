# 🎄 CodeMas 2025 Setup Guide

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
```

**Where to find these values:**
- Go to your Supabase project dashboard
- Navigate to Settings > API
- Copy the "Project URL" → `NEXT_PUBLIC_SUPABASE_URL`
- Copy the "anon public" key → `NEXT_PUBLIC_SUPABASE_ANON_KEY`
- Copy the "service_role" key → `SUPABASE_SERVICE_ROLE_KEY` (keep this secret!)

### 4. Run the Development Server

```bash
npm run dev
```

Open [http://localhost:3000](http://localhost:3000) in your browser.

### 5. Test the Application

1. **Test Invitation Page:**
   - Visit: `http://localhost:3000?email=guest1@example.com`
   - You should see the RSVP form
   - Try responding with "Dolazim" or "Ne dolazim"

2. **Test Admin Dashboard:**
   - Visit: `http://localhost:3000/admin`
   - Login with: `admin@codemas2025.com` / `admin123`
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
   - `SUPABASE_SERVICE_ROLE_KEY`
5. Click "Deploy"

### Step 3: Update Email Addresses

Before sending invitations, update the email addresses in the `responses` table in Supabase:

```sql
-- Example: Update guest emails
UPDATE responses SET email = 'real-guest@example.com' WHERE email = 'guest1@example.com';
```

Or delete the seed data and insert real emails:

```sql
DELETE FROM responses;
INSERT INTO responses (email, response, updated_at) VALUES
  ('real-guest-1@example.com', NULL, NOW()),
  ('real-guest-2@example.com', NULL, NOW()),
  -- ... add all 50 real email addresses
```

## 📧 Sending Invitations

After deployment, send invitation links to guests:

```
https://your-app.vercel.app?email=guest@example.com
```

Replace `guest@example.com` with each guest's actual email address.

## 🔐 Admin Access

1. Update admin credentials in Supabase:
   ```sql
   UPDATE admins SET email = 'your-admin-email@example.com', password = 'your-secure-password' WHERE email = 'admin@codemas2025.com';
   ```

2. Access admin dashboard at: `https://your-app.vercel.app/admin`

## 🎨 Customization

### Update Branding

Edit `components/Header.tsx` to change the title and subtitle.

### Update Colors

Edit `tailwind.config.ts` to customize the Christmas color palette.

### Update Email Addresses

Run SQL queries in Supabase to update the guest list in the `responses` table.

## ⚠️ Important Notes

1. **Security:** The admin password is stored in plain text for simplicity. For production, consider implementing proper authentication with Supabase Auth.

2. **Email Validation:** Only emails that exist in the `responses` table can access the invitation page.

3. **Environment Variables:** Never commit `.env.local` to version control. It's already in `.gitignore`.

4. **Service Role Key:** Keep the `SUPABASE_SERVICE_ROLE_KEY` secret and never expose it in client-side code.

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

## 📞 Support

Made with ❤️ by the Neyho & KodeLab Teams

