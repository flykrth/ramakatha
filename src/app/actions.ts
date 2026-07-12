'use server'

import { studentSchema, StudentInput, loginSchema } from '@/lib/validation/student'
import { signUpStudent, signInStudent, signOutStudent, getCurrentStudent } from '@/services/auth'
import { registerForCompetition, removeRegistration } from '@/services/registrations'
import { revalidatePath } from 'next/cache'
import { checkRateLimit } from '@/lib/rateLimit'
import { logger } from '@/lib/logger'
import { headers } from 'next/headers'
import { z } from 'zod'

const uuidSchema = z.string().uuid('Invalid competition identifier format')

async function getClientIp(): Promise<string> {
  try {
    const headerList = await headers()
    const xff = headerList.get('x-forwarded-for')
    if (xff) return xff.split(',')[0].trim()
    return headerList.get('x-real-ip') || '127.0.0.1'
  } catch {
    return '127.0.0.1'
  }
}

export async function registerStudentAction(data: StudentInput) {
  const ip = await getClientIp()
  
  // Rate limit: 5 registrations per minute per IP
  if (!checkRateLimit(ip, 5, 60000)) {
    logger.warn('Registration rate limit exceeded', { ip, email: data.email })
    return { success: false, error: 'Too many registration requests. Please wait a minute and try again.' }
  }

  const result = studentSchema.safeParse(data)
  if (!result.success) {
    logger.warn('Registration validation failed', { ip, errors: result.error.format() })
    return { success: false, error: result.error.issues[0].message }
  }

  try {
    await signUpStudent(result.data)
    logger.info('Registration action completed successfully', { email: result.data.email, ip })
  } catch (err: any) {
    logger.error('Registration action failed', err, { email: data.email, ip })
    return { success: false, error: err.message || 'Failed to register' }
  }

  revalidatePath('/')
  revalidatePath('/dashboard')
  revalidatePath('/competitions')
  return { success: true }
}

export async function signInStudentAction(email: string, phone: string) {
  const ip = await getClientIp()

  // Rate limit: 10 login attempts per minute per IP
  if (!checkRateLimit(ip, 10, 60000)) {
    logger.warn('Login rate limit exceeded', { ip, email })
    return { success: false, error: 'Too many sign-in attempts. Please try again in a minute.' }
  }

  const result = loginSchema.safeParse({ email, phone })
  if (!result.success) {
    logger.warn('Login validation failed', { ip, email, error: result.error.issues[0].message })
    return { success: false, error: result.error.issues[0].message }
  }

  try {
    await signInStudent(result.data.email, result.data.phone)
    logger.info('Login action completed successfully', { email: result.data.email, ip })
  } catch (err: any) {
    logger.error('Login action failed', err, { email, ip })
    return { success: false, error: err.message || 'Failed to login' }
  }

  revalidatePath('/dashboard')
  revalidatePath('/competitions')
  return { success: true }
}

export async function signOutStudentAction() {
  try {
    await signOutStudent()
    logger.info('Logout action completed')
  } catch (err: any) {
    logger.error('Logout action failed', err)
  }
  return { success: true }
}

export async function registerForEventAction(competitionId: string, category: string) {
  const ip = await getClientIp()

  const idResult = uuidSchema.safeParse(competitionId)
  if (!idResult.success) {
    logger.warn('Register event invalid competition UUID format', { ip, competitionId })
    return { success: false, error: idResult.error.issues[0].message }
  }

  if (!category || category.trim().length === 0) {
    return { success: false, error: 'Competition category is required' }
  }

  try {
    const student = await getCurrentStudent()
    if (!student) {
      logger.warn('Unauthorized event registration attempt', { ip, competitionId })
      return { success: false, error: 'Not authenticated. Please register/log in first.' }
    }

    logger.info('Processing event registration action', { studentId: student.id, competitionId, ip })
    await registerForCompetition(student.id, idResult.data, category.trim())
    logger.info('Event registration action completed successfully', { studentId: student.id, competitionId })
  } catch (err: any) {
    logger.error('Event registration action failed', err, { competitionId, ip })
    return { success: false, error: err.message || 'Failed to register for competition' }
  }

  revalidatePath('/dashboard')
  revalidatePath('/competitions')
  return { success: true }
}

export async function removeRegistrationAction(competitionId: string) {
  const ip = await getClientIp()

  const idResult = uuidSchema.safeParse(competitionId)
  if (!idResult.success) {
    logger.warn('Cancel registration invalid competition UUID format', { ip, competitionId })
    return { success: false, error: idResult.error.issues[0].message }
  }

  try {
    const student = await getCurrentStudent()
    if (!student) {
      logger.warn('Unauthorized cancel registration attempt', { ip, competitionId })
      return { success: false, error: 'Not authenticated' }
    }

    logger.info('Processing remove registration action', { studentId: student.id, competitionId, ip })
    await removeRegistration(student.id, idResult.data)
    logger.info('Remove registration action completed successfully', { studentId: student.id, competitionId })
  } catch (err: any) {
    logger.error('Remove registration action failed', err, { competitionId, ip })
    return { success: false, error: err.message || 'Failed to remove registration' }
  }

  revalidatePath('/dashboard')
  revalidatePath('/competitions')
  return { success: true }
}
