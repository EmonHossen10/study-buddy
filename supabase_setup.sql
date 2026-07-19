-- =====================================================
-- STUDY MANAGEMENT SYSTEM
-- Complete Supabase Database Setup
-- =====================================================


-- =====================================================
-- 1. ENABLE UUID SUPPORT
-- =====================================================

create extension if not exists "pgcrypto";


-- =====================================================
-- 2. CREATE STUDY TASKS TABLE
-- =====================================================

create table if not exists public.study_tasks (

  -- Unique ID for each study task
  id uuid primary key default gen_random_uuid(),

  -- Authenticated user who owns the task
  user_id uuid not null
    references auth.users(id)
    on delete cascade,

  -- Study subject
  subject text not null,

  -- Study topic
  topic text not null,

  -- Planned study date
  study_date date not null,

  -- Study duration in minutes
  duration_minutes integer not null
    check (duration_minutes > 0),

  -- Study task status
  status text not null
    check (
      status in (
        'Planned',
        'In Progress',
        'Completed'
      )
    ),

  -- Optional study notes
  notes text,

  -- Date and time when task was created
  created_at timestamptz not null default now()

);


-- =====================================================
-- 3. CREATE INDEX
-- Improves user-specific task queries
-- =====================================================

create index if not exists study_tasks_user_id_idx
on public.study_tasks(user_id);


-- =====================================================
-- 4. ENABLE ROW LEVEL SECURITY (RLS)
-- =====================================================

alter table public.study_tasks
enable row level security;


-- =====================================================
-- 5. REMOVE OLD POLICIES IF THEY ALREADY EXIST
-- Allows this SQL to be run again safely
-- =====================================================

drop policy if exists "Users can select own tasks"
on public.study_tasks;

drop policy if exists "Users can insert own tasks"
on public.study_tasks;

drop policy if exists "Users can update own tasks"
on public.study_tasks;

drop policy if exists "Users can delete own tasks"
on public.study_tasks;


-- =====================================================
-- 6. SELECT POLICY
-- READ Operation
-- Users can only view their own study tasks
-- =====================================================

create policy "Users can select own tasks"

on public.study_tasks

for select

to authenticated

using (
  (select auth.uid()) = user_id
);


-- =====================================================
-- 7. INSERT POLICY
-- CREATE Operation
-- Users can only create study tasks for themselves
-- =====================================================

create policy "Users can insert own tasks"

on public.study_tasks

for insert

to authenticated

with check (
  (select auth.uid()) = user_id
);


-- =====================================================
-- 8. UPDATE POLICY
-- UPDATE Operation
-- Users can only update their own study tasks
-- =====================================================

create policy "Users can update own tasks"

on public.study_tasks

for update

to authenticated

using (
  (select auth.uid()) = user_id
)

with check (
  (select auth.uid()) = user_id
);


-- =====================================================
-- 9. DELETE POLICY
-- DELETE Operation
-- Users can only delete their own study tasks
-- =====================================================

create policy "Users can delete own tasks"

on public.study_tasks

for delete

to authenticated

using (
  (select auth.uid()) = user_id
);