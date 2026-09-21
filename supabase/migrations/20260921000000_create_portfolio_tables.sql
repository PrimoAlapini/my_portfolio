-- ============================================================
--  Migration : création des tables du portfolio
--  Date      : 2026-09-21
-- ============================================================


-- ────────────────────────────────────────────────────────────
--  TABLE : projects
-- ────────────────────────────────────────────────────────────
create table if not exists public.projects (
  id           uuid        primary key default gen_random_uuid(),
  title        text        not null,
  category     text,
  tags         text[]      not null default '{}',
  image_url    text,
  link         text,
  is_visible   boolean     not null default true,
  sort_order   integer     not null default 0,
  created_at   timestamptz not null default now()
);

alter table public.projects enable row level security;

-- Accorder les privilèges PostgreSQL aux rôles Supabase
grant select on public.projects to anon, authenticated;
grant insert, update, delete on public.projects to authenticated;

create policy "projects_select_public"
  on public.projects for select
  using (true);

create policy "projects_insert_auth"
  on public.projects for insert
  with check (auth.role() = 'authenticated');

create policy "projects_update_auth"
  on public.projects for update
  using (auth.role() = 'authenticated');

create policy "projects_delete_auth"
  on public.projects for delete
  using (auth.role() = 'authenticated');


-- ────────────────────────────────────────────────────────────
--  TABLE : languages
-- ────────────────────────────────────────────────────────────
create table if not exists public.languages (
  id           uuid        primary key default gen_random_uuid(),
  name         text        not null,
  percent      integer     not null default 80 check (percent between 0 and 100),
  icon_url     text,
  is_visible   boolean     not null default true,
  sort_order   integer     not null default 0,
  created_at   timestamptz not null default now()
);

alter table public.languages enable row level security;

-- Accorder les privilèges PostgreSQL aux rôles Supabase
grant select on public.languages to anon, authenticated;
grant insert, update, delete on public.languages to authenticated;

create policy "languages_select_public"
  on public.languages for select
  using (true);

create policy "languages_insert_auth"
  on public.languages for insert
  with check (auth.role() = 'authenticated');

create policy "languages_update_auth"
  on public.languages for update
  using (auth.role() = 'authenticated');

create policy "languages_delete_auth"
  on public.languages for delete
  using (auth.role() = 'authenticated');


-- ────────────────────────────────────────────────────────────
--  TABLE : testimonials
-- ────────────────────────────────────────────────────────────
create table if not exists public.testimonials (
  id           uuid        primary key default gen_random_uuid(),
  name         text        not null,
  role         text,
  avatar_url   text,
  content      text        not null,
  rating       integer     not null default 5 check (rating between 1 and 5),
  is_visible   boolean     not null default true,
  created_at   timestamptz not null default now()
);

alter table public.testimonials enable row level security;

-- Accorder les privilèges PostgreSQL aux rôles Supabase
grant select on public.testimonials to anon, authenticated;
grant insert, update, delete on public.testimonials to authenticated;

create policy "testimonials_select_public"
  on public.testimonials for select
  using (true);

create policy "testimonials_insert_auth"
  on public.testimonials for insert
  with check (auth.role() = 'authenticated');

create policy "testimonials_update_auth"
  on public.testimonials for update
  using (auth.role() = 'authenticated');

create policy "testimonials_delete_auth"
  on public.testimonials for delete
  using (auth.role() = 'authenticated');
