import { forwardRef, type ReactNode, type Ref, useEffect, useRef, useState } from 'react'
import { createPortal } from 'react-dom'
import { MdClose, MdKeyboardArrowDown } from 'react-icons/md'
import { twMerge } from 'tailwind-merge'
import { selectClasses } from './constants'
import { type SelectOption, type SelectProps } from './types'

export default forwardRef(function Select<TValue = string, TData = unknown> (
  props: SelectProps<TValue, TData>,
  ref: Ref<HTMLInputElement>
): ReactNode {
  const {
    errorMessage, label, id, name, required, disabled,
    className, options, value, defaultValue, onChange, portal,
    placement = 'bottom', maxHeight = 250, placeholder = 'Select an option',
    isOptionDisabled, clearable = true, searchable = true,
    onSearch
  } = props

  const hasError = errorMessage != null
  const hasLabel = label != null && label !== ''
  const isRequired = required === true
  const isDisabled = disabled === true
  const isControlled = value !== undefined

  const [isOpen, setIsOpen] = useState(false)
  const [selectedValue, setSelectedValue] = useState<TValue | undefined>(value ?? defaultValue)
  const [dropdownPlacement, setDropdownPlacement] = useState(placement)
  const [searchQuery, setSearchQuery] = useState('')

  const containerRef = useRef<HTMLDivElement>(null)
  const dropdownRef = useRef<HTMLDivElement>(null)
  const searchInputRef = useRef<HTMLInputElement>(null)

  const selectedOption = options.find(option => option.value === selectedValue)

  const filteredOptions = searchQuery !== ''
    ? (onSearch?.(searchQuery, options) ?? options.filter(option =>
        String(option.searchKey ?? option.label).toLowerCase().includes(searchQuery.toLowerCase())
      ))
    : options

  useEffect(() => {
    if (value !== undefined) {
      setSelectedValue(value)
    }
  }, [value])

  useEffect(() => {
    if (!isOpen) {
      setSearchQuery('')
      return
    }

    // Focus search input when dropdown opens
    if (searchable && searchInputRef.current !== null) {
      searchInputRef.current.focus()
    }

    function handleClickOutside (event: MouseEvent): void {
      if (
        containerRef.current != null &&
        !containerRef.current.contains(event.target as Node) &&
        dropdownRef.current != null &&
        !dropdownRef.current.contains(event.target as Node)
      ) {
        setIsOpen(false)
      }
    }

    function handleScroll (): void {
      if (containerRef.current == null || dropdownRef.current == null) return

      const containerRect = containerRef.current.getBoundingClientRect()
      const viewportHeight = window.innerHeight
      const spaceBelow = viewportHeight - containerRect.bottom
      const spaceAbove = containerRect.top

      setDropdownPlacement(spaceBelow >= maxHeight || spaceBelow >= spaceAbove ? 'bottom' : 'top')
    }

    document.addEventListener('mousedown', handleClickOutside)
    document.addEventListener('scroll', handleScroll, true)
    handleScroll()

    return () => {
      document.removeEventListener('mousedown', handleClickOutside)
      document.removeEventListener('scroll', handleScroll, true)
    }
  }, [isOpen, maxHeight, searchable])

  function handleSelect (option: SelectOption<TValue, TData>): void {
    if (isDisabled) return

    const isDisabledOption = isOptionDisabled?.(option) ?? false
    if (isDisabledOption) return

    if (isControlled) {
      onChange?.(option.value)
    } else {
      setSelectedValue(option.value)
    }

    setIsOpen(false)
  }

  function handleClear (event: React.MouseEvent): void {
    event.stopPropagation()
    if (isDisabled) return

    if (isControlled) {
      onChange?.(undefined)
    } else {
      setSelectedValue(undefined)
    }
  }

  function renderDropdown (): ReactNode {
    const dropdown = (
      <div
        ref={dropdownRef}
        className={twMerge(
          selectClasses.dropdown.default,
          dropdownPlacement === 'top' ? selectClasses.dropdown.top : selectClasses.dropdown.bottom,
          hasError && selectClasses.dropdown.error
        )}
        style={{
          maxHeight,
          ...(portal != null
            ? {
                position: 'fixed',
                width: containerRef.current?.offsetWidth,
                ...(dropdownPlacement === 'top'
                  ? { bottom: window.innerHeight - (containerRef.current?.getBoundingClientRect().top ?? 0) }
                  : { top: containerRef.current?.getBoundingClientRect().bottom })
              }
            : {})
        }}
      >
        <div className="flex flex-col h-full">
          <div className="flex-1 overflow-y-auto">
            {filteredOptions.map((option) => {
              const isDisabledOption = isOptionDisabled?.(option) ?? false
              return (
                <div
                  key={String(option.value)}
                  className={twMerge(selectClasses.option.default, hasError && selectClasses.option.error)}
                  onClick={() => { handleSelect(option) }}
                  data-selected={option.value === selectedValue}
                  data-disabled={isDisabledOption}
                >
                  {option.label}
                </div>
              )
            })}
            {filteredOptions.length === 0 && (
              <div className="px-4 py-2 text-sm text-gray-500">No results found</div>
            )}
          </div>
        </div>
      </div>
    )

    if (portal != null && isOpen) {
      return createPortal(dropdown, portal)
    }

    return isOpen && dropdown
  }

  return (
    <div className={twMerge(selectClasses.wrapper.default, hasError && selectClasses.wrapper.error)}>
      {hasLabel && (
        <label
          htmlFor={id ?? name}
          className={twMerge(selectClasses.label.default, hasError && selectClasses.label.error)}
        >
          {label}
          {isRequired && <span className="text-primary-500">*</span>}
        </label>
      )}

      <div ref={containerRef} className="relative w-full">
        <div
          className={twMerge(
            selectClasses.select.default,
            isOpen && selectClasses.select.open,
            hasError && selectClasses.select.error,
            isOpen && hasError && selectClasses.select.openError,
            isDisabled && selectClasses.select.disabled,
            className
          )}
          onClick={() => { !isDisabled && setIsOpen(!isOpen) }}
        >
          {isOpen && searchable
            ? (
              <input
                ref={searchInputRef}
                type="text"
                className={twMerge(
                  'flex-1 bg-transparent border-none outline-none',
                  !searchable && 'pointer-events-none'
                )}
                placeholder={placeholder}
                value={searchQuery}
                onChange={(e) => { setSearchQuery(e.target.value) }}
                onClick={(e) => { e.stopPropagation() }}
              />
              )
            : (
              <span className={twMerge(
                selectedOption == null && selectClasses.placeholder.default,
                selectedOption == null && hasError && selectClasses.placeholder.error
              )}>
                {selectedOption?.label ?? placeholder}
              </span>
              )}

          <span className="flex items-center gap-1">
            {clearable && selectedOption != null && (
              <MdClose
                className={selectClasses.icon.clear}
                onClick={handleClear}
              />
            )}
            <MdKeyboardArrowDown
              className={twMerge(
                selectClasses.icon.default,
                isOpen && selectClasses.icon.open
              )}
            />
          </span>
        </div>

        {renderDropdown()}
      </div>

      {
        hasError && (
          <p className={selectClasses.errorText.default}>{errorMessage}</p>
        )
      }
    </div >
  )
})
