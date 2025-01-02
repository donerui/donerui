import { forwardRef, type ReactNode, type Ref, useEffect, useRef, useState } from 'react'
import { twMerge } from 'tailwind-merge'
import { switchClasses } from './constants'
import { type SwitchProps } from './types'

export default forwardRef(function Switch (props: SwitchProps, ref: Ref<HTMLInputElement>): ReactNode {
  const { errorMessage, label, description, id, name, required, disabled, className, ...rest } = props

  const hasError = errorMessage != null
  const hasLabel = label != null && label !== ''
  const hasDescription = description != null
  const isRequired = required === true
  const isDisabled = disabled === true

  const internalRef = useRef<HTMLInputElement>(null)
  const switchRef = useRef<HTMLDivElement>(null)

  const [isIndeterminate, setIsIndeterminate] = useState<boolean>(false)

  useEffect(() => {
    setIsIndeterminate(rest.checked === undefined && rest.defaultChecked === undefined)
  }, [rest.checked, rest.defaultChecked])

  useEffect(() => {
    const input = internalRef.current
    if (input != null) {
      input.indeterminate = isIndeterminate
    }

    const switchElement = switchRef.current
    if (switchElement != null) {
      switchElement.dataset.indeterminate = isIndeterminate.toString()
    }
  }, [isIndeterminate])

  return (
    <div className={twMerge(switchClasses.wrapper.default, hasError && switchClasses.wrapper.error)}>
      {hasLabel && (
        <label
          htmlFor={id ?? name}
          className={twMerge(switchClasses.label.default, hasError && switchClasses.label.error)}
        >
          {label}
          {isRequired && <span className="text-primary-500">*</span>}
        </label>
      )}

      <div className={twMerge(switchClasses.container.default, isDisabled && switchClasses.container.disabled, hasError && switchClasses.container.error)}>
        <label className={twMerge('relative inline-flex cursor-pointer', isDisabled && 'cursor-not-allowed')}>
          <input
            {...rest}
            ref={(node) => {
              if (node != null) {
                if (typeof ref === 'function') {
                  ref(node)
                } else if (ref != null) {
                  // @ts-expect-error - TypeScript doesn't know this is safe
                  ref.current = node
                }
                // @ts-expect-error - TypeScript doesn't know this is safe
                internalRef.current = node
              }
            }}
            id={id ?? name}
            name={name}
            type="checkbox"
            disabled={isDisabled}
            required={isRequired}
            onChange={(event) => {
              if (isIndeterminate && !isDisabled) {
                setIsIndeterminate(false)
              }
              rest.onChange?.(event)
            }}
            className={twMerge(switchClasses.input.default, className)}
          />

          <div
            ref={switchRef}
            className={twMerge(switchClasses.switch.default, hasError && switchClasses.switch.error)}
          >
            <span className={switchClasses.handle.default} />
            <span className={switchClasses.thumb.default} />
          </div>
        </label>

        {hasDescription && (
          <div className={twMerge(switchClasses.labelContainer.default, hasError && switchClasses.labelContainer.error)}>
            <div className={twMerge(switchClasses.description.default, hasError && switchClasses.description.error)}>
              {description}
            </div>
          </div>
        )}
      </div>

      {hasError && (
        <p className={switchClasses.errorText.default}>{errorMessage}</p>
      )}
    </div>
  )
})
