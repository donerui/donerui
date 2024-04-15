import { useContext, useMemo } from 'react'
import { LineChartContext, type UseLineChartReturnType } from '.'
import { findClosestNumber, useAxisScaler, useChart } from '..'
import { useTimeoutEffect } from '../../../hooks'

export function useLineChart (
  xAxisId?: string,
  yAxisId?: string
): UseLineChartReturnType {
  const chartHook = useChart()
  const context = useContext(LineChartContext)

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

  const { lines, addLine } = context
  const data = useMemo(() => Object.values(lines), [lines])

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
    const focusedLines = Object.entries(focusedDataset == null ? lines : { [focusedDataset]: lines[focusedDataset] })

    const rulerSnapY = focusedLines.reduce((acc, entry) => {
      const [id, line] = entry

      const xAxis = xAxes[line.xAxisId]
      const yAxis = yAxes[line.yAxisId]

      const points = line.points.map((p, i) => ({
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

    const line = lines[snappedId]

    let newSnappedData
    if (line != null) {
      const yAxis = yAxes[line.yAxisId]
      newSnappedData = line.points.find((p) => p.y.value * (yAxis.scale ?? 1) === rulerSnapY)
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

  useTimeoutEffect(snapRulerY, 10, [mouseCoordinates?.inSvgSpace.y, snappedData?.x, snapData, lines])

  return {
    ...chartHook,
    lines,
    addLine
  }
}
