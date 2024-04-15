import { type ISvgGroupProps } from '..'

export * from './types'

function Group ({
  children,
  id,
  className,
  transform
}: ISvgGroupProps): JSX.Element {
  return (
    <g
      className={className}
      id={id}
      transform={transform}
    >
      {children}
    </g>
  )
}

export default Group
