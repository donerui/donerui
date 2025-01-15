import { forwardRef, type ReactNode, type Ref } from 'react'
import { twMerge } from 'tailwind-merge'
import { textAreaClasses } from './constants'
import { type TextAreaProps } from './types'

export * from './types'

export default forwardRef(function TextArea (props: TextAreaProps, ref: Ref<HTMLTextAreaElement>): ReactNode {
  const { errorMessage, id, label, name, required, ...rest } = props

  const hasError = errorMessage != null
  const hasLabel = label != null && label !== ''
  const isRequired = required === true

  return (
    <div className={twMerge(textAreaClasses.wrapper.default, hasError && textAreaClasses.wrapper.error)}>
      {hasLabel && (
        <label
          className={twMerge(textAreaClasses.label.default, hasError && textAreaClasses.label.error)}
          htmlFor={id ?? name}
        >
          {label}
          {isRequired && <span className="text-primary-500">*</span>}
        </label>
      )}

      <div className={twMerge(
        textAreaClasses.container.default,
        textAreaClasses.container.focusWithin,
        hasError && textAreaClasses.container.error,
        hasError && textAreaClasses.container.errorFocusWithin
      )}>
        {props.LeftComponent}

        <textarea
          {...rest}
          id={id ?? name}
          name={name}
          ref={ref}
          className={twMerge(textAreaClasses.textarea.default, hasError && textAreaClasses.textarea.error)}
        />

        {props.RightComponent}
      </div>

      {hasError && (
        <p className={textAreaClasses.errorText.default}>{errorMessage}</p>
      )}
    </div>
  )
})
