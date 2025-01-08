import * as React from 'react'
import { twMerge } from 'tailwind-merge'
import Button from '../Button'
import { type IButtonGroupProps } from './types'

export const ButtonGroup: React.FC<IButtonGroupProps> = ({
  className,
  buttons
}) => {
  return (
    <div className={twMerge('w-fit rounded-lg shadow-sm', className)}>
      {buttons.map((buttonProps, index) => (
        <Button
          key={buttonProps.key}
          {...buttonProps}
          className={twMerge(
            index === 0 ? 'rounded-l-lg rounded-r-none' : index === buttons.length - 1 ? 'rounded-r-lg rounded-l-none' : 'rounded-none',
            typeof buttonProps.className === 'function'
              ? buttonProps.className(buttonProps)
              : buttonProps.className
          )}
        />
      ))}
    </div>
  )
}

export default ButtonGroup
