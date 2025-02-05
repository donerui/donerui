import { twMerge } from 'tailwind-merge'

export const switchClasses = {
  wrapper: {
    default: 'w-full flex flex-col gap-1.5',
    error: ''
  },
  container: {
    default: 'relative flex items-start gap-3',
    disabled: 'opacity-50 cursor-not-allowed',
    error: ''
  },
  switch: {
    default: twMerge(
      'w-10 h-6 flex items-center rounded-full duration-300 p-1',
      'bg-gray-300 hover:bg-gray-400',
      'peer-checked:[&>span:first-child]:flex-1 peer-checked:bg-primary-500',
      'peer-checked:hover:bg-primary-600',
      '[&>span:first-child]:data-[indeterminate=true]:bg-primary-300',
      '[&>span:first-child]:data-[indeterminate=true]:flex-[0.5]',
      'peer-disabled:opacity-50 peer-disabled:cursor-not-allowed peer-disabled:pointer-events-none',
      'transition-colors duration-200 ease-in-out'
    ),
    error: twMerge(
      'bg-red-400 hover:bg-red-500',
      'peer-checked:bg-red-500 peer-checked:hover:bg-red-600',
      'data-[indeterminate=true]:bg-red-300 data-[indeterminate=true]:hover:bg-red-400'
    )
  },
  handle: {
    default: 'duration-300'
  },
  thumb: {
    default: 'h-full aspect-square rounded-full bg-white shadow'
  },
  input: {
    default: 'sr-only peer'
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
