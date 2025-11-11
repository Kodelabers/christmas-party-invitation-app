# 🎄 KodeLab & Neyho Christmas Party

An online invitation and RSVP system for the Christmas party of KodeLab and Neyho.

### Prerequisites

- Node.js 18+ and npm/yarn
- A Supabase account and project

### Installation

1. Install dependencies:
```bash
npm install
```

2. Set up environment variables:
   - Copy `.env.local.example` to `.env.local`
   - Fill in your Supabase credentials:
     - `NEXT_PUBLIC_SUPABASE_URL`: Your Supabase project URL
     - `NEXT_PUBLIC_SUPABASE_ANON_KEY`: Your Supabase anonymous key

3. Set up the Supabase database:
   - Run the SQL script in `supabase-setup.sql` in your Supabase SQL editor
   - This will create the necessary tables and seed 50 email addresses

4. Run the development server:
```bash
npm run dev
```

5. Open [http://localhost:3000](http://localhost:3000) in your browser.

## 📊 Database Schema

### `responses` Table

Stores RSVP responses from invited guests.

| Column | Type | Description |
|--------|------|-------------|
| `email` | text (primary key) | Email address of the invited guest |
| `response` | text (nullable) | Response: `'Coming'`, `'Not coming'`, or `null` |
| `updated_at` | timestamp | Last update timestamp |

### `admins` Table

Stores admin user credentials for accessing the admin dashboard.

| Column | Type | Description |
|--------|------|-------------|
| `email` | text (primary key) | Admin email address |
| `password` | text | Admin password |

**Note:** In production, consider using proper authentication with hashed passwords.

## 🎯 Features

### Invitation Page

- Validates email from URL query parameter
- Shows RSVP form for valid invited emails
- Allows updating responses

### Admin Dashboard

- Protected login at `/admin`
- View all responses in a table
- See counters for "Coming", "Not coming", and "No Response"
- Logout functionality

## 🎨 Design

- Animated snowflake background
- Responsive design for mobile and desktop

## 🚢 Deployment on Vercel

1. Push your code to GitHub
2. Import the project in Vercel
3. Add environment variables in Vercel dashboard:
   - `NEXT_PUBLIC_SUPABASE_URL`
   - `NEXT_PUBLIC_SUPABASE_ANON_KEY`
4. Deploy!

After deployment, invitation links will look like:
```
https://your-app.vercel.app?email=guest@example.com
```

## 📝 Usage

### Sending Invitations

Send invitation links to guests in this format:
```
https://your-app.vercel.app?email=guest@example.com
```

### Admin Access

1. Navigate to `/admin`
2. Login with credentials from the `admins` table
3. View all responses and statistics

## 🛠️ Tech Stack

- **Next.js 14** with App Router
- **TypeScript**
- **Supabase** for database
- **TailwindCSS** for styling
- **React** for UI