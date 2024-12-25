import { type IModalProps } from '../../Modal/types'

export interface IDialogRenderProps {
  id?: string
  title?: string
  description?: string
  children?: React.ReactNode
  className?: string
  onConfirm?: () => void
  onCancel?: () => void
  confirmText?: string
  cancelText?: string
}

export interface IDialogOptions extends IDialogRenderProps {
  RenderComponent?: React.ComponentType<IDialogRenderProps>
}

export interface IDialogProps extends IDialogOptions {
  id: string
  isOpen: boolean
  modalProps?: IModalProps
}

export interface IDialogContext {
  dialogs: IDialogProps[]
  createDialog: (options: IDialogOptions) => string
  removeDialog: (id: string) => void
  updateDialog: (id: string, options: IDialogOptions) => void
  getDialog: (id: string) => IDialogProps | undefined
}
