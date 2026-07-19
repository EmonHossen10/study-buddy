-- Study Management System - Supabase setup

create table if not exists public.study_tasks (
  id uuid primary key default gen_random_uuid(),
  user_id uuid references auth.users(id) on delete cascade not null,
  subject text not null,
  topic text not null,
  study_date date not null,
  duration_minutes integer not null,
  status text not null,
  notes text,
  created_at timestamptz default now()
);

alter table public.study_tasks enable row level security;

create policy "Users can select own tasks"
  on public.study_tasks for select
  using (auth.uid() = user_id);

create policy "Users can insert own tasks"
  on public.study_tasks for insert
  with check (auth.uid() = user_id);

create policy "Users can update own tasks"
  on public.study_tasks for update
  using (auth.uid() = user_id)
  with check (auth.uid() = user_id);

create policy "Users can delete own tasks"
  on public.study_tasks for delete
  using (auth.uid() = user_id);
