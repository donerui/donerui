import React, { ReactElement, useEffect, useState } from 'react'
import { twMerge } from 'tailwind-merge'

const timeCalculation = (countTo: number) => {
  const totalRemaining = countTo - new Date().getTime()
  if (totalRemaining <= 0) {
    return { days: 0, hours: 0, minutes: 0, seconds: 0 }
  }

  const days = Math.floor(totalRemaining / (1000 * 60 * 60 * 24))
  const hours = Math.floor((totalRemaining / (1000 * 60 * 60)) % 24)
  const minutes = Math.floor((totalRemaining / (1000 * 60)) % 60)
  const seconds = Math.floor((totalRemaining / 1000) % 60)

  return {
    days,
    hours,
    minutes,
    seconds,
  }
}

function Countdown ({
  className,
  renderLabel = () => '',
  labelClassName,
  labelPosition = 'right',
  onChange,

    countTo: number
    onEnd?: () => void
    className?: string

}: ICountdownProps): ReactElement {
  const controlled = checked !== undefined
  const [isChecked, setIsChecked] = useState<boolean | undefined>(controlled ? checked : defaultChecked)

  const [label, setLabel] = useState(renderLabel(isChecked))

  useEffect(() => {
    setLabel(renderLabel(isChecked))
  }, [isChecked, renderLabel])

  useEffect(() => {
    if (controlled) {
      setIsChecked(checked)
    }
  }, [checked, controlled])

  return (
    <div
      className={twMerge(
        'flex items-center gap-2',
        className
      )}
    >
      {label !== undefined && labelPosition === 'left' && (
        <div
          className={twMerge(
            'text-gray-700 font-medium',
            labelClassName
          )}
        >
          {label}
        </div>
      )}

      <label
        className={twMerge(
          'relative cursor-pointer',
          disabled === true && 'cursor-not-allowed'
        )}
      >
        <input
          type="checkbox"
          className="sr-only"
          checked={isChecked}
          disabled={disabled}
          onChange={(event) => {
            const checked = event.target.checked
            onChange?.(checked, event)

            if (!controlled) {
              setIsChecked(checked)
            }
          }}
        />

        <div className={twMerge(
          'w-14 h-8 flex items-center rounded-full duration-300 p-1',
          switchClassName?.any,
          isChecked === undefined && 'bg-gray-300 hover:bg-gray-400',
          isChecked === false && 'bg-gray-400 hover:bg-gray-500',
          isChecked === true && 'bg-green-400 hover:bg-green-500',
          isChecked === undefined && switchClassName?.indeterminate,
          isChecked === false && switchClassName?.unchecked,
          isChecked === true && switchClassName?.checked,
          (disabled === true) && 'opacity-50 pointer-events-none',
          (disabled === true) && switchClassName?.disabled
        )}>
          <span
            className={twMerge(
              'duration-200',
              isChecked === undefined && 'flex-[0.5]',
              isChecked === false && 'flex-none',
              isChecked === true && 'flex-1'
            )}
          />

          <span className={twMerge(
            'h-full aspect-square rounded-full bg-white shadow'
          )} />
        </div>
      </label>

      {label !== undefined && labelPosition === 'right' && (
        <div
          className={twMerge(
            'text-gray-700 font-medium',
            labelClassName
          )}
        >
          {label}
        </div>
      )}
    </div>
  )
}

export default Countdown







const Countdown = (props: {
  countTo: number
  onEnd?: () => void
  className?: string
}): React.ReactElement => {
  const [countdown, setCountdown] = useState(
    timeCalculation(props.countTo),
  )

  useEffect(() => {
    const updateCountdown = setInterval(() => {
      if (
        countdown.days === 0 &&
        countdown.hours === 0 &&
        countdown.minutes === 0 &&
        countdown.seconds === 0
      ) {
        clearInterval(updateCountdown)
        props.onEnd?.()
      } else {
        const newCountdown = timeCalculation(props.countTo)
        setCountdown(newCountdown)
      }
    }, 1000)

    return () => {
      clearInterval(updateCountdown)
    }
  }, [countdown])

  useEffect(() => {
    setCountdown(timeCalculation(props.countTo))
  }, [props.countTo])

  return (
    <div
      className={twMerge(
        'w-40 p-2 bg-filogo-red-500 rounded-full duration-150',
        'flex items-center justify-center',
        'text-white font-semibold shadow-sm',
        'focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-filogo-red-500',
        'enabled:hover:bg-red-600 disabled:bg-opacity-50',
        props.className,
      )}
    >
      <span className="duration-150">
        {countdown.minutes.toString().padStart(2, '0')}
      </span>
      :
      <span className="duration-150">
        {countdown.seconds.toString().padStart(2, '0')}
      </span>
    </div>
  )
}

export default Countdown
