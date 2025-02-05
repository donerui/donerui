import { forwardRef, type ReactNode, type Ref } from 'react'
import { twMerge } from 'tailwind-merge'
import { checkboxClasses } from './constants'
import { type CheckboxProps } from './types'

export * from './types'

export default forwardRef(function Checkbox (props: CheckboxProps, ref: Ref<HTMLInputElement>): ReactNode {
  const { errorMessage, label, description, id, name, required, disabled, className, ...rest } = props

  const hasError = errorMessage != null
  const hasLabel = label != null && label !== ''
  const hasDescription = description != null
  const isRequired = required === true
  const isDisabled = disabled === true

  return (
    <div className={twMerge(checkboxClasses.wrapper.default, hasError && checkboxClasses.wrapper.error)}>
      {hasLabel && (
        <label
          htmlFor={id ?? name}
          className={twMerge(checkboxClasses.label.default, hasError && checkboxClasses.label.error)}
        >
          {label}
          {isRequired && <span className="text-primary-500">*</span>}
        </label>
      )}

      <div className={twMerge(checkboxClasses.container.default, hasError && checkboxClasses.container.error)}>
        <input
          {...rest}
          ref={ref}
          id={id ?? name}
          name={name}
          type="checkbox"
          disabled={isDisabled}
          required={isRequired}
          className={twMerge(checkboxClasses.checkbox.default, hasError && checkboxClasses.checkbox.error, className)}
        />

        {hasDescription && (
          <div className={twMerge(checkboxClasses.labelContainer.default, hasError && checkboxClasses.labelContainer.error)}>
            <div className={twMerge(checkboxClasses.description.default, hasError && checkboxClasses.description.error)}>
              {description}
            </div>
          </div>
        )}
      </div>

      {hasError && (
        <p className={checkboxClasses.errorText.default}>{errorMessage}</p>
      )}
    </div>
  )
})
