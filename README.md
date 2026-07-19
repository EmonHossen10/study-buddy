# Study Management System

Simple study task manager built with Vite + React + React Router DOM + Tailwind + DaisyUI + Supabase.

## Setup

1. `npm install`
2. Copy `.env.example` to `.env` and fill in your Supabase credentials:
   ```
   VITE_SUPABASE_URL=...
   VITE_SUPABASE_ANON_KEY=...
   ```
3. In your Supabase project SQL editor, run `supabase_setup.sql`.
4. Enable Email/Password auth in Supabase (Auth → Providers).
5. `npm run dev`

## Features

- Register / Login / Logout
- Protected Dashboard
- Add / View / Edit / Delete study tasks
- Per-user data isolation via RLS
