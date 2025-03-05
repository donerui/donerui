import dayjs from 'dayjs'
import { type ICountdownData } from './Countdown.types'

export const diffCalculation = (value: number, type: 'time' | 'number'): ICountdownData => {
  if (type === 'time') {
    const remaining = dayjs.duration(value, 'milliseconds')

    return {
      years: remaining.years(),
      asYears: remaining.asYears(),
      months: remaining.months(),
      asMonths: remaining.asMonths(),
      weeks: remaining.weeks(),
      asWeeks: remaining.asWeeks(),
      days: remaining.days(),
      asDays: remaining.asDays(),
      hours: remaining.hours(),
      asHours: remaining.asHours(),
      minutes: remaining.minutes(),
      asMinutes: remaining.asMinutes(),
      seconds: remaining.seconds(),
      asSeconds: remaining.asSeconds(),
      milliseconds: remaining.milliseconds(),
      asMilliseconds: remaining.asMilliseconds()
    }
  } else if (type === 'number') {
    // --
  }

  return {
    years: 0,
    asYears: 0,
    months: 0,
    asMonths: 0,
    weeks: 0,
    asWeeks: 0,
    days: 0,
    asDays: 0,
    hours: 0,
    asHours: 0,
    minutes: 0,
    asMinutes: 0,
    seconds: 0,
    asSeconds: 0,
    milliseconds: 0,
    asMilliseconds: 0
  }
}

export const formatDefault = (value: number): string => Math.round(value).toString().padStart(2, '0')
