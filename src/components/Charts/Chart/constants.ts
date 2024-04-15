import { defaultViewBox } from '../../Svg'

export const defaultChartContext = {
  viewBox: defaultViewBox,
  setViewBox: () => {},
  axes: {},
  setAxis: () => {},
  snappedData: undefined,
  snapData: () => {},
  snapRuler: () => {},
  legendValues: {},
  setLegendValue: () => {},
  hoverLegend: () => {},
  clickLegend: () => {},
  focusedDataset: undefined,
  tooltipData: undefined,
  setTooltipData: () => {},
  mouseCoordinates: undefined,
  setMouseCoordinates: () => {}
}
