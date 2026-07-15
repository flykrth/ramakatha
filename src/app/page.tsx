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

          <p className="text-body-lg font-body-lg text-on-surface-variant max-w-2xl mb-8">
            Celebrate the timeless wisdom of Ramayana through creativity & character.
          </p>

          <div className="bg-surface-container/50 border border-outline-variant/60 rounded-xl px-6 py-4 mb-10 max-w-xl shadow-sm text-center">
            <p className="text-body-md text-on-surface-variant leading-relaxed">
              <span className="font-semibold text-on-surface block mb-1">Important dates:</span>
              Last date of registration is <span className="text-primary font-bold">16 August, 2026</span>.<br />
              Last date of submission is <span className="text-primary font-bold text-[#8b5a2b]">31 August, 2026</span>.
            </p>
          </div>

          <div className="flex flex-col sm:flex-row gap-4 w-full sm:w-auto justify-center">
            <Link
              href={student ? '/dashboard' : '/register'}
              className="relative overflow-hidden bg-gradient-to-r from-primary via-[#b58a3d] to-primary hover:from-[#b58a3d] hover:to-primary text-white font-bold text-label-md font-label-md py-3.5 px-9 rounded-[12px] shadow-level-1 hover:shadow-level-3 hover:scale-[1.04] hover:-translate-y-0.5 active:scale-[0.98] transition-all duration-300 flex items-center justify-center gap-2 w-full sm:w-auto animate-pulse-glow animate-shine-slide border border-[#b58a3d]/30"
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
                Ramayana is not just a story. It is a journey of values, courage and devotion that transcends time.
              </p>
            </div>
          </div>
        </section>

        {/* Categories Section */}
        <section className="relative px-margin-mobile md:px-margin-desktop max-w-max-width mx-auto pb-xl md:pb-[100px] z-10">
          <div className="text-center mb-12">
            <h2 className="text-headline-md font-headline-md text-primary font-serif font-bold mb-4">
              Competition categories
            </h2>
            <p className="text-body-lg text-on-surface-variant max-w-2xl mx-auto">
              Explore events categorized by eligibility class levels and school participation.
            </p>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {/* Teal: Classes 1-5 */}
            <div className="glass-card border border-[#008080]/30 rounded-2xl p-6 hover:-translate-y-2 hover:shadow-level-3 transition-all duration-300 bg-[#008080]/[0.02] hover:bg-[#008080]/[0.05] group">
              <div className="mb-6">
                <h3 className="text-title-lg font-bold text-[#008080]">Classes 1 - 5</h3>
              </div>
              <ul className="space-y-4 text-left">
                <li className="flex items-start gap-3">
                  <span className="material-symbols-outlined text-lg text-[#008080] mt-0.5 group-hover:scale-110 transition-transform">face</span>
                  <span className="text-body-md text-on-surface-variant font-medium">Ramayana character portrayal</span>
                </li>
                <li className="flex items-start gap-3">
                  <span className="material-symbols-outlined text-lg text-[#008080] mt-0.5 group-hover:scale-110 transition-transform">brush</span>
                  <span className="text-body-md text-on-surface-variant font-medium">Drawing competition</span>
                </li>
              </ul>
            </div>

            {/* Amber: Classes 6-8 */}
            <div className="glass-card border border-[#8b5a2b]/30 rounded-2xl p-6 hover:-translate-y-2 hover:shadow-level-3 transition-all duration-300 bg-[#8b5a2b]/[0.02] hover:bg-[#8b5a2b]/[0.05] group">
              <div className="mb-6">
                <h3 className="text-title-lg font-bold text-[#8b5a2b]">Classes 6 - 8</h3>
              </div>
              <ul className="space-y-4 text-left">
                <li className="flex items-start gap-3">
                  <span className="material-symbols-outlined text-lg text-[#8b5a2b] mt-0.5 group-hover:scale-110 transition-transform">auto_stories</span>
                  <span className="text-body-md text-on-surface-variant font-medium">Storytelling</span>
                </li>
                <li className="flex items-start gap-3">
                  <span className="material-symbols-outlined text-lg text-[#8b5a2b] mt-0.5 group-hover:scale-110 transition-transform">theater_comedy</span>
                  <span className="text-body-md text-on-surface-variant font-medium">Mono act</span>
                </li>
                <li className="flex items-start gap-3">
                  <span className="material-symbols-outlined text-lg text-[#8b5a2b] mt-0.5 group-hover:scale-110 transition-transform">history_edu</span>
                  <span className="text-body-md text-on-surface-variant font-medium">Essay writing</span>
                </li>
              </ul>
            </div>

            {/* Blue: Classes 9-12 */}
            <div className="glass-card border border-[#1e3f66]/30 rounded-2xl p-6 hover:-translate-y-2 hover:shadow-level-3 transition-all duration-300 bg-[#1e3f66]/[0.02] hover:bg-[#1e3f66]/[0.05] group">
              <div className="mb-6">
                <h3 className="text-title-lg font-bold text-[#1e3f66]">Classes 9 - 12</h3>
              </div>
              <ul className="space-y-4 text-left">
                <li className="flex items-start gap-3">
                  <span className="material-symbols-outlined text-lg text-[#1e3f66] mt-0.5 group-hover:scale-110 transition-transform">palette</span>
                  <span className="text-body-md text-on-surface-variant font-medium">Painting</span>
                </li>
                <li className="flex items-start gap-3">
                  <span className="material-symbols-outlined text-lg text-[#1e3f66] mt-0.5 group-hover:scale-110 transition-transform">volunteer_activism</span>
                  <span className="text-body-md text-on-surface-variant font-medium">Elder wisdom interview</span>
                </li>
                <li className="flex items-start gap-3">
                  <span className="material-symbols-outlined text-lg text-[#1e3f66] mt-0.5 group-hover:scale-110 transition-transform">edit_document</span>
                  <span className="text-body-md text-on-surface-variant font-medium">Article writing</span>
                </li>
              </ul>
            </div>

            {/* Purple: School Level */}
            <div className="glass-card border border-[#6a1b9a]/30 rounded-2xl p-6 hover:-translate-y-2 hover:shadow-level-3 transition-all duration-300 bg-[#6a1b9a]/[0.02] hover:bg-[#6a1b9a]/[0.05] group">
              <div className="mb-6">
                <h3 className="text-title-lg font-bold text-[#6a1b9a]">School level</h3>
                <p className="text-label-sm text-[#6a1b9a] font-semibold mt-1">Group events for classes IX to XII</p>
              </div>
              <ul className="space-y-4 text-left">
                <li className="flex items-start gap-3">
                  <span className="material-symbols-outlined text-lg text-[#6a1b9a] mt-0.5 group-hover:scale-110 transition-transform">quiz</span>
                  <span className="text-body-md text-on-surface-variant font-medium">Ramayana quiz</span>
                </li>
                <li className="flex items-start gap-3">
                  <span className="material-symbols-outlined text-lg text-[#6a1b9a] mt-0.5 group-hover:scale-110 transition-transform">groups</span>
                  <span className="text-body-md text-on-surface-variant font-medium">Drama competition</span>
                </li>
              </ul>
            </div>
          </div>
        </section>
      </main>

      <Footer />
    </>
  )
}
