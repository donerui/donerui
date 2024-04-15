import { useEffect, useState } from 'react'
import { type ICartesianGridProps } from '..'
import { Svg, useSVG, type IRectangle } from '../../Svg'

export * from './types'

function CartesianGrid ({
  className,
  limits = 'auto',
  spacingX = 1,
  spacingY = 1,
  strokeWidth = 0.1
}: ICartesianGridProps): JSX.Element {
  const { viewBox, zoom } = useSVG()

  const [bounds, setBounds] = useState<IRectangle>(viewBox)

  const [multiplier, setMultiplier] = useState<number>(10)
  const [subMultiplier, setSubMultiplier] = useState<number>(1)

  function getMultipliers (): void {
    const mult = Math.pow(10, Math.ceil(Math.log10(zoom) + 1))
    const subMult = mult / 10

    setMultiplier(mult)
    setSubMultiplier(subMult)
  }

  function getBounds (): void {
    if (limits === 'auto') {
      setBounds(viewBox)
    } else {
      const { x, y, width, height } = viewBox

      const x1 = x < limits.x.min ? limits.x.min : x
      const y1 = y < limits.y.min ? limits.y.min : y

      const x2 = width + x1
      const y2 = height + y1

      const width2 = x2 > limits.x.max ? limits.x.max - x1 : x2
      const height2 = y2 > limits.y.max ? limits.y.max - y1 : y2

      setBounds({ x: x1, y: y1, width: Math.max(width2, 0), height: Math.max(height2, 0) })
    }
  }

  useEffect(getBounds, [viewBox, limits])
  useEffect(getMultipliers, [zoom])

  return (
    <Svg.Group id="cartesian-grid">
      <defs>
        <pattern id="grid" width={spacingX * multiplier} height={spacingY * multiplier} patternUnits="userSpaceOnUse">
          <path
            d={`M ${spacingX * multiplier} 0 L 0 0 0 ${spacingY * multiplier}`}
            fill="none"
            stroke="gray"
            strokeWidth={strokeWidth * zoom}
            strokeDasharray={0.1 * multiplier}
            strokeDashoffset={0.05 * multiplier}
          />
        </pattern>

        <pattern id="smallgrid" width={spacingX * subMultiplier} height={spacingY * subMultiplier} patternUnits="userSpaceOnUse">
          <path
            d={`M ${spacingX * subMultiplier} 0 L 0 0 0 ${spacingY * subMultiplier}`}
            fill="none"
            stroke="gray"
            strokeWidth={strokeWidth * 0.5 * zoom}
            strokeDasharray={0.1 * subMultiplier}
            strokeDashoffset={0.05 * subMultiplier}
          />
        </pattern>
      </defs>

      <rect
        x={bounds.x}
        y={bounds.y}
        width={bounds.width}
        height={bounds.height}
        fill="url(#grid)"
      />

      <rect
        x={bounds.x}
        y={bounds.y}
        width={bounds.width}
        height={bounds.height}
        fill="url(#smallgrid)"
      />
    </Svg.Group>
  )
}

export default CartesianGrid
