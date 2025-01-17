import { type CSSProperties, forwardRef, Fragment, type ReactNode, type Ref, useEffect, useRef, useState } from 'react'
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
    onSearch, closeOnSelect = true, closeOnScrollOutside = false,
    closeOnBlur = true, closeOnEscape = true, closeOnClickOutside = true
  } = props

  const portalElement = typeof portal === 'string' ? document.getElementById(portal) : portal

  const hasError = errorMessage != null
  const hasLabel = label != null && label !== ''
  const isRequired = required === true
  const isDisabled = disabled === true
  const isControlled = value !== undefined

  const [isOpen, setIsOpen] = useState(false)
  const [isMouseInsideDropdown, setIsMouseInsideDropdown] = useState(false)

  const [selectedValue, setSelectedValue] = useState<TValue | undefined>(value ?? defaultValue)
  const [dropdownPlacement, setDropdownPlacement] = useState(placement)
  const [searchQuery, setSearchQuery] = useState('')

  const containerRef = useRef<HTMLDivElement>(null)
  const selectRef = useRef<HTMLDivElement>(null)
  const dropdownRef = useRef<HTMLDivElement>(null)
  const searchInputRef = useRef<HTMLInputElement>(null)

  const selectedOption = options.find(option => option.value === selectedValue)

  const filteredOptions = searchQuery !== ''
    ? (onSearch?.(searchQuery, options) ?? options.filter(option =>
        String(option.searchKey ?? option.label).toLowerCase().includes(searchQuery.toLowerCase())
      ))
    : options

  function handleMouseMove (event: MouseEvent): void {
    const dropdownRect = dropdownRef.current?.getBoundingClientRect()
    const isInsideDropdown = dropdownRect != null &&
      event.clientY > dropdownRect.top &&
      event.clientY < dropdownRect.bottom &&
      event.clientX > dropdownRect.left &&
      event.clientX < dropdownRect.right

    setIsMouseInsideDropdown(isInsideDropdown)
  }

  function handleMouseDown (event: MouseEvent): void {
    if (
      closeOnClickOutside &&
      containerRef.current != null &&
      !containerRef.current.contains(event.target as Node) &&
      dropdownRef.current != null &&
      !dropdownRef.current.contains(event.target as Node)
    ) {
      setIsOpen(false)
    }
  }

  function handleScroll (event: Event): void {
    if (containerRef.current == null || dropdownRef.current == null) return

    if (closeOnScrollOutside && !isMouseInsideDropdown) {
      setIsOpen(false)
    }

    const containerRect = containerRef.current.getBoundingClientRect()

    const viewportHeight = window.innerHeight
    const spaceBelow = viewportHeight - containerRect.bottom
    const spaceAbove = containerRect.top

    setDropdownPlacement(spaceBelow >= maxHeight || spaceBelow >= spaceAbove ? 'bottom' : 'top')
  }

  function handleSelect (option: SelectOption<TValue, TData>): void {
    if (isDisabled) return

    const isDisabledOption = isOptionDisabled?.(option) ?? false
    if (isDisabledOption) return

    if (isControlled) {
      onChange?.(option.value)
    } else {
      setSelectedValue(option.value)
    }

    if (closeOnSelect) {
      setIsOpen(false)
    }
  }

  function handleClear (event: React.MouseEvent<SVGElement>): void {
    event.stopPropagation()
    if (isDisabled) return

    if (isControlled) {
      onChange?.(undefined)
    } else {
      setSelectedValue(undefined)
    }
  }

  function handleKeyDown (event: KeyboardEvent): void {
    const isTab = event.key === 'Tab'
    if (isTab) {
      return
    }

    const isEnter = event.key === 'Enter'
    if (isEnter) {
      const activeElement = document.activeElement
      if (activeElement === selectRef.current) {
        setIsOpen(true)
      } else if (dropdownRef.current != null && dropdownRef.current.contains(activeElement)) {
        const focusedOption = activeElement as HTMLElement
        focusedOption.click()
      }
    }

    if (!isOpen) return

    switch (event.key) {
      case 'Escape': {
        if (closeOnEscape) {
          setIsOpen(false)
        }
        break
      }
      case 'ArrowDown': {
        event.preventDefault()
        const queryOptions = dropdownRef.current?.querySelectorAll('[role="option"]') ?? []
        const options = (Array.from(queryOptions) as HTMLElement[]).filter(opt => opt.tabIndex !== -1)
        if (options.length === 0) return

        const currentIndex = Array.from(options).findIndex(opt => opt === document.activeElement)
        const nextIndex = currentIndex === -1 ? 0 : Math.min(currentIndex + 1, options.length - 1)

        if (document.activeElement === selectRef.current || document.activeElement === searchInputRef.current) {
          options[0].focus()
        } else {
          options[nextIndex].focus()
        }
        break
      }
      case 'ArrowUp': {
        event.preventDefault()
        const queryOptions = dropdownRef.current?.querySelectorAll('[role="option"]') ?? []
        const options = (Array.from(queryOptions) as HTMLElement[]).filter(opt => opt.tabIndex !== -1)
        if (options.length === 0) return

        const currentIndex = Array.from(options).findIndex(opt => opt === document.activeElement)
        const prevIndex = currentIndex === -1 ? options.length - 1 : Math.max(currentIndex - 1, 0)

        if (document.activeElement === selectRef.current || document.activeElement === searchInputRef.current) {
          options[options.length - 1].focus()
        } else {
          options[prevIndex].focus()
        }
        break
      }
    }
  }

  function handleBlur (event: FocusEvent): void {
    const isNextFocusIsInsideDropdown = dropdownRef.current?.contains(event.relatedTarget as Node)
    if (
      closeOnBlur &&
      containerRef.current != null &&
      !containerRef.current.contains(event.relatedTarget as Node) &&
      isNextFocusIsInsideDropdown === false
    ) {
      setIsOpen(false)
    }
  }

  function renderDropdown (): ReactNode {
    const dropdownStyle: CSSProperties = {
      maxHeight,
      overscrollBehaviorY: 'none'
    }
    const containerElement = containerRef.current
    if (containerElement == null) return
    const containerRect = containerElement.getBoundingClientRect()

    if (portalElement != null) {
      dropdownStyle.position = 'absolute'
      dropdownStyle.left = portalElement.offsetLeft + containerElement.offsetLeft
      dropdownStyle.width = containerRect.width

      if (dropdownPlacement === 'top') {
        dropdownStyle.bottom = portalElement.offsetHeight + portalElement.offsetTop - containerElement.offsetTop
      } else {
        dropdownStyle.top = portalElement.offsetTop + containerElement.offsetTop + containerRect.height
      }
    }

    const dropdown = (
      <div
        ref={dropdownRef}
        className={selectClasses.dropdown}
        data-position={dropdownPlacement}
        data-error={hasError}
        style={dropdownStyle}
      >
        <div className="flex flex-col h-full">
          <div className="flex-1 overflow-y-auto">
            {filteredOptions.map((option) => {
              const isDisabledOption = (isOptionDisabled?.(option) ?? false) || isDisabled
              return (
                <div
                  key={String(option.value)}
                  tabIndex={isDisabledOption ? -1 : 0}
                  className={selectClasses.option}
                  onClick={() => { handleSelect(option) }}
                  data-selected={option.value === selectedValue}
                  data-disabled={isDisabledOption}
                  data-error={hasError}
                  role="option"
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

    return isOpen && (portalElement != null ? createPortal(dropdown, portalElement) : dropdown)
  }

  useEffect(() => {
    if (value !== undefined) {
      setSelectedValue(value)
    }
  }, [value])

  useEffect(() => {
    if (!isOpen) {
      setSearchQuery('')
      document.addEventListener('keydown', handleKeyDown)
      return () => {
        document.removeEventListener('keydown', handleKeyDown)
      }
    }

    document.addEventListener('keydown', handleKeyDown)
    document.addEventListener('mousemove', handleMouseMove)
    document.addEventListener('mousedown', handleMouseDown)
    document.addEventListener('scroll', handleScroll, true)
    document.addEventListener('focusout', handleBlur)

    if (searchable && searchInputRef.current !== null) {
      searchInputRef.current.focus()
    }

    return () => {
      document.removeEventListener('mousemove', handleMouseMove)
      document.removeEventListener('mousedown', handleMouseDown)
      document.removeEventListener('scroll', handleScroll, true)
      document.removeEventListener('keydown', handleKeyDown)
      document.removeEventListener('focusout', handleBlur)
    }
  }, [isOpen, maxHeight, searchable, isMouseInsideDropdown, closeOnEscape, closeOnBlur, closeOnClickOutside])

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
          tabIndex={0}
          ref={selectRef}
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
