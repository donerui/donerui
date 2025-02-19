import dayjs from 'dayjs'
import { type ReactElement, useEffect, useMemo, useState } from 'react'
import { twMerge } from 'tailwind-merge'
import { useInterval } from '../../hooks/useInterval'
import { type ICountdownProps } from './Countdown.types'
import { diffCalculation, formatDefault } from './utils'

// TODO:
// - Vertical
// - Presetler, Number Transition (flap, vs)
// - Type = Number
// - reset? how?

function Countdown({
  className,
  partsClassName,
  separatorClassName,
  type,
  mode,
  date1 = dayjs().valueOf(),
  date2 = dayjs().add(10, 'seconds').valueOf(),
  value,
  refreshRateMs = 1000,
  isPaused = false,
  parts: {
    years: {
      showPart: showPartYears = true,
      showText: showTextYears = false,
      showAs: showAsYears = false,
      text: textYears = 'years',
      format: formatYears = formatDefault
    } = {},
    months: {
      showPart: showPartMonths = true,
      showText: showTextMonths = false,
      showAs: showAsMonths = false,
      text: textMonths = 'months',
      format: formatMonths = formatDefault
    } = {},
    weeks: {
      showPart: showPartWeeks = true,
      showText: showTextWeeks = false,
      showAs: showAsWeeks = false,
      text: textWeeks = 'weeks',
      format: formatWeeks = formatDefault
    } = {},
    days: {
      showPart: showPartDays = true,
      showText: showTextDays = false,
      showAs: showAsDays = false,
      text: textDays = 'days',
      format: formatDays = formatDefault
    } = {},
    hours: {
      showPart: showPartHours = true,
      showText: showTextHours = false,
      showAs: showAsHours = false,
      text: textHours = 'hours',
      format: formatHours = formatDefault
    } = {},
    minutes: {
      showPart: showPartMins = true,
      showText: showTextMins = false,
      showAs: showAsMins = false,
      text: textMins = 'minutes',
      format: formatMins = formatDefault
    } = {},
    seconds: {
      showPart: showPartSecs = true,
      showText: showTextSecs = false,
      showAs: showAsSecs = false,
      text: textSecs = 'seconds',
      format: formatSecs = formatDefault
    } = {},
    milliseconds: {
      showPart: showPartMs = true,
      showText: showTextMs = false,
      showAs: showAsMs = false,
      text: textMs = 'ms',
      format: formatMs = formatDefault
    } = {}
  } = {},
  separator = ':',
  onChange,
  onEnd
}: ICountdownProps): ReactElement {
  const [from] = useState(Math.min(date1, date2))
  const [to] = useState(Math.max(date1, date2))
  const [counter, setCounter] = useState(mode === 'up' ? to : from)
  const [countdown, setCountdown] = useState(diffCalculation(value ?? (to - counter), type))
  const [clear, setClear] = useState(false)

  useInterval(() => {
    if (mode === 'up') {
      setCounter(counter - refreshRateMs)
    } else if (mode === 'down') {
      setCounter(counter + refreshRateMs)
    }
  }, isPaused ? undefined : refreshRateMs, clear)

  useEffect(() => {
    setCountdown(diffCalculation(value ?? (to - counter), type))
  }, [value, counter, to, type])

  useEffect(() => {
    const _clear = mode === 'up'
      ? countdown.asMilliseconds >= date2 - date1
      : countdown.asMilliseconds <= 0
    setClear(_clear)
    if (_clear) {
      onEnd?.()
    } else {
      onChange?.(countdown)
    }
  }, [countdown])

  const _separator = useMemo(() => {
    return (
      <div className={twMerge('first:hidden mx-1', separatorClassName)}>
        {separator}
      </div>
    )
  }, [separator])

  return (
    <div
      className={twMerge(
        'flex items-center justify-center tabular-nums',
        className
      )}
    >
      {showPartYears &&
        <>
          {_separator}
          <div className={twMerge('flex flex-col items-center', partsClassName)}>
            <span>{formatYears(showAsYears ? countdown.asYears : countdown.years)}</span>
            {showTextYears && <span>{textYears}</span>}
          </div>
        </>
      }
      {showPartMonths &&
        <>
          {_separator}
          <div className={twMerge('flex flex-col items-center', partsClassName)}>
            <span>{formatMonths(showAsMonths ? countdown.asMonths : countdown.months)}</span>
            {showTextMonths && <span>{textMonths}</span>}
          </div>
        </>
      }
      {showPartWeeks &&
        <>
          {_separator}
          <div className={twMerge('flex flex-col items-center', partsClassName)}>
            <span>{formatWeeks(showAsWeeks ? countdown.asWeeks : countdown.weeks)}</span>
            {showTextWeeks && <span>{textWeeks}</span>}
          </div>
        </>
      }
      {showPartDays &&
        <>
          {_separator}
          <div className={twMerge('flex flex-col items-center', partsClassName)}>
            <span>{formatDays(showAsDays ? countdown.asDays : countdown.days)}</span>
            {showTextDays && <span>{textDays}</span>}
          </div>
        </>
      }
      {showPartHours &&
        <>
          {_separator}
          <div className={twMerge('flex flex-col items-center', partsClassName)}>
            <span>{formatHours(showAsHours ? countdown.asHours : countdown.hours)}</span>
            {showTextHours && <span>{textHours}</span>}
          </div>
        </>
      }
      {showPartMins &&
        <>
          {_separator}
          <div className={twMerge('flex flex-col items-center', partsClassName)}>
            <span>{formatMins(showAsMins ? countdown.asMinutes : countdown.minutes)}</span>
            {showTextMins && <span>{textMins}</span>}
          </div>
        </>
      }
      {showPartSecs &&
        <>
          {_separator}
          <div className={twMerge('flex flex-col items-center', partsClassName)}>
            <span>{formatSecs(showAsSecs ? countdown.asSeconds : countdown.seconds)}</span>
            {showTextSecs && <span>{textSecs}</span>}
          </div>
        </>
      }
      {showPartMs &&
        <>
          {_separator}
          <div className={twMerge('flex flex-col items-center', partsClassName)}>
            <span>{formatMs(showAsMs ? countdown.asMilliseconds : countdown.milliseconds)}</span>
            {showTextMs && <span>{textMs}</span>}
          </div>
        </>
      }
    </div>
  )
}

export default Countdown
