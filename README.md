# Amma's Pantry — Stage 3 Prototype

A pitch-ready Indian pantry e-commerce prototype built with Next.js + Supabase.

## Included
- Indian-style responsive storefront
- Product catalog and category filters
- Persistent browser cart
- Checkout flow
- Email/password login and signup
- Customer account view
- Supabase PostgreSQL schema + Row Level Security
- Admin dashboard
- Product + inventory management
- Order status management
- Customer overview
- Demo mode when Supabase is not configured

## 1. Run locally

```bash
npm install
npm run dev
```
Open http://localhost:3000

Without environment variables, the app runs in **Demo Mode** using sample data and localStorage.

## 2. Connect Supabase
1. Create a project at https://supabase.com/dashboard
2. Open **SQL Editor** and run `supabase/schema.sql`.
3. In Supabase, open **Connect** and copy:
   - Project URL
   - Publishable key
4. Copy `.env.example` to `.env.local` and fill:

```env
NEXT_PUBLIC_SUPABASE_URL=https://YOUR_PROJECT.supabase.co
NEXT_PUBLIC_SUPABASE_PUBLISHABLE_KEY=sb_publishable_...
NEXT_PUBLIC_SITE_URL=http://localhost:3000
```

5. Restart `npm run dev`.
6. Sign up with your own email.
7. In Supabase SQL Editor run the final commented `update public.profiles ...` command, replacing `YOUR_EMAIL_HERE`, to give yourself admin access.

## 3. Deploy to Vercel
Recommended flow:
1. Create a GitHub repository and push this project.
2. Vercel -> Add New -> Project -> import the GitHub repo.
3. Add the same `NEXT_PUBLIC_SUPABASE_URL` and `NEXT_PUBLIC_SUPABASE_PUBLISHABLE_KEY` under Vercel Project -> Settings -> Environment Variables.
4. Deploy/redeploy.
5. In Supabase Auth -> URL Configuration, set the Site URL to your Vercel production URL.

## Important prototype note
Payments are intentionally not included in Stage 3. The current checkout records an order, but it does not charge the customer. Add Razorpay/UPI as a later stage before accepting real orders.

## Main routes
- `/` storefront
- `/shop` catalog
- `/cart` cart
- `/checkout` checkout
- `/login` / `/signup`
- `/account`
- `/admin`
- `/admin/products`
- `/admin/orders`
- `/admin/customers`
