import { useCallback, useEffect, useMemo, useState } from 'react'
import { ChartContext, type AxesData, type IAxisData, type IChartContext, type IChartProps, type ILegendContextValue, type LegendContextValueMap, type SnappedData, type TooltipData } from '..'
import { defaultViewBox, type IRectangle, type ISvgMouseCoordinates } from '../../Svg'

export * from './constants'
export * from './contexts'
export * from './hooks'
export * from './types'

function Chart ({
  children
}: IChartProps): JSX.Element {
  const [axes, setAxes] = useState<AxesData>({})

  const [snappedData, setSnappedData] = useState<SnappedData | undefined>()
  const [legendValues, setLegendValues] = useState<LegendContextValueMap>({})
  const [tooltipData, setTooltipData] = useState<TooltipData>()
  const [focusedDataset, setFocusedDataset] = useState<string | undefined>()

  const [mouseCoordinates, setMouseCoordinates] = useState<ISvgMouseCoordinates | undefined>()

  const [hoveredLegend, setHoveredLegend] = useState<string | undefined>()
  const [clickedLegend, setClickedLegend] = useState<string | undefined>()

  const [viewBox, setViewBox] = useState<IRectangle>(defaultViewBox)

  const setAxis = useCallback((axis: IAxisData): void => {
    setAxes(prev => ({
      ...prev,
      [axis.dimension]: {
        ...prev[axis.dimension],
        [axis.id]: axis
      }
    }))
  }, [])

  const snapData = useCallback((data?: SnappedData): void => {
    setSnappedData(data)
  }, [])

  const setLegendValue = useCallback((id: string, value: ILegendContextValue): void => {
    setLegendValues(prev => ({
      ...prev,
      [id]: value
    }))
  }, [])

  const hoverLegend = useCallback((id?: string): void => {
    setHoveredLegend(id)
  }, [legendValues])

  const clickLegend = useCallback((id?: string): void => {
    setClickedLegend(prev => {
      if (prev === id) return undefined
      return id
    })
  }, [legendValues])

  useEffect(() => {
    if (clickedLegend != null) {
      setFocusedDataset(clickedLegend)
    } else if (hoveredLegend != null) {
      setFocusedDataset(hoveredLegend)
    } else {
      setFocusedDataset(undefined)
    }
  }, [hoveredLegend, clickedLegend])

  const chartContextValue = useMemo<IChartContext>(() => ({
    viewBox,
    setViewBox,
    axes,
    setAxis,
    snappedData,
    snapData,
    legendValues,
    setLegendValue,
    hoverLegend,
    clickLegend,
    focusedDataset,
    tooltipData,
    setTooltipData,
    mouseCoordinates,
    setMouseCoordinates
  }), [viewBox, setViewBox, axes, setAxis, snappedData, snapData, legendValues, setLegendValue, hoverLegend, clickLegend, focusedDataset,
    tooltipData, setTooltipData, mouseCoordinates, setMouseCoordinates])

  return (
    <ChartContext.Provider value={chartContextValue}>
      {children}
    </ChartContext.Provider>
  )
}

export default Chart
