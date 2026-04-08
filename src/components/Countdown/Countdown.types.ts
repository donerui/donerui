interface IPartData {
  showPart?: boolean
  showText?: boolean
  showAs?: boolean
  text?: string
  format?: (value: number) => string
}

export interface ICountdownProps {
  className?: string
  partsClassName?: string
  separatorClassName?: string
  type: 'time' | 'number'
  mode: 'up' | 'down'
  date1?: number
  date2?: number
  value?: number
  refreshRateMs?: number
  isPaused?: boolean
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
  onChange?: (data: ICountdownData) => void
  onEnd?: () => void
}

export interface ICountdownData {
  years: number
  asYears: number
  months: number
  asMonths: number
  weeks: number
  asWeeks: number
  days: number
  asDays: number
  hours: number
  asHours: number
  minutes: number
  asMinutes: number
  seconds: number
  asSeconds: number
  milliseconds: number
  asMilliseconds: number
}
