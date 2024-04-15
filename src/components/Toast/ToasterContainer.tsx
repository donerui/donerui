import { twMerge } from 'tailwind-merge'
import Toast from './Toast'
import { toastContainerPositions } from './constants'
import { useToaster } from './hooks'
import { type IToasterContainerProps } from './types'

function ToasterContainer ({
  id,
  ToastComponent = Toast,
  className,
  position,
  reverseOrder = false
  // maxToasts = 5,
}: IToasterContainerProps): JSX.Element {
  const { toasts } = useToaster()

  return (
    <div className={twMerge(
      'flex flex-col gap-2 w-48 overflow-hidden',
      position !== undefined && toastContainerPositions[position],
      position !== undefined && toastContainerPositions[position] !== undefined && 'absolute',
      reverseOrder && 'flex-col-reverse',
      className
    )}
    >
      {toasts
        .filter((toast) => id === undefined || toast.containerId === id)
        .map((toast) => (
          <ToastComponent
            key={toast.id}
            {...toast}
          />
        ))}
    </div>
  )
}

export default ToasterContainer
