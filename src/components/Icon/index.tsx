import { twMerge } from 'tailwind-merge'
import { type IIconProps } from './types'

function Icon ({
  icon,
  className
}: IIconProps): JSX.Element {
  const IconElement = typeof icon === 'function' ? icon : undefined

  return (
    <>
      {icon !== undefined && typeof icon === 'string' && (
        <span
          className={className}
        >
          {icon}
        </span>
      )}
      {IconElement !== undefined && (
        <IconElement className={twMerge(
          'w-5 h-5',
          className
        )} />
      )}
      {icon !== undefined && typeof icon === 'object' && (
        icon
      )}
    </>
  )
}

export default Icon
