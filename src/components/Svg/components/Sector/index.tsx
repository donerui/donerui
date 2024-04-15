import React, { useEffect, useState } from 'react'
import { twMerge } from 'tailwind-merge'
import { Svg, createSectorPath, defaultLineStrokeOptions, defaultPosition, defaultPositionCentered, type ISvgSectorProps } from '..'
import { useSVG, useSvgPosition, type IStrokeOptions } from '../..'
import SectorLabel from './SectorLabel'

export * from './types'
export * from './utils'

function Sector ({
  className,
  point = defaultPositionCentered,
  fill = 'none',
  strokeOptions = defaultLineStrokeOptions,
  innerRadius = 0,
  outerRadius = 5,
  startAngle = 0,
  endAngle = 360,
  anglePadding = 0,
  label,
  showLabel = 'hover',
  LabelComponent = SectorLabel,
  onMouseEnter,
  onMouseLeave,
  onClick
}: ISvgSectorProps): JSX.Element {
  const { zoom } = useSVG()

  const a1 = anglePadding
  const a2 = (endAngle - startAngle) - anglePadding

  const position = useSvgPosition(point)
  const [strokeOpts, setStrokeOpts] = useState<IStrokeOptions>({ ...defaultLineStrokeOptions, ...strokeOptions })

  const [animationEnded, setAnimationEnded] = useState<boolean>(false)
  const [showingLabel, setShowingLabel] = useState<boolean>(showLabel === true)

  function onMouseEntered (e: React.MouseEvent<SVGPathElement, MouseEvent>): void {
    onMouseEnter?.(e)

    if (showLabel === 'hover') {
      setShowingLabel(true)
    }
  }

  function onMouseLeft (e: React.MouseEvent<SVGPathElement, MouseEvent>): void {
    onMouseLeave?.(e)

    if (showLabel === 'hover') {
      setShowingLabel(false)
    }
  }

  function onClicked (e: React.MouseEvent<SVGPathElement, MouseEvent>): void {
    onClick?.(e)

    if (showLabel === 'click') {
      setShowingLabel(!showingLabel)
    }
  }

  function onAnimationStarted (): void {
    setAnimationEnded(false)
    setTimeout(() => {
      onAnimationEnded()
    }, 2000)
  }

  function onAnimationEnded (): void {
    setAnimationEnded(true)
  }

  useEffect(() => {
    onAnimationStarted()
  }, [])

  useEffect(() => {
    setStrokeOpts({ ...defaultLineStrokeOptions, ...strokeOptions })
  }, [strokeOptions])

  return (
    <Svg.Group
      id='sector'
      transform={`translate(${position.x} ${position.y})`}
    >
      <path
        className={twMerge(
          'duration-150',
          className
        )}
        fill={fill}
        stroke={strokeOpts.stroke}
        strokeWidth={(strokeOpts.strokeWidth ?? 0) * zoom}
        onMouseEnter={onMouseEntered}
        onMouseLeave={onMouseLeft}
        onClick={onClicked}
      >
        <animate
          attributeName='d'
          from={createSectorPath(0, 0, a1, a2)}
          to={createSectorPath(innerRadius, outerRadius, a1, a2)}
          dur='2s'
          fill='freeze'
          calcMode='spline'
          keySplines='0.5 0 0 1'
          keyTimes='0; 1'
        />

        <animateTransform
          additive='sum'
          attributeName='transform'
          type='rotate'
          from={'0'}
          to={`${startAngle}`}
          dur='2s'
          fill='freeze'
          calcMode='spline'
          keySplines='0.5 0 0 1'
          keyTimes='0; 1'
        />
      </path>

      <Svg.Group
        id='sector-label'
        className={twMerge(
          'duration-150',
          (animationEnded && showingLabel) ? 'opacity-100' : 'opacity-0'
        )}
      >
        <LabelComponent
          point={defaultPosition}
          angle={(endAngle + startAngle) / 2}
          radius={outerRadius}
          text={label}
          color={fill}
          fontSize={1.5}
        />
      </Svg.Group>
    </Svg.Group>
  )
}

export default Sector
