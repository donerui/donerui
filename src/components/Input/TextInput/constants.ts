import { twMerge } from 'tailwind-merge'

export const inputClasses = {
  wrapper: {
    default: 'w-full',
    error: ''
  },
  container: {
    default: twMerge(
      'w-full h-9 rounded-md border-0 shadow-sm ring-1 ring-gray-300',
      'focus-within:ring-2 focus-within:ring-primary-600 sm:text-sm sm:leading-6',
      'has-[input:disabled]:bg-gray-100 has-[input:disabled]:text-gray-500 has-[input:disabled]:cursor-not-allowed',
      'transition duration-150 ease-in-out',
      'flex items-center overflow-hidden'
    ),
    error: twMerge(
      'bg-red-50 ring-red-500 focus-within:ring-red-500',
      'placeholder:text-red-300 text-red-800',
      'focus-within:text-red-800 focus-within:ring-red-500',
      'has-[input:disabled]:bg-red-100 has-[input:disabled]:text-red-900'
    )
  },
  label: {
    default: 'block text-sm font-medium leading-6 text-gray-900',
    error: ''
  },
  input: {
    default: twMerge(
      'w-full overflow-hidden bg-transparent px-2 py-1.5',
      'focus-visible:outline-none',
      'disabled:cursor-not-allowed',
      'placeholder:text-gray-400'
    ),
    error: twMerge(
      'placeholder:text-red-300'
    )
  },
  passwordVisibilityButton: {
    default: 'border-l h-full bg-gray-50 text-gray-400 px-2',
    error: 'border-red-200 bg-red-100 text-red-400'
  },
  errorText: {
    default: 'text-sm text-red-600'
  }
}
