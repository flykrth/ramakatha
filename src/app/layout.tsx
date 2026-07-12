import type { Metadata } from "next";
import { Playfair_Display, Inter } from "next/font/google";
import "./globals.css";
import InteractiveCanvas from "@/components/home/InteractiveCanvas";
import TransitionSplash from "@/components/common/TransitionSplash";

const playfairDisplay = Playfair_Display({
  variable: "--font-playfair-display",
  subsets: ["latin"],
  weight: ["400", "600", "700"],
});

const inter = Inter({
  variable: "--font-inter",
  subsets: ["latin"],
  weight: ["400", "500", "600", "700"],
});

export const metadata: Metadata = {
  title: "Ramakatha 2026",
  description: "Official student competition portal conducted by Amrita LEAP, Amrita Vishwa Vidyapeetham.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html
      lang="en"
      className={`${playfairDisplay.variable} ${inter.variable} h-full antialiased`}
    >
      <head>
        <link
          href="https://fonts.googleapis.com/css2?family=Material+Symbols+Outlined:opsz,wght,FILL,GRAD@20..48,100..700,0..1,-50..200"
          rel="stylesheet"
        />
      </head>
      <body className="min-h-full flex flex-col bg-background text-on-background selection:bg-secondary-container selection:text-on-secondary-container font-sans antialiased relative">
        {/* Global Background Layer */}
        <div className="fixed inset-0 overflow-hidden pointer-events-none z-0">
          <InteractiveCanvas />

          {/* Glowing mesh blobs - increased opacities for light background visibility */}
          <div className="absolute top-[10%] left-[-10%] w-[600px] h-[600px] rounded-full bg-primary/[0.08] blur-[120px] animate-flow-glow"></div>
          <div className="absolute bottom-[10%] right-[-10%] w-[700px] h-[700px] rounded-full bg-secondary-container/[0.07] blur-[150px] animate-flow-glow" style={{ animationDelay: '-5s' }}></div>
          <div className="absolute top-[40%] left-[30%] w-[500px] h-[500px] rounded-full bg-[#D4AF37]/[0.06] blur-[100px] animate-flow-glow" style={{ animationDelay: '-10s' }}></div>

          {/* Floating firefly/glowing particles - slightly larger and higher visibility */}
          <div className="particle w-2.5 h-2.5" style={{ left: '10%', animationDelay: '0s', animationDuration: '14s' }}></div>
          <div className="particle w-3.5 h-3.5" style={{ left: '25%', animationDelay: '2s', animationDuration: '18s' }}></div>
          <div className="particle w-2 h-2" style={{ left: '40%', animationDelay: '4s', animationDuration: '12s' }}></div>
          <div className="particle w-4.5 h-4.5" style={{ left: '55%', animationDelay: '1s', animationDuration: '22s' }}></div>
          <div className="particle w-3 h-3" style={{ left: '70%', animationDelay: '6s', animationDuration: '16s' }}></div>
          <div className="particle w-4 h-4" style={{ left: '85%', animationDelay: '3s', animationDuration: '20s' }}></div>
          <div className="particle w-2.5 h-2.5" style={{ left: '95%', animationDelay: '5s', animationDuration: '15s' }}></div>

          {/* Twinkling star highlights - higher contrast for light background */}
          <svg className="absolute top-[25%] left-[15%] w-6 h-6 text-[#D4AF37]/45 animate-twinkle" viewBox="0 0 24 24" fill="currentColor">
            <path d="M12 2L14.8 9.2L22 12L14.8 14.8L12 22L9.2 14.8L2 12L9.2 9.2L12 2Z" />
          </svg>
          <svg className="absolute top-[15%] right-[20%] w-4 h-4 text-[#D4AF37]/40 animate-twinkle" viewBox="0 0 24 24" fill="currentColor" style={{ animationDelay: '1.5s' }}>
            <path d="M12 2L14.8 9.2L22 12L14.8 14.8L12 22L9.2 14.8L2 12L9.2 9.2L12 2Z" />
          </svg>
          <svg className="absolute top-[50%] right-[10%] w-5 h-5 text-[#D4AF37]/35 animate-twinkle" viewBox="0 0 24 24" fill="currentColor" style={{ animationDelay: '3s' }}>
            <path d="M12 2L14.8 9.2L22 12L14.8 14.8L12 22L9.2 14.8L2 12L9.2 9.2L12 2Z" />
          </svg>

          {/* Rotating Mandala Left - higher visibility text-primary opacity */}
          <svg className="absolute -top-40 -left-40 w-[600px] h-[600px] text-primary/[0.04] animate-slow-rotate" viewBox="0 0 100 100" fill="none" stroke="currentColor" strokeWidth="0.25">
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

          {/* Rotating Mandala Right - higher visibility text-secondary-container opacity */}
          <svg className="absolute bottom-20 -right-60 w-[800px] h-[800px] text-secondary-container/[0.04] animate-slow-rotate" viewBox="0 0 100 100" fill="none" stroke="currentColor" strokeWidth="0.2" style={{ animationDirection: 'reverse', animationDuration: '180s' }}>
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

        {/* Global Page Content Container */}
        <div className="relative z-10 flex flex-col min-h-screen">
          {children}
        </div>

        {/* Global Splash Screen Overlay */}
        <TransitionSplash />
      </body>
    </html>
  );
}
