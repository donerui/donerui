import { useEffect, useState } from 'react'
import { twMerge } from 'tailwind-merge'
import { curveGenerator, defaultLineStrokeOptions, type ISvgCurveProps } from '..'
import { useSVG, type IStrokeOptions } from '../..'

export * from './constants'
export * from './types'
export * from './utils'

function Curve ({
  points,
  className,
  strokeOptions = defaultLineStrokeOptions,
  curvature = 'catmullRom'
}: ISvgCurveProps): JSX.Element {
  const { zoom } = useSVG()

  const pathLength = 1

  const [strokeDashoffset, setStrokeDashoffset] = useState(pathLength)
  const [strokeOpts, setStrokeOpts] = useState<IStrokeOptions>({ ...defaultLineStrokeOptions, ...strokeOptions })
  const [d, setD] = useState('')

  useEffect(() => {
    if (d.length > 0) {
      setStrokeDashoffset(0)
    }
  }, [d])

  useEffect(() => {
    setStrokeOpts({ ...defaultLineStrokeOptions, ...strokeOptions })
  }, [strokeOptions])

  useEffect(() => {
    const newD = curveGenerator(points.map((point) => [point.x, point.y]), curvature) ?? ''

    setD(newD)
  }, [points])

  return (
    <path
      className={twMerge(
        'fill-none',
        className
      )}
      style={{
        transition: 'stroke-dashoffset 2000ms ease-in-out, stroke 150ms ease-out, stroke-width 150ms ease-out'
      }}
      d={d}
      stroke={strokeOpts.stroke}
      strokeWidth={(strokeOpts.strokeWidth ?? 0) * zoom}
      strokeDasharray={pathLength}
      strokeDashoffset={strokeDashoffset}
      pathLength={pathLength}
    />
  )
}

export default Curve
