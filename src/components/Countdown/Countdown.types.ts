import { type IUseCountdownProps } from '@donerui/base'

interface IPartData {
  showPart?: boolean
  showText?: boolean
  showAs?: boolean
  text?: string
  format?: (value: number) => string
}

export interface ICountdownProps extends IUseCountdownProps {
  className?: string
  partsClassName?: string
  digitClassName?: string
  textClassName?: string
  separatorClassName?: string
  parts?: {
    years?: IPartData
    months?: IPartData
    weeks?: IPartData
    days?: IPartData
    hours?: IPartData
    minutes?: IPartData
    seconds?: IPartData
    milliseconds?: IPartData
  }
  separator?: React.ReactNode
  numberProps?: {
    text?: string
    incrementBy?: number
    format?: (value: number) => string
  }
}

export interface ICountdownNumberProps {
  className?: string
  partsClassName?: string
  digitClassName?: string
  textClassName?: string
  value: number
  text?: string
  format?: (value: number) => string
}

export interface ICountdownClasses {
  className?: string
  partsClassName?: string
  separatorClassName?: string
  digitClassName?: string
  textClassName?: string
}
