import React, { useCallback, useMemo, useState } from 'react'
import { twMerge } from 'tailwind-merge'
import { Axis, Chart, ChartSvg, ChartTooltip, Legend, LineChartContext, type ILineChartProps, type ILineContextValue, type LineContextValueMap } from '..'
import { type IRectangle } from '../../Svg'

export * from './constants'
export * from './contexts'
export * from './hooks'
export * from './types'

const nonSvgTypes = [Legend, ChartTooltip]

function LineChart ({
  className,
  children,
  padding = 8
}: ILineChartProps): JSX.Element {
  const childrenArray = useMemo(() => React.Children.toArray(children), [children])

  const hasXAxis = useMemo(() => childrenArray.some((child: any) => child.type === Axis && child.props.dimension === 'x'), [childrenArray])
  const hasYAxis = useMemo(() => childrenArray.some((child: any) => child.type === Axis && child.props.dimension === 'y'), [childrenArray])

  const legend = useMemo(() => childrenArray.find((child: any) => child.type === Legend), [childrenArray])
  const tooltip = useMemo(() => childrenArray.find((child: any) => child.type === ChartTooltip), [childrenArray])

  const svgChildren = useMemo(() => childrenArray.filter((child: any) => !nonSvgTypes.includes(child.type)), [childrenArray])

  const [lines, setLines] = useState<LineContextValueMap>({})
  const [lineBoundingBoxes, setLineBoundingBoxes] = useState<Record<string, IRectangle>>({})

  const addLine = useCallback((id: string, line: ILineContextValue): void => {
    setLines((prev) => ({ ...prev, [id]: line }))
  }, [])

  const updateLineBoundingBox = useCallback((id: string, boundingBox: IRectangle): void => {
    setLineBoundingBoxes((prev) => ({ ...prev, [id]: boundingBox }))
  }, [])

  const lineChartContextValue = useMemo(() => ({
    lines,
    addLine,
    lineBoundingBoxes,
    updateLineBoundingBox
  }), [lines, addLine, lineBoundingBoxes, updateLineBoundingBox])

  return (
    <Chart className={className}>
      <LineChartContext.Provider value={lineChartContextValue}>
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
            {!hasYAxis && (<Axis dimension='y' id='y-axis' hidden dataType='number' />)}

            {svgChildren}
          </ChartSvg>

          {legend}
          {tooltip}
        </div>
      </LineChartContext.Provider>
    </Chart>
  )
}

export default LineChart
