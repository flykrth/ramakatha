import Navbar from '@/components/layout/Navbar'
import Footer from '@/components/layout/Footer'
import { getCurrentStudent } from '@/services/auth'
import Link from 'next/link'

export const revalidate = 0

export default async function Home() {
  const student = await getCurrentStudent()

  return (
    <>
      <Navbar student={student} />

      <main className="pt-24 pb-xl flex-grow">
        {/* Hero Section */}
        <section className="relative px-margin-mobile md:px-margin-desktop max-w-max-width mx-auto py-xl md:py-[120px] flex flex-col items-center text-center">
          <div className="inline-flex items-center gap-2 bg-secondary-container/10 px-4 py-1.5 rounded-full mb-6">
            <span className="text-secondary-container material-symbols-outlined text-sm">auto_awesome</span>
            <span className="text-secondary-container text-label-sm font-label-sm uppercase tracking-wider">
              Registration Open
            </span>
          </div>

          <h1 className="text-5xl md:text-7xl text-primary mb-6 max-w-4xl font-hindi tracking-wider">
            Ramakatha 2026
          </h1>

          <p className="text-body-lg font-body-lg text-on-surface-variant max-w-2xl mb-10">
            Celebrating Indian Cultural Heritage through Academic Excellence. Join institutions worldwide in a scholarly
            exploration of epic traditions.
          </p>

          <div className="flex flex-col sm:flex-row gap-4 w-full sm:w-auto justify-center">
            <Link
              href={student ? '/dashboard' : '/register'}
              className="bg-primary-container text-on-primary font-bold text-label-md font-label-md py-3 px-8 rounded-[12px] hover:shadow-level-2 transition-all flex items-center justify-center gap-2 w-full sm:w-auto"
            >
              {student ? 'Go to Dashboard' : 'Register Now'}
              <span className="material-symbols-outlined">arrow_forward</span>
            </Link>
          </div>

          {/* Decorative visual element */}
          <div className="w-full mt-xl rounded-2xl overflow-hidden shadow-level-1 border border-outline-variant relative h-[400px]">
            <div
              className="bg-cover bg-center w-full h-full absolute inset-0"
              style={{
                backgroundImage:
                  "url('https://lh3.googleusercontent.com/aida-public/AB6AXuBDqIu31pKdk40Vsz0RRzay8A6bdpkWleqg5LHBKKAVL5dymuvISO3_LTCRtOulRKpG4lh8j1EcALTEWAzNPRqP9nGVMPm1pZT5XQcw91Hpw4DqA44zmcx2UEbWCD7rV521RqP0h45uJLgDpba0Yp39Y4LUJlJDktZ4bmmFgIqzGeNkSygrK-yCNjD5_b5qOIYPkRkK1TtPULuaCVeJuGMMt47N8wKmvlBy6XMW4kkFnIONckl6haUPFg')",
              }}
            ></div>
            <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent flex items-end p-8">
              <p className="text-white text-title-lg font-title-lg max-w-lg text-left">
                Fostering a deeper understanding of cultural narratives across generations.
              </p>
            </div>
          </div>
        </section>
      </main>

      <Footer />
    </>
  )
}
