import { Popover, PopoverButton, PopoverPanel } from '@headlessui/react'
import dayjs, { type Dayjs } from 'dayjs'
import { Fragment, useEffect, useState, type ReactNode } from 'react'
import { MdOutlineCalendarMonth } from 'react-icons/md'
import { twMerge } from 'tailwind-merge'
import Button from '../Button'
import Calendar from '../Calendar'
import { type CalendarTypedProps } from '../Calendar/types'
import { inputClasses } from '../Input/TextInput/constants'
import Transition from '../Transition'
import { quickSelectOptions } from './quickSelect'

export type DatePickerProps = CalendarTypedProps & {
  className?: string
  id?: string
  name?: string
  required?: boolean
  label?: string
  errorMessage?: string
  LeftComponent?: ReactNode
  RightComponent?: ReactNode
}

export default function DatePicker (props: DatePickerProps): ReactNode {
  const { errorMessage, id, label, name, required, ...rest } = props
  const { type, value, onChange } = rest

  const isControlled = value !== undefined

  const hasError = errorMessage != null
  const hasLabel = label != null && label !== ''
  const isRequired = required === true

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
      case 'range':
        onChange?.(value as { start: string, end: string })
        break
    }

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
    <Popover className="relative">
      {({ open }) => (
        <>
          <PopoverButton className='focus-visible:outline-none text-left'>
            <div className={twMerge(inputClasses.wrapper.default, hasError && inputClasses.wrapper.error)}>
              {hasLabel && (
                <label
                  className={twMerge(inputClasses.label.default, hasError && inputClasses.label.error)}
                  htmlFor={id ?? name}
                >
                  {label}
                  {isRequired && <span className="text-primary-500">*</span>}
                </label>
              )}

              <div className={twMerge(inputClasses.container.default, open && inputClasses.container.focusControlled, hasError && inputClasses.container.error, open && hasError && inputClasses.container.errorFocusControlled)}>
                {props.LeftComponent}

                <MdOutlineCalendarMonth className="size-4 ml-3 mr-2" />
                <input
                  className={twMerge(inputClasses.input.default, hasError && inputClasses.input.error, 'cursor-pointer')}
                  id={id ?? name}
                  name={name}
                  readOnly
                  value={inputValue}
                  placeholder='Select A Date'
                  title={inputValue}
                />

                {props.RightComponent}
              </div>

              {hasError && (
                <p className={inputClasses.errorText.default}>{errorMessage}</p>
              )}
            </div>
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
                              handleChange({ start: valueString, end: valueString })
                              return
                            }

                            if (type === 'multiple') {
                              const valueArr = value as string[]
                              handleChange({ start: valueArr[0], end: valueArr[valueArr.length - 1] } as any)
                              return
                            }

                            handleChange(value)
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
                    onChange={handleChange}
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
                    onChange={handleChange}
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
