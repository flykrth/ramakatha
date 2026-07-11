import { createClient } from '@/lib/supabase/server'

function generateRegId(category: string): string {
  const catCode = category.substring(0, 2).toUpperCase()
  const randNum = Math.floor(1000 + Math.random() * 9000)
  return `RK-2026-${catCode}-${randNum}`
}

export async function registerForCompetition(studentId: string, competitionId: string, category: string) {
  const supabase = await createClient()

  const { data: existing, error: checkError } = await supabase
    .from('student_registrations')
    .select('id')
    .eq('student_id', studentId)
    .eq('competition_id', competitionId)
    .maybeSingle()

  if (checkError) throw new Error('Database error checking registration')
  if (existing) throw new Error('You are already registered for this competition')

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
