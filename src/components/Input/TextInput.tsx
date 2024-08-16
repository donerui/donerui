import { forwardRef, type ReactNode } from 'react'
import { MdInfo } from 'react-icons/md'
import { twMerge } from 'tailwind-merge'
import { type TextInputProps } from './types'

function TextInput (props: TextInputProps, ref: React.Ref<HTMLInputElement>): ReactNode {
  const { className, containerClassName, errorMessage, id, info, label, name, required, ...rest } = props

  return (
    <div className={twMerge('flex', containerClassName, isCheckbox ? 'flex-row-reverse gap-2 items-center' : 'flex-col')}>
      {label && (
        <label
          className={inputLabelClassName}
          htmlFor={id || name}
        >
          {label}
          {info && (
            <span className="relative group inline">
              <MdInfo className="text-blue-500" />
              {info}
            </span>
          )}
          {required && <span className="text-primary-500">*</span>}
        </label>
      )}

      {errorMessage && (
        <p className="ml-2 mt-1 text-sm text-primary-600">{errorMessage}</p>
      )}

      <input
        {...rest}
        id={id || name}
        name={name}
        ref={ref}
        className={twMerge(inputClassName, className, errorMessage && inputErrorClassName)}
      />
    </div>
  )
}

const ForwardedTextInput = forwardRef(TextInput)

export default ForwardedTextInput
