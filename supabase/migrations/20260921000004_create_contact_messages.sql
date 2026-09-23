-- ============================================================
--  Migration : table contact_messages
--  Date      : 2026-09-21
-- ============================================================

create table if not exists public.contact_messages (
  id         uuid        primary key default gen_random_uuid(),
  nom        text        not null,
  email      text        not null,
  phone      text,
  service    text,
  budget     text,
  pays       text,
  message    text        not null,
  lu         boolean     not null default false,
  created_at timestamptz not null default now()
);

alter table public.contact_messages enable row level security;

-- Tout le monde peut envoyer un message
grant insert on public.contact_messages to anon, authenticated;
-- Seul l'admin peut lire
grant select, update, delete on public.contact_messages to authenticated;

create policy "contact_insert_public"
  on public.contact_messages for insert
  with check (true);

create policy "contact_select_auth"
  on public.contact_messages for select
  using (auth.role() = 'authenticated');

create policy "contact_update_auth"
  on public.contact_messages for update
  using (auth.role() = 'authenticated');

create policy "contact_delete_auth"
  on public.contact_messages for delete
  using (auth.role() = 'authenticated');

-- Index pour trier par date dans l'admin
create index if not exists contact_messages_created_at_idx
  on public.contact_messages (created_at desc);
