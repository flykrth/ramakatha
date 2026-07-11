import Link from 'next/link'

export default function Footer() {
  return (
    <footer className="bg-surface-container-low dark:bg-surface-container-highest border-t border-outline-variant w-full mt-xl">
      <div className="grid grid-cols-1 md:grid-cols-4 gap-gutter px-margin-mobile md:px-margin-desktop py-lg max-w-max-width mx-auto">
        <div className="md:col-span-1 mb-4 md:mb-0">
          <h4 className="text-title-lg font-title-lg text-primary mb-4 font-bold">Ramakatha</h4>
          <p className="text-label-sm font-label-sm text-on-surface-variant">
            © 2026 Ramakatha Institutional Council. All rights reserved.
          </p>
        </div>
        <div className="md:col-span-3 grid grid-cols-2 sm:grid-cols-4 gap-4">
          <Link href="#" className="text-body-md font-body-md text-on-surface-variant hover:text-secondary transition-colors">
            Privacy Policy
          </Link>
          <Link href="#" className="text-body-md font-body-md text-on-surface-variant hover:text-secondary transition-colors">
            Terms of Service
          </Link>
          <Link href="#" className="text-body-md font-body-md text-on-surface-variant hover:text-secondary transition-colors">
            Contact Us
          </Link>
          <Link href="#" className="text-body-md font-body-md text-on-surface-variant hover:text-secondary transition-colors">
            Institutional Login
          </Link>
        </div>
      </div>
    </footer>
  )
}
