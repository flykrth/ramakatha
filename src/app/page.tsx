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

      <main className="relative pt-24 pb-xl flex-grow overflow-hidden bg-background">
        {/* Animated Background Graphics */}
        <div className="absolute inset-0 overflow-hidden pointer-events-none z-0">
          {/* Glowing mesh blobs */}
          <div className="absolute top-[10%] left-[-10%] w-[500px] h-[500px] rounded-full bg-primary/[0.04] blur-[120px] animate-pulse"></div>
          <div className="absolute bottom-[20%] right-[-10%] w-[600px] h-[600px] rounded-full bg-secondary-container/[0.04] blur-[150px] animate-pulse" style={{ animationDelay: '2s' }}></div>
          <div className="absolute top-[40%] right-[10%] w-[400px] h-[400px] rounded-full bg-[#D4AF37]/[0.03] blur-[100px] animate-pulse" style={{ animationDelay: '4s' }}></div>

          {/* Rotating Mandala Left */}
          <svg className="absolute -top-40 -left-40 w-[600px] h-[600px] text-primary/[0.02] animate-slow-rotate" viewBox="0 0 100 100" fill="none" stroke="currentColor" strokeWidth="0.25">
            <circle cx="50" cy="50" r="45" />
            <circle cx="50" cy="50" r="35" />
            <circle cx="50" cy="50" r="25" />
            <path d="M50 5 L50 95 M5 50 L95 50 M18.2 18.2 L81.8 81.8 M18.2 81.8 L81.8 18.2" strokeDasharray="1 2" />
            {Array.from({ length: 24 }).map((_, i) => {
              const angle = (i * 15 * Math.PI) / 180
              const x1 = 50 + 25 * Math.cos(angle)
              const y1 = 50 + 25 * Math.sin(angle)
              const x2 = 50 + 45 * Math.cos(angle)
              const y2 = 50 + 45 * Math.sin(angle)
              return <line key={i} x1={x1} y1={y1} x2={x2} y2={y2} />
            })}
          </svg>

          {/* Rotating Mandala Right */}
          <svg className="absolute bottom-20 -right-60 w-[800px] h-[800px] text-secondary-container/[0.02] animate-slow-rotate" viewBox="0 0 100 100" fill="none" stroke="currentColor" strokeWidth="0.2" style={{ animationDirection: 'reverse', animationDuration: '180s' }}>
            <circle cx="50" cy="50" r="45" />
            <circle cx="50" cy="50" r="30" />
            <circle cx="50" cy="50" r="15" />
            <path d="M50 5 L50 95 M5 50 L95 50" strokeDasharray="1 1" />
            {Array.from({ length: 36 }).map((_, i) => {
              const angle = (i * 10 * Math.PI) / 180
              const x1 = 50 + 15 * Math.cos(angle)
              const y1 = 50 + 15 * Math.sin(angle)
              const x2 = 50 + 45 * Math.cos(angle)
              const y2 = 50 + 45 * Math.sin(angle)
              return <line key={i} x1={x1} y1={y1} x2={x2} y2={y2} />
            })}
          </svg>
        </div>

        {/* Hero Section */}
        <section className="relative px-margin-mobile md:px-margin-desktop max-w-max-width mx-auto py-xl md:py-[120px] flex flex-col items-center text-center z-10">
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
