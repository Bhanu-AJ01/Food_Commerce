-- Amma's Pantry Stage 3 schema
-- Run this entire file in Supabase Dashboard -> SQL Editor.

create extension if not exists pgcrypto;

create type public.user_role as enum ('customer','admin');
create type public.order_status as enum ('placed','confirmed','preparing','shipped','delivered','cancelled');

create table public.profiles (
  id uuid primary key references auth.users(id) on delete cascade,
  full_name text,
  phone text,
  role public.user_role not null default 'customer',
  created_at timestamptz not null default now()
);

create table public.products (
  id uuid primary key default gen_random_uuid(),
  name text not null,
  slug text unique not null,
  description text not null default '',
  category text not null,
  price numeric(10,2) not null check (price >= 0),
  compare_at_price numeric(10,2),
  unit text not null,
  stock integer not null default 0 check (stock >= 0),
  featured boolean not null default false,
  active boolean not null default true,
  image_emoji text not null default '🥣',
  image_url text,
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now()
);

create table public.addresses (
  id uuid primary key default gen_random_uuid(),
  user_id uuid not null references public.profiles(id) on delete cascade,
  label text not null default 'Home',
  recipient_name text not null,
  phone text not null,
  line1 text not null,
  line2 text,
  city text not null,
  state text not null,
  pincode text not null,
  is_default boolean not null default false,
  created_at timestamptz not null default now()
);

create table public.orders (
  id uuid primary key default gen_random_uuid(),
  user_id uuid not null references public.profiles(id),
  order_number text unique not null,
  status public.order_status not null default 'placed',
  subtotal numeric(10,2) not null,
  delivery_fee numeric(10,2) not null default 0,
  total numeric(10,2) not null,
  shipping_address jsonb not null,
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now()
);

create table public.order_items (
  id uuid primary key default gen_random_uuid(),
  order_id uuid not null references public.orders(id) on delete cascade,
  product_id uuid references public.products(id),
  product_name text not null,
  quantity integer not null check (quantity > 0),
  unit_price numeric(10,2) not null,
  line_total numeric(10,2) not null
);

create or replace function public.handle_new_user()
returns trigger language plpgsql security definer set search_path = '' as $$
begin
  insert into public.profiles (id, full_name)
  values (new.id, coalesce(new.raw_user_meta_data ->> 'full_name',''));
  return new;
end; $$;

create trigger on_auth_user_created after insert on auth.users
for each row execute procedure public.handle_new_user();

create or replace function public.is_admin()
returns boolean language sql stable security definer set search_path = '' as $$
  select exists(select 1 from public.profiles where id = auth.uid() and role = 'admin');
$$;

alter table public.profiles enable row level security;
alter table public.products enable row level security;
alter table public.addresses enable row level security;
alter table public.orders enable row level security;
alter table public.order_items enable row level security;

create policy "profiles_self_read" on public.profiles for select using (id = auth.uid() or public.is_admin());
create policy "profiles_self_update" on public.profiles for update using (id = auth.uid()) with check (id = auth.uid());

create policy "products_public_read" on public.products for select using (active = true or public.is_admin());
create policy "products_admin_insert" on public.products for insert to authenticated with check (public.is_admin());
create policy "products_admin_update" on public.products for update to authenticated using (public.is_admin()) with check (public.is_admin());
create policy "products_admin_delete" on public.products for delete to authenticated using (public.is_admin());

create policy "addresses_own_all" on public.addresses for all to authenticated using (user_id = auth.uid() or public.is_admin()) with check (user_id = auth.uid() or public.is_admin());
create policy "orders_read" on public.orders for select to authenticated using (user_id = auth.uid() or public.is_admin());
create policy "orders_insert_own" on public.orders for insert to authenticated with check (user_id = auth.uid());
create policy "orders_admin_update" on public.orders for update to authenticated using (public.is_admin()) with check (public.is_admin());
create policy "order_items_read" on public.order_items for select to authenticated using (exists(select 1 from public.orders o where o.id=order_id and (o.user_id=auth.uid() or public.is_admin())));
create policy "order_items_insert" on public.order_items for insert to authenticated with check (exists(select 1 from public.orders o where o.id=order_id and o.user_id=auth.uid()));

insert into public.products (name,slug,description,category,price,compare_at_price,unit,stock,featured,active,image_emoji) values
('Pure Cow Ghee','pure-cow-ghee','Slow-cooked golden ghee with a rich, nutty aroma.','Ghee & Oils',650,720,'500 ml',42,true,true,'🫙'),
('Idli Dosa Mix','idli-dosa-mix','Soft idlis and crisp dosas with a quick traditional batter mix.','Ready Mixes',180,null,'500 g',68,true,true,'🥣'),
('Milagai Podi','milagai-podi','Roasted lentils, sesame and chillies — perfect with idli and dosa.','Podis & Spices',150,null,'200 g',31,true,true,'🌶️'),
('Sambar Powder','sambar-powder','A fragrant house blend inspired by a Tamil family kitchen.','Podis & Spices',160,null,'200 g',27,true,true,'🧂'),
('Ragi Malt Mix','ragi-malt-mix','Wholesome finger millet mix for a comforting breakfast drink.','Ready Mixes',200,null,'400 g',36,true,true,'🌾'),
('Filter Coffee Blend','filter-coffee-blend','Deep, aromatic South Indian coffee with a touch of chicory.','Pantry',280,null,'250 g',22,false,true,'☕'),
('Traditional Snacks Combo','murukku-combo','Crunchy murukku and ribbon pakoda packed for sharing.','Snacks',499,null,'2 × 250 g',16,true,true,'🥨'),
('Festive Pantry Hamper','festive-hamper','Ghee, podi, coffee and sweets in a gift-ready box.','Gift Hampers',999,null,'1 box',9,false,true,'🎁');

-- AFTER YOU SIGN UP WITH YOUR OWN EMAIL, run this once to make yourself admin:
-- update public.profiles set role='admin' where id=(select id from auth.users where email='YOUR_EMAIL_HERE');
