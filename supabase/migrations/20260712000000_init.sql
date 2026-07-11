-- Enable UUID generation
create extension if not exists "uuid-ossp";

-- 1. Create Students Table
create table public.students (
  id uuid primary key references auth.users(id) on delete cascade,
  full_name text not null,
  email text unique not null,
  phone text not null,
  gender text not null,
  address text not null,
  school_name text not null,
  place text not null,
  class text not null,
  created_at timestamptz default now() not null,
  updated_at timestamptz default now() not null
);

-- 2. Create Competitions Table
create table public.competitions (
  id uuid primary key default gen_random_uuid(),
  title text not null,
  description text not null,
  category text not null check (category in ('Music', 'Dance', 'Literature', 'Fine Arts')),
  event_date timestamptz not null,
  venue text not null,
  duration text not null,
  age_group text not null,
  eligible_classes text[] not null, -- e.g. {'9', '10', '11', '12'}
  max_team_size integer default 1 not null,
  status text default 'open' not null check (status in ('open', 'waitlist', 'closed')),
  created_at timestamptz default now() not null,
  updated_at timestamptz default now() not null
);

-- 3. Create Competition Guidelines Table
create table public.competition_guidelines (
  id uuid primary key default gen_random_uuid(),
  competition_id uuid not null references public.competitions(id) on delete cascade unique,
  general_rules text[] not null,
  scoring_criteria jsonb not null, -- Array of {criteria: string, max_points: number}
  created_at timestamptz default now() not null,
  updated_at timestamptz default now() not null
);

-- 4. Create Student Registrations Table
create table public.student_registrations (
  id uuid primary key default gen_random_uuid(),
  student_id uuid not null references public.students(id) on delete cascade,
  competition_id uuid not null references public.competitions(id) on delete cascade,
  registration_id text unique not null, -- Format e.g., 'RK-2026-CV-8492'
  status text default 'confirmed' not null check (status in ('confirmed', 'waitlist', 'cancelled')),
  created_at timestamptz default now() not null,
  updated_at timestamptz default now() not null,
  unique(student_id, competition_id)
);

-- 5. Updated At Trigger Function
create or replace function public.handle_updated_at()
returns trigger as $$
begin
  new.updated_at = now();
  return new;
end;
$$ language plpgsql;

-- Apply triggers
create trigger set_updated_at_students
before update on public.students
for each row execute function public.handle_updated_at();

create trigger set_updated_at_competitions
before update on public.competitions
for each row execute function public.handle_updated_at();

create trigger set_updated_at_guidelines
before update on public.competition_guidelines
for each row execute function public.handle_updated_at();

create trigger set_updated_at_registrations
before update on public.student_registrations
for each row execute function public.handle_updated_at();

-- 6. Enable Row Level Security (RLS)
alter table public.students enable row level security;
alter table public.competitions enable row level security;
alter table public.competition_guidelines enable row level security;
alter table public.student_registrations enable row level security;

-- 7. Define RLS Policies

-- Students Policies
create policy "Allow students to view their own profile"
  on public.students for select
  using (auth.uid() = id);

create policy "Allow students to insert their own profile"
  on public.students for insert
  with check (auth.uid() = id);

create policy "Allow students to update their own profile"
  on public.students for update
  using (auth.uid() = id);

-- Competitions Policies (Public Read Access)
create policy "Allow public read access to competitions"
  on public.competitions for select
  to authenticated, anon
  using (true);

-- Guidelines Policies (Public Read Access)
create policy "Allow public read access to guidelines"
  on public.competition_guidelines for select
  to authenticated, anon
  using (true);

-- Registrations Policies
create policy "Allow students to view their own registrations"
  on public.student_registrations for select
  using (auth.uid() = student_id);

create policy "Allow students to register for competitions"
  on public.student_registrations for insert
  with check (auth.uid() = student_id);

create policy "Allow students to cancel their registrations"
  on public.student_registrations for delete
  using (auth.uid() = student_id);
