import { max, min } from 'lodash'
import { useEffect, useId, useState } from 'react'
import { dataSelector, defaultColorRange, defaultSizeRange, mapColor, useAxis, type IChartPoint, type IScatterProps } from '..'
import { useTimeoutEffect } from '../../../hooks'
import { map } from '../../../utils'
import { Svg } from '../../Svg'
import { useScatterChart } from './hooks'

function Scatter ({
  data,
  dataLabel,
  xAxisId = 'x-axis',
  yAxisId = 'y-axis',
  sizeAxisId = 'size-axis',
  sizeRange = defaultSizeRange,
  colorAxisId = 'color-axis',
  colorRange = defaultColorRange,
  strokeOptions,
  dotFill = 'transparent',
  dotRadius = 0.5,
  sort = true
}: IScatterProps): JSX.Element {
  const id = useId()
  const xAxis = useAxis('x', xAxisId)
  const yAxis = useAxis('y', yAxisId)
  const sizeAxis = useAxis('size', sizeAxisId)
  const colorAxis = useAxis('color', colorAxisId)

  const {
    snappedData,
    setLegendValue, focusedDataset,
    addScatter
  } = useScatterChart(xAxisId, yAxisId, sizeAxisId, colorAxisId)

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
        const size = dataSelector(d, sizeAxis?.dataKey)
        const color = dataSelector(d, colorAxis?.dataKey)

        const pt: IChartPoint = {
          x: {
            value: xAxis.dataType === 'number' ? x : i * 10,
            label: x.toString()
          },
          y: {
            value: yAxis.dataType === 'number' ? y : i * 10,
            label: y.toString()
          },
          payload: {
            value: d,
            label: 'payload'
          }
        }

        if (sizeAxis?.dataKey != null) {
          pt.size = {
            value: size,
            label: size.toString()
          }
        }

        if (colorAxis?.dataKey != null) {
          pt.color = {
            value: color,
            label: color.toString()
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

    const minSize = min(points.map((point) => point.size?.value)) ?? 0
    const maxSize = max(points.map((point) => point.size?.value)) ?? minSize
    const minColor = min(points.map((point) => point.color?.value)) ?? 0
    const maxColor = max(points.map((point) => point.color?.value)) ?? minColor

    const _scaledPoints = points.map((point) => {
      const pt: IChartPoint = {
        x: {
          ...point.x,
          value: point.x.value * xAxis.scale
        },
        y: {
          ...point.y,
          value: point.y.value * yAxis.scale
        }
      }

      if (point.size != null && sizeAxis != null) {
        pt.size = {
          ...point.size,
          value: map(point.size.value, minSize, maxSize, sizeRange.min, sizeRange.max)
        }
      }

      if (point.color != null && colorAxis != null) {
        pt.color = {
          ...point.color,
          label: mapColor(point.color.value, minColor, maxColor, colorRange.min, colorRange.max)
        }
      }

      return pt
    })

    setScaledPoints(_scaledPoints)
  }

  useTimeoutEffect(
    scalePoints,
    10,
    [points, xAxis?.scale, yAxis?.scale, sizeAxis?.scale, colorAxis?.scale]
  )

  useEffect(getPoints, [data, xAxis?.dataKey, yAxis?.dataKey])

  useEffect(() => {
    addScatter(id, {
      xAxisId,
      yAxisId,
      sizeAxisId,
      sizeRange,
      colorAxisId,
      colorRange,
      points
    })

    setLegendValue(id, { id, color: strokeOptions?.stroke, label: dataLabel })
  }, [points])

  return (
    <Svg.Group id='scatter'>
      <Svg.Group id='scatter-points'>
        {scaledPoints.map((point) => (
          <Svg.Point
            key={`Point:${point.x.label},${point.y.label}:${id}`}
            className={faded ? 'opacity-25' : ''}
            point={{ x: point.x.value, y: point.y.value }}
            radius={(!faded && snappedData?.x === point.x.value) ? (point.size?.value ?? dotRadius) + 1 : (point.size?.value ?? dotRadius)}
            fill={point.color?.label ?? dotFill}
            strokeOptions={{ ...strokeOptions, stroke: point.color?.label ?? strokeOptions?.stroke }}
          />
        ))}
      </Svg.Group>
    </Svg.Group>
  )
}

export default Scatter
