import { forwardRef, Fragment, type ReactNode, type Ref, useEffect, useRef, useState } from 'react'
import { createPortal } from 'react-dom'
import { MdClose, MdKeyboardArrowDown } from 'react-icons/md'
import { twMerge } from 'tailwind-merge'
import { selectClasses } from './constants'
import { type SelectOption, type SelectProps } from './types'

export * from './types'

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
        className={selectClasses.dropdown}
        data-position={dropdownPlacement}
        data-error={hasError}
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
              const isDisabledOption = (isOptionDisabled?.(option) ?? false) || isDisabled
              return (
                <div
                  key={String(option.value)}
                  className={selectClasses.option}
                  onClick={() => { handleSelect(option) }}
                  data-selected={option.value === selectedValue}
                  data-disabled={isDisabledOption}
                  data-error={hasError}
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
    <div className={selectClasses.wrapper} data-error={hasError}>
      {hasLabel && (
        <label
          htmlFor={id ?? name}
          className={selectClasses.label}
          data-error={hasError}
        >
          {label}
          {isRequired && <span className="text-primary-500">*</span>}
        </label>
      )}

      <div ref={containerRef} className="relative w-full">
        <div
          className={twMerge(selectClasses.select, className)}
          onClick={() => { !isDisabled && setIsOpen(!isOpen) }}
          data-open={isOpen}
          data-disabled={isDisabled}
          data-error={hasError}
        >
          {isOpen && searchable
            ? (
              <input
                ref={searchInputRef}
                type="text"
                className={selectClasses.searchInput}
                placeholder={placeholder}
                value={searchQuery}
                onChange={(e) => { setSearchQuery(e.target.value) }}
                onClick={(e) => { e.stopPropagation() }}
                data-error={hasError}
              />
              )
            : (
              <Fragment>
                {selectedOption != null
                  ? (
                    <span className={selectClasses.selectedOption} data-error={hasError}>
                      {selectedOption.label}
                    </span>
                    )
                  : (
                    <span className={selectClasses.placeholder} data-error={hasError}>
                      {placeholder}
                    </span>
                    )}
              </Fragment>
              )}

          <span className="flex items-center gap-1">
            {clearable && selectedOption != null && (
              <MdClose
                className={selectClasses.clearIcon}
                data-error={hasError}
                onClick={handleClear}
              />
            )}
            <MdKeyboardArrowDown
              className={selectClasses.dropdownIcon}
              data-open={isOpen}
              data-error={hasError}
              data-disabled={isDisabled}
            />
          </span>
        </div>

        {renderDropdown()}
      </div>

      {hasError && (
        <p className={selectClasses.errorText}>{errorMessage}</p>
      )}
    </div>
  )
})
