export interface ICountdownProps {
  className?: string
  switchClassName?: {
    any?: string
    indeterminate?: string
    checked?: string
    unchecked?: string
    disabled?: string
  }
  checked?: boolean
  defaultChecked?: boolean
  disabled?: boolean
  renderLabel?: (state: boolean | undefined) => React.ReactNode
  labelClassName?: string
  labelPosition?: 'left' | 'right'
  onChange?: (checked: boolean, event: React.ChangeEvent<HTMLInputElement>) => void

  countTo: number
  onEnd?: () => void

}
