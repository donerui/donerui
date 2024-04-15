import { clamp, max, min, orderBy } from 'lodash'
import { useEffect, useState } from 'react'
import { findClosestNumberSorted, useChart } from '..'
import { Svg, useSVG } from '../../Svg'
import { type IRulerProps } from './types'

export * from './types'

function Ruler ({
  className,
  limits = 'auto',
  snap = 'data',
  hideX = false,
  hideY = false
}: IRulerProps): JSX.Element {
  const { panning } = useSVG()
  const { mouseCoordinates, axes, snappedData, snapData } = useChart()

  const xAxes = axes?.x
  const yAxes = axes?.y

  const [xAxesTicks, setXAxesTicks] = useState<number[]>([])
  const [yAxesTicks, setYAxesTicks] = useState<number[]>([])

  const [minX, setMinX] = useState<number>(0)
  const [maxX, setMaxX] = useState<number>(0)
  const [minY, setMinY] = useState<number>(0)
  const [maxY, setMaxY] = useState<number>(0)

  function setLimits (): void {
    if (limits === 'auto') {
      setMinX(min(xAxesTicks) ?? 0)
      setMaxX(max(xAxesTicks) ?? 100)
      setMinY(min(yAxesTicks) ?? 0)
      setMaxY(max(yAxesTicks) ?? 100)
    } else {
      setMinX(limits.x.min)
      setMaxX(limits.x.max)
      setMinY(limits.y.min)
      setMaxY(limits.y.max)
    }
  }

  function snapMouse (): void {
    if (mouseCoordinates == null || panning) {
      snapData()
      return
    }

    let x = mouseCoordinates.inSvgSpace.x

    if (snap === 'data') {
      const closestXTick = findClosestNumberSorted(xAxesTicks, x)
      x = closestXTick
    } else if (snap != null) {
      if (snap.x != null) x = Math.round(x / snap.x) * snap.x
    }

    snapData({ ...snappedData, x })
  }

  function getXAxesTicks (): void {
    if (xAxes == null) return

    const values = Object.values(xAxes)
    const scaledValues = values.flatMap(axis => {
      return axis.ticks?.map((tick, i) => {
        const scale = axis.scale ?? 1
        return tick.value * scale
      }) ?? []
    })

    const allXValues = orderBy(scaledValues)
    setXAxesTicks(allXValues)
  }

  function getYAxesTicks (): void {
    if (yAxes == null) return

    const values = Object.values(yAxes)
    const scaledValues = values.flatMap(axis => {
      return axis.ticks?.map(tick => {
        const scale = axis.scale ?? 1
        return tick.value * scale
      }) ?? []
    })

    const allYValues = orderBy(scaledValues)
    setYAxesTicks(allYValues)
  }

  useEffect(setLimits, [limits, xAxesTicks, yAxesTicks])
  useEffect(snapMouse, [mouseCoordinates?.inSvgSpace.x, panning, xAxesTicks, snap])
  useEffect(getXAxesTicks, [xAxes])
  useEffect(getYAxesTicks, [yAxes])

  return (
    <Svg.Group id="ruler" className={className}>
      {!hideY && snappedData?.y != null && (
        <Svg.Line
          strokeOptions={{ strokeDasharray: '0.5' }}
          points={[{ x: minX, y: clamp(snappedData?.y, minY, maxY) }, { x: maxX, y: clamp(snappedData?.y, minY, maxY) }]}
        />
      )}

      {!hideX && snappedData?.x != null && (
        <Svg.Line
          strokeOptions={{ strokeDasharray: '0.5' }}
          points={[{ x: clamp(snappedData?.x, minX, maxX), y: minY }, { x: clamp(snappedData?.x, minX, maxX), y: maxY }]}
        />
      )}
    </Svg.Group>
  )
}

export default Ruler
