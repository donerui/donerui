import { twMerge } from 'tailwind-merge'
import { useChart } from '..'
import LegendItem from './LegendItem'
import { type ILegendProps } from './types'

export * from './types'

function Legend ({
  className,
  ItemComponent = LegendItem
}: ILegendProps): JSX.Element {
  const { legendValues, hoverLegend, clickLegend, focusedDataset } = useChart()

  return (
    <div
      className={twMerge(
        'flex gap-4',
        className
      )}
    >
      {Object.entries(legendValues).map(([key, value]) => {
        const { label, color } = value
        if (label == null || color == null) return null

        const active = focusedDataset == null || focusedDataset === key

        return (
          <ItemComponent
            key={key}
            label={label}
            color={color}
            active={active}
            onMouseEnter={() => { hoverLegend(key) }}
            onMouseLeave={() => { hoverLegend() }}
            onClick={() => { clickLegend(key) }}
          />
        )
      })}
    </div>
  )
}

export default Legend
