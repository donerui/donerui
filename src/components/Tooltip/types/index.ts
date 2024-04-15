import { type ITransitionOptions } from '../../Transition/types'

export type TooltipPosition = 'top' | 'bottom' | 'left' | 'right'
export type TooltipTrigger = 'hover' | 'click' | 'focus'

export interface ITooltipProps {
  children: React.ReactNode
  className?: string
  data: React.ReactNode
  position?: TooltipPosition
  trigger?: TooltipTrigger
  disabled?: boolean
  onShow?: () => void
  onHide?: () => void
  TransitionComponent?: React.ComponentType<ITransitionOptions>
  RenderComponent?: React.ComponentType<ITooltipRenderProps>
}

export interface ITooltipRenderProps {
  data: React.ReactNode
  className?: string
  position?: TooltipPosition
  trigger?: TooltipTrigger
  disabled?: boolean
}
