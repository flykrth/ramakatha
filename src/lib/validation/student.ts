import { z } from 'zod'

export const studentSchema = z.object({
  fullName: z
    .string()
    .trim()
    .min(2, 'Full name must be at least 2 characters')
    .max(100, 'Full name must be less than 100 characters')
    .regex(/^[a-zA-Z\s.]+$/, 'Name can only contain letters, spaces, and dots'),
  email: z
    .string()
    .trim()
    .min(1, 'Email is required')
    .email('Please enter a valid email address'),
  phone: z
    .string()
    .trim()
    .min(1, 'Phone number is required')
    .regex(
      /^(?:\+91[\-\s]?)?[6-9]\d{9}$/,
      'Please enter a valid 10-digit Indian phone number (optionally prefixed with +91)'
    ),
  gender: z.enum(['male', 'female', 'other'], {
    message: 'Please select a gender',
  }),
  address: z
    .string()
    .trim()
    .min(10, 'Address must be at least 10 characters long')
    .max(500, 'Address must be less than 500 characters'),
  schoolName: z
    .string()
    .trim()
    .min(3, 'School name must be at least 3 characters')
    .max(200, 'School name must be less than 200 characters'),
  place: z
    .string()
    .trim()
    .min(2, 'Place/City must be at least 2 characters')
    .max(100, 'Place/City must be less than 100 characters'),
  class: z
    .string()
    .min(1, 'Please select a class'),
})

export type StudentInput = z.infer<typeof studentSchema>
