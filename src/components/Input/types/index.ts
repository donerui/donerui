import { type DetailedHTMLProps } from 'react'

type HTMLInputProps = DetailedHTMLProps<React.InputHTMLAttributes<HTMLInputElement>, HTMLInputElement>
type HTMLSelectProps = DetailedHTMLProps<React.SelectHTMLAttributes<HTMLSelectElement>, HTMLSelectElement>

// Extract all aria-* props from HTMLInputProps
type InputAriaProps = {
  [K in keyof HTMLInputProps as K extends `aria-${string}` ? K : never]: HTMLInputProps[K];
}

// Base props shared across different inputs
type BaseInputProps = InputAriaProps & Pick<HTMLInputProps, 'id' | 'name' | 'value' | 'onChange' | 'placeholder' | 'required'> & {
  label?: string
  errorMessage?: string
  info?: React.ReactNode
}

// Specific props for TextInput (excluding non-text related props like min, max, step)
export type TextInputProps = BaseInputProps & {
  type: 'text'
  info?: React.ReactNode
  mask?: string
}

// Specific props for NumberInput (including min, max, step)
export type NumberInputProps = BaseInputProps & {
  type: 'number'
  min?: number
  max?: number
  step?: number
}

export interface IOption<T> {
  label: string
  value: T
}

export type InputProps = ({ type: 'text' } & HTMLInputProps)
| ({ type: 'select' } & HTMLSelectProps)
