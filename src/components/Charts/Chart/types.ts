import { type AxesData, type IAxisData, type ILegendContextValue, type LegendContextValueMap, type SnappedData, type TooltipData } from '..'
import { type IRectangle, type ISvgMouseCoordinates } from '../../Svg'

export interface IChartContext {
  viewBox: IRectangle
  setViewBox: (viewBox: IRectangle) => void
  axes: AxesData
  setAxis: (axis: IAxisData) => void
  snappedData: SnappedData | undefined
  snapData: (data?: SnappedData) => void
  legendValues: LegendContextValueMap
  setLegendValue: (id: string, value: ILegendContextValue) => void
  hoverLegend: (id?: string) => void
  clickLegend: (id?: string) => void
  focusedDataset: string | undefined
  tooltipData: TooltipData
  setTooltipData: (data?: TooltipData) => void
  mouseCoordinates: ISvgMouseCoordinates | undefined
  setMouseCoordinates: (coordinates?: ISvgMouseCoordinates) => void
}

export type UseChartReturnType = IChartContext

export interface IChartProps {
  children: React.ReactNode
  className?: string
  padding?: number
}
