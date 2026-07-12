import Navbar from '@/components/layout/Navbar'
import Footer from '@/components/layout/Footer'
import { getCurrentStudent } from '@/services/auth'
import InteractiveCanvas from '@/components/home/InteractiveCanvas'
import Link from 'next/link'

export const revalidate = 0

export default async function Home() {
  const student = await getCurrentStudent()

  return (
    <>
      <Navbar student={student} />

      <main className="relative pt-24 pb-xl flex-grow overflow-hidden bg-background">
        <InteractiveCanvas />
        {/* Animated Background Graphics */}
        <div className="absolute inset-0 overflow-hidden pointer-events-none z-0">
          {/* Glowing mesh blobs */}
          <div className="absolute top-[10%] left-[-10%] w-[600px] h-[600px] rounded-full bg-primary/[0.06] blur-[120px] animate-flow-glow"></div>
          <div className="absolute bottom-[10%] right-[-10%] w-[700px] h-[700px] rounded-full bg-secondary-container/[0.05] blur-[150px] animate-flow-glow" style={{ animationDelay: '-5s' }}></div>
          <div className="absolute top-[40%] left-[30%] w-[500px] h-[500px] rounded-full bg-[#D4AF37]/[0.04] blur-[100px] animate-flow-glow" style={{ animationDelay: '-10s' }}></div>

          {/* Floating firefly/glowing particles */}
          <div className="particle w-2 h-2" style={{ left: '10%', animationDelay: '0s', animationDuration: '14s' }}></div>
          <div className="particle w-3 h-3" style={{ left: '25%', animationDelay: '2s', animationDuration: '18s' }}></div>
          <div className="particle w-1.5 h-1.5" style={{ left: '40%', animationDelay: '4s', animationDuration: '12s' }}></div>
          <div className="particle w-4 h-4" style={{ left: '55%', animationDelay: '1s', animationDuration: '22s' }}></div>
          <div className="particle w-2.5 h-2.5" style={{ left: '70%', animationDelay: '6s', animationDuration: '16s' }}></div>
          <div className="particle w-3.5 h-3.5" style={{ left: '85%', animationDelay: '3s', animationDuration: '20s' }}></div>
          <div className="particle w-2 h-2" style={{ left: '95%', animationDelay: '5s', animationDuration: '15s' }}></div>

          {/* Sparkling stars */}
          <svg className="absolute top-[25%] left-[15%] w-6 h-6 text-[#D4AF37]/35 animate-twinkle" viewBox="0 0 24 24" fill="currentColor">
            <path d="M12 2L14.8 9.2L22 12L14.8 14.8L12 22L9.2 14.8L2 12L9.2 9.2L12 2Z" />
          </svg>
          <svg className="absolute top-[15%] right-[20%] w-4 h-4 text-[#D4AF37]/30 animate-twinkle" viewBox="0 0 24 24" fill="currentColor" style={{ animationDelay: '1.5s' }}>
            <path d="M12 2L14.8 9.2L22 12L14.8 14.8L12 22L9.2 14.8L2 12L9.2 9.2L12 2Z" />
          </svg>
          <svg className="absolute top-[50%] right-[10%] w-5 h-5 text-[#D4AF37]/25 animate-twinkle" viewBox="0 0 24 24" fill="currentColor" style={{ animationDelay: '3s' }}>
            <path d="M12 2L14.8 9.2L22 12L14.8 14.8L12 22L9.2 14.8L2 12L9.2 9.2L12 2Z" />
          </svg>

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
            Celebrate the timeless wisdom of Ramayana through creativity & character.
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
          <div className="w-full mt-xl rounded-2xl overflow-hidden shadow-level-1 border border-outline-variant relative h-[400px] card-shine hover:scale-[1.01] hover:shadow-level-2 transition-all duration-500 group cursor-pointer">
            <div
              className="bg-cover bg-center w-full h-full absolute inset-0"
              style={{
                backgroundImage:
                  "url('https://www.atmatattva.com/wp-content/uploads/2026/01/ramayana-01.jpg')",
              }}
            ></div>
            <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/30 to-transparent flex items-end p-8">
              <p className="text-white text-title-lg font-title-lg max-w-2xl text-left font-serif leading-relaxed">
                Ramayana is not just a story. It is a journey of values, courage and devotion that transcends time. Join us in celebrating this epic through art, performance and community.
              </p>
            </div>
          </div>
        </section>
      </main>

      <Footer />
    </>
  )
}
