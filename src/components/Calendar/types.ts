import { type Dayjs } from 'dayjs'

export interface DateRange {
  start: string
  end: string
}

export interface CalendarSingleValueProps {
  value?: string
  onChange?: (value: string | undefined) => void
}

export interface CalendarMultipleValueProps {
  value?: string[]
  onChange?: (value: string[] | undefined) => void
}

export interface CalendarRangeValueProps {
  value?: DateRange
  onChange?: (value: DateRange | undefined, confirmed: boolean) => void
}

export type CalendarTypedProps = ({ type: 'single' } & CalendarSingleValueProps) | ({ type: 'multiple' } & CalendarMultipleValueProps) | ({ type: 'range' } & CalendarRangeValueProps)

export type CalendarProps = CalendarTypedProps & {
  className?: string
  readonly?: boolean
  viewDate?: string
  showPreviosMonthButton?: boolean
  showNextMonthButton?: boolean
  selectingRangeStart?: Dayjs
  onRangeStartSelected?: (date: Dayjs | undefined) => void
  focusedDate?: Dayjs
  onFocusedDateChange?: (date: Dayjs | undefined) => void
  onPreviosMonthButtonClick?: () => void
  onNextMonthButtonClick?: () => void
}
