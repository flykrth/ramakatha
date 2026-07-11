'use server'

import { studentSchema, StudentInput } from '@/lib/validation/student'
import { signUpStudent, signInStudent, signOutStudent, getCurrentStudent } from '@/services/auth'
import { registerForCompetition, removeRegistration } from '@/services/registrations'
import { revalidatePath } from 'next/cache'

export async function registerStudentAction(data: StudentInput) {
  const result = studentSchema.safeParse(data)
  if (!result.success) {
    return { success: false, error: result.error.issues[0].message }
  }

  try {
    await signUpStudent(result.data)
  } catch (err: any) {
    return { success: false, error: err.message || 'Failed to register' }
  }

  revalidatePath('/')
  revalidatePath('/dashboard')
  revalidatePath('/competitions')
  return { success: true }
}

export async function signInStudentAction(email: string) {
  if (!email || !email.includes('@')) {
    return { success: false, error: 'Please enter a valid email address' }
  }

  try {
    await signInStudent(email)
  } catch (err: any) {
    return { success: false, error: err.message || 'Failed to login' }
  }

  revalidatePath('/dashboard')
  revalidatePath('/competitions')
  return { success: true }
}

export async function signOutStudentAction() {
  await signOutStudent()
  return { success: true }
}

export async function registerForEventAction(competitionId: string, category: string) {
  try {
    const student = await getCurrentStudent()
    if (!student) {
      return { success: false, error: 'Not authenticated. Please register/log in first.' }
    }

    await registerForCompetition(student.id, competitionId, category)
  } catch (err: any) {
    return { success: false, error: err.message || 'Failed to register for competition' }
  }

  revalidatePath('/dashboard')
  revalidatePath('/competitions')
  return { success: true }
}

export async function removeRegistrationAction(competitionId: string) {
  try {
    const student = await getCurrentStudent()
    if (!student) {
      return { success: false, error: 'Not authenticated' }
    }

    await removeRegistration(student.id, competitionId)
  } catch (err: any) {
    return { success: false, error: err.message || 'Failed to remove registration' }
  }

  revalidatePath('/dashboard')
  revalidatePath('/competitions')
  return { success: true }
}
