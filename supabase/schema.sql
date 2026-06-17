-- ============================================================
-- Portfolio website — Supabase schema
-- Run this in your Supabase SQL editor to initialize the DB.
-- ============================================================

-- Contacts table: receives validated form submissions
create table if not exists public.contacts (
  id          uuid primary key default gen_random_uuid(),
  created_at  timestamptz not null default now(),
  name        text not null check (char_length(name) between 2 and 80),
  email       text not null check (email ~* '^[^@]+@[^@]+\.[^@]+$'),
  subject     text not null check (char_length(subject) between 4 and 120),
  message     text not null check (char_length(message) between 20 and 2000),
  read        boolean not null default false
);

-- Row-Level Security: only service-role can read; anonymous can insert
alter table public.contacts enable row level security;

create policy "Allow anon insert"
  on public.contacts for insert
  to anon
  with check (true);

create policy "Allow authenticated read"
  on public.contacts for select
  to authenticated
  using (true);

-- ============================================================
-- Projects table: sourced dynamically in the Projects component
-- ============================================================
create table if not exists public.projects (
  id               uuid primary key default gen_random_uuid(),
  created_at       timestamptz not null default now(),
  title            text not null,
  slug             text not null unique,
  description      text not null,
  long_description text,
  tech_tags        text[] not null default '{}',
  live_url         text,
  github_url       text,
  featured         boolean not null default false,
  order_index      integer not null default 0,
  status           text not null default 'live'
                     check (status in ('live', 'wip', 'archived'))
);

alter table public.projects enable row level security;

create policy "Public read"
  on public.projects for select
  to anon
  using (true);

-- Seed with the two featured projects
insert into public.projects
  (title, slug, description, long_description, tech_tags, featured, order_index, status)
values
(
  'RecoveryCircle',
  'recoverycircle',
  'A full-stack peer-support platform for addiction recovery communities, featuring secure OAuth authentication, role-based access control, and privacy-first transaction architecture.',
  'RecoveryCircle is a production-grade community platform built to serve users in sensitive recovery journeys. The system integrates Google OAuth for frictionless, password-free onboarding while enforcing granular role-based permissions across Admin, Moderator, and Member tiers. All sensitive user interactions and support-session records are stored behind a transactional write layer that guarantees data consistency even under concurrent load.',
  ARRAY['Next.js','TypeScript','Google OAuth','MongoDB','Node.js','Tailwind CSS','JWT','RBAC'],
  true,
  1,
  'live'
),
(
  'Docu-Pulse',
  'docu-pulse',
  'A GitHub-native automation agent that monitors pull requests, parses code-logic diffs, and auto-generates or updates inline documentation — keeping your docs permanently in sync with your codebase.',
  'Docu-Pulse sits as a GitHub App on your repository and fires on every pull request event. It uses static AST analysis to detect semantic changes in function signatures, exported interfaces, and business-logic branches — then generates or patches the corresponding JSDoc / markdown documentation in the same PR.',
  ARRAY['Node.js','TypeScript','GitHub Apps API','AST Parsing','OpenAI API','Webhooks','Docker','GitHub Actions'],
  true,
  2,
  'wip'
);
