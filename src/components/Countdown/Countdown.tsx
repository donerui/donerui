import { useCountdown } from '@donerui/base'
import { type ReactElement, useMemo } from 'react'
import { twMerge } from 'tailwind-merge'
import Flip from '../Flip'
import { type ICountdownProps } from './Countdown.types'
import CountdownNumber from './CountdownNumber'
import { formatDefault } from './utils'

function Countdown({
  className,
  partsClassName,
  digitClassName,
  textClassName,
  separatorClassName,
  type,
  from,
  to,
  value,
  refreshRateMs,
  isPaused,
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
  numberProps: {
    text,
    incrementBy,
    format: formatNumber
  } = {},
  onChange,
  onEnd
}: ICountdownProps): ReactElement {
  const countdown = useCountdown({
    from,
    to,
    type,
    refreshRateMs,
    isPaused,
    value,
    incrementBy,
    onChange,
    onEnd
  })

  const _separator = useMemo(() => {
    return (
      <div className={twMerge('first:hidden mx-1', separatorClassName)}>
        {separator}
      </div>
    )
  }, [separator])

  if (type === 'number') {
    return <CountdownNumber
      className={className}
      partsClassName={partsClassName}
      digitClassName={digitClassName}
      textClassName={textClassName}
      value={countdown.asMilliseconds}
      text={text}
      format={formatNumber}
    />
  }

  return (
    <div
      className={twMerge(
        'flex items-center justify-center tabular-nums',
        className
      )}
    >
      <Flip
        front={'40'}
        back={'39'}
        startFlip={isPaused}
      />
      {showPartYears &&
        <>
          {_separator}
          <div className={twMerge('flex flex-col items-center', partsClassName)}>
            <span className={digitClassName}>{formatYears(showAsYears ? countdown.asYears : countdown.years)}</span>
            {showTextYears && <span className={textClassName}>{textYears}</span>}
          </div>
        </>
      }
      {showPartMonths &&
        <>
          {_separator}
          <div className={twMerge('flex flex-col items-center', partsClassName)}>
            <span className={digitClassName}>{formatMonths(showAsMonths ? countdown.asMonths : countdown.months)}</span>
            {showTextMonths && <span className={textClassName}>{textMonths}</span>}
          </div>
        </>
      }
      {showPartWeeks &&
        <>
          {_separator}
          <div className={twMerge('flex flex-col items-center', partsClassName)}>
            <span className={digitClassName}>{formatWeeks(showAsWeeks ? countdown.asWeeks : countdown.weeks)}</span>
            {showTextWeeks && <span className={textClassName}>{textWeeks}</span>}
          </div>
        </>
      }
      {showPartDays &&
        <>
          {_separator}
          <div className={twMerge('flex flex-col items-center', partsClassName)}>
            <span className={digitClassName}>{formatDays(showAsDays ? countdown.asDays : countdown.days)}</span>
            {showTextDays && <span className={textClassName}>{textDays}</span>}
          </div>
        </>
      }
      {showPartHours &&
        <>
          {_separator}
          <div className={twMerge('flex flex-col items-center', partsClassName)}>
            <span className={digitClassName}>{formatHours(showAsHours ? countdown.asHours : countdown.hours)}</span>
            {showTextHours && <span className={textClassName}>{textHours}</span>}
          </div>
        </>
      }
      {showPartMins &&
        <>
          {_separator}
          <div className={twMerge('flex flex-col items-center', partsClassName)}>
            <span className={digitClassName}>{formatMins(showAsMins ? countdown.asMinutes : countdown.minutes)}</span>
            {showTextMins && <span className={textClassName}>{textMins}</span>}
          </div>
        </>
      }
      {showPartSecs &&
        <>
          {_separator}
          <div className={twMerge('flex flex-col items-center', partsClassName)}>
            <span className={digitClassName}>{formatSecs(showAsSecs ? countdown.asSeconds : countdown.seconds)}</span>
            {showTextSecs && <span className={textClassName}>{textSecs}</span>}
          </div>
        </>
      }
      {showPartMs &&
        <>
          {_separator}
          <div className={twMerge('flex flex-col items-center', partsClassName)}>
            <span className={digitClassName}>{formatMs(showAsMs ? countdown.asMilliseconds : countdown.milliseconds)}</span>
            {showTextMs && <span className={textClassName}>{textMs}</span>}
          </div>
        </>
      }
    </div>
  )
}

export default Countdown
