import React, { useCallback, useMemo, useState } from 'react'
import { twMerge } from 'tailwind-merge'
import { Axis, Chart, ChartSvg, ChartTooltip, Legend, ScatterChartContext, type IScatterChartProps, type IScatterContextValue, type ScatterContextValueMap } from '..'

export * from './constants'
export * from './contexts'
export * from './hooks'
export * from './types'

const nonSvgTypes = [Legend, ChartTooltip]

function ScatterChart ({
  className,
  children,
  padding = 8
}: IScatterChartProps): JSX.Element {
  const childrenArray = useMemo(() => React.Children.toArray(children), [children])

  const hasXAxis = useMemo(() => childrenArray.some((child: any) => child.type === Axis && child.props.dimension === 'x'), [childrenArray])
  const hasYAxis = useMemo(() => childrenArray.some((child: any) => child.type === Axis && child.props.dimension === 'y'), [childrenArray])

  const legend = useMemo(() => childrenArray.find((child: any) => child.type === Legend), [childrenArray])
  const tooltip = useMemo(() => childrenArray.find((child: any) => child.type === ChartTooltip), [childrenArray])

  const svgChildren = useMemo(() => childrenArray.filter((child: any) => !nonSvgTypes.includes(child.type)), [childrenArray])

  const [scatters, setScatters] = useState<ScatterContextValueMap>({})

  const addScatter = useCallback((id: string, scatter: IScatterContextValue): void => {
    setScatters((prev) => ({ ...prev, [id]: scatter }))
  }, [])

  const scatterChartContextValue = useMemo(() => ({
    scatters,
    addScatter
  }), [scatters, addScatter])

  return (
    <Chart className={className}>
      <ScatterChartContext.Provider value={scatterChartContextValue}>
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
      </ScatterChartContext.Provider>
    </Chart>
  )
}

export default ScatterChart
