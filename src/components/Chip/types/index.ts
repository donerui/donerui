export interface IChipProps extends Omit<React.DetailedHTMLProps<React.HTMLAttributes<HTMLDivElement>, HTMLDivElement>, 'className'> {
  className?: string | ((props: IChipProps) => string)
  variant?: 'solid' | 'solid-light' | 'outline' | 'outline-fill'
  color?: 'primary' | 'secondary' | 'success' | 'danger' | 'warning' | 'info' | 'light' | 'dark'
  size?: 'sm' | 'md' | 'lg'
}
