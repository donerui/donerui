import { type ITransitionProps } from '../../Transition/types'

export interface IModalProps {
  children: React.ReactNode
  isOpen: boolean
  className?: string
  closeOnEsc?: boolean
  closeOnOutsideClick?: boolean
  onOpen?: () => void
  onClose?: () => void
  transitionProps?: ITransitionProps
}
