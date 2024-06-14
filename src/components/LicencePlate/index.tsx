import React, { Fragment } from 'react'
import { twMerge } from 'tailwind-merge'
import LicencePlateCodeContainer from './LicencePlateCodeContainer'
import { configs } from './constants'
import { type ILicencePlateProps } from './types'

function LicencePlate ({
  config,
  plate = '12 ABC 123',
  plateSplitter = ' ',
  regionCode,
  className,
  codeContainerClassName,
  licenceContainerClassName
}: ILicencePlateProps): React.ReactElement {
  const loc = typeof config === 'string' ? configs[config] : config

  return (
    <div className={twMerge(
      'h-16 bg-white border-2 border-black rounded text-center flex overflow-hidden aspect-[4.73] duration-200',
      loc?.plateClassName,
      className
    )}>
      {loc?.codeContainers.filter((c) => c.position === 0).map((c, i) => {
        const CodeContainerComponent = c.Component ?? LicencePlateCodeContainer
        return (
          <CodeContainerComponent
            key={i}
            locale={loc}
            regionCode={regionCode}
            {...c}
          />
        )
      })}

      {plate.split(plateSplitter).map((part, i) => (
        <Fragment key={`plate-part-${i}`}>
          <div
            className={twMerge(
              'flex-1 flex items-center justify-center font-extrabold text-4xl duration-200',
              loc?.licenceContainerClassName,
              licenceContainerClassName
            )}
          >
            {part}
          </div>

          {loc?.codeContainers.filter((c) => c.position === i + 1).map((c, j) => {
            const CodeContainerComponent = c.Component ?? LicencePlateCodeContainer
            return (
              <CodeContainerComponent
                key={j}
                locale={loc}
                regionCode={regionCode}
                {...c}
              />
            )
          })}
        </Fragment>
      ))}

      {loc?.codeContainers.filter((c) => c.position === -1).map((c, i) => {
        const CodeContainerComponent = c.Component ?? LicencePlateCodeContainer
        return (
          <CodeContainerComponent
            key={i}
            locale={loc}
            regionCode={regionCode}
            {...c}
          />
        )
      })}
    </div>
  )
}

LicencePlate.configs = configs

export * from './types'

export default LicencePlate
