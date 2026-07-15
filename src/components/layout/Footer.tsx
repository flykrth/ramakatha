import Link from 'next/link'

export default function Footer() {
  return (
    <footer className="bg-surface-container-low dark:bg-surface-container-highest border-t border-outline-variant w-full mt-xl">
      <div className="grid grid-cols-1 md:grid-cols-2 gap-gutter px-margin-mobile md:px-margin-desktop py-lg max-w-max-width mx-auto items-center">
        <div className="mb-4 md:mb-0 flex flex-col gap-2">
          <img
            src="/logo.png"
            alt="RAMA Katha 2026"
            className="h-10 w-auto object-contain self-start"
          />
          <p className="text-label-sm font-label-sm text-on-surface-variant">
            © 2026 Amrita LEAP. All rights reserved.
          </p>
        </div>
        <div className="flex flex-wrap gap-6 md:justify-end text-body-md font-body-md text-on-surface-variant">
          <a href="tel:+918281494744" className="hover:text-primary transition-colors flex items-center gap-1.5 font-semibold">
            <span className="material-symbols-outlined" style={{ fontSize: '18px' }}>phone</span>
            +91 8281494744
          </a>
          <a href="mailto:amritaleap@am.amrita.edu" className="hover:text-primary transition-colors flex items-center gap-1.5 font-semibold">
            <span className="material-symbols-outlined" style={{ fontSize: '18px' }}>mail</span>
            amritaleap@am.amrita.edu
          </a>
        </div>
      </div>
    </footer>
  )
}
