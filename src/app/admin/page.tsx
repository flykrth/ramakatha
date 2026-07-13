import { createAdminClient } from '@/lib/supabase/admin'
import { getCurrentStudent } from '@/services/auth'
import Navbar from '@/components/layout/Navbar'
import Footer from '@/components/layout/Footer'
import AdminDashboardClient from '@/components/admin/AdminDashboardClient'

export const revalidate = 0

export default async function AdminPage() {
  const currentStudent = await getCurrentStudent()
  const supabase = createAdminClient()

  // 1. Fetch total registered student profiles count
  const { count: totalStudents, error: studentsCountError } = await supabase
    .from('students')
    .select('*', { count: 'exact', head: true })

  if (studentsCountError) {
    throw new Error(`Failed to fetch student count: ${studentsCountError.message}`)
  }

  // 2. Fetch all competitions
  const { data: competitions, error: competitionsError } = await supabase
    .from('competitions')
    .select('*')
    .order('title', { ascending: true })

  if (competitionsError) {
    throw new Error(`Failed to fetch competitions: ${competitionsError.message}`)
  }

  // 3. Fetch all registrations with joined student and competition details
  const { data: registrationsData, error: registrationsError } = await supabase
    .from('student_registrations')
    .select(`
      id,
      student_id,
      competition_id,
      registration_id,
      status,
      created_at,
      students (
        id,
        full_name,
        email,
        phone,
        school_name,
        place,
        class
      ),
      competitions (
        id,
        title,
        category,
        is_school_wise,
        age_group
      )
    `)
    .order('created_at', { ascending: false })

  if (registrationsError) {
    throw new Error(`Failed to fetch registrations: ${registrationsError.message}`)
  }

  // Cast registrations with joined data
  const registrations = (registrationsData || []).map((reg: any) => ({
    id: reg.id,
    student_id: reg.student_id,
    competition_id: reg.competition_id,
    registration_id: reg.registration_id,
    status: reg.status,
    created_at: reg.created_at,
    student: reg.students,
    competition: reg.competitions
  }))

  // Calculate division/category stats
  let primaryCount = 0
  let middleCount = 0
  let secondaryCount = 0
  let schoolLevelCount = 0

  registrations.forEach((reg) => {
    if (!reg.student || !reg.competition) return

    if (reg.competition.is_school_wise || reg.student.class === 'School login') {
      schoolLevelCount++
    } else {
      const cls = reg.student.class
      if (['1', '2', '3', '4', '5'].includes(cls)) {
        primaryCount++
      } else if (['6', '7', '8'].includes(cls)) {
        middleCount++
      } else if (['9', '10', '11', '12'].includes(cls)) {
        secondaryCount++
      } else {
        // Fallback checks
        if (reg.competition.age_group?.toLowerCase().includes('1-5')) {
          primaryCount++
        } else if (reg.competition.age_group?.toLowerCase().includes('6-8')) {
          middleCount++
        } else {
          secondaryCount++
        }
      }
    }
  })

  // Calculate event registration counts
  const eventCounts: Record<string, number> = {}
  competitions.forEach((comp) => {
    eventCounts[comp.id] = 0
  })
  registrations.forEach((reg) => {
    if (reg.competition_id in eventCounts) {
      eventCounts[reg.competition_id]++
    }
  })

  const eventStats = competitions.map((comp) => ({
    id: comp.id,
    title: comp.title,
    category: comp.category,
    age_group: comp.age_group,
    is_school_wise: comp.is_school_wise,
    count: eventCounts[comp.id] || 0
  }))

  return (
    <>
      <Navbar student={currentStudent} />

      <main className="flex-grow w-full max-w-max-width mx-auto px-margin-mobile md:px-margin-desktop py-lg md:py-xl pt-28">
        <div className="flex flex-col md:flex-row justify-between items-start md:items-center mb-lg gap-4">
          <div>
            <h1 className="text-headline-lg-mobile md:text-display-lg font-serif text-primary mb-2">
              Registration Dashboard
            </h1>
            <p className="text-body-lg font-body-lg text-on-surface-variant max-w-2xl">
              Real-time student participation statistics and event registrations for Ramakatha 2026.
            </p>
          </div>
        </div>

        {/* Stats Cards Section */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 mb-lg">
          {/* Card 1: Total Registered Profiles */}
          <div className="bg-surface rounded-2xl p-md border border-outline-variant shadow-sm flex flex-col justify-between animate-fade-in">
            <div>
              <span className="text-label-sm font-label-sm text-on-surface-variant uppercase tracking-wider block mb-2 font-semibold">
                Registered Students
              </span>
              <h2 className="text-display-md font-serif text-primary font-bold">{totalStudents || 0}</h2>
            </div>
            <p className="text-body-sm font-body-sm text-on-surface-variant mt-4 flex items-center gap-1 border-t border-outline-variant/30 pt-2">
              <span className="material-symbols-outlined text-[16px] text-secondary">group</span>
              Total student profiles created
            </p>
          </div>

          {/* Card 2: Total Registrations */}
          <div className="bg-surface rounded-2xl p-md border border-outline-variant shadow-sm flex flex-col justify-between animate-fade-in">
            <div>
              <span className="text-label-sm font-label-sm text-on-surface-variant uppercase tracking-wider block mb-2 font-semibold">
                Event Registrations
              </span>
              <h2 className="text-display-md font-serif text-primary font-bold">{registrations.length}</h2>
            </div>
            <p className="text-body-sm font-body-sm text-on-surface-variant mt-4 flex items-center gap-1 border-t border-outline-variant/30 pt-2">
              <span className="material-symbols-outlined text-[16px] text-secondary">how_to_reg</span>
              Confirmed event bookings
            </p>
          </div>

          {/* Card 3: School level */}
          <div className="bg-surface rounded-2xl p-md border border-outline-variant shadow-sm flex flex-col justify-between animate-fade-in">
            <div>
              <span className="text-label-sm font-label-sm text-on-surface-variant uppercase tracking-wider block mb-2 font-semibold">
                School Level Registrations
              </span>
              <h2 className="text-display-md font-serif text-primary font-bold">{schoolLevelCount}</h2>
            </div>
            <p className="text-body-sm font-body-sm text-on-surface-variant mt-4 flex items-center gap-1 border-t border-outline-variant/30 pt-2">
              <span className="material-symbols-outlined text-[16px] text-secondary">domain</span>
              Drama & Quiz team entries
            </p>
          </div>

          {/* Card 4: Individual division registration percentage */}
          <div className="bg-surface rounded-2xl p-md border border-outline-variant shadow-sm flex flex-col justify-between animate-fade-in">
            <div>
              <span className="text-label-sm font-label-sm text-on-surface-variant uppercase tracking-wider block mb-2 font-semibold">
                Student Conversion
              </span>
              <h2 className="text-display-md font-serif text-primary font-bold">
                {totalStudents && totalStudents > 0 
                  ? `${Math.round((registrations.length / totalStudents) * 100)}%`
                  : '0%'}
              </h2>
            </div>
            <p className="text-body-sm font-body-sm text-on-surface-variant mt-4 flex items-center gap-1 border-t border-outline-variant/30 pt-2">
              <span className="material-symbols-outlined text-[16px] text-secondary">trending_up</span>
              Profiles with confirmed registrations
            </p>
          </div>
        </div>

        {/* Division Breakdown Section */}
        <div className="bg-surface rounded-xl p-md border border-outline-variant shadow-sm mb-lg animate-fade-in">
          <h3 className="text-title-lg font-title-lg text-on-surface mb-md flex items-center gap-2 font-serif font-bold">
            <span className="material-symbols-outlined text-primary">category</span>
            Registrations by Class Category & Division
          </h3>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {/* Primary */}
            <div className="flex flex-col gap-2 bg-surface-container-low p-4 rounded-xl border border-outline-variant/40">
              <div className="flex justify-between items-center text-body-md">
                <span className="font-semibold text-on-surface">Primary Division (Classes 1 - 5)</span>
                <span className="font-bold text-primary">{primaryCount}</span>
              </div>
              <div className="w-full bg-surface-container-high h-2.5 rounded-full overflow-hidden">
                <div 
                  className="bg-primary h-full rounded-full transition-all duration-500" 
                  style={{ width: `${registrations.length ? (primaryCount / registrations.length) * 100 : 0}%` }}
                ></div>
              </div>
              <span className="text-label-sm text-on-surface-variant">
                {registrations.length ? `${Math.round((primaryCount / registrations.length) * 100)}%` : '0%'} of registrations
              </span>
            </div>

            {/* Middle */}
            <div className="flex flex-col gap-2 bg-surface-container-low p-4 rounded-xl border border-outline-variant/40">
              <div className="flex justify-between items-center text-body-md">
                <span className="font-semibold text-on-surface">Middle Division (Classes 6 - 8)</span>
                <span className="font-bold text-primary">{middleCount}</span>
              </div>
              <div className="w-full bg-surface-container-high h-2.5 rounded-full overflow-hidden">
                <div 
                  className="bg-secondary h-full rounded-full transition-all duration-500" 
                  style={{ width: `${registrations.length ? (middleCount / registrations.length) * 100 : 0}%` }}
                ></div>
              </div>
              <span className="text-label-sm text-on-surface-variant">
                {registrations.length ? `${Math.round((middleCount / registrations.length) * 100)}%` : '0%'} of registrations
              </span>
            </div>

            {/* Secondary */}
            <div className="flex flex-col gap-2 bg-surface-container-low p-4 rounded-xl border border-outline-variant/40">
              <div className="flex justify-between items-center text-body-md">
                <span className="font-semibold text-on-surface">Secondary Division (Classes 9 - 12)</span>
                <span className="font-bold text-primary">{secondaryCount}</span>
              </div>
              <div className="w-full bg-surface-container-high h-2.5 rounded-full overflow-hidden">
                <div 
                  className="bg-tertiary h-full rounded-full transition-all duration-500" 
                  style={{ width: `${registrations.length ? (secondaryCount / registrations.length) * 100 : 0}%` }}
                ></div>
              </div>
              <span className="text-label-sm text-on-surface-variant">
                {registrations.length ? `${Math.round((secondaryCount / registrations.length) * 100)}%` : '0%'} of registrations
              </span>
            </div>

            {/* School level */}
            <div className="flex flex-col gap-2 bg-surface-container-low p-4 rounded-xl border border-outline-variant/40">
              <div className="flex justify-between items-center text-body-md">
                <span className="font-semibold text-on-surface">School Level (Institutional)</span>
                <span className="font-bold text-primary">{schoolLevelCount}</span>
              </div>
              <div className="w-full bg-surface-container-high h-2.5 rounded-full overflow-hidden">
                <div 
                  className="bg-outline h-full rounded-full transition-all duration-500" 
                  style={{ width: `${registrations.length ? (schoolLevelCount / registrations.length) * 100 : 0}%` }}
                ></div>
              </div>
              <span className="text-label-sm text-on-surface-variant">
                {registrations.length ? `${Math.round((schoolLevelCount / registrations.length) * 100)}%` : '0%'} of registrations
              </span>
            </div>
          </div>
        </div>

        {/* Interactive Registrations Table & Event Stats */}
        <AdminDashboardClient registrations={registrations} eventStats={eventStats} />
      </main>

      <Footer />
    </>
  )
}
