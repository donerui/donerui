import { type ReactElement } from 'react'
import { twMerge } from 'tailwind-merge'
import { type ICountdownNumberProps } from './Countdown.types'

function CountdownNumber({
  className,
  partsClassName,
  digitClassName,
  textClassName,
  value,
  text,
  format
}: ICountdownNumberProps): ReactElement {
  return (
    <div
      className={twMerge(
        'flex items-center justify-center tabular-nums',
        className
      )}
    >
      <div className={twMerge('flex flex-col items-center', partsClassName)}>
        <span className={digitClassName}>{format ? format(value) : value}</span>
        {text && <span className={textClassName}>{text}</span>}
      </div>

    </div>
  )
}

export default CountdownNumber
