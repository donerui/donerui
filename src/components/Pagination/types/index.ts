import { type IButtonProps } from '../../Button'

export interface IPaginationProps {
  maxPages: number
  page?: number
  defaultPage?: number
  onPageChange?: (page: number) => void
  visibleAmount?: number
  previousButton?: boolean
  nextButton?: boolean
  jumpPreviousButton?: boolean
  jumpNextButton?: boolean
  startPage?: number
  buttonProps?: IButtonProps
  activeButtonProps?: IButtonProps
  alignment?: 'horizontal' | 'vertical'
  showUtilityButtons?: boolean | 'hover'
}
