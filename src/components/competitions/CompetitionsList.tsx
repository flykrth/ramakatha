'use client'

import Link from 'next/link'

interface Competition {
  id: string
  title: string
  description: string
  category: string
  event_date: string
  venue: string
  duration: string
  age_group: string
  eligible_classes: string[]
  max_team_size: number
  status: 'open' | 'waitlist' | 'closed'
}

interface CompetitionsListProps {
  competitions: Competition[]
  studentClass: string
  registeredIds?: string[]
}

export default function CompetitionsList({
  competitions,
  studentClass,
  registeredIds = [],
}: CompetitionsListProps) {

  return (
    <>
      {/* Bento Grid of Competitions */}
      {competitions.length === 0 ? (
        <div className="bg-surface border border-outline-variant border-dashed rounded-xl p-xl flex flex-col items-center justify-center text-center">
          <span className="material-symbols-outlined text-4xl text-on-surface-variant mb-4">search_off</span>
          <h4 className="text-title-lg font-title-lg text-on-surface mb-2">No competitions found</h4>
          <p className="text-body-md font-body-md text-on-surface-variant max-w-md">
            There are currently no competitions available for your class category.
          </p>
        </div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {competitions.map((comp) => {
            const isFeatured = comp.status === 'open' && comp.category === 'Music' // Highlight open music cards
            const isAlreadyRegistered = registeredIds.includes(comp.id)

            // Check status tags
            let statusText = 'Open'
            let statusClass = 'bg-secondary-container/10 text-secondary-container border border-secondary-container/20'
            if (comp.status === 'waitlist') {
              statusText = 'Waitlist'
              statusClass = 'bg-[#FF9933]/10 text-[#FF9933] border border-[#FF9933]/20'
            } else if (comp.status === 'closed') {
              statusText = 'Closed'
              statusClass = 'bg-outline-variant/30 text-on-surface-variant'
            }

            return (
              <div
                key={comp.id}
                className={`${
                  isFeatured ? 'md:col-span-2' : ''
                } glass-card rounded-2xl p-6 relative overflow-hidden group shadow-level-1 hover:shadow-level-2 transition-all duration-300 flex flex-col justify-between border-t-4 ${
                  isFeatured ? 'border-t-[#D4AF37]' : 'border-t-primary'
                }`}
              >
                {/* Decorative background image for large card */}
                {isFeatured && (
                  <div
                    className="absolute top-0 right-0 w-1/2 h-full opacity-10 pointer-events-none bg-cover bg-center"
                    style={{
                      backgroundImage:
                        "url('https://lh3.googleusercontent.com/aida-public/AB6AXuBuUeSU41y-VazvDBPLs_w1ylwxW5RuPchXKF1z3Xw1HEtXWp0q5zgFzmfl-leL4J02UcgD2yp_vVmO1-4qbiNBRoq80Nk5CqJ2zFeXRe40Wgw_ECJihxRcanQrkv5qiRgLWPpsLeTxH3hUxNgVWujuhj1bFROfbNiqALzXSw8PoZW0lRH2nQF_N6xvhOadizOyMNU4eDqAypadwU3G9OwBrcz3L-y6w9tz4fQOtyczVeCPbLTAianeWg')",
                    }}
                  ></div>
                )}

                {/* Adjusted inner layout structure to fix alignment/cutoff issues */}
                <div className={`flex flex-col ${isFeatured ? 'md:flex-row' : ''} gap-6 items-start justify-between w-full h-full`}>
                  <div className="flex-shrink-0 w-12 h-12 bg-surface-container rounded-xl flex items-center justify-center text-primary">
                    <span className="material-symbols-outlined text-3xl">
                      {comp.category === 'Music'
                        ? 'music_note'
                        : comp.category === 'Dance'
                        ? 'emoji_people'
                        : comp.category === 'Literature'
                        ? 'history_edu'
                        : 'brush'}
                    </span>
                  </div>

                  <div className="flex-grow flex flex-col justify-between w-full h-full z-10">
                    <div className="flex-grow mb-6">
                      <div className="flex justify-between items-start mb-2 gap-2">
                        <h3 className="text-title-lg font-title-lg text-primary font-bold">{comp.title}</h3>
                        <span className={`px-2.5 py-1 rounded-full text-[10px] font-label-sm font-bold uppercase tracking-wider shrink-0 ${statusClass}`}>
                          {statusText}
                        </span>
                      </div>
                      <p className="text-body-md font-body-md text-on-surface-variant mb-4">
                        {comp.description}
                      </p>
                      
                      <div className="flex flex-wrap gap-4">
                        <div className="flex items-center gap-1.5 text-label-sm font-label-sm text-on-surface-variant">
                          <span className="material-symbols-outlined" style={{ fontSize: '16px' }}>
                            school
                          </span>
                          {comp.age_group}
                        </div>
                        <div className="flex items-center gap-1.5 text-label-sm font-label-sm text-on-surface-variant">
                          <span className="material-symbols-outlined" style={{ fontSize: '16px' }}>
                            calendar_today
                          </span>
                          Closes Aug 16, 2026
                        </div>
                        {comp.max_team_size > 1 && (
                          <div className="flex items-center gap-1.5 text-label-sm font-label-sm text-on-surface-variant">
                            <span className="material-symbols-outlined" style={{ fontSize: '16px' }}>
                              groups
                            </span>
                            Team event (Max {comp.max_team_size})
                          </div>
                        )}
                      </div>
                    </div>

                    <div className="flex gap-3 w-full mt-auto">
                      {isAlreadyRegistered ? (
                        <button
                          disabled
                          className="w-full border border-secondary text-secondary px-4 py-2.5 rounded-xl font-label-md text-label-md bg-secondary/5 cursor-not-allowed text-center font-bold"
                        >
                          Already registered
                        </button>
                      ) : (
                        <Link
                          href={`/competitions/${comp.id}`}
                          className="bg-primary-container text-white px-6 py-2.5 rounded-xl font-label-md text-label-md hover:bg-primary transition-colors flex items-center justify-center gap-2 cursor-pointer grow text-center font-bold"
                        >
                          View guidelines
                          <span className="material-symbols-outlined" style={{ fontSize: '18px' }}>
                            arrow_forward
                          </span>
                        </Link>
                      )}
                    </div>
                  </div>
                </div>
              </div>
            )
          })}
        </div>
      )}
    </>
  )
}
