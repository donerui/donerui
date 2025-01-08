import { twMerge } from 'tailwind-merge'

export const textAreaClasses = {
  wrapper: {
    default: 'w-full',
    error: ''
  },
  container: {
    default: twMerge(
      'w-full rounded-md border-0 shadow-sm ring-1 ring-gray-300 text-sm sm:text-xs sm:leading-6',
      'has-[textarea:disabled]:bg-gray-100 has-[textarea:disabled]:text-gray-500 has-[textarea:disabled]:cursor-not-allowed',
      'transition duration-150 ease-in-out',
      'flex items-stretch overflow-hidden'
    ),
    focusControlled: twMerge(
      'ring-2 ring-primary-600'
    ),
    focusWithin: twMerge(
      'focus-within:ring-2 focus-within:ring-primary-600'
    ),
    error: twMerge(
      'bg-red-50 ring-red-500 placeholder:text-red-500 text-red-700',
      'has-[textarea:disabled]:bg-red-100 has-[textarea:disabled]:text-red-900'
    ),
    errorFocusControlled: twMerge(
      'ring-red-500 text-red-800'
    ),
    errorFocusWithin: twMerge(
      'focus-within:ring-red-500 focus-within:text-red-800'
    )
  },
  label: {
    default: 'block text-sm font-medium leading-6 text-gray-900',
    error: ''
  },
  textarea: {
    default: twMerge(
      'w-full overflow-hidden bg-transparent px-2 py-1.5 min-h-[80px] resize-y',
      'focus-visible:outline-none',
      'disabled:cursor-not-allowed',
      'placeholder:text-gray-400'
    ),
    error: twMerge(
      'placeholder:text-red-300'
    )
  },
  errorText: {
    default: 'text-sm text-red-600'
  }
}
