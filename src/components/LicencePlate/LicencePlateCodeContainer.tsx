import { twMerge } from 'tailwind-merge'
import { type ILicencePlateCodeContainerProps } from './types'

function LicencePlateCodeContainer ({
  locale,
  regionCode,
  position,
  children,
  className
}: ILicencePlateCodeContainerProps): React.ReactElement {
  return (
    <div className={twMerge(
      'min-w-6 max-w-16 px-1 flex flex-col items-center justify-end text-white font-semibold duration-200',
      className
    )}>
      {typeof children === 'function' ? children({ locale, regionCode, position }) : children}
    </div>
  )
}

export default LicencePlateCodeContainer
