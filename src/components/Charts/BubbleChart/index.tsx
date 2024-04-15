import React, { useCallback, useMemo, useState } from 'react'
import { twMerge } from 'tailwind-merge'
import { Axis, BubbleChartContext, Chart, ChartSvg, ChartTooltip, Legend, type BubbleContextValueMap, type IBubbleChartProps, type IBubbleContextValue } from '..'

export * from './constants'
export * from './contexts'
export * from './hooks'
export * from './types'

const nonSvgTypes = [Legend, ChartTooltip]

function BubbleChart ({
  className,
  children,
  padding = 8
}: IBubbleChartProps): JSX.Element {
  const childrenArray = useMemo(() => React.Children.toArray(children), [children])

  const hasXAxis = useMemo(() => childrenArray.some((child: any) => child.type === Axis && child.props.dimension === 'x'), [childrenArray])

  const legend = useMemo(() => childrenArray.find((child: any) => child.type === Legend), [childrenArray])
  const tooltip = useMemo(() => childrenArray.find((child: any) => child.type === ChartTooltip), [childrenArray])

  const svgChildren = useMemo(() => childrenArray.filter((child: any) => !nonSvgTypes.includes(child.type)), [childrenArray])

  const [bubbles, setBubbles] = useState<BubbleContextValueMap>({})

  const addBubble = useCallback((id: string, bubble: IBubbleContextValue): void => {
    setBubbles((prev) => ({ ...prev, [id]: bubble }))
  }, [])

  const bubbleChartContextValue = useMemo(() => ({
    bubbles,
    addBubble
  }), [bubbles, addBubble])

  return (
    <Chart className={className}>
      <BubbleChartContext.Provider value={bubbleChartContextValue}>
        <div
          className={twMerge(
            'flex flex-col justify-center items-center gap-2 w-full h-full',
            className
          )}
        >
          <ChartSvg
            className={twMerge(
              'w-full h-full duration-1000'
            )}
            viewBoxPadding={padding}
            pan
            zoom
            flipY
          >
            {!hasXAxis && (<Axis dimension='x' id='x-axis' hidden />)}

            {svgChildren}
          </ChartSvg>

          {legend}
          {tooltip}
        </div>
      </BubbleChartContext.Provider>
    </Chart>
  )
}

export default BubbleChart
