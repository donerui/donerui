import { Fragment, useEffect, useState } from 'react'
import { degreesToRadians, getTextAnchor, type ISvgSectorLabelProps } from '.'
import { SvgLine, SvgText } from '..'
import { type IPoint } from '../..'

function SectorLabel (props: ISvgSectorLabelProps): JSX.Element {
  const { point, angle, radius, color } = props
  const lineLength = props.lineLength ?? 2
  const lineGap = props.lineGap ?? 1

  const [directionVector, setDirectionVector] = useState<IPoint<number>>({ x: 0, y: 0 })

  const [linePositions, setLinePositions] = useState<Array<IPoint<number>>>([])
  const [position, setPosition] = useState<IPoint<number>>({ x: 0, y: 0 })

  const [textAnchor, setTextAnchor] = useState<'start' | 'middle' | 'end'>('middle')

  useEffect(() => {
    const _angle = degreesToRadians(angle ?? 0)

    const x = Math.cos(_angle)
    const y = Math.sin(_angle)

    setDirectionVector({ x, y })
    setTextAnchor(getTextAnchor(angle ?? 0))
  }, [angle])

  useEffect(() => {
    const _radius = radius ?? 0

    const startX = point.x + (directionVector.x * _radius)
    const startY = point.y + (directionVector.y * _radius)

    const endX = startX + (directionVector.x * lineLength)
    const endY = startY + (directionVector.y * lineLength)

    const x = endX + (directionVector.x * lineGap)
    const y = endY + (directionVector.y * lineGap)

    setLinePositions([{ x: startX, y: startY }, { x: endX, y: endY }])
    setPosition({ x, y })
  }, [directionVector, point, radius])

  return (
    <Fragment>
      <SvgLine
        points={linePositions}
        strokeOptions={{ stroke: color }}
      />
      <SvgText
        {...props}
        point={position}
        textAnchor={textAnchor}
      />
    </Fragment>
  )
}

export default SectorLabel
