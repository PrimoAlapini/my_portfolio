-- ============================================================
--  Migration : ajout du champ description sur la table projects
--  Date      : 2026-09-25
-- ============================================================

alter table public.projects
  add column if not exists description text default null;
