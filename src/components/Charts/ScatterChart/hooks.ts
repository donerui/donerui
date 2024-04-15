import { useContext, useMemo } from 'react'
import { ScatterChartContext, type UseScatterChartReturnType } from '.'
import { findClosestNumber, useAxisScaler, useChart } from '..'
import { useTimeoutEffect } from '../../../hooks'

export function useScatterChart (
  xAxisId?: string,
  yAxisId?: string,
  sizeAxisId?: string,
  colorAxisId?: string
): UseScatterChartReturnType {
  const chartHook = useChart()
  const context = useContext(ScatterChartContext)

  const {
    viewBox,
    axes,
    mouseCoordinates,
    snappedData, snapData,
    focusedDataset,
    setTooltipData
  } = chartHook

  const xAxes = axes.x
  const yAxes = axes.y

  const {
    scatters, addScatter
  } = context
  const data = useMemo(() => Object.values(scatters), [scatters])

  useAxisScaler(
    'x',
    xAxisId ?? '',
    data,
    (element) => element.xAxisId === xAxisId,
    { min: 0, max: viewBox.width }
  )
  useAxisScaler(
    'y',
    yAxisId ?? '',
    data,
    (element) => element.yAxisId === yAxisId,
    { min: 0, max: viewBox.height }
  )

  function snapRulerY (): void {
    if (mouseCoordinates?.inSvgSpace.y == null) {
      // setHighlights()
      return
    }
    if (snappedData?.x == null) {
      // snapData()
      return
    }

    let snappedId = ''
    const focusedScatters = Object.entries(focusedDataset == null ? scatters : { [focusedDataset]: scatters[focusedDataset] })

    const rulerSnapY = focusedScatters.reduce((acc, entry) => {
      const [id, scatter] = entry

      const xAxis = xAxes[scatter.xAxisId]
      const yAxis = yAxes[scatter.yAxisId]

      const points = scatter.points.map((p, i) => ({
        x: (xAxis.scale ?? 1) * p.x.value,
        y: (yAxis.scale ?? 1) * p.y.value
      }))

      const snappedPoints = points
        .filter((p) => p.x === snappedData?.x)
        .map((p) => p.y)
      const arr = acc === undefined ? snappedPoints : [acc, ...snappedPoints]
      const closestPoint = findClosestNumber(arr, mouseCoordinates.inSvgSpace.y)

      if (closestPoint !== acc) snappedId = id

      return closestPoint
    }, -Infinity)

    const scatter = scatters[snappedId]

    let newSnappedData
    if (scatter != null) {
      const yAxis = yAxes[scatter.yAxisId]
      newSnappedData = scatter.points.find((p) => p.y.value * (yAxis.scale ?? 1) === rulerSnapY)
      const payload = newSnappedData?.payload

      setTooltipData({
        position: { x: mouseCoordinates?.inClientSpace.x ?? 0, y: mouseCoordinates?.inClientSpace.y ?? 0 },
        data: payload
      })
    }

    snapData({
      x: snappedData.x,
      y: rulerSnapY,
      data: newSnappedData != null
        ? {
            x: newSnappedData.x.label ?? 'undefined',
            y: newSnappedData.y.label ?? 'undefined'
          }
        : undefined
    })
  }

  useTimeoutEffect(snapRulerY, 10, [mouseCoordinates?.inSvgSpace.y, snappedData?.x, snapData, scatters])

  return { ...chartHook, scatters, addScatter }
}
