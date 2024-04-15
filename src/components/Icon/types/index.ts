export type IconType = React.FunctionComponent<any> | JSX.Element | string

export interface IIconProps {
  icon: IconType
  className?: string
}
