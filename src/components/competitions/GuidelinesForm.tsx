'use client'

import { useState, useTransition } from 'react'
import { useRouter } from 'next/navigation'
import Link from 'next/link'
import { registerForEventAction } from '@/app/actions'

interface GuidelinesFormProps {
  competition: {
    id: string
    title: string
    description: string
    category: string
    event_date: string
    venue: string
    duration: string
    age_group: string
    status: 'open' | 'waitlist' | 'closed'
    is_school_wise: boolean
    competition_guidelines: Array<{
      general_rules: string[]
      scoring_criteria: Array<{
        criteria: string
        max_points: number
      }>
    }> | null
  }
  isAlreadyRegistered: boolean
  hasRegisteredClassEvent: boolean
}

export default function GuidelinesForm({
  competition,
  isAlreadyRegistered,
  hasRegisteredClassEvent,
}: GuidelinesFormProps) {
  const router = useRouter()
  const [checkRules, setCheckRules] = useState(false)
  const [checkEligibility, setCheckEligibility] = useState(false)
  const [error, setError] = useState('')
  const [isPending, startTransition] = useTransition()
  const [showSuccess, setShowSuccess] = useState(false)
  const [regId, setRegId] = useState('')

  const guidelineData = competition.competition_guidelines?.[0]
  const generalRules = guidelineData?.general_rules || [
    'Participants must adhere to the official Ramayana theme.',
    'Decisions of the evaluation panel are final and binding.',
    'Late submissions or late entries will not be accepted.',
    'Standard behavior codes must be maintained throughout the event.'
  ]

  // Registration block logic: Block if already registered OR if class-category limit reached
  const isClassCategoryEvent = !competition.is_school_wise
  const isLimitReached = isClassCategoryEvent && hasRegisteredClassEvent
  const isRegistrationBlocked = isAlreadyRegistered || isLimitReached

  const handleRegister = async () => {
    if (!checkRules || !checkEligibility || isRegistrationBlocked) return
    setError('')

    // Generate random mock registration ID for optimistic display
    // e.g. RK-2026-ST-8492
    const catCode = competition.title.substring(0, 2).toUpperCase()
    const randNum = Math.floor(1000 + Math.random() * 9000)
    const mockRegId = `RK-2026-${catCode}-${randNum}`

    startTransition(async () => {
      const res = await registerForEventAction(competition.id, competition.category)
      if (res.success) {
        setRegId(mockRegId)
        setShowSuccess(true)
      } else {
        setError(res.error || 'Failed to register')
      }
    })
  }

  const resetForm = () => {
    setCheckRules(false)
    setCheckEligibility(false)
    setShowSuccess(false)
    router.push('/competitions')
  }

  if (showSuccess) {
    return (
      <div className="fade-in min-h-[500px] flex items-center justify-center">
        <div className="bg-surface rounded-2xl p-xl border border-outline-variant shadow-level-1 max-w-lg w-full text-center flex flex-col items-center">
          <div className="w-20 h-20 rounded-full bg-surface-container-high flex items-center justify-center mb-6 text-primary">
            <span className="material-symbols-outlined text-4xl">how_to_reg</span>
          </div>
          <h2 className="text-headline-lg font-headline-lg text-primary mb-2 font-serif">Registration Successful</h2>
          <p className="text-body-lg font-body-lg text-on-surface-variant mb-8">
            You have successfully registered for <strong>{competition.title}</strong>. A confirmation email has been sent to your institutional address.
          </p>
          <div className="w-full bg-surface-container-low rounded-lg p-4 mb-8 text-left border border-outline-variant">
            <span className="text-label-sm font-label-sm text-on-surface-variant uppercase tracking-wider block mb-1">
              Registration ID
            </span>
            <span className="text-title-lg font-title-lg text-on-surface font-mono font-bold">{regId}</span>
          </div>
          <div className="flex flex-col sm:flex-row gap-4 w-full">
            <button
              onClick={resetForm}
              className="flex-1 py-3 px-4 rounded-xl border border-primary text-primary text-label-md font-label-md font-semibold hover:bg-surface-container-low transition-colors cursor-pointer"
            >
              Register Another Event
            </button>
            <Link
              href="/dashboard"
              className="flex-1 py-3 px-4 rounded-xl bg-primary-container text-on-primary text-label-md font-label-md font-semibold hover:bg-on-primary-fixed-variant transition-colors flex items-center justify-center gap-2"
            >
              Back to Dashboard
              <span className="material-symbols-outlined" style={{ fontSize: '18px' }}>
                arrow_forward
              </span>
            </Link>
          </div>
        </div>
      </div>
    )
  }

  // Set the button label dynamically
  let buttonLabel = 'Register for Event'
  if (isPending) {
    buttonLabel = 'Processing...'
  } else if (isAlreadyRegistered) {
    buttonLabel = 'Already Registered'
  } else if (isLimitReached) {
    buttonLabel = 'Event registration limit reached'
  }

  return (
    <div className="grid grid-cols-1 md:grid-cols-12 gap-gutter relative">
      {/* Left Column: Guidelines Content */}
      <div className="md:col-span-7 lg:col-span-8 flex flex-col gap-lg">
        {error && (
          <div className="p-4 bg-error-container/20 border border-error-container text-error rounded-lg text-body-md">
            {error}
          </div>
        )}

        {/* Section 1: Event Info */}
        <section className="bg-surface rounded-xl p-md border border-outline-variant shadow-sm">
          <h2 className="text-headline-md font-headline-md text-on-surface mb-md flex items-center gap-2 font-serif font-bold">
            <span className="material-symbols-outlined text-primary">info</span>
            Event Information
          </h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-md">
            <div className="flex flex-col gap-1">
              <span className="text-label-sm font-label-sm text-on-surface-variant uppercase tracking-wider">
                Deadline
              </span>
              <span className="text-body-md font-body-md text-on-surface">July 30, 2026</span>
            </div>
            <div className="flex flex-col gap-1">
              <span className="text-label-sm font-label-sm text-on-surface-variant uppercase tracking-wider">Mode of Submission</span>
              <span className="text-body-md font-body-md text-on-surface">{competition.venue}</span>
            </div>
            <div className="flex flex-col gap-1">
              <span className="text-label-sm font-label-sm text-on-surface-variant uppercase tracking-wider">
                Duration
              </span>
              <span className="text-body-md font-body-md text-on-surface">{competition.duration}</span>
            </div>
          </div>
        </section>

        {/* Section 2: Rules */}
        <section className="bg-surface rounded-xl p-md border border-outline-variant shadow-sm">
          <h2 className="text-headline-md font-headline-md text-on-surface mb-md flex items-center gap-2 font-serif font-bold">
            <span className="material-symbols-outlined text-primary">rule</span>
            General Rules & Guidelines
          </h2>
          <ul className="space-y-4">
            {generalRules.map((rule, idx) => (
              <li key={idx} className="flex gap-3">
                <span className="material-symbols-outlined text-secondary mt-1" style={{ fontSize: '20px' }}>
                  check_circle
                </span>
                <p className="text-body-md font-body-md text-on-surface">{rule}</p>
              </li>
            ))}
          </ul>
        </section>
      </div>

      {/* Right Column: Sticky Registration Card */}
      <div className="md:col-span-5 lg:col-span-4 relative">
        <div className="sticky top-28 bg-surface rounded-xl border border-outline-variant shadow-sm p-md flex flex-col gap-md">
          <div className="border-b border-outline-variant pb-md">
            <h3 className="text-title-lg font-title-lg text-on-surface mb-2 font-bold">Registration Status</h3>
            <div className="flex items-center gap-2">
              {isRegistrationBlocked ? (
                <>
                  <span className="relative flex h-3 w-3">
                    <span className="relative inline-flex rounded-full h-3 w-3 bg-error"></span>
                  </span>
                  <span className="text-label-md font-label-md text-error font-semibold">
                    {isAlreadyRegistered ? 'Already Registered' : 'Registration Blocked'}
                  </span>
                </>
              ) : (
                <>
                  <span className="relative flex h-3 w-3">
                    <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-secondary opacity-75"></span>
                    <span className="relative inline-flex rounded-full h-3 w-3 bg-secondary"></span>
                  </span>
                  <span className="text-label-md font-label-md text-secondary-container font-semibold">
                    Registrations Open
                  </span>
                </>
              )}
            </div>
            <p className="text-label-sm font-label-sm text-on-surface-variant mt-2">Closes: July 30, 2026</p>
          </div>

          {/* Validation Feedback Warning Banners */}
          {isAlreadyRegistered && (
            <div className="p-4 bg-secondary-container/10 border border-secondary-container/30 text-secondary-fixed-dim rounded-lg text-body-md flex gap-2">
              <span className="material-symbols-outlined text-secondary" style={{ fontSize: '20px' }}>info</span>
              <p className="text-label-sm text-on-surface-variant">
                You are already registered for this competition. You can manage your participation on your <Link href="/dashboard" className="text-primary underline font-semibold">Dashboard</Link>.
              </p>
            </div>
          )}

          {isLimitReached && (
            <div className="p-4 bg-error-container/20 border border-error-container text-error rounded-lg text-body-md flex gap-2">
              <span className="material-symbols-outlined" style={{ fontSize: '20px' }}>warning</span>
              <p className="text-label-sm text-on-surface-variant">
                You can only register for a single event in your class category. To choose this event, please cancel your other class registration on the <Link href="/dashboard" className="text-primary underline font-semibold">Dashboard</Link> first.
              </p>
            </div>
          )}

          <div className="flex flex-col gap-3">
            <h4 className="text-label-md font-label-md text-on-surface font-semibold">Pre-Registration Checklist:</h4>
            
            <label className="flex items-start gap-3 cursor-pointer group">
              <div className="relative flex items-start pt-1">
                <input
                  type="checkbox"
                  checked={checkRules}
                  onChange={(e) => setCheckRules(e.target.checked)}
                  className="peer sr-only"
                  disabled={isPending || isRegistrationBlocked}
                />
                <div className="h-5 w-5 rounded border border-outline-variant bg-surface peer-checked:bg-primary peer-checked:border-primary transition-colors flex items-center justify-center group-hover:border-primary">
                  <span className="material-symbols-outlined text-on-primary opacity-0 peer-checked:opacity-100 transition-opacity" style={{ fontSize: '16px' }}>
                    check
                  </span>
                </div>
              </div>
              <span className="text-body-md font-body-md text-on-surface select-none">
                I have read and understood the rules and guidelines.
              </span>
            </label>

            <label className="flex items-start gap-3 cursor-pointer group">
              <div className="relative flex items-start pt-1">
                <input
                  type="checkbox"
                  checked={checkEligibility}
                  onChange={(e) => setCheckEligibility(e.target.checked)}
                  className="peer sr-only"
                  disabled={isPending || isRegistrationBlocked}
                />
                <div className="h-5 w-5 rounded border border-outline-variant bg-surface peer-checked:bg-primary peer-checked:border-primary transition-colors flex items-center justify-center group-hover:border-primary">
                  <span className="material-symbols-outlined text-on-primary opacity-0 peer-checked:opacity-100 transition-opacity" style={{ fontSize: '16px' }}>
                    check
                  </span>
                </div>
              </div>
              <span className="text-body-md font-body-md text-on-surface select-none">
                I confirm I meet the age and eligibility requirements for this division.
              </span>
            </label>
          </div>
          <div className="pt-md mt-auto">
            <button
              onClick={handleRegister}
              disabled={!checkRules || !checkEligibility || isPending || isRegistrationBlocked}
              className="w-full bg-primary-container text-on-primary py-3 px-4 rounded-xl text-label-md font-label-md font-semibold transition-all disabled:opacity-50 disabled:cursor-not-allowed hover:bg-on-primary-fixed-variant flex items-center justify-center gap-2 cursor-pointer"
            >
              {buttonLabel}
            </button>
          </div>
        </div>
      </div>
    </div>
  )
}
