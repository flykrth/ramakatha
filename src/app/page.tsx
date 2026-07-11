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

          <h1 className="text-5xl md:text-8xl text-primary mb-6 max-w-4xl font-hindi tracking-wider">
            Ramakatha 2026
          </h1>

          <p className="text-body-lg font-body-lg text-on-surface-variant max-w-2xl mb-10">
            Celebrating Indian Cultural Heritage through Academic Excellence. Join institutions worldwide in a scholarly
            exploration of epic traditions.
          </p>

          <div className="flex flex-col sm:flex-row gap-4 w-full sm:w-auto">
            <Link
              href={student ? '/dashboard' : '/register'}
              className="bg-primary-container text-on-primary font-bold text-label-md font-label-md py-3 px-8 rounded-[12px] hover:shadow-level-2 transition-all flex items-center justify-center gap-2 w-full sm:w-auto"
            >
              {student ? 'Go to Dashboard' : 'Register Now'}
              <span className="material-symbols-outlined">arrow_forward</span>
            </Link>
            <a
              href="#about"
              className="border border-primary text-primary font-bold text-label-md font-label-md py-3 px-8 rounded-[12px] hover:bg-surface-container-high transition-all flex items-center justify-center w-full sm:w-auto"
            >
              Learn More
            </a>
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

        {/* About Section (Bento Grid) */}
        <section id="about" className="px-margin-mobile md:px-margin-desktop max-w-max-width mx-auto py-lg md:py-xl">
          <div className="mb-10 text-center md:text-left">
            <h2 className="text-headline-lg-mobile md:text-headline-lg font-serif text-primary mb-4">
              About Ramakatha
            </h2>
            <p className="text-body-md font-body-md text-on-surface-variant max-w-3xl">
              An institutional initiative fostering academic rigor and cultural appreciation.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 auto-rows-[250px]">
            {/* Card 1: Span 2 cols */}
            <div className="bg-surface shadow-level-1 border border-outline-variant rounded-[16px] p-8 md:col-span-2 flex flex-col justify-between group hover:shadow-level-2 transition-shadow">
              <div>
                <span className="material-symbols-outlined text-secondary-container mb-4 text-3xl">account_balance</span>
                <h3 className="text-title-lg font-title-lg text-primary mb-2 font-bold">Institutional Context</h3>
                <p className="text-body-md font-body-md text-on-surface-variant">
                  Ramakatha 2026 is designed to integrate cultural studies with modern academic frameworks, providing a
                  platform for structured discourse and competition.
                </p>
              </div>
            </div>

            {/* Card 2: Span 1 col */}
            <div className="bg-surface shadow-level-1 border border-outline-variant rounded-[16px] p-8 flex flex-col justify-between border-t-4 border-t-[#D4AF37] group hover:shadow-level-2 transition-shadow">
              <div>
                <span className="material-symbols-outlined text-secondary-container mb-4 text-3xl">school</span>
                <h3 className="text-title-lg font-title-lg text-primary mb-2 font-bold">Academic Rigor</h3>
                <p className="text-body-md font-body-md text-on-surface-variant">
                  Evaluated by distinguished scholars and practitioners.
                </p>
              </div>
            </div>

            {/* Card 3: Span 1 col */}
            <div className="bg-surface shadow-level-1 border border-outline-variant rounded-[16px] p-8 flex flex-col justify-between group hover:shadow-level-2 transition-shadow relative overflow-hidden">
              <div className="relative z-10">
                <span className="material-symbols-outlined text-secondary-container mb-4 text-3xl">public</span>
                <h3 className="text-title-lg font-title-lg text-primary mb-2 font-bold">Global Reach</h3>
                <p className="text-body-md font-body-md text-on-surface-variant">
                  Connecting institutions across borders.
                </p>
              </div>
            </div>

            {/* Card 4: Span 2 cols */}
            <div className="bg-primary-container text-on-primary shadow-level-1 rounded-[16px] p-8 md:col-span-2 flex flex-col md:flex-row justify-between items-center group hover:shadow-level-2 transition-shadow overflow-hidden relative">
              <div className="relative z-10 md:w-2/3 mb-6 md:mb-0">
                <h3 className="text-headline-md font-headline-md mb-2 font-serif text-white">
                  Organized by Amrita LEAP
                </h3>
                <p className="text-body-md font-body-md opacity-90 text-white">Amrita Vishwa Vidyapeetham</p>
              </div>
              <div className="relative z-10 md:w-1/3 flex justify-end">
                <button className="bg-surface text-primary font-bold text-label-md font-label-md py-3 px-6 rounded-[12px] hover:bg-surface-container transition-all cursor-pointer">
                  View Heritage
                </button>
              </div>
              {/* Subtle pattern overlay */}
              <div className="absolute inset-0 opacity-10 bg-[radial-gradient(circle_at_center,_var(--tw-gradient-stops))] from-white to-transparent"></div>
            </div>
          </div>
        </section>
      </main>

      <Footer />
    </>
  )
}
