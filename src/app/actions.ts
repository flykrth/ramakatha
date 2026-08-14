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

export async function registerStudentAction(data: StudentInput): Promise<{ success: boolean; error?: string }> {
  return { success: false, error: 'Student registration is now closed for Ramakatha 2026.' }
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

export async function registerForEventAction(
  competitionId: string,
  category: string
): Promise<{ success: boolean; error?: string; registrationId?: string }> {
  return { success: false, error: 'Event registration is now closed for Ramakatha 2026.' }
}

export async function removeRegistrationAction(
  competitionId: string
): Promise<{ success: boolean; error?: string }> {
  return { success: false, error: 'Registration modifications and cancellations are closed.' }
}
