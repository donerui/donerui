import { twMerge } from 'tailwind-merge'
import { inputLabelClassName } from '.'

export const selectClassName = twMerge(
  'mt-2 flex w-full !min-h-fit rounded !border-none shadow-sm ring-1 ring-inset ring-gray-300 overflow-hidden',
  'placeholder:text-gray-400 focus-within:ring-2 focus-within:ring-inset focus-within:ring-primary-500 sm:text-sm sm:leading-6',
  'disabled:bg-gray-100 disabled:text-gray-500 disabled:cursor-not-allowed',
  'transition duration-150 ease-in-out'
)

export const selectErrorClassName = twMerge(
  'ring-red-500 focus-within:ring-red-500',
  'placeholder:text-red-300 text-red-900',
  'focus-within:text-red-900 focus-within:ring-red-500'
)

export interface IOption {
  label: string
  value: string | number
}

interface ISelectProps extends Props {
  label?: string
  errorMessage?: string
}

function Select (props: ISelectProps, ref: React.Ref<any>): React.ReactNode {
  const { className, label, id, name, options, errorMessage, ...rest } = props

  return (
    <div className={twMerge('flex flex-col', className)}>
      {label && (
        <label className={inputLabelClassName} htmlFor={id || name}>
          {label}
        </label>
      )}

      <ReactSelect
        {...rest}
        id={id || name}
        name={name}
        ref={ref}
        options={options}
        classNames={{
          control: () => {
            return twMerge(selectClassName, errorMessage && selectErrorClassName)
          },
          option: (props: OptionProps) => {
            return twMerge('!text-xs', props.isSelected && '!bg-primary-500', !props.isSelected && props.isFocused && '!bg-primary-100')
          }
        }}
      />

      {errorMessage && (
        <p className="mt-1 text-sm text-red-600">{errorMessage}</p>
      )}
    </div>
  )
}

const ForwardedSelect = React.forwardRef(Select)

export default ForwardedSelect
