import dayjs, { type Dayjs } from 'dayjs'
import { useEffect, useState, type ReactNode } from 'react'
import { MdArrowBack, MdArrowForward } from 'react-icons/md'
import { twMerge } from 'tailwind-merge'
import Button from '../Button'
import { type CalendarProps, type DateRange } from './types'

export default function Calendar ({
  type,
  value,
  onChange,
  className,
  readonly,
  viewDate,
  selectingRangeStart,
  onRangeStartSelected,
  focusedDate,
  onFocusedDateChange,
  showPreviosMonthButton = true,
  showNextMonthButton = true,
  onPreviosMonthButtonClick,
  onNextMonthButtonClick
}: CalendarProps): ReactNode {
  const [internalValue, setInternalValue] = useState<typeof value>(value)
  const [viewDayjs, setViewDayjs] = useState<Dayjs>(dayjs(viewDate))

  const [internalSelectingRangeStart, setInternalSelectingRangeStart] = useState<Dayjs | undefined>(selectingRangeStart)
  const [internalFocusedDate, setInternalFocusedDate] = useState<Dayjs>()

  const daysInMonth = viewDayjs.daysInMonth()
  const startDay = viewDayjs.date(1).day()
  const endDay = viewDayjs.date(daysInMonth).day()
  const days = Array.from({ length: daysInMonth }, (_, i) => i + 1)
  const previousMonthDays = Array.from({ length: startDay === 0 ? 7 : startDay }, (_, i) => i + 1)
  const nextMonthDays = Array.from({ length: endDay === 6 ? 7 : 6 - endDay }, (_, i) => i + 1)

  const localizedDayNames = dayjs.weekdaysShort()

  function isToday (date: Dayjs): boolean {
    return date.isSame(dayjs(), 'day')
  }

  function isSelected (date: Dayjs): boolean {
    if (internalValue === undefined) return false

    switch (type) {
      case 'multiple':
        return (internalValue as string[]).some((d) => dayjs(d).isSame(date, 'day'))
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
    if (internalSelectingRangeStart === undefined) return false
    if (internalFocusedDate === undefined) return false

    return (date.isAfter(internalSelectingRangeStart.subtract(1, 'day'), 'day') && date.isBefore(internalFocusedDate.add(1, 'day'), 'day')) ||
      (date.isAfter(internalFocusedDate.subtract(1, 'day'), 'day') && date.isBefore(internalSelectingRangeStart.add(1, 'day'), 'day'))
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

  function handleChangeSingle (value: string | undefined): void {
    if (type === 'single') {
      setInternalValue(value)
      onChange?.(value)
    }
  }

  function handleChangeMultiple (value: string[] | undefined): void {
    if (type === 'multiple') {
      setInternalValue(value)
      onChange?.(value)
    }
  }

  function handleChangeRange (value: DateRange | undefined): void {
    if (type === 'range') {
      setInternalValue(value)
      onChange?.(value)
    }
  }

  function handleClick (date: Dayjs): void {
    const dateStr = date.format()
    const internalValueArr = internalValue as string[]
    switch (type) {
      case 'multiple':
        if (internalValueArr === undefined) {
          handleChangeMultiple([dateStr])
          return
        }

        if (internalValueArr.includes(dateStr)) {
          handleChangeMultiple(internalValueArr.filter(d => d !== dateStr))
        } else {
          handleChangeMultiple([...internalValueArr, dateStr])
        }
        break
      case 'range':
        if (internalSelectingRangeStart === undefined) {
          onRangeStartSelected?.(date)
          if (selectingRangeStart == null) {
            setInternalSelectingRangeStart(date)
          }

          handleChangeRange({ start: dateStr, end: dateStr })
          return
        }

        if (internalSelectingRangeStart.isSame(date, 'day')) {
          handleChangeRange(undefined)
          onRangeStartSelected?.(undefined)
          if (selectingRangeStart == null) {
            setInternalSelectingRangeStart(undefined)
          }
          return
        }

        if (date.isBefore(internalSelectingRangeStart, 'day')) {
          handleChangeRange({ start: dateStr, end: internalSelectingRangeStart.format() })
        } else {
          handleChangeRange({ start: internalSelectingRangeStart.format(), end: dateStr })
        }

        onRangeStartSelected?.(undefined)
        if (selectingRangeStart == null) {
          setInternalSelectingRangeStart(undefined)
        }
        break
      default:
        handleChangeSingle(dateStr)
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

  useEffect(() => {
    setViewDayjs(dayjs(viewDate))
  }, [viewDate])

  useEffect(() => {
    setInternalSelectingRangeStart(selectingRangeStart)
  }, [selectingRangeStart])

  useEffect(() => {
    setInternalFocusedDate(focusedDate)
  }, [focusedDate])

  return (
    <div className={twMerge(
      'p-4 bg-white rounded-xl border',
      className
    )}>
      <div className='flex items-center h-10 mb-4'>
        <Button
          variant='ghost'
          shape='circle'
          size='xl'
          iconButton
          className={twMerge((!showPreviosMonthButton || readonly === true) && 'opacity-0 pointer-events-none')}
          onClick={() => {
            if (viewDate != null) {
              onPreviosMonthButtonClick?.()
              return
            }
            setViewDayjs(viewDayjs.subtract(1, 'month'))
          }}
        >
          <MdArrowBack />
        </Button>
        <span className='flex-1 text-center text-lg font-semibold'>{viewDayjs.format('MMMM YYYY')}</span>
        <Button
          variant='ghost'
          shape='circle'
          size='xl'
          iconButton
          className={twMerge((!showNextMonthButton || readonly === true) && 'opacity-0 pointer-events-none')}
          onClick={() => {
            if (viewDate != null) {
              onNextMonthButtonClick?.()
              return
            }
            setViewDayjs(viewDayjs.add(1, 'month'))
          }}
        >
          <MdArrowForward />
        </Button>
      </div>

      <div className='grid grid-cols-7 gap-y-1 text-center text-sm text-gray-600'>
        {localizedDayNames.map(day => (
          <div key={day} className='font-medium'>{day}</div>
        ))}

        {previousMonthDays.map(day => (
          <Button
            key={viewDayjs.subtract(1, 'month').date(day).format()}
            variant='ghost'
            shape='circle'
            color='dark'
            iconButton
            disabled
            className='size-10 opacity-50 pointer-events-none'
          >
            {day}
          </Button>
        ))}

        {days.map(day => {
          const thisDay = viewDayjs.date(day)
          return (
            <Button
              key={thisDay.format()}
              variant={isSelected(thisDay) ? 'solid' : 'ghost'}
              shape='circle'
              color='dark'
              iconButton
              onMouseEnter={() => {
                if (internalSelectingRangeStart != null) {
                  setInternalFocusedDate(thisDay)
                }
                onFocusedDateChange?.(thisDay)
              }}
              onMouseLeave={() => {
                if (internalSelectingRangeStart != null) {
                  setInternalFocusedDate(undefined)
                }
                onFocusedDateChange?.(undefined)
              }}
              className={twMerge(
                'size-10',
                isToday(thisDay) && !isSelected(thisDay) && !isInRange(thisDay) && 'border',
                getInRangeClasses(thisDay),
                getSelectedClasses(thisDay),
                readonly === true && 'pointer-events-none'
              )}
              onClick={() => { handleClick(thisDay) }}
            >
              {day}
            </Button>
          )
        })}

        {nextMonthDays.map(day => (
          <Button
            key={viewDayjs.add(1, 'month').date(day).format()}
            variant='ghost'
            shape='circle'
            color='dark'
            iconButton
            disabled
            className='size-10 opacity-50 pointer-events-none'
          >
            {day}
          </Button>
        ))}
      </div>
    </div>
  )
}
