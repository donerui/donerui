import { type ITransitionOptions } from '../../Transition/types'

export interface IModalProps {
  children: React.ReactNode
  isOpen: boolean
  className?: string
  closeOnEsc?: boolean
  closeOnOutsideClick?: boolean
  onOpen?: () => void
  onClose?: () => void
  TransitionComponent?: React.ComponentType<ITransitionOptions>
}
