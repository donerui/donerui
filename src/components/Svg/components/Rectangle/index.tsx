import { useEffect, useState } from 'react'
import { defaultLineStrokeOptions, type ISvgRectangleProps } from '..'
import { useSVG, type IStrokeOptions } from '../..'

export * from './types'

function Rectangle ({
  rect,
  className,
  strokeOptions = defaultLineStrokeOptions,
  fill = 'none',
  cornerRadius = 0
}: ISvgRectangleProps): JSX.Element {
  const { zoom } = useSVG()

  const pathLength = 1
  const [strokeDashoffset, setStrokeDashoffset] = useState(pathLength)

  const [strokeOpts, setStrokeOpts] = useState<IStrokeOptions>({ ...defaultLineStrokeOptions, ...strokeOptions })

  useEffect(() => {
    setStrokeDashoffset(0)
  }, [])

  useEffect(() => {
    setStrokeOpts({ ...defaultLineStrokeOptions, ...strokeOptions })
  }, [strokeOptions])

  return (
    <rect
      className={className}
      x={rect.x}
      y={rect.y}
      width={rect.width}
      height={rect.height}
      fill={fill}
      rx={cornerRadius * zoom}
      stroke={strokeOpts.stroke}
      strokeWidth={(strokeOpts.strokeWidth ?? 0) * zoom}
      strokeDasharray={strokeOpts.strokeDasharray ?? pathLength}
      strokeDashoffset={strokeDashoffset}
      pathLength={(strokeOpts.strokeDasharray != null) ? undefined : pathLength}
    />
  )
}

export default Rectangle
