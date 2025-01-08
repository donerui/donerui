import { type InputHTMLAttributes, type ReactNode } from 'react'

export type SwitchProps = Omit<InputHTMLAttributes<HTMLInputElement>, 'type'> & {
  label?: string
  errorMessage?: string
  description?: ReactNode
}
