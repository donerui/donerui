import { type InputHTMLAttributes, type ReactNode } from 'react'

export type TextInputTypes = 'text' | 'password' | 'email' | 'number' | 'tel' | 'url'

export type TextInputProps = Omit<InputHTMLAttributes<HTMLInputElement>, 'type'> & {
  type?: TextInputTypes
  label?: string
  errorMessage?: string
  LeftComponent?: ReactNode
  RightComponent?: ReactNode
}
