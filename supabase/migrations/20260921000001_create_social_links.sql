-- ============================================================
--  Migration : table social_links
--  Date      : 2026-09-21
-- ============================================================

-- ────────────────────────────────────────────────────────────
--  TABLE : social_links
-- ────────────────────────────────────────────────────────────
create table if not exists public.social_links (
  id           uuid        primary key default gen_random_uuid(),
  platform     text        not null,           -- ex: "Facebook", "LinkedIn"
  icon_class   text        not null,           -- classe Remix Icon ex: "ri-facebook-fill"
  url          text        not null default '#',
  is_visible   boolean     not null default true,
  sort_order   integer     not null default 0,
  created_at   timestamptz not null default now()
);

alter table public.social_links enable row level security;

grant select on public.social_links to anon, authenticated;
grant insert, update, delete on public.social_links to authenticated;

create policy "social_links_select_public"
  on public.social_links for select
  using (true);

create policy "social_links_insert_auth"
  on public.social_links for insert
  with check (auth.role() = 'authenticated');

create policy "social_links_update_auth"
  on public.social_links for update
  using (auth.role() = 'authenticated');

create policy "social_links_delete_auth"
  on public.social_links for delete
  using (auth.role() = 'authenticated');

-- ────────────────────────────────────────────────────────────
--  DONNÉES PAR DÉFAUT
-- ────────────────────────────────────────────────────────────
insert into public.social_links (platform, icon_class, url, sort_order) values
  ('Facebook',  'ri-facebook-fill',  '#', 1),
  ('Twitter',   'ri-twitter-fill',   '#', 2),
  ('Instagram', 'ri-instagram-line', '#', 3),
  ('LinkedIn',  'ri-linkedin-fill',  '#', 4),
  ('Behance',   'ri-behance-fill',   '#', 5),
  ('Dribbble',  'ri-dribbble-line',  '#', 6);
