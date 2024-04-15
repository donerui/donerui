import { useEffect, useState } from 'react'
import { twMerge } from 'tailwind-merge'
import { defaultPointStrokeOptions, type ISvgPointProps } from '..'
import { useSVG, useSvgPosition, type IStrokeOptions } from '../..'

export * from './constants'
export * from './types'

function Point ({
  point,
  className,
  strokeOptions = defaultPointStrokeOptions,
  fill = 'transparent',
  radius = 0.5,
  interactionRadius = 0
}: ISvgPointProps): JSX.Element {
  const { zoom } = useSVG()

  const position = useSvgPosition(point)
  const [hovered, setHovered] = useState(false)
  const [strokeOpts, setStrokeOpts] = useState<IStrokeOptions>({ ...defaultPointStrokeOptions, ...strokeOptions })

  const onMouseEnter = (): void => {
    setHovered(true)
  }

  const onMouseLeave = (): void => {
    setHovered(false)
  }

  useEffect(() => {
    setStrokeOpts({ ...defaultPointStrokeOptions, ...strokeOptions })
  }, [strokeOptions])

  return (
    <>
      {interactionRadius > 0 && (
        <circle
          cx={position.x}
          cy={position.y}
          r={interactionRadius}
          stroke='transparent'
          fill='transparent'
          strokeWidth={0}
          onMouseEnter={onMouseEnter}
          onMouseLeave={onMouseLeave}
        />
      )}

      <circle
        className={twMerge(
          'duration-150 pointer-events-none',
          className
        )}
        cx={position.x}
        cy={position.y}
        r={(hovered ? radius * 1.5 : radius) * zoom}
        stroke={strokeOpts.stroke}
        strokeWidth={(strokeOpts.strokeWidth ?? 0) * zoom}
        fill={fill}
      />
    </>
  )
}

export default Point
