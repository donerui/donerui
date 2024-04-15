import { type IPoint } from '../../Svg'

export type TooltipData = { position?: IPoint<number>, data: any } | undefined

export interface ITooltipProps {
  className?: string
  hidden?: boolean
}
