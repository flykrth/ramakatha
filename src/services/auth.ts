import { createClient as createServerSupabase } from '@/lib/supabase/server'
import { createAdminClient } from '@/lib/supabase/admin'
import { StudentInput } from '@/lib/validation/student'
import { Student } from '@/types'
import { logger } from '@/lib/logger'
import { createHmac } from 'crypto'

const getPassword = (email: string): string => {
  const salt = process.env.SUPABASE_PASSWORD_SALT || 'default_fallback_salt_39f7g1a'
  return createHmac('sha256', salt).update(email.toLowerCase().trim()).digest('hex')
}

export async function signUpStudent(input: StudentInput) {
  const supabase = await createServerSupabase()
  const adminSupabase = createAdminClient()
  const password = getPassword(input.email)

  logger.info('Initiating student signup', { email: input.email, school: input.schoolName })

  // 1. Create user administratively to bypass signup rate limits and auto-confirm email
  const { data: authData, error: authError } = await adminSupabase.auth.admin.createUser({
    email: input.email,
    password,
    email_confirm: true,
  })

  if (authError) {
    logger.error('Failed to create auth account in Supabase', authError, { email: input.email })
    if (authError.message.includes('already exists') || authError.message.includes('already registered') || authError.status === 422) {
      throw new Error('Email is already registered')
    }
    throw new Error(authError.message)
  }

  const user = authData.user
  if (!user) {
    logger.error('Supabase createUser returned empty user data', null, { email: input.email })
    throw new Error('Failed to create auth account')
  }

  // 2. Create the student profile in the database
  const { error: profileError } = await adminSupabase.from('students').insert({
    id: user.id,
    full_name: input.fullName,
    email: input.email.toLowerCase().trim(),
    phone: input.phone.trim(),
    gender: input.gender,
    address: input.address,
    school_name: input.schoolName,
    place: input.place,
    class: input.class,
  })

  if (profileError) {
    logger.error('Failed to insert student profile record. Rolling back auth user.', profileError, { userId: user.id, email: input.email })
    // Rollback auth user creation if profile creation fails to prevent orphan account locks
    await adminSupabase.auth.admin.deleteUser(user.id)
    throw new Error(profileError.message)
  }

  // 3. Authenticate and establish session cookies on server
  const { error: loginError } = await supabase.auth.signInWithPassword({
    email: input.email,
    password,
  })

  if (loginError) {
    logger.error('Failed to sign in automatically after profile creation', loginError, { email: input.email })
    throw new Error('Profile created but failed to sign in automatically. Please log in.')
  }

  logger.info('Student signup and auto-login completed successfully', { userId: user.id })
  return user
}

export async function signInStudent(email: string, phone: string) {
  const supabase = await createServerSupabase()
  const adminSupabase = createAdminClient()

  logger.info('Attempting student portal sign-in', { email })

  // 1. Verify that a student with this email and phone exists
  const { data: student, error: studentError } = await adminSupabase
    .from('students')
    .select('*')
    .eq('email', email.toLowerCase().trim())
    .eq('phone', phone.trim())
    .maybeSingle()

  if (studentError || !student) {
    logger.warn('Sign-in failed: invalid credentials or record not found', { email })
    throw new Error('Invalid email or mobile number. Please check your credentials or register.')
  }

  const password = getPassword(student.email)

  // 2. Sign in with password to establish session cookies
  const { data, error } = await supabase.auth.signInWithPassword({
    email: student.email,
    password,
  })

  if (error) {
    logger.error('Supabase signInWithPassword failed', error, { email })
    throw new Error(error.message)
  }

  logger.info('Student portal sign-in successful', { userId: data.user?.id })
  return data.user
}

export async function signOutStudent() {
  const supabase = await createServerSupabase()
  const { data: { user } } = await supabase.auth.getUser()
  if (user) {
    logger.info('Signing out user session', { userId: user.id })
  }
  await supabase.auth.signOut()
}

export async function getCurrentStudent(): Promise<Student | null> {
  const supabase = await createServerSupabase()
  
  const { data: { user }, error: userError } = await supabase.auth.getUser()
  if (userError || !user) return null

  const { data: profile, error } = await supabase
    .from('students')
    .select('*')
    .eq('id', user.id)
    .single()

  if (error || !profile) {
    if (error) {
      logger.error('Failed to fetch current student profile', error, { userId: user.id })
    }
    return null
  }

  return profile as Student
}
