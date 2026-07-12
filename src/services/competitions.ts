import { createClient } from '@/lib/supabase/server'

export async function getCompetitions(studentClass?: string) {
  const supabase = await createClient()

  const { data, error } = await supabase.from('competitions').select('*')

  if (error) {
    throw new Error('Failed to fetch competitions')
  }

  if (studentClass) {
    if (studentClass === 'School login') {
      return (data || []).filter((comp: any) => comp.is_school_wise)
    }
    return (data || []).filter(
      (comp: any) => !comp.is_school_wise && comp.eligible_classes && comp.eligible_classes.includes(studentClass)
    )
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
