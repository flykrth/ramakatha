'use client'

import { useState, useTransition } from 'react'
import { useRouter } from 'next/navigation'
import Link from 'next/link'
import { signInStudentAction } from '@/app/actions'
import Navbar from '@/components/layout/Navbar'
import Footer from '@/components/layout/Footer'

export default function RegisterPage() {
  const router = useRouter()
  const [email, setEmail] = useState('')
  const [phone, setPhone] = useState('')
  const [error, setError] = useState('')
  const [isPending, startTransition] = useTransition()

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault()
    setError('')

    if (!email || !phone) {
      setError('Please fill in both email and mobile number.')
      return
    }

    startTransition(async () => {
      const res = await signInStudentAction(email, phone)
      if (res.success) {
        window.dispatchEvent(
          new CustomEvent('show-splash', {
            detail: { message: 'Logging into student portal...' },
          })
        )
        router.push('/dashboard')
      } else {
        setError(res.error || 'Failed to sign in. Please verify your credentials.')
      }
    })
  }

  return (
    <>
      <Navbar student={null} />

      <main className="flex-grow w-full max-w-max-width mx-auto px-margin-mobile md:px-margin-desktop py-xl pt-28 flex items-center justify-center">
        <div className="bg-surface rounded-2xl border border-outline-variant shadow-level-2 max-w-md w-full p-md md:p-lg flex flex-col gap-md animate-fade-in my-8">
          {/* Header Icon & Branding */}
          <div className="text-center flex flex-col items-center gap-2">
            <img
              src="/logo.png"
              alt="RAMA Katha 2026"
              className="h-16 w-auto object-contain mb-2"
            />
            <div className="bg-outline-variant/30 text-on-surface-variant px-3 py-1 rounded-full text-label-sm font-bold uppercase tracking-wider flex items-center gap-1.5">
              <span className="material-symbols-outlined text-[14px]">lock</span>
              Registrations Closed
            </div>
            <h2 className="text-headline-md font-headline-md text-on-surface font-serif font-bold mt-2">
              Student Portal
            </h2>
            <p className="text-body-md text-on-surface-variant max-w-xs">
              Registrations for Ramakatha 2026 are now closed. Already registered students can sign in below to view their bookings.
            </p>
          </div>

          <hr className="border-outline-variant/60" />

          {/* Form Error Banner */}
          {error && (
            <div className="p-4 bg-error-container/20 border border-error-container text-error rounded-xl text-body-md flex gap-2">
              <span className="material-symbols-outlined text-error" style={{ fontSize: '20px' }}>
                warning
              </span>
              <p className="text-label-sm text-on-surface-variant font-medium">{error}</p>
            </div>
          )}

          {/* Direct Login Form */}
          <form onSubmit={handleLogin} className="flex flex-col gap-4">
            <div className="flex flex-col gap-1.5">
              <label htmlFor="email" className="text-label-md font-label-md text-on-surface font-semibold">
                Email address
              </label>
              <input
                type="email"
                id="email"
                placeholder="Enter your registered email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                disabled={isPending}
                className="w-full bg-surface border border-outline rounded-xl py-3 px-4 text-body-md text-on-surface focus:outline-none focus:border-primary placeholder-on-surface-variant/40 transition-colors"
              />
            </div>

            <div className="flex flex-col gap-1.5">
              <label htmlFor="phone" className="text-label-md font-label-md text-on-surface font-semibold">
                Mobile number
              </label>
              <input
                type="tel"
                id="phone"
                placeholder="Enter your registered mobile number"
                value={phone}
                onChange={(e) => setPhone(e.target.value)}
                disabled={isPending}
                className="w-full bg-surface border border-outline rounded-xl py-3 px-4 text-body-md text-on-surface focus:outline-none focus:border-primary placeholder-on-surface-variant/40 transition-colors"
              />
            </div>

            <button
              type="submit"
              disabled={isPending}
              className="bg-primary text-white py-3.5 px-6 rounded-xl font-label-md text-label-md font-bold flex items-center justify-center gap-2 hover:bg-primary/95 transition-all shadow-sm shrink-0 cursor-pointer mt-2 disabled:opacity-50 disabled:cursor-not-allowed"
            >
              {isPending ? 'Signing in...' : 'Sign in to Dashboard'}
              <span className="material-symbols-outlined text-[18px]">login</span>
            </button>
          </form>

          {/* Contact Support info */}
          <div className="text-center bg-surface-container-low p-4 rounded-xl border border-outline-variant/40 flex flex-col gap-1">
            <span className="text-label-sm font-label-sm text-on-surface-variant uppercase tracking-wider font-semibold">
              Need assistance?
            </span>
            <p className="text-body-sm text-on-surface-variant">
              Contact Amrita LEAP support at{' '}
              <a href="mailto:amritaleap@am.amrita.edu" className="text-primary hover:underline font-semibold">
                amritaleap@am.amrita.edu
              </a>{' '}
              or call{' '}
              <a href="tel:+918281494744" className="text-primary hover:underline font-semibold font-mono">
                +91 8281494744
              </a>.
            </p>
          </div>
        </div>
      </main>

      <Footer />
    </>
  )
}
