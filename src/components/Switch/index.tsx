import { useEffect, useState } from 'react'
import { twMerge } from 'tailwind-merge'
import { type ISwitchProps } from './types'

function Switch ({
  className,
  switchClassName,
  checked,
  defaultChecked,
  disabled,
  renderLabel = () => '',
  labelClassName,
  labelPosition = 'right',
  onChange
}: ISwitchProps): JSX.Element {
  const controlled = checked !== undefined
  const [isChecked, setIsChecked] = useState<boolean | undefined>(controlled ? checked : defaultChecked)

  const [label, setLabel] = useState(renderLabel(isChecked))

  useEffect(() => {
    setLabel(renderLabel(isChecked))
  }, [isChecked, renderLabel])

  useEffect(() => {
    if (controlled) {
      setIsChecked(checked)
    }
  }, [checked, controlled])

  return (
    <div
      className={twMerge(
        'flex items-center gap-2',
        className
      )}
    >
      {label !== undefined && labelPosition === 'left' && (
        <div
          className={twMerge(
            'text-gray-700 font-medium',
            labelClassName
          )}
        >
          {label}
        </div>
      )}

      <label
        className={twMerge(
          'relative cursor-pointer',
          disabled === true && 'cursor-not-allowed'
        )}
      >
        <input
          type="checkbox"
          className="sr-only"
          checked={isChecked}
          disabled={disabled}
          onChange={(event) => {
            const checked = event.target.checked
            onChange?.(checked, event)

            if (!controlled) {
              setIsChecked(checked)
            }
          }}
        />

        <div className={twMerge(
          'w-14 h-8 flex items-center rounded-full duration-300 p-1',
          switchClassName?.any,
          isChecked === undefined && 'bg-gray-300 hover:bg-gray-400',
          isChecked === false && 'bg-gray-400 hover:bg-gray-500',
          isChecked === true && 'bg-green-400 hover:bg-green-500',
          isChecked === undefined && switchClassName?.indeterminate,
          isChecked === false && switchClassName?.unchecked,
          isChecked === true && switchClassName?.checked,
          (disabled === true) && 'opacity-50 pointer-events-none',
          (disabled === true) && switchClassName?.disabled
        )}>
          <span
            className={twMerge(
              'duration-200',
              isChecked === undefined && 'flex-[0.5]',
              isChecked === false && 'flex-none',
              isChecked === true && 'flex-1'
            )}
          />

          <span className={twMerge(
            'h-full aspect-square rounded-full bg-white shadow'
          )} />
        </div>
      </label>

      {label !== undefined && labelPosition === 'right' && (
        <div
          className={twMerge(
            'text-gray-700 font-medium',
            labelClassName
          )}
        >
          {label}
        </div>
      )}
    </div>
  )
}

export default Switch
