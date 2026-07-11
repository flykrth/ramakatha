import { createClient } from '@/lib/supabase/server'

export async function getCompetitions(studentClass?: string) {
  const supabase = await createClient()

  let query = supabase.from('competitions').select('*')

  if (studentClass) {
    query = query.contains('eligible_classes', [studentClass])
  }

  const { data, error } = await query

  if (error) {
    throw new Error('Failed to fetch competitions')
  }

  return data || []
}

export async function getCompetitionById(id: string) {
  const supabase = await createClient()

  const { data, error } = await supabase
    .from('competitions')
    .select('*, competition_guidelines(*)')
    .eq('id', id)
    .single()

  if (error) {
    throw new Error('Failed to fetch competition details')
  }

  return data
}
