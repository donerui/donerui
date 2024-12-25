import { twMerge } from 'tailwind-merge'
import Button from '../../Button'
import { DefaultModalTransition } from '../../Modal/constants'
import { type IDialogRenderProps } from '../types'

export function DefaultDialogRenderComponent ({
  title,
  description,
  children,
  className,
  onConfirm,
  onCancel,
  confirmText = 'Confirm',
  cancelText = 'Cancel'
}: IDialogRenderProps): JSX.Element {
  return (
    <div
      className={twMerge(
        'bg-white rounded-lg shadow-xl p-6 max-w-md w-full',
        'flex flex-col gap-2',
        className
      )}
    >
      {title !== undefined && (
        <h3 className="text-xl font-semibold">{title}</h3>
      )}
      {description !== undefined && (
        <p className="text-sm text-gray-600">{description}</p>
      )}

      {children}

      <div className="flex justify-end gap-2 mt-4">
        {onCancel !== undefined && (
          <Button
            color='danger'
            variant="ghost"
            size='sm'
            onClick={onCancel}
          >
            {cancelText}
          </Button>
        )}
        {onConfirm !== undefined && (
          <Button
            color='info'
            variant="solid"
            size='sm'
            onClick={onConfirm}
          >
            {confirmText}
          </Button>
        )}
      </div>
    </div>
  )
}

export { DefaultModalTransition }
