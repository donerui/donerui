import { type ReactNode, type TextareaHTMLAttributes } from 'react'

export type TextAreaProps = TextareaHTMLAttributes<HTMLTextAreaElement> & {
  label?: string
  errorMessage?: string
  LeftComponent?: ReactNode
  RightComponent?: ReactNode
}
