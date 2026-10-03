# Amma's Pantry — Stage 3.5

A pitch-ready Next.js + Supabase e-commerce prototype for a traditional Indian foods brand.

## Included now

- Indian storefront with realistic prototype product photography
- Search, category filters and price sorting
- Dedicated product pages
- Persistent cart and checkout/order creation
- Supabase email/password authentication
- Customer order history and saved addresses
- Admin-only dashboard with live metrics
- Product add/edit/hide/delete
- Stock management and low-stock view
- Real product photo upload to Supabase Storage
- Admin order status management
- Admin customer email/order/spend view via the protected `profiles` table
- Demo Mode when Supabase environment variables are absent

## Upgrade your existing Supabase project

You already ran `supabase/schema.sql` for Stage 3. Do **not** replace it.

Open Supabase -> SQL Editor -> New query, paste the contents of:

`supabase/stage3_5_migration.sql`

and run it once.

This adds the customer email mirror used by the admin console and creates the `product-images` Storage bucket with admin-only write policies.

## Environment variables

`.env.local` locally, and the same values in Vercel:

```
NEXT_PUBLIC_SUPABASE_URL=...
NEXT_PUBLIC_SUPABASE_PUBLISHABLE_KEY=...
NEXT_PUBLIC_SITE_URL=http://localhost:3000
```

Never expose the Supabase service-role key in `NEXT_PUBLIC_*` variables.

## Local run

```
npm install
npm run dev
```

## Deploy update to Vercel

Replace/push these updated project files to the same GitHub repository. Vercel will redeploy automatically if Git integration is enabled. The existing Vercel environment variables remain attached to the project.

## Product photo workflow

Admin -> Products -> Add product -> Upload photo -> Save product.

The browser uploads the image to the public `product-images` bucket only after Supabase confirms the signed-in user is an admin. The product row stores the resulting public image URL.
