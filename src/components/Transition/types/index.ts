import { type AnimatecssAnimation } from './animatecss'
import { type MagiccssAnimation } from './magiccss'

export interface ITransitionOptions {
  children?: React.ReactNode
  className?: string
  show?: boolean
  appear?: boolean
  beforeEnter?: () => void
  afterEnter?: () => void
  beforeLeave?: () => void
  afterLeave?: () => void
  onClick?: (event: React.MouseEvent<HTMLDivElement, MouseEvent>) => void
}

export interface ITransitionProps extends ITransitionOptions {
  animation?: {
    enter: AnimatecssAnimation | MagiccssAnimation
    exit: AnimatecssAnimation | MagiccssAnimation
  }
  TransitionComponent?: React.ComponentType<ITransitionOptions>
}

export type { AnimatecssAnimation, MagiccssAnimation }
