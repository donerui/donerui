import { Fragment } from 'react'
import { MdCheckCircle, MdError, MdInfo, MdWarning } from 'react-icons/md'
import { twMerge } from 'tailwind-merge'
import Icon from '../../Icon'
import { type IToastType } from '../types'

const TypeIconMap = {
  default: undefined,
  success: MdCheckCircle,
  error: MdError,
  warning: MdWarning,
  info: MdInfo,
  loading: undefined
}

function DefaultToastIcon ({
  className,
  type
}: {
  className?: string
  type: IToastType
}): JSX.Element {
  const Icon = TypeIconMap[type]

  if (type === 'loading') {
    return (
      <svg className={twMerge(
        'animate-spin',
        className
      )} viewBox="0 0 24 24">
        <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" />
        <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4z" />
      </svg>
    )
  }

  return Icon !== undefined
    ? (
      <Icon
        className={twMerge(
          type === 'success' && 'text-green-500',
          type === 'error' && 'text-red-500',
          type === 'warning' && 'text-amber-500',
          type === 'info' && 'text-blue-500',
          className
        )}
      />
      )
    : (<Fragment />)
}

function ToastIcon ({
  className,
  icon,
  type
}: {
  className?: string
  icon?: React.FunctionComponent<any> | JSX.Element | string
  type?: IToastType
}): JSX.Element {
  return icon !== undefined
    ? (
      <Icon className={className} icon={icon} />
      )
    : (<DefaultToastIcon className={className} type={type ?? 'default'} />)
}

export default ToastIcon
