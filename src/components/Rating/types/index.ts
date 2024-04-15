import { type IconType } from '../../Icon/types'

export interface IRatingProps {
  value?: number
  defaultValue?: number
  precision?: number
  onChange?: (value: number) => void
  disabled?: boolean
  count?: number
  className?: string
  activeIcons?: IconType | IconType[]
  activeIconClassNames?: string | string[]
  inactiveIcons?: IconType | IconType[]
  inactiveIconClassNames?: string | string[]
  activateOnlySelected?: boolean
  renderLabel?: (value: number) => React.ReactNode
  labelClassName?: string
}
