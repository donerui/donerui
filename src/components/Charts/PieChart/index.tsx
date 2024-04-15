import React, { useCallback, useMemo, useState } from 'react'
import { twMerge } from 'tailwind-merge'
import { Chart, ChartSvg, ChartTooltip, Legend, PieChartContext, type IPieChartProps, type IPieContextValue, type PieContextValueMap } from '..'
import { type IRectangle } from '../../Svg'

export * from './constants'
export * from './contexts'
export * from './hooks'
export * from './types'

const nonSvgTypes = [Legend, ChartTooltip]

function PieChart ({
  className,
  children,
  padding = 8
}: IPieChartProps): JSX.Element {
  const childrenArray = useMemo(() => React.Children.toArray(children), [children])

  const legend = useMemo(() => childrenArray.find((child: any) => child.type === Legend), [childrenArray])
  const tooltip = useMemo(() => childrenArray.find((child: any) => child.type === ChartTooltip), [childrenArray])

  const svgChildren = useMemo(() => childrenArray.filter((child: any) => !nonSvgTypes.includes(child.type)), [childrenArray])

  const [pies, setPies] = useState<PieContextValueMap>({})
  const [pieBoundingBoxes, setPieBoundingBoxes] = useState<Record<string, IRectangle>>({})

  const addPie = useCallback((id: string, pie: IPieContextValue): void => {
    setPies((prev) => ({ ...prev, [id]: pie }))
  }, [])

  const updatePieBoundingBox = useCallback((id: string, boundingBox: IRectangle): void => {
    setPieBoundingBoxes((prev) => ({ ...prev, [id]: boundingBox }))
  }, [])

  const pieChartContextValue = useMemo(() => ({
    pies,
    addPie,
    pieBoundingBoxes,
    updatePieBoundingBox
  }), [pies, addPie, pieBoundingBoxes, updatePieBoundingBox])

  return (
    <Chart className={className}>
      <PieChartContext.Provider value={pieChartContextValue}>
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
            {svgChildren}
          </ChartSvg>

          {legend}
          {tooltip}
        </div>
      </PieChartContext.Provider>
    </Chart>
  )
}

export default PieChart
