'use client'

import { useState } from 'react'
import { useRouter } from 'next/navigation'
import Link from 'next/link'
import { useForm } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'
import { studentSchema, StudentInput } from '@/lib/validation/student'
import { registerStudentAction } from '@/app/actions'
import Navbar from '@/components/layout/Navbar'
import Footer from '@/components/layout/Footer'

export default function RegisterPage() {
  const router = useRouter()
  const [error, setError] = useState('')
  const [isPending, setIsPending] = useState(false)

  const {
    register,
    handleSubmit,
    formState: { errors },
    setValue,
    watch,
  } = useForm<StudentInput>({
    resolver: zodResolver(studentSchema),
    defaultValues: {
      fullName: '',
      email: '',
      phone: '',
      gender: undefined,
      address: '',
      schoolName: '',
      place: '',
      class: '',
    },
  })

  const genderValue = watch('gender')

  const onSubmit = async (data: StudentInput) => {
    setError('')
    setIsPending(true)

    try {
      const res = await registerStudentAction(data)
      if (res.success) {
        // Redirect to Step 2: Event Selection (competitions page)
        router.push('/competitions')
      } else {
        setError(res.error || 'Failed to register. Please try again.')
      }
    } catch (err: any) {
      setError(err.message || 'An unexpected error occurred.')
    } finally {
      setIsPending(false)
    }
  }

  return (
    <>
      <Navbar student={null} />

      {/* Main Content */}
      <main className="pt-28 pb-xl flex-grow bg-background">
        <div className="max-w-[800px] mx-auto px-margin-mobile md:px-lg">
          {/* Page Header */}
          <div className="mb-lg text-center">
            <h1 className="text-headline-lg font-headline-lg text-on-surface mb-2 font-serif font-bold">Student Registration</h1>
            <p className="text-body-md font-body-md text-on-surface-variant">
              Please provide your personal and academic details.
            </p>
          </div>

          {/* Progress Stepper */}
          <div className="mb-xl relative max-w-md mx-auto">
            {/* Thin connecting line matching the design */}
            <div className="absolute left-0 right-0 top-4 -translate-y-1/2 h-0.5 bg-outline-variant z-0"></div>
            
            <div className="flex justify-between items-center relative z-10">
              {/* Step 1 (Active) */}
              <div className="flex flex-col items-center gap-2">
                <div className="w-8 h-8 rounded-full bg-primary text-white flex items-center justify-center text-label-md font-label-md font-bold shadow-level-1 ring-4 ring-background">
                  1
                </div>
                <span className="text-label-sm font-label-sm text-primary font-bold">Personal Info</span>
              </div>
              {/* Step 2 */}
              <div className="flex flex-col items-center gap-2">
                <div className="w-8 h-8 rounded-full bg-surface border-2 border-outline-variant text-on-surface-variant flex items-center justify-center text-label-md font-label-md ring-4 ring-background">
                  2
                </div>
                <span className="text-label-sm font-label-sm text-on-surface-variant">Event Selection</span>
              </div>
              {/* Step 3 */}
              <div className="flex flex-col items-center gap-2">
                <div className="w-8 h-8 rounded-full bg-surface border-2 border-outline-variant text-on-surface-variant flex items-center justify-center text-label-md font-label-md ring-4 ring-background">
                  3
                </div>
                <span className="text-label-sm font-label-sm text-on-surface-variant">Review</span>
              </div>
            </div>
          </div>

          {/* Registration Form Card */}
          <div className="bg-surface rounded-[16px] border border-outline-variant p-md md:p-lg shadow-level-1">
            {error && (
              <div className="mb-6 p-4 bg-error-container/20 border border-error-container text-error rounded-lg text-body-md">
                {error}
              </div>
            )}

            <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
              {/* Section: Personal Details */}
              <div>
                <h2 className="text-title-lg font-title-lg text-primary mb-4 pb-2 border-b border-outline-variant font-bold">
                  Personal Details
                </h2>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  {/* Full Name */}
                  <div className="md:col-span-2">
                    <label className="block text-label-md font-label-md text-on-surface mb-2" htmlFor="fullName">
                      Full Name <span className="text-error">*</span>
                    </label>
                    <input
                      id="fullName"
                      type="text"
                      placeholder="As per official records"
                      className={`w-full bg-surface border ${
                        errors.fullName ? 'border-error' : 'border-outline-variant'
                      } rounded-lg px-4 py-3 text-body-md font-body-md text-on-surface focus:border-primary focus:ring-0 input-glow transition-all outline-none`}
                      {...register('fullName')}
                      disabled={isPending}
                    />
                    {errors.fullName && (
                      <p className="mt-1.5 text-error text-label-sm">{errors.fullName.message}</p>
                    )}
                  </div>
                  {/* Email */}
                  <div>
                    <label className="block text-label-md font-label-md text-on-surface mb-2" htmlFor="email">
                      Email Address <span className="text-error">*</span>
                    </label>
                    <input
                      id="email"
                      type="email"
                      placeholder="student@example.com"
                      className={`w-full bg-surface border ${
                        errors.email ? 'border-error' : 'border-outline-variant'
                      } rounded-lg px-4 py-3 text-body-md font-body-md text-on-surface focus:border-primary focus:ring-0 input-glow transition-all outline-none`}
                      {...register('email')}
                      disabled={isPending}
                    />
                    {errors.email && (
                      <p className="mt-1.5 text-error text-label-sm">{errors.email.message}</p>
                    )}
                  </div>
                  {/* Phone */}
                  <div>
                    <label className="block text-label-md font-label-md text-on-surface mb-2" htmlFor="phone">
                      Phone Number <span className="text-error">*</span>
                    </label>
                    <input
                      id="phone"
                      type="tel"
                      placeholder="e.g. 9876543210"
                      className={`w-full bg-surface border ${
                        errors.phone ? 'border-error' : 'border-outline-variant'
                      } rounded-lg px-4 py-3 text-body-md font-body-md text-on-surface focus:border-primary focus:ring-0 input-glow transition-all outline-none`}
                      {...register('phone')}
                      disabled={isPending}
                    />
                    {errors.phone && (
                      <p className="mt-1.5 text-error text-label-sm">{errors.phone.message}</p>
                    )}
                  </div>
                  {/* Gender */}
                  <div>
                    <label className="block text-label-md font-label-md text-on-surface mb-2">
                      Gender <span className="text-error">*</span>
                    </label>
                    <div className="flex gap-6 py-2">
                      {/* Male Option */}
                      <label className="flex items-center gap-2.5 cursor-pointer group">
                        <input
                          type="radio"
                          value="male"
                          className="sr-only"
                          checked={genderValue === 'male'}
                          onChange={() => setValue('gender', 'male', { shouldValidate: true })}
                          disabled={isPending}
                        />
                        <div className={`h-5 w-5 rounded-full border flex items-center justify-center transition-all ${
                          genderValue === 'male' 
                            ? 'border-primary bg-primary' 
                            : 'border-outline-variant bg-surface group-hover:border-primary'
                        }`}>
                          <div className={`h-2.5 w-2.5 rounded-full bg-white transition-transform ${
                            genderValue === 'male' ? 'scale-100' : 'scale-0'
                          }`}></div>
                        </div>
                        <span className="text-body-md font-body-md text-on-surface-variant font-medium">Male</span>
                      </label>

                      {/* Female Option */}
                      <label className="flex items-center gap-2.5 cursor-pointer group">
                        <input
                          type="radio"
                          value="female"
                          className="sr-only"
                          checked={genderValue === 'female'}
                          onChange={() => setValue('gender', 'female', { shouldValidate: true })}
                          disabled={isPending}
                        />
                        <div className={`h-5 w-5 rounded-full border flex items-center justify-center transition-all ${
                          genderValue === 'female' 
                            ? 'border-primary bg-primary' 
                            : 'border-outline-variant bg-surface group-hover:border-primary'
                        }`}>
                          <div className={`h-2.5 w-2.5 rounded-full bg-white transition-transform ${
                            genderValue === 'female' ? 'scale-100' : 'scale-0'
                          }`}></div>
                        </div>
                        <span className="text-body-md font-body-md text-on-surface-variant font-medium">Female</span>
                      </label>
                    </div>
                    {errors.gender && (
                      <p className="mt-1.5 text-error text-label-sm">{errors.gender.message}</p>
                    )}
                  </div>
                </div>
              </div>

              {/* Section: Address */}
              <div className="pt-4">
                <h2 className="text-title-lg font-title-lg text-primary mb-4 pb-2 border-b border-outline-variant font-bold">
                  Address Details
                </h2>
                <div>
                  {/* Address */}
                  <div>
                    <label className="block text-label-md font-label-md text-on-surface mb-2" htmlFor="address">
                      Residential Address <span className="text-error">*</span>
                    </label>
                    <textarea
                      id="address"
                      placeholder="Street, Neighborhood, Flat / House No."
                      rows={3}
                      className={`w-full bg-surface border ${
                        errors.address ? 'border-error' : 'border-outline-variant'
                      } rounded-lg px-4 py-3 text-body-md font-body-md text-on-surface focus:border-primary focus:ring-0 input-glow transition-all resize-none outline-none`}
                      {...register('address')}
                      disabled={isPending}
                    ></textarea>
                    {errors.address && (
                      <p className="mt-1.5 text-error text-label-sm">{errors.address.message}</p>
                    )}
                  </div>
                </div>
              </div>

              {/* Section: Academic Details */}
              <div className="pt-4">
                <h2 className="text-title-lg font-title-lg text-primary mb-4 pb-2 border-b border-outline-variant font-bold">
                  Academic Details
                </h2>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  {/* School Name */}
                  <div className="md:col-span-2">
                    <label className="block text-label-md font-label-md text-on-surface mb-2" htmlFor="schoolName">
                      School/Institution Name <span className="text-error">*</span>
                    </label>
                    <input
                      id="schoolName"
                      type="text"
                      placeholder="Name of your current institution"
                      className={`w-full bg-surface border ${
                        errors.schoolName ? 'border-error' : 'border-outline-variant'
                      } rounded-lg px-4 py-3 text-body-md font-body-md text-on-surface focus:border-primary focus:ring-0 input-glow transition-all outline-none`}
                      {...register('schoolName')}
                      disabled={isPending}
                    />
                    {errors.schoolName && (
                      <p className="mt-1.5 text-error text-label-sm">{errors.schoolName.message}</p>
                    )}
                  </div>
                  {/* Place */}
                  <div>
                    <label className="block text-label-md font-label-md text-on-surface mb-2" htmlFor="place">
                      Place/City <span className="text-error">*</span>
                    </label>
                    <input
                      id="place"
                      type="text"
                      placeholder="City of Institution"
                      className={`w-full bg-surface border ${
                        errors.place ? 'border-error' : 'border-outline-variant'
                      } rounded-lg px-4 py-3 text-body-md font-body-md text-on-surface focus:border-primary focus:ring-0 input-glow transition-all outline-none`}
                      {...register('place')}
                      disabled={isPending}
                    />
                    {errors.place && (
                      <p className="mt-1.5 text-error text-label-sm">{errors.place.message}</p>
                    )}
                  </div>
                  {/* Class */}
                  <div>
                    <label className="block text-label-md font-label-md text-on-surface mb-2" htmlFor="class">
                      Class/Grade <span className="text-error">*</span>
                    </label>
                    <div className="relative">
                      <select
                        id="class"
                        className={`w-full bg-surface border ${
                          errors.class ? 'border-error' : 'border-outline-variant'
                        } rounded-lg px-4 py-3 pr-10 text-body-md font-body-md text-on-surface focus:border-primary focus:ring-0 input-glow transition-all appearance-none cursor-pointer outline-none`}
                        {...register('class')}
                        disabled={isPending}
                      >
                        <option value="">Select Class</option>
                        <option value="1">Class 1</option>
                        <option value="2">Class 2</option>
                        <option value="3">Class 3</option>
                        <option value="4">Class 4</option>
                        <option value="5">Class 5</option>
                        <option value="6">Class 6</option>
                        <option value="7">Class 7</option>
                        <option value="8">Class 8</option>
                        <option value="9">Class 9</option>
                        <option value="10">Class 10</option>
                        <option value="11">Class 11</option>
                        <option value="12">Class 12</option>
                        <option value="School login">School login</option>
                      </select>
                      <div className="absolute inset-y-0 right-0 flex items-center pr-3 pointer-events-none text-on-surface-variant">
                        <span className="material-symbols-outlined">expand_more</span>
                      </div>
                    </div>
                    {errors.class && (
                      <p className="mt-1.5 text-error text-label-sm">{errors.class.message}</p>
                    )}
                  </div>
                </div>
              </div>

              {/* Actions */}
              <div className="pt-8 flex justify-end gap-4 border-t border-outline-variant mt-8">
                <button
                  type="button"
                  onClick={() => router.push('/')}
                  className="px-6 py-3 border border-outline text-on-surface text-label-md font-label-md rounded-lg hover:bg-surface-container-high transition-colors cursor-pointer"
                  disabled={isPending}
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="px-8 py-3 bg-primary text-white text-label-md font-label-md font-bold rounded-lg hover:opacity-90 transition-all flex items-center gap-2 cursor-pointer"
                  disabled={isPending}
                >
                  {isPending ? (
                    <>
                      <span className="material-symbols-outlined animate-spin" style={{ fontSize: '18px' }}>
                        progress_activity
                      </span>
                      Saving...
                    </>
                  ) : (
                    'Save & Continue'
                  )}
                </button>
              </div>
            </form>
          </div>
        </div>
      </main>

      <Footer />
    </>
  )
}
