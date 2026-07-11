import { createClient as createServerSupabase } from '@/lib/supabase/server'
import { createAdminClient } from '@/lib/supabase/admin'
import { StudentInput } from '@/lib/validation/student'

const getPassword = (email: string) => {
  return `${email.toLowerCase()}_ramakatha2026_secure`
}

export async function signUpStudent(input: StudentInput) {
  const supabase = await createServerSupabase()
  const password = getPassword(input.email)

  // 1. Sign up the user in Supabase Auth
  const { data: authData, error: authError } = await supabase.auth.signUp({
    email: input.email,
    password,
  })

  if (authError) {
    if (authError.message.includes('already registered') || authError.status === 422) {
      throw new Error('Email is already registered')
    }
    throw new Error(authError.message)
  }

  const user = authData.user
  if (!user) throw new Error('Failed to create auth account')

  // 2. Create the student profile in the database using admin client (bypasses RLS for write during signup)
  const adminSupabase = createAdminClient()
  const { error: profileError } = await adminSupabase.from('students').insert({
    id: user.id,
    full_name: input.fullName,
    email: input.email,
    phone: input.phone,
    gender: input.gender,
    address: input.address,
    school_name: input.schoolName,
    place: input.place,
    class: input.class,
  })

  if (profileError) {
    throw new Error(profileError.message)
  }

  return user
}

export async function signInStudent(email: string) {
  const supabase = await createServerSupabase()
  const password = getPassword(email)

  const { data, error } = await supabase.auth.signInWithPassword({
    email,
    password,
  })

  if (error) {
    if (error.message.includes('Invalid login credentials')) {
      throw new Error('Email is not registered yet')
    }
    throw new Error(error.message)
  }

  return data.user
}

export async function signOutStudent() {
  const supabase = await createServerSupabase()
  await supabase.auth.signOut()
}

export async function getCurrentStudent() {
  const supabase = await createServerSupabase()
  
  const { data: { user } } = await supabase.auth.getUser()
  if (!user) return null

  const { data: profile, error } = await supabase
    .from('students')
    .select('*')
    .eq('id', user.id)
    .single()

  if (error || !profile) return null

  return profile;
}
