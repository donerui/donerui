import { twMerge } from 'tailwind-merge'

export const selectClasses = {
  wrapper: twMerge(
    'w-full flex flex-col gap-1',
    'data-[error=true]:text-red-600'
  ),
  label: twMerge(
    'block text-sm font-medium leading-6 text-gray-900',
    'data-[error=true]:text-red-600'
  ),
  select: twMerge(
    'flex items-center justify-between gap-1',
    'w-full h-8 px-2 py-1.5 text-sm sm:text-xs sm:leading-6 text-gray-900',
    'bg-white border-0 rounded-md shadow-sm ring-1 ring-gray-300',
    'cursor-pointer transition duration-150 ease-in-out',
    'data-[open=true]:ring-2 data-[open=true]:ring-primary-600',
    'data-[disabled=true]:bg-gray-100 data-[disabled=true]:text-gray-500 data-[disabled=true]:cursor-not-allowed',
    'data-[error=true]:ring-red-500 data-[error=true]:bg-red-50 data-[error=true]:text-red-700',
    'data-[error=true]:data-[disabled=true]:bg-red-100 data-[error=true]:data-[disabled=true]:text-red-900',
    'data-[error=true]:data-[disabled=true]:ring-red-300',
    'data-[error=true]:data-[open=true]:ring-red-500'
  ),
  searchInput: twMerge(
    'flex-1 bg-transparent border-none outline-none',
    'text-sm sm:text-xs sm:leading-6 p-0 focus:ring-0',
    'data-[error=true]:text-red-700 data-[error=true]:placeholder:text-red-300'
  ),
  selectedOption: twMerge(
    'text-gray-900',
    'data-[error=true]:text-red-700'
  ),
  placeholder: twMerge(
    'text-gray-400 text-nowrap text-ellipsis overflow-hidden',
    'data-[error=true]:text-red-300'
  ),
  clearIcon: twMerge(
    'text-base text-gray-400 hover:text-gray-600 cursor-pointer',
    'data-[error=true]:text-red-500'
  ),
  dropdownIcon: twMerge(
    'text-lg text-gray-500 pointer-events-none transition-transform',
    'data-[open=true]:rotate-180',
    'data-[clear=true]:text-base data-[clear=true]:text-gray-400 data-[clear=true]:hover:text-gray-600 data-[clear=true]:cursor-pointer',
    'data-[error=true]:text-red-500',
    'data-[disabled=true]:text-gray-400'
  ),
  dropdown: twMerge(
    'absolute left-0 w-full bg-white border border-gray-300 rounded-md shadow-lg overflow-y-auto z-50',
    'data-[position=top]:bottom-full data-[position=top]:mb-2',
    'data-[position=bottom]:top-full data-[position=bottom]:mt-2',
    'data-[error=true]:border-red-500'
  ),
  option: twMerge(
    'px-2 py-1.5 text-sm sm:text-xs text-gray-900 cursor-pointer',
    'hover:bg-gray-100',
    'data-[selected=true]:bg-primary-50 data-[selected=true]:text-primary-600',
    'data-[disabled=true]:cursor-not-allowed data-[disabled=true]:text-gray-500 data-[disabled=true]:bg-gray-50',
    'data-[error=true]:data-[selected=true]:bg-red-50 data-[error=true]:data-[selected=true]:text-red-600'
  ),
  errorText: twMerge(
    'text-sm text-red-600'
  )
}
