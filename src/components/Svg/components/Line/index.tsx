import { useEffect, useState } from 'react'
import { twMerge } from 'tailwind-merge'
import { defaultLineStrokeOptions, type ISvgLineProps } from '..'
import { useSVG, type IStrokeOptions } from '../..'

export * from './constants'
export * from './types'

function Line ({
  points,
  className,
  strokeOptions = defaultLineStrokeOptions
}: ISvgLineProps): JSX.Element {
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
    <polyline
      className={twMerge(
        'fill-none',
        className
      )}
      style={{
        transition: 'stroke-dashoffset 2000ms ease-in-out, stroke 150ms ease-out, stroke-width 150ms ease-out'
      }}
      points={points.map(point => `${point.x},${point.y}`).join(' ')}
      fill='none'
      stroke={strokeOpts.stroke}
      strokeWidth={(strokeOpts.strokeWidth ?? 0) * zoom}
      strokeDasharray={strokeOpts.strokeDasharray ?? pathLength}
      strokeDashoffset={strokeDashoffset}
      pathLength={(strokeOpts.strokeDasharray != null) ? undefined : pathLength}
    />
  )
}

export default Line
