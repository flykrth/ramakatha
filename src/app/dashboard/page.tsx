import { getCurrentStudent } from '@/services/auth'
import { getStudentRegistrations } from '@/services/registrations'
import { getCompetitions } from '@/services/competitions'
import DashboardContent from '@/components/dashboard/DashboardContent'
import Navbar from '@/components/layout/Navbar'
import Footer from '@/components/layout/Footer'
import { redirect } from 'next/navigation'

export const revalidate = 0

export default async function DashboardPage() {
  const student = await getCurrentStudent()

  // Redirect to registration if the student profile is not found or not logged in
  if (!student) {
    redirect('/register')
  }

  // Fetch registrations and total eligible events
  const [registrations, eligibleCompetitions] = await Promise.all([
    getStudentRegistrations(student.id),
    getCompetitions(student.class)
  ])

  return (
    <>
      <Navbar student={student} />
      <DashboardContent
        student={student as any}
        initialRegistrations={registrations as any}
      />
      <Footer />
    </>
  )
}
