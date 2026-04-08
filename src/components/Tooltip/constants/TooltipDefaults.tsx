import type { JSX } from 'react'
import { twMerge } from 'tailwind-merge'
import type { ITooltipRenderProps } from '../types'
import { tooltipPositions } from '.'

export function DefaultTooltipRenderComponent({
  className,
  data,
  position = 'top',
}: ITooltipRenderProps): JSX.Element {
  return (
    <span
      className={twMerge(
        'absolute z-50 flex items-center justify-center p-2 text-xs text-white/90 bg-black/90 rounded',
        'whitespace-nowrap',
        position !== undefined && tooltipPositions[position],
        className,
      )}
    >
      {data?.toString()}
    </span>
  )
}
