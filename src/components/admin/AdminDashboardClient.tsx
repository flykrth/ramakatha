'use client'

import { useState, useMemo } from 'react'

interface StudentDetails {
  id: string
  full_name: string
  email: string
  phone: string
  school_name: string
  place: string
  class: string
}

interface CompetitionDetails {
  id: string
  title: string
  category: string
  is_school_wise: boolean
  age_group: string
}

interface RegistrationEntry {
  id: string
  student_id: string
  competition_id: string
  registration_id: string
  status: string
  created_at: string
  student: StudentDetails | null
  competition: CompetitionDetails | null
}

interface EventStat {
  id: string
  title: string
  category: string
  age_group: string
  is_school_wise: boolean
  count: number
}

interface AdminDashboardClientProps {
  registrations: RegistrationEntry[]
  eventStats: EventStat[]
}

export default function AdminDashboardClient({
  registrations,
  eventStats,
}: AdminDashboardClientProps) {
  const [activeTab, setActiveTab] = useState<'registrations' | 'events'>('registrations')
  const [searchTerm, setSearchTerm] = useState('')
  const [selectedDivision, setSelectedDivision] = useState<string>('all')
  const [selectedEventId, setSelectedEventId] = useState<string>('all')
  
  // Pagination state
  const [currentPage, setCurrentPage] = useState(1)
  const itemsPerPage = 15

  // Filter registrations
  const filteredRegistrations = useMemo(() => {
    return registrations.filter((reg) => {
      if (!reg.student || !reg.competition) return false

      // 1. Search Term Filter
      const searchLower = searchTerm.toLowerCase()
      const matchesSearch =
        reg.registration_id.toLowerCase().includes(searchLower) ||
        reg.student.full_name.toLowerCase().includes(searchLower) ||
        reg.student.email.toLowerCase().includes(searchLower) ||
        reg.student.phone.toLowerCase().includes(searchLower) ||
        reg.student.school_name.toLowerCase().includes(searchLower) ||
        reg.student.place.toLowerCase().includes(searchLower)

      // 2. Division/Category Filter
      let division = 'secondary'
      if (reg.competition.is_school_wise || reg.student.class === 'School login') {
        division = 'school'
      } else {
        const cls = reg.student.class
        if (['1', '2', '3', '4', '5'].includes(cls)) {
          division = 'primary'
        } else if (['6', '7', '8'].includes(cls)) {
          division = 'middle'
        }
      }
      const matchesDivision = selectedDivision === 'all' || division === selectedDivision

      // 3. Event Filter
      const matchesEvent = selectedEventId === 'all' || reg.competition_id === selectedEventId

      return matchesSearch && matchesDivision && matchesEvent
    })
  }, [registrations, searchTerm, selectedDivision, selectedEventId])

  // Paginated Registrations
  const paginatedRegistrations = useMemo(() => {
    const startIndex = (currentPage - 1) * itemsPerPage
    return filteredRegistrations.slice(startIndex, startIndex + itemsPerPage)
  }, [filteredRegistrations, currentPage])

  const totalPages = Math.ceil(filteredRegistrations.length / itemsPerPage)

  const handlePageChange = (page: number) => {
    if (page >= 1 && page <= totalPages) {
      setCurrentPage(page)
    }
  }

  // CSV Exporter
  const exportToCSV = () => {
    const headers = [
      'Registration ID',
      'Student Name',
      'Email',
      'Phone',
      'Class',
      'School Name',
      'Place',
      'Competition Title',
      'Competition Category',
      'Registration Date',
      'Status'
    ]

    const rows = filteredRegistrations.map((reg) => [
      reg.registration_id,
      reg.student?.full_name || '',
      reg.student?.email || '',
      reg.student?.phone || '',
      reg.student?.class || '',
      reg.student?.school_name || '',
      reg.student?.place || '',
      reg.competition?.title || '',
      reg.competition?.category || '',
      new Date(reg.created_at).toLocaleDateString(),
      reg.status
    ])

    const csvContent =
      'data:text/csv;charset=utf-8,' +
      [headers.join(','), ...rows.map((row) => row.map(val => `"${val.replace(/"/g, '""')}"`).join(','))].join('\n')

    const encodedUri = encodeURI(csvContent)
    const link = document.createElement('a')
    link.setAttribute('href', encodedUri)
    link.setAttribute('download', `ramakatha_registrations_${new Date().toISOString().split('T')[0]}.csv`)
    document.body.appendChild(link)
    link.click()
    document.body.removeChild(link)
  }

  return (
    <div className="flex flex-col gap-md animate-fade-in">
      {/* Navigation tabs */}
      <div className="border-b border-outline-variant flex gap-6">
        <button
          onClick={() => setActiveTab('registrations')}
          className={`pb-3 font-title-medium text-title-md transition-all relative ${
            activeTab === 'registrations'
              ? 'text-primary font-bold border-b-2 border-primary'
              : 'text-on-surface-variant hover:text-on-surface'
          }`}
        >
          Student Registrations ({filteredRegistrations.length})
        </button>
        <button
          onClick={() => setActiveTab('events')}
          className={`pb-3 font-title-medium text-title-md transition-all relative ${
            activeTab === 'events'
              ? 'text-primary font-bold border-b-2 border-primary'
              : 'text-on-surface-variant hover:text-on-surface'
          }`}
        >
          Event Registration Counts
        </button>
      </div>

      {activeTab === 'registrations' && (
        <div className="flex flex-col gap-md">
          {/* Filters Panel */}
          <div className="bg-surface-container rounded-xl p-md border border-outline-variant/60 flex flex-col md:flex-row gap-4 items-stretch md:items-center">
            {/* Search Input */}
            <div className="relative flex-grow">
              <span className="material-symbols-outlined absolute left-3 top-1/2 -translate-y-1/2 text-on-surface-variant text-[20px]">
                search
              </span>
              <input
                type="text"
                placeholder="Search name, school, place, phone, reg ID..."
                value={searchTerm}
                onChange={(e) => {
                  setSearchTerm(e.target.value)
                  setCurrentPage(1) // Reset pagination
                }}
                className="w-full bg-surface border border-outline rounded-xl py-2.5 pl-10 pr-4 text-body-md text-on-surface focus:outline-none focus:border-primary placeholder-on-surface-variant/50"
              />
            </div>

            {/* Division Filter */}
            <div className="min-w-[180px]">
              <select
                value={selectedDivision}
                onChange={(e) => {
                  setSelectedDivision(e.target.value)
                  setCurrentPage(1)
                }}
                className="w-full bg-surface border border-outline rounded-xl py-2.5 px-4 text-body-md text-on-surface focus:outline-none focus:border-primary"
              >
                <option value="all">All Divisions</option>
                <option value="primary">Primary (1 - 5)</option>
                <option value="middle">Middle (6 - 8)</option>
                <option value="secondary">Secondary (9 - 12)</option>
                <option value="school">School Level</option>
              </select>
            </div>

            {/* Event Filter */}
            <div className="min-w-[200px]">
              <select
                value={selectedEventId}
                onChange={(e) => {
                  setSelectedEventId(e.target.value)
                  setCurrentPage(1)
                }}
                className="w-full bg-surface border border-outline rounded-xl py-2.5 px-4 text-body-md text-on-surface focus:outline-none focus:border-primary"
              >
                <option value="all">All Events</option>
                {eventStats.map((event) => (
                  <option key={event.id} value={event.id}>
                    {event.title} ({event.age_group})
                  </option>
                ))}
              </select>
            </div>

            {/* Export CSV button */}
            <button
              onClick={exportToCSV}
              className="bg-primary text-white py-2.5 px-5 rounded-xl font-label-md text-label-md flex items-center justify-center gap-2 hover:bg-primary/95 transition-all shadow-sm shrink-0 cursor-pointer"
            >
              <span className="material-symbols-outlined text-[18px]">download</span>
              Export CSV
            </button>
          </div>

          {/* Registrations List Table */}
          <div className="bg-surface border border-outline-variant rounded-xl overflow-hidden shadow-sm">
            <div className="overflow-x-auto">
              <table className="w-full border-collapse text-left">
                <thead>
                  <tr className="bg-surface-container-high border-b border-outline-variant text-label-md font-semibold text-on-surface-variant">
                    <th className="p-4 font-bold">Registration ID</th>
                    <th className="p-4 font-bold">Student Name</th>
                    <th className="p-4 font-bold">Class</th>
                    <th className="p-4 font-bold">School & Place</th>
                    <th className="p-4 font-bold">Event & Category</th>
                    <th className="p-4 font-bold">Contacts</th>
                    <th className="p-4 font-bold">Status</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-outline-variant/60 text-body-md text-on-surface">
                  {paginatedRegistrations.length === 0 ? (
                    <tr>
                      <td colSpan={7} className="p-8 text-center text-on-surface-variant">
                        No registration records match the current filters.
                      </td>
                    </tr>
                  ) : (
                    paginatedRegistrations.map((reg) => (
                      <tr key={reg.id} className="hover:bg-surface-container-low transition-colors">
                        <td className="p-4 font-mono font-bold text-primary">{reg.registration_id}</td>
                        <td className="p-4 font-semibold">{reg.student?.full_name}</td>
                        <td className="p-4">{reg.student?.class}</td>
                        <td className="p-4">
                          <div className="font-semibold">{reg.student?.school_name}</div>
                          <div className="text-label-md text-on-surface-variant">{reg.student?.place}</div>
                        </td>
                        <td className="p-4">
                          <div className="font-semibold">{reg.competition?.title}</div>
                          <div className="text-label-md text-on-surface-variant flex items-center gap-1">
                            <span className="px-2 py-0.5 rounded-full bg-surface-container-high text-[10px] font-bold uppercase tracking-wider">
                              {reg.competition?.category}
                            </span>
                            <span className="text-[11px] text-on-surface-variant/80">({reg.competition?.age_group})</span>
                          </div>
                        </td>
                        <td className="p-4">
                          <div className="text-body-sm flex items-center gap-1">
                            <span className="material-symbols-outlined text-[14px]">mail</span>
                            {reg.student?.email}
                          </div>
                          <div className="text-body-sm flex items-center gap-1 mt-1 text-on-surface-variant">
                            <span className="material-symbols-outlined text-[14px]">phone</span>
                            {reg.student?.phone}
                          </div>
                        </td>
                        <td className="p-4">
                          <span className="inline-flex px-2 py-1 rounded-full text-[10px] font-bold uppercase tracking-wider bg-success-container/10 text-[#4CAF50] border border-success-container/20">
                            {reg.status}
                          </span>
                        </td>
                      </tr>
                    ))
                  )}
                </tbody>
              </table>
            </div>

            {/* Pagination Controls */}
            {totalPages > 1 && (
              <div className="bg-surface border-t border-outline-variant p-4 flex items-center justify-between">
                <span className="text-body-sm text-on-surface-variant">
                  Showing <span className="font-semibold">{((currentPage - 1) * itemsPerPage) + 1}</span> to{' '}
                  <span className="font-semibold">
                    {Math.min(currentPage * itemsPerPage, filteredRegistrations.length)}
                  </span>{' '}
                  of <span className="font-semibold">{filteredRegistrations.length}</span> registrations
                </span>
                <div className="flex gap-2">
                  <button
                    onClick={() => handlePageChange(currentPage - 1)}
                    disabled={currentPage === 1}
                    className="border border-outline px-3 py-1.5 rounded-lg text-body-md hover:bg-surface-container-low transition-colors disabled:opacity-50 disabled:cursor-not-allowed flex items-center"
                  >
                    <span className="material-symbols-outlined text-[18px]">chevron_left</span>
                    Prev
                  </button>
                  <button
                    onClick={() => handlePageChange(currentPage + 1)}
                    disabled={currentPage === totalPages}
                    className="border border-outline px-3 py-1.5 rounded-lg text-body-md hover:bg-surface-container-low transition-colors disabled:opacity-50 disabled:cursor-not-allowed flex items-center"
                  >
                    Next
                    <span className="material-symbols-outlined text-[18px]">chevron_right</span>
                  </button>
                </div>
              </div>
            )}
          </div>
        </div>
      )}

      {activeTab === 'events' && (
        <div className="bg-surface border border-outline-variant rounded-xl p-md shadow-sm">
          <h3 className="text-title-lg font-title-lg text-on-surface mb-md font-serif font-bold">
            Registration breakdown by individual event
          </h3>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {eventStats.map((event) => {
              const maxCount = Math.max(...eventStats.map((e) => e.count), 1)
              const percentage = Math.round((event.count / maxCount) * 100)
              
              return (
                <div
                  key={event.id}
                  className="bg-surface-container-low rounded-xl p-4 border border-outline-variant/50 flex flex-col justify-between"
                >
                  <div className="flex justify-between items-start mb-3 gap-2">
                    <div>
                      <h4 className="font-bold text-on-surface text-body-lg">{event.title}</h4>
                      <span className="text-label-sm text-on-surface-variant flex items-center gap-1.5 mt-1">
                        <span className="px-2 py-0.5 rounded-full bg-surface-container-high text-[10px] font-bold uppercase tracking-wider">
                          {event.category}
                        </span>
                        <span>{event.age_group}</span>
                        {event.is_school_wise && (
                          <span className="text-[#E0A96D] text-[11px] font-semibold">(School Level)</span>
                        )}
                      </span>
                    </div>
                    <div className="text-right shrink-0">
                      <span className="text-display-sm text-primary font-bold font-serif">{event.count}</span>
                      <span className="text-body-sm text-on-surface-variant block">registrations</span>
                    </div>
                  </div>
                  <div className="w-full bg-surface-container-high h-2.5 rounded-full overflow-hidden">
                    <div
                      className="bg-primary h-full rounded-full transition-all duration-500"
                      style={{ width: `${percentage}%` }}
                    ></div>
                  </div>
                </div>
              )
            })}
          </div>
        </div>
      )}
    </div>
  )
}
