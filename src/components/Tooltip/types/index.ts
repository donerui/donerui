import type { ITransitionOptions } from '../../Transition/types'
import type { TriggerProps } from '../../Trigger'

export type TooltipPosition = 'top' | 'bottom' | 'left' | 'right'

export interface ITooltipProps extends TriggerProps {
  children: React.ReactNode
  className?: string
  data: React.ReactNode
  position?: TooltipPosition
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
  disabled?: boolean
}
