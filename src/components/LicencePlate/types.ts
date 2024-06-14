export type PlateConfigType =
  | 'deutschland'
  | 'france'
  | 'italy'
  | 'netherlands'
  | 'spain'
  | 'uk'
  | 'turkey'
  | 'turkey-private-1'
  | 'turkey-private-2'
  | 'russia'

export interface ICodeContainer {
  position: number
  className?: string
  children?: React.ReactNode | ((props: ILicencePlateCodeContainerProps) => React.ReactNode)
  Component?: React.ComponentType<ILicencePlateCodeContainerProps>
}

export interface IPlateConfig {
  name: string
  countryCode: string
  codeContainers: ICodeContainer[]
  plateClassName?: string
  licenceContainerClassName?: string
}

export interface ILicencePlateProps {
  plate: string
  plateSplitter?: string
  regionCode?: string
  config?: IPlateConfig | PlateConfigType
  className?: string
  codeContainerClassName?: string
  licenceContainerClassName?: string
}

export interface ILicencePlateCodeContainerProps extends Omit<ICodeContainer, 'Component'> {
  locale: IPlateConfig
  regionCode?: string
}
