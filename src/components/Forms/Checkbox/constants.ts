import { twMerge } from 'tailwind-merge'

export const checkboxClasses = {
  wrapper: {
    default: 'w-full flex flex-col gap-1.5',
    error: ''
  },
  container: {
    default: twMerge(
      'relative flex items-start gap-3',
      'disabled:opacity-50 disabled:cursor-not-allowed'
    ),
    error: ''
  },
  checkbox: {
    default: twMerge(
      'size-4 rounded border-gray-300 my-1',
      'text-primary-600 accent-primary-600 checked:border-primary-600',
      'focus:ring-2 focus:ring-primary-600 focus:ring-offset-2',
      'disabled:cursor-not-allowed disabled:opacity-50',
      'transition-colors duration-200 ease-in-out',
      'flex-shrink-0'
    ),
    error: twMerge(
      'border-red-500 text-red-600',
      'accent-red-600 checked:border-red-600',
      'focus:ring-red-500'
    )
  },
  labelContainer: {
    default: 'flex-1',
    error: ''
  },
  label: {
    default: 'text-sm font-medium text-gray-900 leading-6',
    error: 'text-red-600'
  },
  description: {
    default: 'text-sm text-gray-500 leading-6',
    error: 'text-red-500'
  },
  errorText: {
    default: 'mt-1 text-sm text-red-600'
  }
}
