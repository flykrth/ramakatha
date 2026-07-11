import { getCurrentStudent } from '@/services/auth'
import { getCompetitionById } from '@/services/competitions'
import { getStudentRegistrations } from '@/services/registrations'
import Navbar from '@/components/layout/Navbar'
import Footer from '@/components/layout/Footer'
import GuidelinesForm from '@/components/competitions/GuidelinesForm'
import { redirect } from 'next/navigation'

export const revalidate = 0

interface PageProps {
  params: Promise<{ id: string }>
}

export default async function CompetitionDetailsPage({ params }: PageProps) {
  const student = await getCurrentStudent()

  // Redirect to registration if the student profile is not found or not logged in
  if (!student) {
    redirect('/register')
  }

  const { id } = await params
  
  let competition
  try {
    competition = await getCompetitionById(id)
  } catch (e) {
    // Redirect if competition is not found
    redirect('/competitions')
  }

  // Security check: Verify student class is eligible for this division or if it's school-wise
  const isEligible = competition.is_school_wise || competition.eligible_classes.includes(student.class)
  if (!isEligible) {
    // If not eligible, strictly redirect them to the browse page
    redirect('/competitions')
  }

  // Fetch existing registrations to check limits
  const registrations = await getStudentRegistrations(student.id)
  const isAlreadyRegistered = registrations.some((r: any) => r.competitions && r.competitions.id === competition.id)
  const hasRegisteredClassEvent = registrations.some((r: any) => r.competitions && !r.competitions.is_school_wise)

  return (
    <>
      <Navbar student={student} />

      <main className="flex-grow w-full max-w-max-width mx-auto px-margin-mobile md:px-margin-desktop py-lg md:py-xl pt-28">
        {/* Navigation / Header */}
        <div className="mb-lg">
          <div className="inline-flex items-center gap-2 px-3 py-1 bg-surface-container rounded-full text-primary text-label-sm font-label-sm mb-4">
            <span className="material-symbols-outlined" style={{ fontSize: '16px' }}>
              gavel
            </span>
            Official Competition Rules
          </div>
          <h1 className="text-headline-lg-mobile md:text-display-lg font-serif text-primary mb-2">
            {competition.title}
          </h1>
          <p className="text-body-lg font-body-lg text-on-surface-variant max-w-2xl">
            Detailed guidelines, scoring criteria, and registration for the upcoming Ramakatha {competition.category} competition. Please review all requirements carefully before registering.
          </p>
        </div>

        {/* Guidelines and Accept Checklist Form */}
        <GuidelinesForm 
          competition={competition as any} 
          isAlreadyRegistered={isAlreadyRegistered}
          hasRegisteredClassEvent={hasRegisteredClassEvent}
        />
      </main>

      <Footer />
    </>
  )
}
