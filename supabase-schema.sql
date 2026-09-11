-- Cole este arquivo no SQL Editor do seu projeto Supabase gratuito.
create table if not exists public.notes (
  user_id uuid primary key references auth.users(id) on delete cascade,
  content text not null default '',
  updated_at timestamptz not null default now()
);

create table if not exists public.progress (
  user_id uuid references auth.users(id) on delete cascade,
  course_name text not null,
  completed_lessons integer not null default 0,
  updated_at timestamptz not null default now(),
  primary key (user_id, course_name)
);

alter table public.notes enable row level security;
alter table public.progress enable row level security;

create policy "aluno acessa suas notas" on public.notes for all using (auth.uid() = user_id) with check (auth.uid() = user_id);
create policy "aluno acessa seu progresso" on public.progress for all using (auth.uid() = user_id) with check (auth.uid() = user_id);