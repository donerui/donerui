import { type InputHTMLAttributes, type ReactNode } from 'react'

export interface SelectOption<TValue = string, TData = unknown> {
  value: TValue
  label: ReactNode
  searchKey?: string
  data?: TData
}

export type SelectProps<TValue = string, TData = unknown> = Omit<InputHTMLAttributes<HTMLInputElement>, 'type' | 'value' | 'onChange'> & {
  label?: string
  errorMessage?: string
  options: Array<SelectOption<TValue, TData>>
  value?: TValue
  defaultValue?: TValue
  onChange?: (value: TValue | undefined) => void
  portal?: HTMLElement
  placement?: 'top' | 'bottom'
  maxHeight?: number
  placeholder?: string
  isOptionDisabled?: (option: SelectOption<TValue, TData>) => boolean
  clearable?: boolean
  searchable?: boolean
  onSearch?: (query: string, options: Array<SelectOption<TValue, TData>>) => Array<SelectOption<TValue, TData>>
}
