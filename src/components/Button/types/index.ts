export interface IButtonProps extends Omit<React.DetailedHTMLProps<React.ButtonHTMLAttributes<HTMLButtonElement>, HTMLButtonElement>, 'className'> {
  className?: string | ((props: IButtonProps) => string)
  shape?: 'box' | 'rounded' | 'circle'
  size?: 'xs' | 'sm' | 'md' | 'lg' | 'xl'
  color?: 'primary' | 'secondary' | 'success' | 'danger' | 'warning' | 'info' | 'light' | 'dark'
  variant?: 'solid' | 'solid-light' | 'outline' | 'outline-fill' | 'ghost'
  iconButton?: boolean
}
