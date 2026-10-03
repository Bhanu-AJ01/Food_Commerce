-- Amma's Pantry Stage 3.5 upgrade
-- Run this ONCE in Supabase Dashboard -> SQL Editor -> New query.
-- Do not delete or replace your original schema.

alter table public.profiles add column if not exists email text;

-- Backfill existing users. This is run by you in the Supabase SQL Editor,
-- while browser users still cannot read auth.users directly.
update public.profiles p
set email = u.email
from auth.users u
where p.id = u.id and (p.email is null or p.email = '');

-- Future signups automatically copy email into the admin-readable profile row.
create or replace function public.handle_new_user()
returns trigger language plpgsql security definer set search_path = '' as $$
begin
  insert into public.profiles (id, full_name, email)
  values (new.id, coalesce(new.raw_user_meta_data ->> 'full_name',''), new.email);
  return new;
end; $$;

-- Public product image bucket. Product images are intentionally public storefront assets.
insert into storage.buckets (id, name, public)
values ('product-images','product-images',true)
on conflict (id) do update set public = true;

-- Anyone can view product images. Only authenticated admins can upload/change/delete them.
drop policy if exists "product_images_public_read" on storage.objects;
create policy "product_images_public_read" on storage.objects
for select using (bucket_id = 'product-images');

drop policy if exists "product_images_admin_insert" on storage.objects;
create policy "product_images_admin_insert" on storage.objects
for insert to authenticated
with check (bucket_id = 'product-images' and public.is_admin());

drop policy if exists "product_images_admin_update" on storage.objects;
create policy "product_images_admin_update" on storage.objects
for update to authenticated
using (bucket_id = 'product-images' and public.is_admin())
with check (bucket_id = 'product-images' and public.is_admin());

drop policy if exists "product_images_admin_delete" on storage.objects;
create policy "product_images_admin_delete" on storage.objects
for delete to authenticated
using (bucket_id = 'product-images' and public.is_admin());

-- Add generated prototype imagery to the seeded products if they are still present.
-- Local /products/... files work on Vercel for the included demo. Newly uploaded images
-- will use Supabase Storage public URLs automatically.

-- Give the original Stage 3 seed products realistic prototype photos immediately.
update public.products set image_url='/products/pure-cow-ghee.jpg' where slug='pure-cow-ghee' and image_url is null;
update public.products set image_url='/products/dosa-mix.jpg' where slug='idli-dosa-mix' and image_url is null;
update public.products set image_url='/products/idli-podi.jpg' where slug='milagai-podi' and image_url is null;
update public.products set image_url='/products/sambar-podi.jpg' where slug='sambar-powder' and image_url is null;
update public.products set image_url='/products/millet-dosa-mix.jpg' where slug='ragi-malt-mix' and image_url is null;
update public.products set image_url='/products/karuppu-kavuni-rice.jpg' where slug='filter-coffee-blend' and image_url is null;
update public.products set image_url='/products/peanut-chutney-podi.jpg' where slug='murukku-combo' and image_url is null;
update public.products set image_url='/products/rasam-podi.jpg' where slug='festive-hamper' and image_url is null;
