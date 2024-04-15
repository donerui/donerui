import { useEffect, useId, useState } from 'react'
import { dataSelector, useAxis, useLineChart, type IChartPoint, type ILineProps } from '..'
import { useTimeoutEffect } from '../../../hooks'
import { Svg } from '../../Svg'

function Line ({
  data,
  dataLabel,
  xAxisId = 'x-axis',
  yAxisId = 'y-axis',
  strokeOptions,
  dotFill = 'transparent',
  dotRadius = 0.5,
  dotStrokeOptions,
  curvature = 'catmullRom',
  sort = true
}: ILineProps): JSX.Element {
  const id = useId()
  const xAxis = useAxis('x', xAxisId)
  const yAxis = useAxis('y', yAxisId)

  const {
    snappedData,
    setLegendValue, focusedDataset,
    addLine
  } = useLineChart(xAxisId, yAxisId)

  const faded = focusedDataset != null && focusedDataset !== id

  const [points, setPoints] = useState<IChartPoint[]>([])
  const [scaledPoints, setScaledPoints] = useState<IChartPoint[]>([])

  function getPoints (): void {
    if (xAxis == null || yAxis == null) return

    if (data == null || xAxis.dataKey === '' || yAxis.dataKey === '') {
      if (points.length > 0) {
        setPoints([])
      }
    } else {
      let _points: IChartPoint[] = data.map((d: any, i: number) => {
        const x = dataSelector(d, xAxis.dataKey)
        const y = dataSelector(d, yAxis.dataKey)

        const pt = {
          x: {
            value: xAxis.dataType === 'number' ? x : i * 10,
            label: x.toString()
          },
          y: {
            value: y,
            label: y.toString()
          },
          payload: {
            value: d,
            label: 'payload'
          }
        }

        return pt
      })

      if (sort !== false) {
        if (sort === true) {
          _points = _points.sort((a, b) => a.x.value - b.x.value)
        } else {
          _points = _points.sort(sort)
        }
      }

      setPoints(_points)
    }
  }

  function scalePoints (): void {
    if (xAxis == null || yAxis == null) return

    const _scaledPoints = points.map((point) => ({
      x: {
        ...point.x,
        value: point.x.value * xAxis.scale
      },
      y: {
        ...point.y,
        value: point.y.value * yAxis.scale
      }
    }))

    setScaledPoints(_scaledPoints)
  }

  useTimeoutEffect(
    scalePoints,
    10,
    [points, xAxis?.scale, yAxis?.scale]
  )

  useEffect(getPoints, [data, xAxis?.dataKey, yAxis?.dataKey])

  useEffect(() => {
    addLine(id, { xAxisId, yAxisId, points })
    setLegendValue(id, { id, color: strokeOptions?.stroke, label: dataLabel })
  }, [points])

  return (
    <Svg.Group id='line'>
      <Svg.Curve
        className={faded ? 'opacity-25' : ''}
        points={scaledPoints.map((point) => ({ x: point.x.value, y: point.y.value }))}
        curvature={curvature}
        strokeOptions={strokeOptions}
      />

      <Svg.Group id='line-points'>
        {scaledPoints.map((point) => (
          <Svg.Point
            key={`Point:${point.x.label},${point.y.label}:${id}`}
            className={faded ? 'opacity-25' : ''}
            point={{ x: point.x.value, y: point.y.value }}
            radius={(!faded && snappedData?.x === point.x.value) ? dotRadius * 2 : dotRadius}
            fill={dotFill}
            strokeOptions={dotStrokeOptions}
          />
        ))}
      </Svg.Group>
    </Svg.Group>
  )
}

export default Line
