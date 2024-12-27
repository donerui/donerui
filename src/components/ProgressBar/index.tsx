import * as React from 'react'
import { twMerge } from 'tailwind-merge'
import {
  colorClassnames,
  sizeClassnames,
  valueClassnames
} from './constants'
import { type IProgressBarProps } from './types'

export const ProgressBar: React.FC<IProgressBarProps> = ({
  className,
  valueClassName,
  value = 0,
  max = 100,
  size = 'md',
  color = 'primary',
  showValue = false,
  valuePosition = 'top',
  valueFormatter = (value, max) => `${Math.round((value / max) * 100)}%`,
  ...props
}) => {
  const allProps = { value, max, size, color, showValue, valuePosition, valueFormatter, ...props }
  const computedClassName = typeof className === 'function'
    ? className(allProps)
    : className

  const percentage = Math.min(100, Math.max(0, (value / max) * 100))

  const valueElement = showValue && (
    <div
      className={twMerge(
        'absolute text-center text-nowrap',
        valuePosition === 'top' && 'left-1/2 -translate-x-1/2 top-0 -translate-y-full mb-1',
        valuePosition === 'bottom' && 'left-1/2 -translate-x-1/2 bottom-0 translate-y-full mt-1',
        valuePosition === 'inside' && 'left-1/2 -translate-x-1/2 top-1/2 -translate-y-1/2 text-white font-medium',
        valuePosition === 'left' && 'right-full top-1/2 -translate-y-1/2 mr-2',
        valuePosition === 'right' && 'left-full top-1/2 -translate-y-1/2 ml-2',
        valueClassnames[size],
        typeof valueClassName === 'function'
          ? valueClassName(allProps)
          : valueClassName
      )}
    >
      {valueFormatter(value, max)}
    </div>
  )

  return (
    <div className="relative w-full min-w-32 flex items-center">
      <div
        className={twMerge(
          'w-full rounded-full overflow-hidden bg-gray-200 dark:bg-gray-700',
          sizeClassnames[size],
          computedClassName
        )}
        {...props}
      >
        <div
          className={twMerge(
            'h-full rounded-full transition-all duration-700 ease-in-out relative',
            colorClassnames[color]
          )}
          style={{ width: `${percentage}%` }}
        >
          {valuePosition === 'inside' && valueElement}
        </div>
      </div>
      {showValue && valuePosition !== 'inside' && valueElement}
    </div>
  )
}

export default ProgressBar
