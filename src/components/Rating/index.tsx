import { useEffect, useState } from 'react'
import { MdStar, MdStarBorder } from 'react-icons/md'
import { twMerge } from 'tailwind-merge'
import { v4 as uuidv4 } from 'uuid'

import Icon from '../Icon'
import { type IRatingProps } from './types'

function Rating ({
  value,
  defaultValue = 0,
  precision = 1,
  count = 5,
  onChange,
  className,
  disabled,
  activeIcons = MdStar,
  activeIconClassNames,
  inactiveIcons = MdStarBorder,
  inactiveIconClassNames,
  activateOnlySelected,
  renderLabel = () => 'Label',
  labelClassName
}: IRatingProps): JSX.Element {
  const [keys] = useState(Array.from({ length: count }).map(() => uuidv4()))

  const controlled = value !== undefined

  const [rating, setRating] = useState(controlled ? value : defaultValue)
  const [hoverRating, setHoverRating] = useState(0)

  const [label, setLabel] = useState(renderLabel(rating))

  function calculateRatingOnMouse (e: React.MouseEvent<HTMLElement, MouseEvent>): number {
    const percentage = (e.nativeEvent.offsetX / e.currentTarget.offsetWidth)
    const totalRating = percentage * count
    const totalRatingLimited = totalRating - (totalRating % precision) + precision
    const totalRatingClamped = Math.min(Math.max(totalRatingLimited, 0), count)
    const hoverRating = Math.round(totalRatingClamped * (1 / precision)) / (1 / precision)
    return hoverRating
  }

  useEffect(() => {
    if (controlled) {
      setRating(value)
    }
  }, [value, controlled])

  return (
    <div
      className={twMerge(
        'flex items-center gap-2',
        className
      )}
    >
      <span
        className={twMerge(
          'flex',
          (disabled === true) ? 'opacity-75 cursor-not-allowed' : 'cursor-pointer'
        )}
        onClick={(e) => {
          if (disabled === true) {
            return
          }

          const hoverRating = calculateRatingOnMouse(e)
          const newRating = hoverRating === rating ? 0 : hoverRating

          onChange?.(newRating)
          if (!controlled) {
            setRating(newRating)
          }
        }}
        onMouseMove={(e) => {
          if (disabled === true) {
            return
          }

          const hoverRating = calculateRatingOnMouse(e)
          setLabel(renderLabel(hoverRating))
          setHoverRating(hoverRating)
        }}
        onMouseLeave={() => {
          if (disabled === true) {
            return
          }

          setLabel(renderLabel(rating))
          setHoverRating(0)
        }}
      >
        {keys.map((key, index) => {
          const activeIcon = Array.isArray(activeIcons) ? activeIcons[index] : activeIcons
          const activeIconClassName = Array.isArray(activeIconClassNames) ? activeIconClassNames[index] : activeIconClassNames
          const inactiveIcon = Array.isArray(inactiveIcons) ? inactiveIcons[index] : inactiveIcons
          const inactiveIconClassName = Array.isArray(inactiveIconClassNames) ? inactiveIconClassNames[index] : inactiveIconClassNames

          const targetRating = hoverRating === 0 ? rating : hoverRating
          const diff = targetRating - index
          const partialRating = Math.max(Math.min(diff, 1), 0)
          const insideHoverRating = hoverRating !== 0 && diff > 0 && diff <= 1

          return (
            <span
              key={key}
              className={twMerge(
                'relative pointer-events-none',
                (disabled === true) && 'opacity-75 cursor-not-allowed'
              )}
            >
              <Icon
                icon={inactiveIcon}
                className={twMerge(
                  'w-6 h-6 text-gray-400 duration-200',
                  insideHoverRating && 'scale-150',
                  inactiveIconClassName,
                  (disabled === true) && 'cursor-not-allowed'
                )}
              />

              <span
                className={twMerge(
                  'absolute top-0 left-0 w-full h-full duration-200',
                  insideHoverRating && 'scale-150',
                  (activateOnlySelected === true) && diff > 1 && 'opacity-0'
                )}
              >
                <span
                  className="block h-full overflow-hidden duration-200"
                  style={{
                    width: `${(activateOnlySelected === true) && diff > 1 ? 0 : partialRating * 100}%`
                  }}
                >
                  <Icon
                    icon={activeIcon}
                    className={twMerge(
                      'w-6 h-6 text-yellow-400',
                      activeIconClassName
                    )}
                  />
                </span>
              </span>
            </span>
          )
        })}
      </span>

      {label !== undefined && (
        <span className={twMerge(
          'inline text-sm text-gray-500',
          labelClassName
        )}>
          {label}
        </span>
      )}
    </div>
  )
}

export default Rating
