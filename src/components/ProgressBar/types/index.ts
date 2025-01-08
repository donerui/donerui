export interface IProgressBarProps extends Omit<React.HTMLAttributes<HTMLDivElement>, 'className'> {
  className?: string | ((props: IProgressBarProps) => string)
  valueClassName?: string | ((props: IProgressBarProps) => string)
  value: number
  max?: number
  size?: 'xs' | 'sm' | 'md' | 'lg' | 'xl'
  color?: 'primary' | 'secondary' | 'success' | 'danger' | 'warning' | 'info'
  showValue?: boolean
  valuePosition?: 'top' | 'bottom' | 'inside' | 'left' | 'right'
  valueFormatter?: (value: number, max: number) => string
}
