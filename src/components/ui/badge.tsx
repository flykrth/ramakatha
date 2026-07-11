import * as React from 'react'

export interface BadgeProps extends React.HTMLAttributes<HTMLSpanElement> {
  variant?: 'primary' | 'secondary' | 'error' | 'outline'
}

export function Badge({ className = '', variant = 'primary', ...props }: BadgeProps) {
  const baseStyles = 'inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-label-sm font-label-sm uppercase tracking-wider'
  
  let variantStyles = ''
  if (variant === 'primary') variantStyles = 'bg-secondary-container/10 text-secondary-container border border-secondary-container/20'
  if (variant === 'secondary') variantStyles = 'bg-surface-container text-primary border border-outline-variant'
  if (variant === 'error') variantStyles = 'bg-error-container/10 text-error border border-error-container/20'
  if (variant === 'outline') variantStyles = 'border border-outline-variant text-on-surface-variant'

  return <span className={`${baseStyles} ${variantStyles} ${className}`} {...props} />
}
