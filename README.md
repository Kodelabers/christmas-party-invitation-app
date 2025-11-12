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
   - Fill in your credentials:
     - `NEXT_PUBLIC_SUPABASE_URL`
     - `NEXT_PUBLIC_SUPABASE_ANON_KEY`
     - `SUPABASE_SERVICE_ROLE_KEY`
     - `SENDGRID_API_KEY`
     - `SENDGRID_FROM_EMAIL` (optional)
     - `NEXT_PUBLIC_APP_URL` (e.g. `https://christmas-party-invitation-app.vercel.app`)

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

Stores invited guests and their RSVP state.

| Column | Type | Description |
|--------|------|-------------|
| `id` | uuid (primary key) | Unique guest ID used in the URL (UUID v4) |
| `email` | text (unique) | Guest email address |
| `first_name` | varchar | Guest first name |
| `last_name` | varchar | Guest last name |
| `response` | text | `'Coming'`, `'Not coming'`, or `'No response'` (default) |
| `updated_at` | timestamptz | Last update timestamp |

### `admins` Table

Stores admin user credentials.

| Column | Type | Description |
|--------|------|-------------|
| `id` | bigint (primary key) | Auto-incrementing ID |
| `email` | text (unique) | Admin email address |
| `password_hash` | text | Bcrypt hashed password |

> Replace the seed admin hash in `supabase-setup.sql` before production.

## 🎯 Features

### Invitation Page

- Guests receive a personalised link: `/{id}`
- Greets them by name and asks for their response
- Allows updating an existing response at any time

### Admin Dashboard

- Protected login at `/admin`
- Add guests (first/last name + email) and automatically send SendGrid invites
- Filter responses (Coming / Not coming / No response)
- View counters and manage responses (including delete)
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
   - `SUPABASE_SERVICE_ROLE_KEY`
   - `SENDGRID_API_KEY`
   - `SENDGRID_FROM_EMAIL` (optional)
   - `NEXT_PUBLIC_APP_URL`
4. Deploy!

After deployment, invitation links will look like:
```
https://your-app.vercel.app/{id}
```

## 📝 Usage

### Sending Invitations

Use the admin dashboard “Send Email” form to add guests. Each guest receives a personalised email with their invitation link (`/{id}`). You can copy a link manually by using the guest ID from the table:
```
https://your-app.vercel.app/{id}
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