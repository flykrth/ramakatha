import { getCurrentStudent } from '@/services/auth'
import { getCompetitions } from '@/services/competitions'
import Navbar from '@/components/layout/Navbar'
import Footer from '@/components/layout/Footer'
import CompetitionsList from '@/components/competitions/CompetitionsList'
import { redirect } from 'next/navigation'

export const revalidate = 0

export default async function CompetitionsPage() {
  const student = await getCurrentStudent()

  // Redirect to registration if the student profile is not found or not logged in
  if (!student) {
    redirect('/register')
  }

  // Fetch only competitions eligible for the student's class category
  const competitions = await getCompetitions(student.class)

  return (
    <>
      <Navbar student={student} />

      <main className="flex-grow w-full max-w-max-width mx-auto px-margin-mobile md:px-margin-desktop py-lg md:py-xl pt-28">
        {/* Header Section */}
        <div className="mb-lg text-center md:text-left">
          <h1 className="text-headline-lg-mobile md:text-headline-lg font-serif text-primary mb-sm">
            Cultural Competitions
          </h1>
          <p className="text-body-lg font-body-lg text-on-surface-variant max-w-2xl">
            Explore and register for upcoming events. We have selected competitions tailored to your eligibility (Class {student.class}).
          </p>
        </div>

        {/* Competitions Filter List */}
        <CompetitionsList competitions={competitions as any} studentClass={student.class} />
      </main>

      <Footer />
    </>
  )
}
