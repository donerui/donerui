import * as React from 'react'
import { twMerge } from 'tailwind-merge'
import { colorClassnames, sizeClassnames } from './constants'
import { type IChipProps } from './types'

export const Chip: React.FC<IChipProps> = ({
  className,
  variant = 'solid',
  color = 'primary',
  size = 'md',
  children,
  ...props
}) => {
  const computedClassName = typeof className === 'function'
    ? className({ variant, color, size, children, ...props })
    : className

  return (
    <div
      className={twMerge(
        'inline-flex items-center gap-1 font-medium rounded-full',
        sizeClassnames[size],
        colorClassnames[color][variant],
        computedClassName
      )}
      {...props}
    >
      {children}
    </div>
  )
}

export default Chip
