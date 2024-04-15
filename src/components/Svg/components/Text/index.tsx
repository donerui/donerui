import { Fragment } from 'react'
import { twMerge } from 'tailwind-merge'
import { defaultPositionCentered, type ISvgTextProps } from '..'
import { useSVG, useSvgPosition } from '../..'

export * from './types'

function Text ({
  point = defaultPositionCentered,
  text = '',
  color = 'black',
  textAnchor = 'center',
  dominantBaseline = 'middle',
  fontSize = 3,
  fontWeight = 'thin',
  format = (text: string) => text,
  rotate = 0,
  className
}: ISvgTextProps): JSX.Element {
  const { panning, flipY, zoom } = useSVG()

  const position = useSvgPosition(point)

  return text.length > 0
    ? (
        (
        <text
          className={twMerge(
            panning && 'select-none',
            className
          )}
          x={position.x}
          y={flipY ? -position.y : position.y}
          fill={color}
          fontSize={fontSize * Math.min(zoom, 1)}
          fontWeight={fontWeight}
          textAnchor={textAnchor}
          dominantBaseline={dominantBaseline}
          transform={`rotate(${rotate} ${position.x} ${position.y}) scale(1 ${flipY ? -1 : 1})`}
        >
          {format(text)}
        </text>
        )
      )
    : (<Fragment />)
}

export default Text
