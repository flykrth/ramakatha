import * as React from 'react'

export interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: 'primary' | 'secondary' | 'ghost' | 'error'
  size?: 'sm' | 'md' | 'lg'
}

export const Button = React.forwardRef<HTMLButtonElement, ButtonProps>(
  ({ className = '', variant = 'primary', size = 'md', ...props }, ref) => {
    const baseStyles = 'inline-flex items-center justify-center rounded-[12px] font-bold transition-all focus:outline-none disabled:opacity-50 disabled:cursor-not-allowed cursor-pointer'
    
    let variantStyles = ''
    if (variant === 'primary') variantStyles = 'bg-primary-container text-on-primary hover:shadow-level-2'
    if (variant === 'secondary') variantStyles = 'border border-primary text-primary hover:bg-surface-container-high'
    if (variant === 'ghost') variantStyles = 'text-primary hover:bg-surface-container'
    if (variant === 'error') variantStyles = 'bg-error text-on-error hover:opacity-90'

    let sizeStyles = ''
    if (size === 'sm') sizeStyles = 'py-1.5 px-4 text-label-sm'
    if (size === 'md') sizeStyles = 'py-2.5 px-6 text-label-md'
    if (size === 'lg') sizeStyles = 'py-3 px-8 text-title-md'

    return (
      <button
        ref={ref}
        className={`${baseStyles} ${variantStyles} ${sizeStyles} ${className}`}
        {...props}
      />
    )
  }
)
Button.displayName = 'Button'
