import dayjs from 'dayjs'
import { type CalendarTypedProps } from '../../Calendar/types'

export interface QuickSelectOption {
  label: string
  getDate: () => Pick<CalendarTypedProps, 'type' | 'value'>
  getViewDate?: () => string
}

export const todayOption: QuickSelectOption = {
  label: 'Today',
  getDate: () => {
    return { type: 'single', value: dayjs().format() }
  },
  getViewDate: () => {
    return dayjs().format()
  }
}

export const yesterdayOption: QuickSelectOption = {
  label: 'Yesterday',
  getDate: () => {
    return { type: 'single', value: dayjs().subtract(1, 'day').format() }
  },
  getViewDate: () => {
    return dayjs().subtract(1, 'day').format()
  }
}

export const thisWeekOption: QuickSelectOption = {
  label: 'This Week',
  getDate: () => {
    return { type: 'range', value: { start: dayjs().startOf('week').format(), end: dayjs().endOf('week').format() } }
  },
  getViewDate: () => {
    return dayjs().startOf('week').format()
  }
}

export const lastWeekOption: QuickSelectOption = {
  label: 'Last Week',
  getDate: () => {
    return { type: 'range', value: { start: dayjs().startOf('week').subtract(1, 'week').format(), end: dayjs().endOf('week').subtract(1, 'week').format() } }
  },
  getViewDate: () => {
    return dayjs().startOf('week').subtract(1, 'week').format()
  }
}

export const thisMonthOption: QuickSelectOption = {
  label: 'This Month',
  getDate: () => {
    return { type: 'range', value: { start: dayjs().startOf('month').format(), end: dayjs().endOf('month').format() } }
  },
  getViewDate: () => {
    return dayjs().startOf('month').format()
  }
}

export const lastMonthOption: QuickSelectOption = {
  label: 'Last Month',
  getDate: () => {
    return { type: 'range', value: { start: dayjs().startOf('month').subtract(1, 'month').format(), end: dayjs().startOf('month').subtract(1, 'day').format() } }
  },
  getViewDate: () => {
    return dayjs().startOf('month').subtract(1, 'month').format()
  }
}

export const thisYearOption: QuickSelectOption = {
  label: 'This Year',
  getDate: () => {
    return { type: 'range', value: { start: dayjs().startOf('year').format(), end: dayjs().endOf('year').format() } }
  },
  getViewDate: () => {
    return dayjs().format()
  }
}

export const lastYearOption: QuickSelectOption = {
  label: 'Last Year',
  getDate: () => {
    return { type: 'range', value: { start: dayjs().startOf('year').subtract(1, 'year').format(), end: dayjs().startOf('year').subtract(1, 'day').format() } }
  },
  getViewDate: () => {
    return dayjs().endOf('year').subtract(1, 'year').format()
  }
}

export const quickSelectOptions: QuickSelectOption[] = [
  todayOption,
  yesterdayOption,
  thisWeekOption,
  lastWeekOption,
  thisMonthOption,
  lastMonthOption,
  thisYearOption,
  lastYearOption
]
