create table if not exists public.ai_or_not_scores (
  id uuid primary key default gen_random_uuid(),
  session_code text not null,
  player_name text not null,
  correct integer not null default 0,
  wrong integer not null default 0,
  answered integer not null default 0,
  total integer not null default 20,
  percent integer not null default 0,
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now(),
  unique (session_code, player_name)
);

alter table public.ai_or_not_scores enable row level security;

drop policy if exists "ai_or_not_scores_select" on public.ai_or_not_scores;
drop policy if exists "ai_or_not_scores_insert" on public.ai_or_not_scores;
drop policy if exists "ai_or_not_scores_update" on public.ai_or_not_scores;

create policy "ai_or_not_scores_select"
on public.ai_or_not_scores
for select
using (true);

create policy "ai_or_not_scores_insert"
on public.ai_or_not_scores
for insert
with check (
  length(session_code) between 3 and 20
  and length(player_name) between 1 and 40
);

create policy "ai_or_not_scores_update"
on public.ai_or_not_scores
for update
using (true)
with check (
  length(session_code) between 3 and 20
  and length(player_name) between 1 and 40
);
