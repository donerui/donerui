import { Fragment, useEffect, useState } from 'react'
import { defaultTickLimits, segmentateAxis, useAxis, useChart, type IAxisProps, type ValueLabel } from '..'
import { Svg, defaultLineStrokeOptions, useSVG, type Alignment } from '../../Svg'

export * from './constants'
export * from './hooks'
export * from './types'
export * from './utils'

function Axis ({
  className,
  id = '',
  dimension = '',
  dataKey = '',
  dataType = 'string',
  strokeOptions = defaultLineStrokeOptions,
  tickLabelOptions,
  tickCount = 10,
  tickLimits = defaultTickLimits,
  hidden = false
}: IAxisProps): JSX.Element {
  const axisX = 0
  const axisY = 0

  const renderable = dimension === 'x' || dimension === 'y'
  const { viewBox } = useSVG() // Renderable axes only

  const { setAxis, snappedData } = useChart()
  const axis = useAxis(dimension, id)

  const [segments, setSegments] = useState<ValueLabel[]>([])
  const [segmentLimits, setSegmentLimits] = useState<{ min: number, max: number }>({ min: 0, max: 100 })

  const [labelDirection, setLabelDirection] = useState<Alignment>('center')

  useEffect(() => {
    switch (dimension) {
      case 'x':
        setLabelDirection(tickLabelOptions?.dominantBaseline === 'hanging' ? 'top' : 'down')
        break
      case 'y':
        setLabelDirection(tickLabelOptions?.textAnchor === 'end' ? 'right' : 'left')
        break
      default:
        break
    }
  }, [dimension, tickLabelOptions])

  useEffect(() => {
    if (!renderable) return
    if (axis == null) return

    let newSegments: ValueLabel[] = []

    if (dataType === 'string') {
      const interval = 10 * axis.scale
      newSegments = axis.ticks.map((t, i) => ({ value: i * interval, label: t.label }))
    } else {
      newSegments = segmentateAxis(axis.scale, axis.ticks, tickCount, tickLimits)
    }

    setSegments(newSegments)
  }, [tickCount, tickLimits, axis?.scale, axis?.ticks])

  useEffect(() => {
    if (!renderable) return

    const min = segments[0]?.value ?? 0
    const max = segments[segments.length - 1]?.value ?? 100

    setSegmentLimits({ min, max })
  }, [segments])

  useEffect(() => {
    setAxis({ id, dimension, dataKey, dataType })
  }, [id, dimension, dataKey, dataType, setAxis])

  return hidden
    ? (
      <Fragment />
      )
    : (
      <Fragment>
        {dimension === 'x' && (
          <Svg.Group
            className={className}
          >
            <Svg.Line
              points={[{ x: Math.max(viewBox.x, segmentLimits.min), y: axisY }, { x: Math.min(viewBox.x + viewBox.width, segmentLimits.max), y: axisY }]}
              strokeOptions={strokeOptions}
            />

            {segments.map((segX, i) => (
              <Fragment
                key={i}
              >
                <Svg.Line
                  key={i}
                  points={[{ x: segX.value, y: axisY }, { x: segX.value, y: axisY + (labelDirection === 'top' ? -1 : 1) }]}
                  strokeOptions={strokeOptions}
                />

                <Svg.Text
                  point={{ x: segX.value, y: axisY + (labelDirection === 'top' ? -2 : 2) }}
                  text={segX.label}
                  {...tickLabelOptions}
                />
              </Fragment>
            ))}

            {(snappedData?.x != null && snappedData?.data?.x != null) && (
              <Fragment>
                <Svg.Line
                  points={[{ x: snappedData.x, y: axisY }, { x: snappedData?.x, y: axisY + (labelDirection === 'top' ? -1 : 1) }]}
                  strokeOptions={strokeOptions}
                />
                <Svg.Text
                  point={{ x: snappedData.x, y: axisY + (labelDirection === 'top' ? -4 : 4) }}
                  text={snappedData?.data.x}
                  {...tickLabelOptions}
                />
              </Fragment>
            )}
          </Svg.Group>
        )}

        {dimension === 'y' && (
          <Svg.Group
            className={className}
          >
            <Svg.Line
              points={[{ x: axisX, y: Math.max(viewBox.y, segmentLimits.min) }, { x: axisX, y: Math.min(viewBox.y + viewBox.height, segmentLimits.max) }]}
              strokeOptions={strokeOptions}
            />

            {segments.map((segY, i) => (
              <Fragment
                key={i}
              >
                <Svg.Line
                  key={i}
                  points={[{ x: axisX, y: segY.value }, { x: axisX + (labelDirection === 'right' ? -1 : 1), y: segY.value }]}
                  strokeOptions={strokeOptions}
                />

                <Svg.Text
                  point={{ x: axisX + (labelDirection === 'right' ? -2 : 2), y: segY.value }}
                  text={segY.label}
                  {...tickLabelOptions}
                />
              </Fragment>
            ))}

            {(snappedData?.y != null && snappedData?.data?.y != null) && (
              <Fragment>
                <Svg.Line
                  points={[{ x: axisX, y: snappedData.y }, { x: axisX + (labelDirection === 'right' ? -1 : 1), y: snappedData?.y }]}
                  strokeOptions={strokeOptions}
                />
                <Svg.Text
                  point={{ x: axisX + (labelDirection === 'right' ? -1 : 1), y: snappedData.y }}
                  text={snappedData?.data.y}
                  {...tickLabelOptions}
                />
              </Fragment>
            )}
          </Svg.Group>
        )}
      </Fragment>
      )

  // return hidden
  //   ? (
  //     <Fragment />
  //     )
  //   : (
  //     <Svg.Group
  //       className={className}
  //     >
  //       <Svg.Line
  //         points={[{ x: Math.max(x, tickLimits.min), y: axisY }, { x: Math.min(x + width, tickLimits.max), y: axisY }]}
  //         strokeOptions={strokeOptions}
  //       />

  //       {segments.map((segX, i) => (
  //         <Fragment
  //           key={i}
  //         >
  //           <Svg.Line
  //             key={i}
  //             points={[{ x: segX.value, y: axisY }, { x: segX.value, y: axisY + (labelDirection === 'top' ? -1 : 1) }]}
  //             strokeOptions={strokeOptions}
  //           />

  //           <Svg.Text
  //             point={{ x: segX.value, y: axisY + (labelDirection === 'top' ? -2 : 2) }}
  //             text={segX.label}
  //             {...tickLabelOptions}
  //           />
  //         </Fragment>
  //       ))}

  //       {highlightedX != null && (
  //         <Fragment>
  //           <Svg.Line
  //             points={[{ x: highlightedX.value, y: axisY }, { x: highlightedX.value, y: axisY + (labelDirection === 'top' ? -1 : 1) }]}
  //             strokeOptions={strokeOptions}
  //           />
  //           <Svg.Text
  //             point={{ x: highlightedX.value, y: axisY + (labelDirection === 'top' ? -4 : 4) }}
  //             text={highlightedX.label}
  //             {...tickLabelOptions}
  //           />
  //         </Fragment>
  //       )}
  //     </Svg.Group>
  //     )
}

export default Axis
