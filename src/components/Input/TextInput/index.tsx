import { forwardRef, type ReactNode, type Ref, useState } from 'react'
import { MdVisibility, MdVisibilityOff } from 'react-icons/md'
import { twMerge } from 'tailwind-merge'
import Button from '../../Button'
import { inputClasses } from './constants'
import { type TextInputProps } from './types'

export default forwardRef(function TextInput (props: TextInputProps, ref: Ref<HTMLInputElement>): ReactNode {
  const { errorMessage, type, id, label, name, required, ...rest } = props

  const hasError = errorMessage != null
  const hasLabel = label != null && label !== ''
  const isRequired = required === true
  const isPassword = type === 'password'

  const [showPassword, setShowPassword] = useState(false)

  return (
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

      <div className={twMerge(inputClasses.container.default, inputClasses.container.focusWithin, hasError && inputClasses.container.error, hasError && inputClasses.container.errorFocusWithin)}>
        {props.LeftComponent}

        <input
          {...rest}
          id={id ?? name}
          name={name}
          ref={ref}
          type={isPassword && showPassword ? 'text' : type}
          className={twMerge(inputClasses.input.default, hasError && inputClasses.input.error)}
        />

        {isPassword && (
          <Button
            variant='ghost'
            color={hasError ? 'danger' : 'light'}
            className={twMerge(inputClasses.passwordVisibilityButton.default, hasError && inputClasses.passwordVisibilityButton.error)}
            onClick={() => { setShowPassword(!showPassword) }}
          >
            {showPassword ? <MdVisibility className="size-4" /> : <MdVisibilityOff className="size-4" />}
          </Button>
        )}

        {props.RightComponent}
      </div>

      {hasError && (
        <p className={inputClasses.errorText.default}>{errorMessage}</p>
      )}
    </div>
  )
})
