import { useEffect, useState } from 'react'
import { defaultPosition, useSVG, type IPoint } from '..'
import { multiplyWithPercentage } from '../../../utils'

export function useSvgPosition (point: IPoint<number | string>): IPoint<number> {
  const { viewBox } = useSVG()
  const [state, setState] = useState<IPoint<number>>(defaultPosition)

  function calculatePosition (): void {
    if (point.x == null || point.y == null) return

    const x = typeof point.x === 'number'
      ? point.x
      : multiplyWithPercentage(viewBox.width + viewBox.x * 2, point.x)

    const y = typeof point.y === 'number'
      ? point.y
      : multiplyWithPercentage(viewBox.height + viewBox.y * 2, point.y)

    setState({ x, y })
  }

  useEffect(calculatePosition, [viewBox.x, viewBox.y, viewBox.height, viewBox.width, point.x, point.y])

  return state
}
