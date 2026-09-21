-- ============================================================
--  Migration : tables chatbot portfolio
--  Date      : 2026-09-21
-- ============================================================

-- ────────────────────────────────────────────────────────────
--  TABLE : knowledge_base
--  Contient le contexte utilisé par l'IA (RAG)
-- ────────────────────────────────────────────────────────────
create table if not exists public.knowledge_base (
  id         uuid        primary key default gen_random_uuid(),
  type       text        not null check (type in ('profil','service','projet','faq','contact','competence')),
  titre      text,
  contenu    text        not null,
  tags       text[]      not null default '{}',
  actif      boolean     not null default true,
  sort_order integer     not null default 0,
  created_at timestamptz not null default now()
);

alter table public.knowledge_base enable row level security;

grant select on public.knowledge_base to anon, authenticated;
grant insert, update, delete on public.knowledge_base to authenticated;

create policy "kb_select_public"
  on public.knowledge_base for select
  using (actif = true);

create policy "kb_insert_auth"
  on public.knowledge_base for insert
  with check (auth.role() = 'authenticated');

create policy "kb_update_auth"
  on public.knowledge_base for update
  using (auth.role() = 'authenticated');

create policy "kb_delete_auth"
  on public.knowledge_base for delete
  using (auth.role() = 'authenticated');


-- ────────────────────────────────────────────────────────────
--  TABLE : chat_logs
--  Historique des échanges (analyse & amélioration)
-- ────────────────────────────────────────────────────────────
create table if not exists public.chat_logs (
  id           uuid        primary key default gen_random_uuid(),
  session_id   text        not null,
  message_user text        not null,
  message_bot  text        not null,
  created_at   timestamptz not null default now()
);

alter table public.chat_logs enable row level security;

grant insert on public.chat_logs to anon, authenticated;
grant select on public.chat_logs to authenticated;

create policy "chat_logs_insert_anon"
  on public.chat_logs for insert
  with check (true);

create policy "chat_logs_select_auth"
  on public.chat_logs for select
  using (auth.role() = 'authenticated');


-- ────────────────────────────────────────────────────────────
--  TABLE : rate_limits
--  Anti-abus : max N requêtes par session par minute
-- ────────────────────────────────────────────────────────────
create table if not exists public.rate_limits (
  id         uuid        primary key default gen_random_uuid(),
  session_id text        not null,
  created_at timestamptz not null default now()
);

alter table public.rate_limits enable row level security;

grant insert, select on public.rate_limits to anon, authenticated;

create policy "rate_limits_insert_anon"
  on public.rate_limits for insert
  with check (true);

create policy "rate_limits_select_anon"
  on public.rate_limits for select
  using (true);

-- Index pour accélérer les requêtes de comptage par session + date
create index if not exists rate_limits_session_time_idx
  on public.rate_limits (session_id, created_at desc);

-- Nettoyage automatique des vieilles entrées (> 1 heure)
create or replace function public.cleanup_rate_limits()
returns void language sql security definer as $$
  delete from public.rate_limits
  where created_at < now() - interval '1 hour';
$$;
