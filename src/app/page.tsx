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

      <main className="relative pt-24 pb-xl flex-grow overflow-hidden">
        {/* Hero Section */}
        <section className="relative px-margin-mobile md:px-margin-desktop max-w-max-width mx-auto py-xl md:py-[120px] flex flex-col items-center text-center z-10">
          <div className="inline-flex items-center gap-2 bg-secondary-container/10 px-4 py-1.5 rounded-full mb-6">
            <span className="text-secondary-container material-symbols-outlined text-sm">auto_awesome</span>
            <span className="text-secondary-container text-label-sm font-label-sm uppercase tracking-wider">
              Registration open
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
              className="relative overflow-hidden bg-gradient-to-r from-primary via-[#D4AF37] to-primary hover:from-[#D4AF37] hover:to-primary text-white font-bold text-label-md font-label-md py-3.5 px-9 rounded-[12px] shadow-level-1 hover:shadow-level-3 hover:scale-[1.04] hover:-translate-y-0.5 active:scale-[0.98] transition-all duration-300 flex items-center justify-center gap-2 w-full sm:w-auto animate-pulse-glow animate-shine-slide border border-[#D4AF37]/30"
            >
              {student ? 'Go to dashboard' : 'Register now'}
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
