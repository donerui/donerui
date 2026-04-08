import type { ReactNode, TextareaHTMLAttributes } from 'react'

export type TextAreaProps = TextareaHTMLAttributes<HTMLTextAreaElement> & {
  label?: string
  errorMessage?: string
  LeftComponent?: ReactNode
  RightComponent?: ReactNode
}
