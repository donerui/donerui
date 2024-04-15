import { twMerge } from 'tailwind-merge'
import { colorClassnames, disabledClassnames, iconSizeClassnames, shapeClassnames, sizeClassnames, variantClassnames } from './constants'
import { type IButtonProps } from './types'

function Button ({
  children,
  className,
  shape = 'rounded',
  size = 'md',
  color = 'info',
  variant = 'solid',
  iconButton = false,
  disabled,
  ...rest
}: IButtonProps): JSX.Element {
  return (
    <button
      className={twMerge(
        'inline-flex items-center justify-center duration-150',
        shapeClassnames[shape],
        (iconButton ? iconSizeClassnames : sizeClassnames)[size],
        colorClassnames[color][variant],
        variantClassnames[variant],
        disabled === true && disabledClassnames,
        className
      )}
      disabled={disabled}
      {...rest}
    >
      {children}
    </button>
  )
}

export * from './types'

export default Button
