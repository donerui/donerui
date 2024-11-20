import dayjs, { type Dayjs } from 'dayjs'
import { useEffect, useState, type ReactNode } from 'react'
import { MdArrowBack, MdArrowForward } from 'react-icons/md'
import { twMerge } from 'tailwind-merge'
import Button from '../Button'

interface DateRange {
  start: string
  end: string
}

type CalendarTypedProps = {
  type: 'single'
  value?: string
  onChange?: (value: string) => void
} | {
  type: 'multiple'
  value?: string[]
  onChange?: (value: string[]) => void
} | {
  type: 'range'
  value?: DateRange
  onChange?: (value: DateRange) => void
}

export type CalendarProps = CalendarTypedProps & {
  className?: string
}

export default function Calendar ({
  type,
  value,
  onChange,
  className
}: CalendarProps): ReactNode {
  const [internalValue, setInternalValue] = useState<typeof value>(value)
  const [shownDayjs, setShownDayjs] = useState<Dayjs>(dayjs())

  const [selectingRangeStart, setSelectingRangeStart] = useState<Dayjs>()
  const [hoveringDate, setHoveringDate] = useState<Dayjs>()

  const daysInMonth = shownDayjs.daysInMonth()
  const startDay = shownDayjs.date(1).day()
  const endDay = shownDayjs.date(daysInMonth).day()
  const days = Array.from({ length: daysInMonth }, (_, i) => i + 1)
  const previousMonthDays = Array.from({ length: startDay === 0 ? 7 : startDay }, (_, i) => i + 1)
  const nextMonthDays = Array.from({ length: endDay === 6 ? 7 : 6 - endDay }, (_, i) => i + 1)

  function isToday (date: Dayjs): boolean {
    return date.isSame(dayjs(), 'day')
  }

  function isSelected (date: Dayjs): boolean {
    if (internalValue === undefined) return false

    switch (type) {
      case 'multiple':
        return (internalValue as string[]).includes(date.format('YYYY-MM-DD'))
      case 'range':
        return date.isAfter(dayjs((internalValue as DateRange).start).subtract(1, 'day'), 'day') && date.isBefore(dayjs((internalValue as DateRange).end).add(1, 'day'), 'day')
      default:
        return date.isSame(dayjs(internalValue as string), 'day')
    }
  }

  function isPreviousSelected (date: Dayjs): boolean {
    return isSelected(date.subtract(1, 'day'))
  }

  function isNextSelected (date: Dayjs): boolean {
    return isSelected(date.add(1, 'day'))
  }

  function isInRange (date: Dayjs): boolean {
    if (internalValue === undefined) return false
    if (selectingRangeStart === undefined) return false
    if (hoveringDate === undefined) return false

    return (date.isAfter(selectingRangeStart.subtract(1, 'day'), 'day') && date.isBefore(hoveringDate.add(1, 'day'), 'day')) ||
      (date.isAfter(hoveringDate.subtract(1, 'day'), 'day') && date.isBefore(selectingRangeStart.add(1, 'day'), 'day'))
  }

  function isPreviousInRange (date: Dayjs): boolean {
    return isInRange(date.subtract(1, 'day'))
  }

  function isNextInRange (date: Dayjs): boolean {
    return isInRange(date.add(1, 'day'))
  }

  function getSelectedClasses (date: Dayjs): string {
    if (!isSelected(date)) return ''
    if (isPreviousSelected(date) && isNextSelected(date)) return 'rounded-none'
    if (isPreviousSelected(date)) return 'rounded-l-none'
    if (isNextSelected(date)) return 'rounded-r-none'
    return ''
  }

  function getInRangeClasses (date: Dayjs): string {
    if (!isInRange(date)) return ''

    const selected = isSelected(date)

    if (isPreviousInRange(date) && isNextInRange(date)) return twMerge('rounded-none', !selected && 'bg-neutral-200')
    if (isPreviousInRange(date)) return twMerge('rounded-l-none', !selected && 'bg-neutral-200')
    if (isNextInRange(date)) return twMerge('rounded-r-none', !selected && 'bg-neutral-200')
    return ''
  }

  function handleClick (date: Dayjs): void {
    const dateStr = date.format('YYYY-MM-DD')
    const internalValueArr = internalValue as string[]
    switch (type) {
      case 'multiple':
        if (internalValueArr === undefined) {
          setInternalValue([dateStr])
          return
        }

        if (internalValueArr.includes(dateStr)) {
          setInternalValue(internalValueArr.filter(d => d !== dateStr))
        } else {
          setInternalValue([...internalValueArr, dateStr])
        }
        break
      case 'range':
        if (selectingRangeStart === undefined) {
          setSelectingRangeStart(date)
          setInternalValue({ start: dateStr, end: dateStr })
          return
        }

        if (selectingRangeStart.isSame(date, 'day')) {
          setInternalValue(undefined)
          setSelectingRangeStart(undefined)
          return
        }

        if (date.isBefore(selectingRangeStart, 'day')) {
          setInternalValue({ start: date.format('YYYY-MM-DD'), end: selectingRangeStart.format('YYYY-MM-DD') })
        } else {
          setInternalValue({ start: selectingRangeStart.format('YYYY-MM-DD'), end: date.format('YYYY-MM-DD') })
        }

        setSelectingRangeStart(undefined)
        break
      default:
        setInternalValue(date.format('YYYY-MM-DD'))
        break
    }
  }

  useEffect(() => {
    if (value === undefined) {
      setInternalValue(undefined)
      return
    }

    switch (type) {
      case 'multiple':
        if (typeof value === 'string') {
          setInternalValue([value])
          return
        }

        if (!Array.isArray(value)) {
          setInternalValue([])
          return
        }

        if (value.length === 0) {
          setInternalValue([])
          return
        }

        setInternalValue(value)
        break
      case 'range':
        if (typeof value === 'string') {
          setInternalValue({ start: value, end: value })
          return
        }

        if (Array.isArray(value)) {
          setInternalValue({ start: value[0], end: value[1] })
          return
        }

        if (value.start === undefined && value.end === undefined) {
          setInternalValue(undefined)
          return
        }

        if (value.start === undefined) {
          setInternalValue({ start: value.end, end: value.end })
          return
        }

        if (value.end === undefined) {
          setInternalValue({ start: value.start, end: value.start })
          return
        }

        setInternalValue(value)
        break
      default:
        setInternalValue(typeof value === 'string' ? value : undefined)
        break
    }
  }, [value, type])

  return (
    <div className={twMerge(
      'p-4 bg-white rounded-xl shadow-md border',
      className
    )}>
      <div className='flex items-center justify-between mb-4'>
        <Button
          variant='ghost'
          shape='circle'
          size='xl'
          iconButton
          onClick={() => { setShownDayjs(shownDayjs.subtract(1, 'month')) }}
        >
          <MdArrowBack />
        </Button>
        <span className='text-lg font-semibold'>{shownDayjs.format('MMMM YYYY')}</span>
        <Button
          variant='ghost'
          shape='circle'
          size='xl'
          iconButton
          onClick={() => { setShownDayjs(shownDayjs.add(1, 'month')) }}
        >
          <MdArrowForward />
        </Button>
      </div>

      <div className='grid grid-cols-7 gap-y-1 text-center text-sm text-gray-600'>
        {['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'].map(day => (
          <div key={day} className='font-medium'>{day}</div>
        ))}

        {previousMonthDays.map(day => (
          <Button
            key={shownDayjs.subtract(1, 'month').date(day).format('YYYY-MM-DD')}
            variant='ghost'
            shape='circle'
            color='dark'
            iconButton
            disabled
            className='size-10 opacity-50'
          >
            {day}
          </Button>
        ))}

        {days.map(day => {
          const thisDay = shownDayjs.date(day)
          return (
            <Button
              key={thisDay.format('YYYY-MM-DD')}
              variant={isSelected(thisDay) ? 'solid' : 'ghost'}
              shape='circle'
              color='dark'
              iconButton
              onMouseEnter={() => { setHoveringDate(thisDay) }}
              onMouseLeave={() => { setHoveringDate(undefined) }}
              className={twMerge(
                'size-10',
                isToday(thisDay) && !isSelected(thisDay) && !isInRange(thisDay) && 'border',
                getInRangeClasses(thisDay),
                getSelectedClasses(thisDay)
              )}
              onClick={() => { handleClick(thisDay) }}
            >
              {day}
            </Button>
          )
        })}

        {nextMonthDays.map(day => (
          <Button
            key={shownDayjs.add(1, 'month').date(day).format('YYYY-MM-DD')}
            variant='ghost'
            shape='circle'
            color='dark'
            iconButton
            disabled
            className='size-10'
          >
            {day}
          </Button>
        ))}
      </div>
    </div>
  )
}
