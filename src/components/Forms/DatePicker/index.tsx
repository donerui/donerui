import { Popover, PopoverButton, PopoverPanel } from '@headlessui/react'
import dayjs, { type Dayjs } from 'dayjs'
import { Fragment, useEffect, useState, type ReactNode } from 'react'
import { MdOutlineCalendarMonth, MdOutlineClear } from 'react-icons/md'
import { twMerge } from 'tailwind-merge'
import { TextInput } from '../..'
import Button from '../../Button'
import Calendar from '../../Calendar'
import { type CalendarTypedProps, type DateRange } from '../../Calendar/types'
import Icon from '../../Icon'
import Transition from '../../Transition'
import { type TextInputProps } from '../TextInput/types'
import { quickSelectOptions } from './quickSelect'

export type DatePickerProps = CalendarTypedProps & {
  className?: string
  inputProps?: TextInputProps
  clearable?: boolean
}

export default function DatePicker (props: DatePickerProps): ReactNode {
  const { className, inputProps, clearable, ...rest } = props
  const { type, value, onChange } = rest

  const isControlled = value !== undefined

  const [internalValue, setInternalValue] = useState<typeof value>(value)
  const [inputValue, setInputValue] = useState<string>('')

  const [viewDate, setViewDate] = useState<string>(dayjs().format())
  const [selectedRangeStart, setSelectedRangeStart] = useState<Dayjs | undefined>(undefined)
  const [focusedDate, setFocusedDate] = useState<Dayjs | undefined>(undefined)

  function handleChange (value: typeof internalValue): void {
    switch (type) {
      case 'single':
        onChange?.(value as string)
        break
      case 'multiple':
        onChange?.(value as string[])
        break
    }

    if (!isControlled) {
      setInternalValue(value)
    }
  }

  function handleChangeRange (value: typeof internalValue, confirmed: boolean): void {
    if (type !== 'range') return
    onChange?.(value as DateRange, confirmed)

    if (!isControlled) {
      setInternalValue(value)
    }
  }

  function getInputValue (): string {
    if (internalValue === undefined) return ''
    switch (type) {
      case 'single':
        return dayjs(internalValue as string).format('LL')
      case 'multiple':
        return (internalValue as string[]).map((d) => dayjs(d).format('LL')).join(', ')
      case 'range':
        return `${dayjs((internalValue as { start: string, end: string }).start).format('LL')} - ${dayjs((internalValue as { start: string, end: string }).end).format('LL')}`
    }
  }

  useEffect(() => {
    setInternalValue(value)
  }, [type, value])

  useEffect(() => {
    setInputValue(getInputValue())
  }, [internalValue])

  return (
    <Popover
      className={twMerge(
        'relative',
        className
      )}
    >
      {({ open }) => (
        <>
          <PopoverButton className='focus-visible:outline-none text-left w-full'>
            <TextInput
              {...inputProps}
              readOnly
              className={twMerge('pointer-events-none', inputProps?.containerClassName)}
              focused={inputProps?.focused ?? open}
              placeholder={inputProps?.placeholder ?? 'Select A Date'}
              value={inputValue}
              title={inputValue}
              LeftComponent={inputProps?.LeftComponent ?? <Icon icon={MdOutlineCalendarMonth} className="size-5 ml-2" />}
              RightComponent={inputProps?.RightComponent ??
                (clearable === true && inputValue !== ''
                  ? (
                    <span
                      className="size-5 mr-2 cursor-pointer"
                      onClick={(e) => {
                        e.stopPropagation()
                        handleChange(undefined)
                      }}
                    >
                      <Icon icon={MdOutlineClear} className="size-5" />
                    </span>
                    )
                  : undefined)}
            />
          </PopoverButton>
          <PopoverPanel anchor='bottom' className="mt-2 z-10 p-2">
            <Transition
              show={open}
              appear
            >
              {type === 'single' && (
                <Calendar
                  type={type}
                  value={internalValue as string}
                  onChange={handleChange}
                />
              )}

              {type === 'multiple' && (
                <Calendar
                  type={type}
                  value={internalValue as string[]}
                  onChange={handleChange}
                />
              )}

              {type === 'range' && (
                <div className='flex'>
                  <div className='flex flex-col min-w-40 h-96 bg-white rounded-l-xl overflow-hidden border'>
                    {quickSelectOptions.map((option) => (
                      <Fragment key={option.label}>
                        <Button
                          key={option.label}
                          variant='ghost'
                          color='dark'
                          shape='box'
                          onClick={() => {
                            const { type, value } = option.getDate()
                            if (value === undefined) return

                            const viewDate = option.getViewDate?.() ?? dayjs().format()
                            setViewDate(viewDate)

                            if (type === 'single') {
                              const valueString = value as string
                              handleChangeRange({ start: valueString, end: valueString }, true)
                              return
                            }

                            if (type === 'multiple') {
                              const valueArr = value as string[]
                              handleChangeRange({ start: valueArr[0], end: valueArr[valueArr.length - 1] } as any, true)
                              return
                            }

                            handleChangeRange(value, true)
                          }}
                        >
                          {option.label}
                        </Button>
                        <hr className='border-gray-200' />
                      </Fragment>
                    ))}
                  </div>

                  <Calendar
                    type={type}
                    value={internalValue as { start: string, end: string }}
                    onChange={handleChangeRange}
                    showNextMonthButton={false}
                    className='rounded-none'
                    viewDate={dayjs(viewDate).format()}
                    onPreviosMonthButtonClick={() => { setViewDate(dayjs(viewDate).subtract(1, 'month').format()) }}
                    selectingRangeStart={selectedRangeStart}
                    onRangeStartSelected={setSelectedRangeStart}
                    focusedDate={focusedDate}
                    onFocusedDateChange={setFocusedDate}
                  />
                  <Calendar
                    type={type}
                    value={internalValue as { start: string, end: string }}
                    onChange={handleChangeRange}
                    showPreviosMonthButton={false}
                    className='rounded-l-none'
                    viewDate={dayjs(viewDate).add(1, 'month').format()}
                    onNextMonthButtonClick={() => { setViewDate(dayjs(viewDate).add(1, 'month').format()) }}
                    selectingRangeStart={selectedRangeStart}
                    onRangeStartSelected={setSelectedRangeStart}
                    focusedDate={focusedDate}
                    onFocusedDateChange={setFocusedDate}
                  />
                </div>
              )}
            </Transition>
          </PopoverPanel>
        </>
      )}
    </Popover>
  )
}
