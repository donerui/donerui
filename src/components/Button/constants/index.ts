export const shapeClassnames = {
  box: '',
  rounded: 'rounded-md',
  circle: 'rounded-full'
}

export const sizeClassnames = {
  xs: 'px-2 py-1 text-xs',
  sm: 'px-3 py-1.5 text-sm',
  md: 'px-4 py-2 text-base',
  lg: 'px-5 py-2.5 text-lg',
  xl: 'px-6 py-3 text-xl'
}

export const iconSizeClassnames = {
  xs: 'p-1',
  sm: 'p-1.5',
  md: 'p-2',
  lg: 'p-2.5',
  xl: 'p-3'
}

export const colorClassnames = {
  primary: {
    solid: 'bg-primary-500 text-white hover:enabled:bg-primary-600',
    outline: 'outline outline-1 outline-primary-500 text-primary-500 hover:enabled:bg-primary-200',
    ghost: 'text-primary-500 hover:enabled:bg-primary-200'
  },
  secondary: {
    solid: 'bg-secondary-600 text-white hover:enabled:bg-secondary-700',
    outline: 'outline outline-1 outline-secondary-600 text-secondary-600 hover:enabled:bg-secondary-400',
    ghost: 'text-secondary-600 hover:enabled:bg-secondary-400'
  },
  danger: {
    solid: 'bg-red-500 text-white hover:enabled:bg-red-600',
    outline: 'outline outline-1 outline-red-500 text-red-500 hover:enabled:bg-red-100',
    ghost: 'text-red-500 hover:enabled:bg-red-100'
  },
  warning: {
    solid: 'bg-yellow-500 text-white hover:enabled:bg-yellow-600',
    outline: 'outline outline-1 outline-yellow-500 text-yellow-500 hover:enabled:bg-yellow-100',
    ghost: 'text-yellow-500 hover:enabled:bg-yellow-100'
  },
  success: {
    solid: 'bg-green-500 text-white hover:enabled:bg-green-600',
    outline: 'outline outline-1 outline-green-500 text-green-500 hover:enabled:bg-green-100',
    ghost: 'text-green-500 hover:enabled:bg-green-100'
  },
  info: {
    solid: 'bg-blue-500 text-white hover:enabled:bg-blue-600',
    outline: 'outline outline-1 outline-blue-500 text-blue-500 hover:enabled:bg-blue-100',
    ghost: 'text-blue-500 hover:enabled:bg-blue-100'
  },
  light: {
    solid: 'bg-neutral-200 text-neutral-800 hover:enabled:bg-neutral-200',
    outline: 'outline outline-1 outline-neutral-200 text-neutral-400 hover:enabled:bg-neutral-100 hover:enabled:text-neutral-800',
    ghost: 'text-neutral-400 hover:enabled:bg-neutral-100 hover:enabled:text-neutral-800'
  },
  dark: {
    solid: 'bg-neutral-900 text-white hover:enabled:bg-neutral-800',
    outline: 'outline outline-1 outline-neutral-900 text-neutral-900 hover:enabled:bg-neutral-200',
    ghost: 'text-neutral-900 hover:enabled:bg-neutral-200'
  }
}

export const variantClassnames = {
  solid: 'font-medium',
  outline: 'font-medium',
  ghost: 'font-medium'
}

export const disabledClassnames = 'disabled:opacity-50 disabled:cursor-not-allowed'

export const loadingClassnames = 'animate-pulse'
