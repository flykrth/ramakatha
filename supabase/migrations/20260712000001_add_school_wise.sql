-- Migration: Add is_school_wise column to competitions table
alter table public.competitions add column if not exists is_school_wise boolean default false not null;
