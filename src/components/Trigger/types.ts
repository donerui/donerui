import type { ReactNode } from 'react'

export interface TriggerProps {
  children: ReactNode
  className?: string
  enableOnClick?: boolean
  enableOnHover?: boolean
  enableOnFocus?: boolean
  enableHoverDelay?: number
  disableOnClick?: boolean
  disableOnMouseLeave?: boolean
  disableOnBlur?: boolean
  disableHoverDelay?: number
  onTrigger?: (isTriggered: boolean) => void
}
