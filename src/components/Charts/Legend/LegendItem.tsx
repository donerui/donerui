import { twMerge } from 'tailwind-merge'
import { type ILegendItemProps } from '..'

function LegendItem ({
  label,
  color,
  active = true,
  onMouseEnter,
  onMouseLeave,
  onClick
}: ILegendItemProps): JSX.Element {
  return (
    <div
      onMouseEnter={onMouseEnter}
      onMouseLeave={onMouseLeave}
      onClick={onClick}
    >
      <div
        className={twMerge(
          'flex items-center gap-2 duration-150',
          !active && 'opacity-25'
        )}
      >
        <div
          className='w-2 aspect-square rounded-full'
          style={{
            backgroundColor: color
          }}
        />

        <span
          className={twMerge(
            'text-xs font-extralight'
          )}
          style={{
            color
          }}
        >
          {label}
        </span>
      </div>
    </div>
  )
}

export default LegendItem
