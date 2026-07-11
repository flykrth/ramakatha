import { createClient } from '@/lib/supabase/server'

function generateRegId(category: string): string {
  const catCode = category.substring(0, 2).toUpperCase()
  const randNum = Math.floor(1000 + Math.random() * 9000)
  return `RK-2026-${catCode}-${randNum}`
}

export async function registerForCompetition(studentId: string, competitionId: string, category: string) {
  const supabase = await createClient()

  // 1. Get competition details to check if it's school-wise
  const { data: comp, error: compError } = await supabase
    .from('competitions')
    .select('is_school_wise')
    .eq('id', competitionId)
    .single()

  if (compError || !comp) throw new Error('Competition not found')

  // 2. Check if already registered for this specific competition
  const { data: existing, error: checkError } = await supabase
    .from('student_registrations')
    .select('id')
    .eq('student_id', studentId)
    .eq('competition_id', competitionId)
    .maybeSingle()

  if (checkError) throw new Error('Database error checking registration')
  if (existing) throw new Error('You are already registered for this competition')

  // 3. If it's a class-category event (not school-wise), check if registered for another class-category event
  if (!comp.is_school_wise) {
    const { data: regs, error: regsError } = await supabase
      .from('student_registrations')
      .select('*, competitions(is_school_wise)')
      .eq('student_id', studentId)

    if (regsError) throw new Error('Error checking class category limits')

    const hasClassCategoryEvent = (regs || []).some(
      (r: any) => r.competitions && !r.competitions.is_school_wise
    )

    if (hasClassCategoryEvent) {
      throw new Error('You can only register for a single event under your class category.')
    }
  }

  const regId = generateRegId(category)

  const { data, error } = await supabase
    .from('student_registrations')
    .insert({
      student_id: studentId,
      competition_id: competitionId,
      registration_id: regId,
      status: 'confirmed',
    })
    .select('*')
    .single()

  if (error) {
    throw new Error(error.message)
  }

  return data
}

export async function getStudentRegistrations(studentId: string) {
  const supabase = await createClient()

  const { data, error } = await supabase
    .from('student_registrations')
    .select('*, competitions(*)')
    .eq('student_id', studentId)

  if (error) {
    throw new Error('Failed to fetch registrations')
  }

  return data || []
}

export async function removeRegistration(studentId: string, competitionId: string) {
  const supabase = await createClient()

  const { error } = await supabase
    .from('student_registrations')
    .delete()
    .eq('student_id', studentId)
    .eq('competition_id', competitionId)

  if (error) {
    throw new Error('Failed to cancel registration')
  }
}
