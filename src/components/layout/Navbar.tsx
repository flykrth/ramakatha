'use client'

import { useState, useTransition } from 'react'
import Link from 'next/link'
import { usePathname, useRouter } from 'next/navigation'
import { signInStudentAction, signOutStudentAction } from '@/app/actions'

interface NavbarProps {
  student: any | null
}

export default function Navbar({ student }: NavbarProps) {
  const pathname = usePathname()
  const router = useRouter()
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false)
  const [isLoginModalOpen, setIsLoginModalOpen] = useState(false)
  const [email, setEmail] = useState('')
  const [phone, setPhone] = useState('')
  const [loginError, setLoginError] = useState('')
  const [isPending, startTransition] = useTransition()

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault()
    setLoginError('')

    startTransition(async () => {
      const res = await signInStudentAction(email, phone)
      if (res.success) {
        setIsLoginModalOpen(false)
        setEmail('')
        setPhone('')
        window.dispatchEvent(new CustomEvent('show-splash', { detail: { message: 'Logging into student portal...' } }))
        router.push('/dashboard')
      } else {
        setLoginError(res.error || 'Failed to sign in')
      }
    })
  }

  const handleLogout = async () => {
    window.dispatchEvent(new CustomEvent('show-splash', { detail: { message: 'Logging out...' } }))
    await signOutStudentAction()
    router.push('/')
  }

  const navLinks = [
    { name: 'About', href: '/' },
    { name: 'Competitions', href: '/competitions' },
    { name: 'Dashboard', href: '/dashboard' },
  ]

  return (
    <>
      <nav className="fixed w-full z-50 bg-surface border-b border-outline-variant shadow-sm top-0 left-0 right-0">
        <div className="flex justify-between items-center w-full px-margin-mobile md:px-margin-desktop max-w-max-width mx-auto h-20">
          {/* Brand */}
          <Link
            href="/"
            className="flex items-center hover:opacity-80 transition-opacity"
          >
            <img
              src="/logo.png"
              alt="RAMA Katha 2026 Logo"
              className="h-14 w-auto object-contain shrink-0"
            />
          </Link>

          {/* Desktop Navigation */}
          <div className="hidden md:flex items-center gap-6">
            {navLinks.map((link) => {
              const isActive = pathname === link.href || (link.href !== '/' && pathname.startsWith(link.href))
              return (
                <Link
                  key={link.name}
                  href={link.href}
                  className={`${
                    isActive
                      ? 'text-primary border-b-2 border-primary font-bold opacity-100'
                      : 'text-on-surface-variant hover:text-primary opacity-80'
                  } pb-1 text-label-md font-label-md transition-all duration-200`}
                >
                  {link.name}
                </Link>
              )
            })}

            {student ? (
              <div className="flex items-center gap-3">
                <button
                  onClick={handleLogout}
                  className="text-on-surface-variant hover:text-error text-label-md font-label-md transition-colors"
                >
                  Logout
                </button>
                <Link href="/dashboard" className="w-10 h-10 rounded-full overflow-hidden border border-outline-variant hover:opacity-90 transition-opacity flex items-center justify-center bg-primary text-white font-bold text-label-md uppercase">
                  {student.full_name.charAt(0)}
                </Link>
              </div>
            ) : (
              <button
                onClick={() => setIsLoginModalOpen(true)}
                className="relative overflow-hidden bg-gradient-to-r from-primary via-[#b58a3d] to-primary hover:from-[#b58a3d] hover:to-primary text-white font-bold text-label-md font-label-md py-2 px-6 rounded-[12px] shadow-level-1 hover:shadow-level-3 hover:scale-[1.04] hover:-translate-y-0.5 active:scale-[0.98] transition-all duration-300 flex items-center justify-center gap-2 cursor-pointer animate-pulse-glow animate-shine-slide border border-[#b58a3d]/30"
              >
                Student login
              </button>
            )}
          </div>

          {/* Mobile Menu Toggle */}
          <button
            onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
            className="md:hidden text-primary p-2 cursor-pointer"
          >
            <span className="material-symbols-outlined">{isMobileMenuOpen ? 'close' : 'menu'}</span>
          </button>
        </div>

        {/* Mobile Navigation Drawer */}
        {isMobileMenuOpen && (
          <div className="md:hidden border-t border-outline-variant bg-surface px-margin-mobile py-4 space-y-3 shadow-md">
            {navLinks.map((link) => {
              const isActive = pathname === link.href || (link.href !== '/' && pathname.startsWith(link.href))
              return (
                <Link
                  key={link.name}
                  href={link.href}
                  onClick={() => setIsMobileMenuOpen(false)}
                  className={`block py-2 text-label-md font-label-md ${
                    isActive ? 'text-primary font-bold' : 'text-on-surface-variant'
                  }`}
                >
                  {link.name}
                </Link>
              )
            })}
            {student ? (
              <div className="pt-2 border-t border-outline-variant flex items-center justify-between">
                <span className="text-label-md font-bold text-on-surface">{student.full_name}</span>
                <button
                  onClick={() => {
                    setIsMobileMenuOpen(false)
                    handleLogout()
                  }}
                  className="text-error font-bold text-label-md"
                >
                  Logout
                </button>
              </div>
            ) : (
              <button
                onClick={() => {
                  setIsMobileMenuOpen(false)
                  setIsLoginModalOpen(true)
                }}
                className="relative overflow-hidden w-full bg-gradient-to-r from-primary via-[#b58a3d] to-primary hover:from-[#b58a3d] hover:to-primary text-white font-bold text-label-md font-label-md py-3 rounded-[12px] shadow-level-1 hover:shadow-level-3 hover:scale-[1.02] hover:-translate-y-0.5 active:scale-[0.98] transition-all duration-300 flex items-center justify-center gap-2 cursor-pointer animate-pulse-glow animate-shine-slide border border-[#b58a3d]/30"
              >
                Student login
              </button>
            )}
          </div>
        )}
      </nav>

      {/* Login Modal */}
      {isLoginModalOpen && (
        <div className="fixed inset-0 z-[100] flex items-center justify-center p-4">
          <div
            className="absolute inset-0 bg-on-background/50 backdrop-blur-sm"
            onClick={() => setIsLoginModalOpen(false)}
          ></div>
          <div className="bg-surface rounded-xl shadow-lg border border-outline-variant p-md max-w-md w-full relative z-10 fade-in">
            <div className="flex items-start justify-between mb-4">
              <h3 className="text-title-lg font-title-lg text-primary font-bold">Student portal login</h3>
              <button
                className="text-on-surface-variant hover:text-on-surface transition-colors cursor-pointer"
                onClick={() => setIsLoginModalOpen(false)}
              >
                <span className="material-symbols-outlined">close</span>
              </button>
            </div>
            <p className="text-body-md font-body-md text-on-surface-variant mb-6">
              Enter your registered email and mobile number to access your registrations dashboard.
            </p>

            <form onSubmit={handleLogin} className="space-y-4">
              <div>
                <label className="block text-label-sm font-semibold text-on-surface mb-2" htmlFor="loginEmail">
                  Registered email address
                </label>
                <input
                  id="loginEmail"
                  type="email"
                  required
                  placeholder="example@gmail.com"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  className="w-full bg-surface border border-outline-variant rounded-lg px-4 py-3 text-body-md font-body-md text-on-surface focus:border-primary focus:ring-0 input-glow transition-all outline-none"
                  disabled={isPending}
                />
              </div>

              <div>
                <label className="block text-label-sm font-semibold text-on-surface mb-2" htmlFor="loginPhone">
                  Registered mobile number
                </label>
                <input
                  id="loginPhone"
                  type="tel"
                  required
                  placeholder="9988776655"
                  value={phone}
                  onChange={(e) => setPhone(e.target.value)}
                  className="w-full bg-surface border border-outline-variant rounded-lg px-4 py-3 text-body-md font-body-md text-on-surface focus:border-primary focus:ring-0 input-glow transition-all outline-none"
                  disabled={isPending}
                />
              </div>

              {loginError && <p className="text-error text-label-sm font-semibold">{loginError}</p>}

              <div className="flex justify-end gap-3 pt-2">
                <button
                  type="button"
                  onClick={() => setIsLoginModalOpen(false)}
                  className="px-4 py-2 border border-outline text-on-surface text-label-md font-label-md rounded-lg hover:bg-surface-container-high transition-colors cursor-pointer"
                  disabled={isPending}
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="px-6 py-2 bg-primary text-white text-label-md font-label-md font-bold rounded-lg hover:bg-primary-container transition-all flex items-center justify-center gap-2 cursor-pointer"
                  disabled={isPending}
                >
                  {isPending ? 'Verifying...' : 'Log in'}
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </>
  )
}
