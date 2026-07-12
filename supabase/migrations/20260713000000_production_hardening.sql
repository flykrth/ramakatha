-- Migration: Hardening student registrations and optimizing query performance

-- 1. Drop the old composite unique constraint
alter table public.student_registrations drop constraint if exists student_registrations_student_id_competition_id_key;

-- 2. Add table-level unique constraint on student_id to strictly enforce the "exactly 1 registration total" business rule
alter table public.student_registrations add constraint student_registrations_student_id_key unique (student_id);

-- 3. Create indexes on foreign keys to optimize query performance and cascade deletes
create index if not exists idx_student_registrations_student_id on public.student_registrations(student_id);
create index if not exists idx_student_registrations_competition_id on public.student_registrations(competition_id);
create index if not exists idx_competition_guidelines_competition_id on public.competition_guidelines(competition_id);
