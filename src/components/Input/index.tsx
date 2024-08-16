import { twMerge } from 'tailwind-merge'
import TextInput from './TextInput'
import { type InputProps } from './types'

export const inputClassName = twMerge(
  'mt-2 block w-full rounded-md border-0 py-1.5 shadow-sm ring-1 ring-inset ring-gray-300 overflow-hidden',
  'placeholder:text-gray-400 focus-within:ring-2 focus-within:ring-inset focus-within:ring-primary-600 sm:text-sm sm:leading-6',
  'disabled:bg-gray-100 disabled:text-gray-500 disabled:cursor-not-allowed',
  'transition duration-150 ease-in-out'
)

export const checkboxClassName = twMerge(
  'h-4 w-4 rounded border-gray-300 text-primary-600 focus:ring-primary-600'
)

export const fileClassName = twMerge(
  'file:w-full file:h-full file:cursor-pointer file:py-1.5 file:px-4 file:rounded-md file:border-0 file:shadow-sm file:ring-1 file:ring-inset file:ring-gray-300 file:overflow-hidden',
  'file:placeholder:text-gray-400 file:focus-within:ring-2 file:focus-within:ring-inset file:focus-within:ring-primary-600 file:text-sm file:leading-6',
  'file:disabled:bg-gray-100 file:disabled:text-gray-500 file:disabled:cursor-not-allowed',
  'file:transition file:duration-150 file:ease-in-out'
)

export const inputErrorClassName = twMerge(
  'ring-primary-500 focus-within:ring-primary-500',
  'placeholder:text-primary-300 text-primary-900',
  'focus-within:text-primary-900 focus-within:ring-primary-500'
)

export const inputLabelClassName = twMerge(
  'block text-sm font-medium leading-6 text-gray-900'
)

function Input (
  props: InputProps,
  ref: React.Ref<HTMLInputElement>
): React.ReactNode {
  const { type } = props

  switch (type) {
    case 'text':
      return <TextInput {...props} ref={ref} />
    // case 'number':
    //   return NumberInput(props, ref)
    // case 'select':
    //   return <Select
    // case 'file':
    //   return FileInput(props, ref)
    default:
      return null
  }

  // return (
  //   <div className={twMerge('flex', containerClassName, isCheckbox ? 'flex-row-reverse gap-2 items-center' : 'flex-col')}>
  //     {label && (
  //       <label
  //         className={inputLabelClassName}
  //         htmlFor={id || name}
  //       >
  //         {label}
  //         {info && (
  //           <span className="relative group inline">
  //             <MdInfo className="text-blue-500" />
  //             {info}
  //           </span>
  //         )}
  //         {required && <span className="text-primary-500">*</span>}
  //       </label>
  //     )}

  //     {errorMessage && (
  //       <p className="ml-2 mt-1 text-sm text-primary-600">{errorMessage}</p>
  //     )}

  //     {isMaskInput && (
  //       <IMaskInput
  //         {...rest as ReactMaskProps<HTMLInputElement>}
  //         id={id || name}
  //         name={name}
  //         inputRef={ref}
  //         className={twMerge(inputClassName, className, errorMessage && inputErrorClassName)}
  //         mask={inputMask}
  //       />
  //     )}

  //     {isCheckbox && (
  //       <input
  //         {...rest}
  //         id={id || name}
  //         name={name}
  //         ref={ref}
  //         className={twMerge(checkboxClassName, className, errorMessage && inputErrorClassName)}
  //       />
  //     )}

  //     {!isMaskInput && !isCheckbox && (
  //       <input
  //         {...rest}
  //         id={id || name}
  //         name={name}
  //         ref={ref}
  //         className={twMerge(inputClassName, className, errorMessage && inputErrorClassName)}
  //       />
  //     )}
  //   </div>
  // )
}

const ForwardedInput = React.forwardRef(Input)

export default ForwardedInput
