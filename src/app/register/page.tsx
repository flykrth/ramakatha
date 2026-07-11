'use client'

import { useState } from 'react'
import { useRouter } from 'next/navigation'
import Link from 'next/link'
import { useForm } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'
import { studentSchema, StudentInput } from '@/lib/validation/student'
import { registerStudentAction } from '@/app/actions'

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
    <div className="bg-surface text-on-surface antialiased flex min-h-screen">
      {/* TopNavBar (Mobile Only) */}
      <nav className="md:hidden flex justify-between items-center w-full px-margin-mobile h-20 bg-surface border-b border-outline-variant shadow-sm fixed top-0 z-50">
        <div className="text-title-lg font-title-lg font-bold text-primary">Ramakatha 2026</div>
        <div className="w-10 h-10 rounded-full bg-surface-container flex items-center justify-center border border-outline-variant text-primary font-bold">
          R
        </div>
      </nav>

      {/* SideNavBar (Desktop Only) */}
      <aside className="hidden md:flex flex-col fixed left-0 top-0 h-full w-64 bg-surface border-r border-outline-variant py-base z-40">
        <div className="px-4 py-4 mb-8">
          <div className="text-headline-md font-headline-md text-primary mb-1 font-serif">Ramakatha 2026</div>
          <div className="text-label-md font-label-md text-on-surface-variant">Student Portal</div>
        </div>
        <nav className="flex-1 px-2 space-y-2">
          <div className="flex items-center gap-3 bg-primary-container text-on-primary-container rounded-lg px-4 py-3 opacity-90 scale-95 shadow-level-1">
            <span className="material-symbols-outlined">assignment_ind</span>
            <span className="text-label-md font-label-md">Registration</span>
          </div>
          <div className="flex items-center gap-3 text-on-surface-variant/40 px-4 py-3 rounded-lg cursor-not-allowed">
            <span className="material-symbols-outlined">dashboard</span>
            <span className="text-label-md font-label-md">Overview</span>
          </div>
          <div className="flex items-center gap-3 text-on-surface-variant/40 px-4 py-3 rounded-lg cursor-not-allowed">
            <span className="material-symbols-outlined">workspace_premium</span>
            <span className="text-label-md font-label-md">Certificates</span>
          </div>
        </nav>
      </aside>

      {/* Main Content */}
      <main className="flex-grow md:ml-64 pt-20 md:pt-0 min-h-screen bg-background pb-xl">
        <div className="max-w-[800px] mx-auto px-margin-mobile md:px-lg pt-lg">
          {/* Page Header */}
          <div className="mb-lg text-center">
            <h1 className="text-headline-lg font-headline-lg text-on-surface mb-2 font-serif">Student Registration</h1>
            <p className="text-body-md font-body-md text-on-surface-variant">
              Please provide your personal and academic details.
            </p>
          </div>

          {/* Progress Stepper */}
          <div className="mb-xl relative">
            <div className="absolute left-0 top-1/2 -translate-y-1/2 w-full h-1 bg-outline-variant rounded-full -z-10"></div>
            <div className="absolute left-0 top-1/2 -translate-y-1/2 w-1/3 h-1 bg-primary rounded-full -z-10"></div>
            <div className="flex justify-between items-center">
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
                    <div className="flex gap-4 py-2">
                      <label className="flex items-center gap-2 cursor-pointer">
                        <input
                          type="radio"
                          value="male"
                          className="text-primary border-outline-variant focus:ring-primary h-4 w-4"
                          checked={genderValue === 'male'}
                          onChange={() => setValue('gender', 'male', { shouldValidate: true })}
                          disabled={isPending}
                        />
                        <span className="text-body-md font-body-md text-on-surface-variant">Male</span>
                      </label>
                      <label className="flex items-center gap-2 cursor-pointer">
                        <input
                          type="radio"
                          value="female"
                          className="text-primary border-outline-variant focus:ring-primary h-4 w-4"
                          checked={genderValue === 'female'}
                          onChange={() => setValue('gender', 'female', { shouldValidate: true })}
                          disabled={isPending}
                        />
                        <span className="text-body-md font-body-md text-on-surface-variant">Female</span>
                      </label>
                      <label className="flex items-center gap-2 cursor-pointer">
                        <input
                          type="radio"
                          value="other"
                          className="text-primary border-outline-variant focus:ring-primary h-4 w-4"
                          checked={genderValue === 'other'}
                          onChange={() => setValue('gender', 'other', { shouldValidate: true })}
                          disabled={isPending}
                        />
                        <span className="text-body-md font-body-md text-on-surface-variant">Other</span>
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
                <div className="space-y-6">
                  {/* Full Address */}
                  <div>
                    <label className="block text-label-md font-label-md text-on-surface mb-2" htmlFor="address">
                      Full Residential Address <span className="text-error">*</span>
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
                        <option value="5">Class 5</option>
                        <option value="6">Class 6</option>
                        <option value="7">Class 7</option>
                        <option value="8">Class 8</option>
                        <option value="9">Class 9</option>
                        <option value="10">Class 10</option>
                        <option value="11">Class 11</option>
                        <option value="12">Class 12</option>
                        <option value="ug">Undergraduate</option>
                        <option value="pg">Postgraduate</option>
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
                <Link
                  href="/"
                  className="px-6 py-3 rounded-lg text-label-md font-label-md text-on-surface-variant border border-outline-variant hover:bg-surface-container-high transition-colors text-center"
                >
                  Cancel
                </Link>
                <button
                  type="submit"
                  disabled={isPending}
                  className="px-8 py-3 rounded-[12px] bg-primary text-white text-label-md font-label-md font-bold hover:bg-primary-container shadow-level-2 transition-all transform hover:-translate-y-0.5 flex items-center gap-2 cursor-pointer"
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

        {/* Footer */}
        <footer className="w-full mt-xl bg-surface-container-low border-t border-outline-variant grid grid-cols-1 md:grid-cols-4 gap-gutter px-margin-mobile md:px-margin-desktop py-lg max-w-max-width mx-auto">
          <div className="col-span-1 md:col-span-4 mb-4">
            <div className="text-title-lg font-title-lg text-primary font-bold">Ramakatha 2026</div>
          </div>
          <div className="col-span-1 md:col-span-3 flex flex-wrap gap-4 md:gap-8">
            <Link href="#" className="text-label-sm font-label-sm text-on-surface-variant hover:text-secondary transition-colors focus:underline">
              Privacy Policy
            </Link>
            <Link href="#" className="text-label-sm font-label-sm text-on-surface-variant hover:text-secondary transition-colors focus:underline">
              Terms of Service
            </Link>
            <Link href="#" className="text-label-sm font-label-sm text-on-surface-variant hover:text-secondary transition-colors focus:underline">
              Contact Us
            </Link>
            <Link href="#" className="text-label-sm font-label-sm text-on-surface-variant hover:text-secondary transition-colors focus:underline">
              Institutional Login
            </Link>
          </div>
          <div className="col-span-1 md:col-span-4 mt-4 text-body-md font-body-md text-on-surface-variant">
            © 2026 Ramakatha Institutional Council. All rights reserved.
          </div>
        </footer>
      </main>
    </div>
  )
}
