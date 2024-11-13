import { twMerge } from 'tailwind-merge'
import { colorClassnames, disabledClassnames, iconSizeClassnames, shapeClassnames, sizeClassnames, variantClassnames } from './constants'
import { type IButtonProps } from './types'

function Button ({
  children,
  className,
  shape = 'rounded',
  size = 'md',
  color = 'light',
  variant = 'solid',
  type = 'button',
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
        typeof className === 'string' && className,
        typeof className === 'function' && className({ shape, size, color, variant, iconButton, disabled, ...rest })
      )}
      type={type}
      disabled={disabled}
      {...rest}
    >
      {children}
    </button>
  )
}

export * from './types'

export default Button
