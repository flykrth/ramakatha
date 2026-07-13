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

const FALLBACK_RULES: Record<string, string[]> = {
  '809b0b42-f9dc-4683-9b98-bc1c83c27e31': [
    'Open to students of Classes 6–8',
    'Record a storytelling video',
    'Language: Malayalam or English',
    'Maximum duration: 5 minutes',
    'Narrate an inspiring story from the Ramayana',
    'Clear audio and video quality',
    'Submit the video via email : amritaleap@gmail.com with subject as "Ramakatha 2026 Storytelling Competition submission"'
  ],
  'c5a528f1-8f5c-4ff6-9db4-386807ebc31a': [
    'Open to students of Classes 6–8',
    'Language: Malayalam or English',
    'Perform a mono act based on Ramayana ',
    'Maximum duration: 5 minutes',
    'Costumes and minimal props may be used',
    'Record the performance as a video',
    'Submit the video via email : amritaleap@gmail.com with subject as "Ramakatha 2026 Mono Act Competition submission"'
  ],
  'e2a4be59-df96-419b-a0f5-5d466986cf33': [
    'Open to students of Classes 6–8',
    'Theme: Lessons from the Ramayana',
    'Maximum word limit: 1000 words',
    'The essay must be original',
    'Language: Malayalam or English',
    'Register by scanning the QR code',
    'Send the original essay by Post/Courier to:\nAmrita LEAP\nAmrita Vishwa Vidyapeetham\nAmritapuri Campus\nClappana (P.O.)\nKollam, Kerala – 690525'
  ],
  'e10696ef-de35-430c-b26a-912c40c83a12': [
    'Open to students of Classes 1–5',
    'Dress up as any Ramayana character',
    'Record a character portrayal (fancy dress) video',
    'Maximum duration: 1 minutes',
    'No dialogue or performance is required. Simply showcase the costume by standing, walking, or posing as the chosen character.',
    'Ensure clear audio and video quality',
    'Submit the video via email: amritaleap@gmail.com with subject as "Ramakatha 2026 Ramayana Character Portrayal Competition submission"'
  ],
  '7a8c430e-8fb1-432d-8ea2-36c1e30a51d8': [
    'Open to students of Classes 1–5',
    'Theme: My Favourite Character from the Ramayana',
    'Create an original hand-drawn artwork',
    'Medium: Pencil only (Graphite)',
    'Mention the student\'s name, class, school name, and contact number on the back of the drawing sheet',
    'Send the original artwork by post/courier to:\nAmrita LEAP\nAmrita Vishwa Vidyapeetham\nAmritapuri Campus\nClappana (P.O.)\nKollam, Kerala – 690525'
  ],
  '07e4d8fb-df24-4286-90e9-b54db1ab9f1c': [
    'Open to students of Classes 9–12',
    'Theme: Hanuman Flying with the Sanjeevani Mountain',
    'Create an original painting',
    'Medium: Watercolours only',
    'Mention the student\'s name, class, school name, and contact number on the back of the artwork',
    'Send the original artwork by post/courier to:\nAmrita LEAP\nAmrita Vishwa Vidyapeetham\nAmritapuri Campus\nClappana (P.O.)\nKollam, Kerala – 690525'
  ],
  '4b830d93-3d44-4861-a8cf-3c323f46f3ba': [
    'Open to students of Classes 9–12',
    'Record a video interview with a grandparent or any elderly person',
    'Maximum duration: 10 minutes',
    'The interview should focus on their memories, experiences, or lessons from the Ramayana',
    'Ensure clear audio and video quality',
    'Submit the video via email: amritaleap@gmail.com with subject as "Ramakatha 2026 Elder Wisdom Interview submission"'
  ],
  '939029a1-8d2b-47e1-b46c-eb994191d8fc': [
    'Open to students of Classes 9–12',
    'Theme: Karkidaka Masam: The Traditions We Practice at Home and Their Significance',
    'Write an original handwritten article based on the traditions observed in your home during Ramayana Month',
    'Include the practices followed, their significance, and your personal reflections',
    'Word limit: 800–1000 words',
    'Mention the student\'s name, class, school name, and contact number on the article',
    'Send the original handwritten article by post/courier to:\nAmrita LEAP\nAmrita Vishwa Vidyapeetham\nAmritapuri Campus\nClappana (P.O.)\nKollam, Kerala – 690525'
  ],
  '63f0d061-e0e9-4e78-bc5a-e7be7dcf3a8d': [
    'Open to High School students',
    'One team per school',
    'Team size: 8–10 participants',
    'Duration: 20–30 minutes',
    'Language: Malayalam, English, Hindi, or Sanskrit',
    'Record the performance in a single standing wide shot (no cuts or edits)',
    'Audio and lighting must be clear',
    'Prompting is not permitted',
    'Appropriate costumes, props, and stage background will be considered an added advantage',
    'Digital/virtual backgrounds are not permitted',
    'Submit the video via email: amritaleap@gmail.com with subject as "Ramakatha 2026 Drama Competition submission"'
  ],
  'bf8e390c-df2e-4b2a-a70d-f2eb89cf1a7c': [
    'Open to students of Classes 9–12.',
    'Schools must register through the official registration form.',
    'A Ramayana Study Booklet will be shared with all registered schools after the registration process is completed.',
    'Interested students are encouraged to study the booklet thoroughly in preparation for the quiz.',
    'An MCQ-based quiz along with the instructions for conducting it will be shared with the registered schools.',
    'The quiz will be conducted at the respective schools.',
    'Schools may evaluate the responses and identify students based on the prescribed cut-off marks or the highest scores.',
    'The list of shortlisted students must be submitted to the organizers within the specified deadline.',
    'Shortlisted students will be invited to attend a complimentary three-day residential Camp at Amrita Vishwa Vidyapeetham, Amritapuri Campus.'
  ]
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
  const generalRules = guidelineData?.general_rules || FALLBACK_RULES[competition.id] || []

  // Registration block logic: Block if already registered OR if class-category limit reached
  const isClassCategoryEvent = !competition.is_school_wise
  const isLimitReached = isClassCategoryEvent && hasRegisteredClassEvent
  const isRegistrationBlocked = isAlreadyRegistered || isLimitReached

  const handleRegister = async () => {
    if (!checkRules || !checkEligibility || isRegistrationBlocked) return
    setError('')

    startTransition(async () => {
      const res = await registerForEventAction(competition.id, competition.category)
      if (res.success) {
        setRegId(res.registrationId || '')
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
    window.dispatchEvent(new CustomEvent('show-splash', { detail: { message: 'Loading competitions...' } }))
    router.push('/competitions')
  }

  if (showSuccess) {
    return (
      <div className="fade-in min-h-[500px] flex items-center justify-center">
        <div className="bg-surface rounded-2xl p-xl border border-outline-variant shadow-level-1 max-w-lg w-full text-center flex flex-col items-center">
          <div className="w-20 h-20 rounded-full bg-surface-container-high flex items-center justify-center mb-6 text-primary">
            <span className="material-symbols-outlined text-4xl">how_to_reg</span>
          </div>
          <h2 className="text-headline-lg font-headline-lg text-primary mb-2 font-serif">Registration successful</h2>
          <p className="text-body-lg font-body-lg text-on-surface-variant mb-8">
            You have successfully registered for <strong>{competition.title}</strong>.
          </p>
          <div className="w-full bg-surface-container-low rounded-lg p-4 mb-6 text-left border border-outline-variant">
            <span className="text-label-sm font-label-sm text-on-surface-variant uppercase tracking-wider block mb-1">
              Registration ID
            </span>
            <span className="text-title-lg font-title-lg text-on-surface font-mono font-bold">{regId}</span>
          </div>
          <div className="w-full bg-[#25D366]/10 rounded-lg p-4 mb-6 text-left border border-[#25D366]/30 flex flex-col gap-2">
            <span className="text-label-sm font-label-sm text-[#25D366] uppercase tracking-wider block font-bold">
              Important: Join event WhatsApp group
            </span>
            <p className="text-body-md text-on-surface-variant">
              Please join our official WhatsApp group for further announcements, updates, and coordinator contacts:
            </p>
            <a
              href="https://chat.whatsapp.com/JY7loDZQ0NIG4lYgTmaQSx?s=cl&p=a&ilr=4"
              target="_blank"
              rel="noopener noreferrer"
              className="mt-2 py-2 px-4 bg-[#25D366] text-white rounded-lg font-bold text-center hover:opacity-90 transition-opacity inline-flex items-center justify-center gap-2"
            >
              <span className="material-symbols-outlined" style={{ fontSize: '18px' }}>chat</span>
              Join WhatsApp group
            </a>
          </div>

          <div className="flex flex-col sm:flex-row gap-4 w-full">
            <button
              onClick={resetForm}
              className="flex-1 py-3 px-4 rounded-xl border border-primary text-primary text-label-md font-label-md font-semibold hover:bg-surface-container-low transition-colors cursor-pointer"
            >
              Register another event
            </button>
            <button
              onClick={() => {
                window.dispatchEvent(new CustomEvent('show-splash', { detail: { message: 'Loading student dashboard...' } }))
                router.push('/dashboard')
              }}
              className="flex-1 py-3 px-4 rounded-xl bg-primary-container text-on-primary text-label-md font-label-md font-semibold hover:bg-on-primary-fixed-variant transition-colors flex items-center justify-center gap-2 cursor-pointer"
            >
              Back to dashboard
              <span className="material-symbols-outlined" style={{ fontSize: '18px' }}>
                arrow_forward
              </span>
            </button>
          </div>
        </div>
      </div>
    )
  }

  // Set the button label dynamically
  let buttonLabel = 'Register for event'
  if (isPending) {
    buttonLabel = 'Processing...'
  } else if (isAlreadyRegistered) {
    buttonLabel = 'Already registered'
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
            Event information
          </h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-md">
            <div className="flex flex-col gap-1">
              <span className="text-label-sm font-label-sm text-on-surface-variant uppercase tracking-wider">
                Last date to register
              </span>
              <span className="text-body-md font-body-md text-on-surface">August 16, 2026</span>
            </div>
            <div className="flex flex-col gap-1">
              <span className="text-label-sm font-label-sm text-on-surface-variant uppercase tracking-wider">
                Last date to submit
              </span>
              <span className="text-body-md font-body-md text-on-surface">August 31, 2026</span>
            </div>
            <div className="flex flex-col gap-1">
              <span className="text-label-sm font-label-sm text-on-surface-variant uppercase tracking-wider">Mode of submission</span>
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
            General rules & guidelines
          </h2>
          <ul className="space-y-4">
            {generalRules.map((rule, idx) => (
              <li key={idx} className="flex gap-3">
                <span className="material-symbols-outlined text-secondary mt-1" style={{ fontSize: '20px' }}>
                  check_circle
                </span>
                <p className="text-body-md font-body-md text-on-surface whitespace-pre-line">{rule}</p>
              </li>
            ))}
          </ul>
        </section>
      </div>

      {/* Right Column: Sticky Registration Card */}
      <div className="md:col-span-5 lg:col-span-4 relative">
        <div className="sticky top-28 bg-surface rounded-xl border border-outline-variant shadow-sm p-md flex flex-col gap-md">
          <div className="border-b border-outline-variant pb-md">
            <h3 className="text-title-lg font-title-lg text-on-surface mb-2 font-bold">Registration status</h3>
            <div className="flex items-center gap-2">
              {isRegistrationBlocked ? (
                <>
                  <span className="relative flex h-3 w-3">
                    <span className="relative inline-flex rounded-full h-3 w-3 bg-error"></span>
                  </span>
                  <span className="text-label-md font-label-md text-error font-semibold">
                    {isAlreadyRegistered ? 'Already registered' : 'Registration blocked'}
                  </span>
                </>
              ) : (
                <>
                  <span className="relative flex h-3 w-3">
                    <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-secondary opacity-75"></span>
                    <span className="relative inline-flex rounded-full h-3 w-3 bg-secondary"></span>
                  </span>
                  <span className="text-label-md font-label-md text-secondary-container font-semibold">
                    Registrations open
                  </span>
                </>
              )}
            </div>
            <p className="text-label-sm font-label-sm text-on-surface-variant mt-2">Closes: August 16, 2026</p>
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
            <h4 className="text-label-md font-label-md text-on-surface font-semibold">Pre-registration checklist:</h4>
            
            <label className="flex items-start gap-3 cursor-pointer group">
              <div className="relative flex items-start pt-1">
                <input
                  type="checkbox"
                  checked={checkRules}
                  onChange={(e) => setCheckRules(e.target.checked)}
                  className="peer sr-only"
                  disabled={isPending || isRegistrationBlocked}
                />
                <div className="h-5 w-5 rounded border border-outline-variant bg-surface peer-checked:bg-primary peer-checked:border-primary peer-focus-visible:ring-2 peer-focus-visible:ring-primary peer-focus-visible:ring-offset-2 transition-colors flex items-center justify-center group-hover:border-primary">
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
                <div className="h-5 w-5 rounded border border-outline-variant bg-surface peer-checked:bg-primary peer-checked:border-primary peer-focus-visible:ring-2 peer-focus-visible:ring-primary peer-focus-visible:ring-offset-2 transition-colors flex items-center justify-center group-hover:border-primary">
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
