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
    competition_guidelines: Array<{
      general_rules: string[]
      scoring_criteria: Array<{
        criteria: string
        max_points: number
      }>
    }> | null
  }
}

export default function GuidelinesForm({ competition }: GuidelinesFormProps) {
  const router = useRouter()
  const [checkRules, setCheckRules] = useState(false)
  const [checkEligibility, setCheckEligibility] = useState(false)
  const [checkFinal, setCheckFinal] = useState(false)
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
  const scoringCriteria = guidelineData?.scoring_criteria || [
    { criteria: 'Technical Skill & Execution', max_points: 50 },
    { criteria: 'Theme Representation & Adherence', max_points: 30 },
    { criteria: 'Overall Presentation', max_points: 20 }
  ]

  const totalScore = scoringCriteria.reduce((sum, item) => sum + item.max_points, 0)

  const handleRegister = async () => {
    if (!checkFinal) return
    setError('')

    // Generate random mock registration ID for optimistic display
    // e.g. RK-2026-CV-8492
    const catCode = competition.category.substring(0, 2).toUpperCase()
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
    setCheckFinal(false)
    setShowSuccess(false)
    router.push('/competitions')
  }

  const formatDate = (dateString: string) => {
    const date = new Date(dateString)
    return date.toLocaleDateString('en-US', {
      month: 'short',
      day: 'numeric',
      year: 'numeric',
      hour: '2-digit',
      minute: '2-digit',
      hour12: true,
    }) + ' IST'
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
                Date & Time
              </span>
              <span className="text-body-md font-body-md text-on-surface">{formatDate(competition.event_date)}</span>
            </div>
            <div className="flex flex-col gap-1">
              <span className="text-label-sm font-label-sm text-on-surface-variant uppercase tracking-wider">Venue</span>
              <span className="text-body-md font-body-md text-on-surface">{competition.venue}</span>
            </div>
            <div className="flex flex-col gap-1">
              <span className="text-label-sm font-label-sm text-on-surface-variant uppercase tracking-wider">
                Duration
              </span>
              <span className="text-body-md font-body-md text-on-surface">{competition.duration}</span>
            </div>
            <div className="flex flex-col gap-1">
              <span className="text-label-sm font-label-sm text-on-surface-variant uppercase tracking-wider">
                Category
              </span>
              <span className="text-body-md font-body-md text-on-surface">{competition.category}</span>
            </div>
          </div>
        </section>

        {/* Section 2: Rules */}
        <section className="bg-surface rounded-xl p-md border border-outline-variant shadow-sm">
          <h2 className="text-headline-md font-headline-md text-on-surface mb-md flex items-center gap-2 font-serif font-bold">
            <span className="material-symbols-outlined text-primary">rule</span>
            General Rules
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

        {/* Section 3: Scoring Criteria */}
        <section className="bg-surface rounded-xl p-md border border-outline-variant shadow-sm">
          <h2 className="text-headline-md font-headline-md text-on-surface mb-md flex items-center gap-2 font-serif font-bold">
            <span className="material-symbols-outlined text-primary">workspace_premium</span>
            Scoring Criteria
          </h2>
          <div className="overflow-x-auto border border-outline-variant rounded-lg">
            <table className="w-full text-left border-collapse">
              <thead>
                <tr className="bg-surface-container-low border-b border-outline-variant">
                  <th className="p-3 text-label-md font-label-md text-on-surface-variant font-semibold">Criteria</th>
                  <th className="p-3 text-label-md font-label-md text-on-surface-variant font-semibold text-right">
                    Max Points
                  </th>
                </tr>
              </thead>
              <tbody>
                {scoringCriteria.map((item, idx) => (
                  <tr key={idx} className="border-b border-outline-variant last:border-b-0">
                    <td className="p-3 text-body-md font-body-md text-on-surface">{item.criteria}</td>
                    <td className="p-3 text-body-md font-body-md text-on-surface text-right font-semibold">
                      {item.max_points}
                    </td>
                  </tr>
                ))}
                <tr className="bg-surface-container-low">
                  <td className="p-3 text-title-lg font-title-lg text-primary font-bold">Total Score</td>
                  <td className="p-3 text-title-lg font-title-lg text-primary text-right font-bold">{totalScore}</td>
                </tr>
              </tbody>
            </table>
          </div>
        </section>
      </div>

      {/* Right Column: Sticky Registration Card */}
      <div className="md:col-span-5 lg:col-span-4 relative">
        <div className="sticky top-28 bg-surface rounded-xl border border-outline-variant shadow-sm p-md flex flex-col gap-md">
          <div className="border-b border-outline-variant pb-md">
            <h3 className="text-title-lg font-title-lg text-on-surface mb-2 font-bold">Registration Status</h3>
            <div className="flex items-center gap-2">
              <span className="relative flex h-3 w-3">
                <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-secondary opacity-75"></span>
                <span className="relative inline-flex rounded-full h-3 w-3 bg-secondary"></span>
              </span>
              <span className="text-label-md font-label-md text-secondary-container font-semibold">
                Registrations Open
              </span>
            </div>
            <p className="text-label-sm font-label-sm text-on-surface-variant mt-2">Closes: Oct 10, 2026</p>
          </div>
          <div className="flex flex-col gap-3">
            <h4 className="text-label-md font-label-md text-on-surface font-semibold">Pre-Registration Checklist:</h4>
            
            <label className="flex items-start gap-3 cursor-pointer group">
              <div className="relative flex items-start pt-1">
                <input
                  type="checkbox"
                  checked={checkRules}
                  onChange={(e) => setCheckRules(e.target.checked)}
                  className="peer sr-only"
                  disabled={isPending}
                />
                <div className="h-5 w-5 rounded border border-outline-variant bg-surface peer-checked:bg-primary peer-checked:border-primary transition-colors flex items-center justify-center group-hover:border-primary">
                  <span className="material-symbols-outlined text-on-primary opacity-0 peer-checked:opacity-100 transition-opacity" style={{ fontSize: '16px' }}>
                    check
                  </span>
                </div>
              </div>
              <span className="text-body-md font-body-md text-on-surface select-none">
                I have read and understood the rules and scoring criteria.
              </span>
            </label>

            <label className="flex items-start gap-3 cursor-pointer group">
              <div className="relative flex items-start pt-1">
                <input
                  type="checkbox"
                  checked={checkEligibility}
                  onChange={(e) => setCheckEligibility(e.target.checked)}
                  className="peer sr-only"
                  disabled={isPending}
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

            <label className="flex items-start gap-3 cursor-pointer group">
              <div className="relative flex items-start pt-1">
                <input
                  type="checkbox"
                  checked={checkFinal}
                  onChange={(e) => setCheckFinal(e.target.checked)}
                  className="peer sr-only"
                  disabled={isPending}
                />
                <div className="h-5 w-5 rounded border border-outline-variant bg-surface peer-checked:bg-primary peer-checked:border-primary transition-colors flex items-center justify-center group-hover:border-primary">
                  <span className="material-symbols-outlined text-on-primary opacity-0 peer-checked:opacity-100 transition-opacity" style={{ fontSize: '16px' }}>
                    check
                  </span>
                </div>
              </div>
              <span className="text-body-md font-body-md text-on-surface select-none font-semibold text-primary">
                I have read and understood all the guidelines.
              </span>
            </label>
          </div>
          <div className="pt-md mt-auto">
            <button
              onClick={handleRegister}
              disabled={!checkFinal || isPending}
              className="w-full bg-primary-container text-on-primary py-3 px-4 rounded-xl text-label-md font-label-md font-semibold transition-all disabled:opacity-50 disabled:cursor-not-allowed hover:bg-on-primary-fixed-variant flex items-center justify-center gap-2 cursor-pointer"
            >
              {isPending ? (
                <>
                  <span className="material-symbols-outlined animate-spin" style={{ fontSize: '18px' }}>
                    progress_activity
                  </span>
                  Processing...
                </>
              ) : (
                'Register for Event'
              )}
            </button>
            <p className="text-center text-label-sm font-label-sm text-on-surface-variant mt-3">
              Requires institutional login verification.
            </p>
          </div>
        </div>
      </div>
    </div>
  )
}
