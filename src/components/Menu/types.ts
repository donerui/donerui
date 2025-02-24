import { type ReactNode } from 'react'
import { type ITransitionOptions } from '../Transition/types'
import { type TriggerProps } from '../Trigger'

export type MenuPosition = 'top' | 'top-right' | 'top-left' | 'bottom' | 'bottom-right' | 'bottom-left' | 'left' | 'right'

export interface MenuProps {
  children: ReactNode
  className?: string
  portal?: HTMLElement | string
  position?: MenuPosition
  TransitionComponent?: React.ComponentType<ITransitionOptions>
}

export interface MenuTriggerProps extends TriggerProps {
}
