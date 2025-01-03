import { twMerge } from 'tailwind-merge'

export const selectClasses = {
  wrapper: {
    default: 'w-full flex flex-col gap-1',
    error: ''
  },
  label: {
    default: 'block text-sm font-medium leading-6 text-gray-900',
    error: 'text-red-600'
  },
  select: {
    default: twMerge(
      'flex items-center justify-between gap-1',
      'w-full h-8 px-2 py-1.5 text-sm sm:text-xs sm:leading-6 text-gray-900',
      'bg-white border-0 rounded-md shadow-sm ring-1 ring-gray-300',
      'cursor-pointer transition duration-150 ease-in-out'
    ),
    open: 'ring-2 ring-primary-600',
    disabled: 'bg-gray-100 text-gray-500 cursor-not-allowed',
    error: twMerge(
      'bg-red-50 ring-red-500 text-red-700',
      'disabled:bg-red-100 disabled:text-red-900'
    ),
    openError: 'ring-2 ring-red-500'
  },
  placeholder: {
    default: 'text-gray-400',
    error: 'text-red-300'
  },
  icon: {
    default: 'text-lg text-gray-500 pointer-events-none transition-transform',
    open: 'rotate-180',
    clear: 'text-base text-gray-400 hover:text-gray-600 cursor-pointer'
  },
  dropdown: {
    default: 'absolute left-0 w-full bg-white border border-gray-300 rounded-md shadow-lg overflow-y-auto z-50',
    top: 'bottom-[calc(100%+0.25rem)]',
    bottom: 'top-[calc(100%+0.25rem)]',
    error: 'border-red-500'
  },
  option: {
    default: 'px-2 py-1.5 text-sm sm:text-xs text-gray-900 cursor-pointer hover:bg-gray-100 data-[selected=true]:bg-primary-50 data-[selected=true]:text-primary-600 data-[disabled=true]:cursor-not-allowed data-[disabled=true]:text-gray-500 data-[disabled=true]:bg-gray-50',
    error: ''
  },
  errorText: {
    default: 'text-sm text-red-600'
  }
}
