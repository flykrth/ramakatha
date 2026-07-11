'use client'

import { useState, useTransition } from 'react'
import { useRouter } from 'next/navigation'
import Link from 'next/link'
import { removeRegistrationAction } from '@/app/actions'

interface Registration {
  id: string
  registration_id: string
  status: string
  competitions: {
    id: string
    title: string
    event_date: string
    category: string
  }
}

interface DashboardContentProps {
  student: {
    id: string
    full_name: string
    email: string
    class: string
    school_name: string
  }
  initialRegistrations: Registration[]
  availableCount: number
}

export default function DashboardContent({
  student,
  initialRegistrations,
  availableCount,
}: DashboardContentProps) {
  const router = useRouter()
  const [registrations, setRegistrations] = useState<Registration[]>(initialRegistrations)
  const [selectedComp, setSelectedComp] = useState<{ id: string; title: string } | null>(null)
  const [isModalOpen, setIsModalOpen] = useState(false)
  const [error, setError] = useState('')
  const [isPending, startTransition] = useTransition()

  const handleOpenRemoveModal = (comp: { id: string; title: string }) => {
    setSelectedComp(comp)
    setIsModalOpen(true)
    setError('')
  }

  const handleRemoveConfirm = () => {
    if (!selectedComp) return

    startTransition(async () => {
      const res = await removeRegistrationAction(selectedComp.id)
      if (res.success) {
        // Update local state immediately for instant response
        setRegistrations((prev) => prev.filter((reg) => reg.competitions.id !== selectedComp.id))
        setIsModalOpen(false)
        setSelectedComp(null)
        router.refresh() // Refresh server data
      } else {
        setError(res.error || 'Failed to cancel registration')
      }
    })
  }

  const formatDate = (dateString: string) => {
    const date = new Date(dateString)
    return date.toLocaleDateString('en-US', {
      month: 'short',
      day: 'numeric',
      year: 'numeric',
    })
  }

  return (
    <div className="bg-surface text-on-surface antialiased flex min-h-screen">
      {/* TopNavBar (Mobile Only) */}
      <nav className="md:hidden flex justify-between items-center w-full px-margin-mobile h-20 bg-surface border-b border-outline-variant shadow-sm fixed top-0 z-50">
        <div className="text-title-lg font-title-lg font-bold text-primary">Ramakatha 2026</div>
        <img
          alt="Student Profile Avatar"
          className="w-10 h-10 rounded-full object-cover border border-outline-variant"
          src="https://lh3.googleusercontent.com/aida-public/AB6AXuDVyz6YvuQynIv_zviNQwapFfK9JAiVNZ7gPzf4CYWVLlqmP2jB34M1Rq0KtZKo_8Z0QJMjjiSt6IxzfkFxH40duVoNcC2Sxeax6N8a2ct4alzN77dO_7jduEeYdAWHAnUgab6HShaTEWV0i3zg4Db-eEUNKxq90jjTPA2H2UsTQ5SFRtHcWfS0JJ8WcbvfyqkmNj0NA6FOoboPKtYro3ttwC1XRKSq5n0m7w2u_UeYMvhMFuvIMUvuAg"
        />
      </nav>

      {/* SideNavBar (Desktop Only) */}
      <aside className="hidden md:flex flex-col fixed left-0 top-0 h-full w-64 bg-surface border-r border-outline-variant py-base z-50">
        <div className="px-4 py-4 mb-4">
          <h1 className="text-headline-md font-headline-md text-primary font-serif font-bold">Student Portal</h1>
          <p className="text-label-md font-label-md text-on-surface-variant mt-1">Ramakatha 2026</p>
        </div>
        <div className="px-4 mb-6">
          <Link
            href="/competitions"
            className="w-full bg-primary-container text-on-primary font-label-md text-label-md py-3 rounded-lg flex items-center justify-center gap-2 hover:opacity-90 transition-opacity font-bold"
          >
            <span className="material-symbols-outlined text-sm">add</span>
            New Registration
          </Link>
        </div>
        <ul className="flex flex-col gap-1 px-2 flex-grow">
          <li>
            <Link
              className="flex items-center gap-3 bg-primary-container text-on-primary-container rounded-lg px-4 py-3 opacity-90 scale-95 shadow-level-1"
              href="/dashboard"
            >
              <span className="material-symbols-outlined">dashboard</span>
              <span className="text-label-md font-label-md font-bold">Overview</span>
            </Link>
          </li>
          <li>
            <Link
              className="flex items-center gap-3 text-on-surface-variant px-4 py-3 hover:bg-surface-container-high transition-colors rounded-lg"
              href="/competitions"
            >
              <span className="material-symbols-outlined">assignment_ind</span>
              <span className="text-label-md font-label-md">Competitions</span>
            </Link>
          </li>
          <li>
            <div className="flex items-center gap-3 text-on-surface-variant/40 px-4 py-3 rounded-lg cursor-not-allowed">
              <span className="material-symbols-outlined">workspace_premium</span>
              <span className="text-label-md font-label-md">Certificates</span>
            </div>
          </li>
          <li>
            <div className="flex items-center gap-3 text-on-surface-variant/40 px-4 py-3 rounded-lg cursor-not-allowed">
              <span className="material-symbols-outlined">mail</span>
              <span className="text-label-md font-label-md">Messages</span>
            </div>
          </li>
        </ul>
        <div className="px-4 mt-auto border-t border-outline-variant pt-4 flex items-center gap-3">
          <img
            className="w-10 h-10 rounded-full object-cover border border-outline-variant"
            src="https://lh3.googleusercontent.com/aida-public/AB6AXuDVyz6YvuQynIv_zviNQwapFfK9JAiVNZ7gPzf4CYWVLlqmP2jB34M1Rq0KtZKo_8Z0QJMjjiSt6IxzfkFxH40duVoNcC2Sxeax6N8a2ct4alzN77dO_7jduEeYdAWHAnUgab6HShaTEWV0i3zg4Db-eEUNKxq90jjTPA2H2UsTQ5SFRtHcWfS0JJ8WcbvfyqkmNj0NA6FOoboPKtYro3ttwC1XRKSq5n0m7w2u_UeYMvhMFuvIMUvuAg"
            alt={student.full_name}
          />
          <div>
            <p className="text-label-md font-label-md font-bold text-on-surface max-w-[140px] truncate">
              {student.full_name}
            </p>
            <p className="text-label-sm font-label-sm text-on-surface-variant">Class {student.class}</p>
          </div>
        </div>
      </aside>

      {/* Main Content Area */}
      <main className="flex-1 md:ml-64 w-full px-margin-mobile md:px-lg py-xl max-w-max-width mx-auto pt-28 md:pt-10">
        {/* Welcome Section */}
        <header className="mb-lg">
          <h2 className="text-headline-lg font-headline-lg text-primary mb-2 font-serif font-bold">
            Namaste, {student.full_name}
          </h2>
          <p className="text-body-lg font-body-lg text-on-surface-variant flex items-center gap-2">
            <span className="material-symbols-outlined text-sm">school</span>
            {student.school_name} &nbsp;•&nbsp; Class {student.class}
          </p>
        </header>

        {/* Stats Bento Grid */}
        <section className="grid grid-cols-1 md:grid-cols-3 gap-gutter mb-xl">
          <div className="bg-surface rounded-xl p-md border border-outline-variant shadow-sm flex flex-col justify-between">
            <div className="flex items-center justify-between mb-4">
              <h3 className="text-label-md font-label-md text-on-surface-variant">Registered Events</h3>
              <span className="material-symbols-outlined text-primary">event_available</span>
            </div>
            <p className="text-display-lg font-display-lg text-on-surface font-bold">{registrations.length}</p>
          </div>
          <div className="bg-surface rounded-xl p-md border border-outline-variant shadow-sm flex flex-col justify-between">
            <div className="flex items-center justify-between mb-4">
              <h3 className="text-label-md font-label-md text-on-surface-variant">Available Events</h3>
              <span className="material-symbols-outlined text-primary">event_note</span>
            </div>
            <p className="text-display-lg font-display-lg text-on-surface font-bold">{availableCount}</p>
          </div>
          <div className="bg-surface rounded-xl p-md border border-outline-variant shadow-sm flex flex-col justify-between">
            <div className="flex items-center justify-between mb-4">
              <h3 className="text-label-md font-label-md text-on-surface-variant">Certificates</h3>
              <span className="material-symbols-outlined text-primary">workspace_premium</span>
            </div>
            <p className="text-display-lg font-display-lg text-on-surface font-bold">0</p>
          </div>
        </section>

        {/* My Registrations Section */}
        <section>
          <div className="flex items-center justify-between mb-md">
            <h3 className="text-title-lg font-title-lg text-on-surface font-bold">My Registrations</h3>
          </div>

          {registrations.length === 0 ? (
            /* Empty State */
            <div className="bg-surface border border-outline-variant border-dashed rounded-xl p-xl flex flex-col items-center justify-center text-center">
              <div className="w-16 h-16 bg-surface-container-high rounded-full flex items-center justify-center mb-4 text-on-surface-variant">
                <span className="material-symbols-outlined text-3xl">event_busy</span>
              </div>
              <h4 className="text-title-lg font-title-lg text-on-surface mb-2 font-bold">No Registrations Yet</h4>
              <p className="text-body-md font-body-md text-on-surface-variant mb-6 max-w-md">
                You haven't registered for any events yet. Browse available competitions to get started.
              </p>
              <Link
                href="/competitions"
                className="px-6 py-3 bg-primary text-on-primary text-label-md font-label-md rounded-lg hover:opacity-90 transition-opacity flex items-center gap-2 font-bold"
              >
                <span className="material-symbols-outlined text-sm">search</span>
                Browse Events
              </Link>
            </div>
          ) : (
            /* Registrations Grid */
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-gutter">
              {registrations.map((reg) => (
                <div
                  key={reg.id}
                  className="bg-surface border border-outline-variant rounded-xl p-md shadow-sm relative overflow-hidden group"
                >
                  <div className="absolute top-0 left-0 w-full h-1 bg-secondary-container"></div>
                  <div className="flex justify-between items-start mb-4">
                    <div>
                      <h4 className="text-title-lg font-title-lg text-on-surface mb-1 font-bold">
                        {reg.competitions.title}
                      </h4>
                      <p className="text-body-md font-body-md text-on-surface-variant flex items-center gap-2">
                        <span className="material-symbols-outlined text-sm">calendar_month</span>
                        {formatDate(reg.competitions.event_date)}
                      </p>
                    </div>
                    <span className="bg-secondary-container/10 text-secondary-container text-label-sm font-label-sm px-3 py-1 rounded-full border border-secondary-container/20 font-bold uppercase shrink-0">
                      {reg.status}
                    </span>
                  </div>
                  <div className="flex items-center gap-4 mt-6">
                    <Link
                      href={`/competitions/${reg.competitions.id}`}
                      className="px-4 py-2 bg-primary-container text-on-primary-container text-label-md font-label-md rounded-lg hover:opacity-90 transition-opacity text-center grow md:grow-0"
                    >
                      View Guidelines
                    </Link>
                    <button
                      onClick={() =>
                        handleOpenRemoveModal({ id: reg.competitions.id, title: reg.competitions.title })
                      }
                      className="px-4 py-2 border border-error text-error text-label-md font-label-md rounded-lg hover:bg-error-container/10 transition-colors cursor-pointer text-center"
                    >
                      Remove Registration
                    </button>
                  </div>
                </div>
              ))}
            </div>
          )}
        </section>
      </main>

      {/* Remove Confirmation Modal */}
      {isModalOpen && selectedComp && (
        <div className="fixed inset-0 z-[100] flex items-center justify-center p-4">
          <div
            className="absolute inset-0 bg-on-background/50 backdrop-blur-sm"
            onClick={() => !isPending && setIsModalOpen(false)}
          ></div>
          <div className="bg-surface rounded-xl shadow-lg border border-outline-variant p-md max-w-md w-full relative z-10 fade-in">
            <div className="flex items-start justify-between mb-4">
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 rounded-full bg-error-container flex items-center justify-center text-error">
                  <span className="material-symbols-outlined">warning</span>
                </div>
                <h3 className="text-title-lg font-title-lg text-on-surface font-bold font-serif">Cancel Registration</h3>
              </div>
              <button
                className="text-on-surface-variant hover:text-on-surface transition-colors cursor-pointer"
                onClick={() => !isPending && setIsModalOpen(false)}
              >
                <span className="material-symbols-outlined">close</span>
              </button>
            </div>
            <p className="text-body-md font-body-md text-on-surface-variant mb-6">
              Are you sure you want to remove your registration for <strong className="text-on-surface">{selectedComp.title}</strong>? This action cannot be undone.
            </p>

            {error && <p className="mb-4 text-error text-label-sm font-semibold">{error}</p>}

            <div className="flex justify-end gap-3">
              <button
                disabled={isPending}
                className="px-4 py-2 border border-outline text-on-surface text-label-md font-label-md rounded-lg hover:bg-surface-container-high transition-colors cursor-pointer"
                onClick={() => setIsModalOpen(false)}
              >
                Keep Registration
              </button>
              <button
                disabled={isPending}
                className="px-4 py-2 bg-error text-on-error text-label-md font-label-md rounded-lg hover:opacity-90 transition-opacity flex items-center gap-2 cursor-pointer"
                onClick={handleRemoveConfirm}
              >
                {isPending ? (
                  <>
                    <span className="material-symbols-outlined animate-spin" style={{ fontSize: '18px' }}>
                      progress_activity
                    </span>
                    Removing...
                  </>
                ) : (
                  'Yes, Remove'
                )}
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  )
}
