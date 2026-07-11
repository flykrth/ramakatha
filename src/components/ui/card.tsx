import * as React from 'react'

export function Card({ className = '', ...props }: React.HTMLAttributes<HTMLDivElement>) {
  return (
    <div
      className={`bg-surface rounded-[16px] border border-outline-variant p-md md:p-lg shadow-level-1 ${className}`}
      {...props}
    />
  )
}
