import { GB, RU, TR } from 'country-flag-icons/react/3x2'
import { GiEuropeanFlag } from 'react-icons/gi'
import { type IPlateConfig, type PlateConfigType } from './types'

export const configs: Record<PlateConfigType, IPlateConfig> = {
  deutschland: {
    name: 'Germany',
    countryCode: 'D',
    codeContainers: [
      {
        position: 0,
        className: 'bg-blue-800',
        children: (props) => <>
          <GiEuropeanFlag className='w-7 h-7 fill-amber-400' />
          <span>{props.locale.countryCode}</span>
        </>
      }
    ]
  },
  france: {
    name: 'France',
    countryCode: 'F',
    codeContainers: [
      {
        position: 0,
        className: 'bg-blue-800',
        children: (props) => <>
          <GiEuropeanFlag className='w-7 h-7 fill-amber-400' />
          <span>{props.locale.countryCode}</span>
        </>
      },
      {
        position: -1,
        className: 'bg-blue-800',
        children: (props) => <>
          <span>{props.regionCode}</span>
        </>
      }
    ]
  },
  italy: {
    name: 'Italy',
    countryCode: 'I',
    codeContainers: [
      {
        position: 1,
        className: 'bg-blue-800 py-1',
        children: (props) => <>
          <GiEuropeanFlag className='w-7 h-7 fill-amber-400' />
          <span className='text-sm'>PS</span>
          <span className='border rounded-full aspect-square text-xs'>{props.locale.countryCode}</span>
        </>
      }
    ]
  },
  netherlands: {
    name: 'Netherlands',
    countryCode: 'NL',
    licenceContainerClassName: 'bg-amber-400',
    codeContainers: [
      {
        position: 0,
        className: 'bg-blue-800',
        children: (props) => <>
          <GiEuropeanFlag className='w-7 h-7 fill-amber-400' />
          <span>{props.locale.countryCode}</span>
        </>
      }
    ]
  },
  spain: {
    name: 'Spain',
    countryCode: 'E',
    codeContainers: [
      {
        position: 0,
        className: 'bg-blue-800',
        children: (props) => <>
          <GiEuropeanFlag className='w-7 h-7 fill-amber-400' />
          <span>{props.locale.countryCode}</span>
        </>
      }
    ]
  },
  uk: {
    name: 'United Kingdom',
    countryCode: 'GB',
    licenceContainerClassName: 'bg-amber-400',
    codeContainers: [
      {
        position: 0,
        className: 'bg-blue-800',
        children: (props) => <>
          <GB className='w-7 h-7 px-1' />
          <span className='text-amber-400'>{props.locale.countryCode}</span>
        </>
      }
    ]
  },
  russia: {
    name: 'Russia',
    countryCode: 'RUS',
    plateClassName: 'bg-gray-100',
    codeContainers: [
      {
        position: -1,
        className: 'border-l border-black text-black',
        children: (props) => <>
          <span className='text-4xl font-bold'>{props.regionCode}</span>
          <div className='flex gap-1 text-xs mx-1'>
            <span>{props.locale.countryCode}</span>
            <RU className='w-4 h-4' />
          </div>
        </>
      }
    ]
  },
  turkey: {
    name: 'Turkey',
    countryCode: 'TR',
    codeContainers: [
      {
        position: 0,
        className: 'bg-blue-800',
        children: (props) => <>
          <TR className='w-7 h-7 px-1' />
          <span>{props.regionCode}</span>
        </>
      }
    ]
  },
  'turkey-private-1': {
    name: 'Turkey',
    countryCode: 'TR',
    licenceContainerClassName: 'bg-black text-white font-semibold',
    codeContainers: [
      {
        position: 0,
        className: 'bg-blue-800',
        children: (props) => <>
          <TR className='w-7 h-7 px-1' />
          <span>{props.regionCode}</span>
        </>
      }
    ]
  },
  'turkey-private-2': {
    name: 'Turkey',
    countryCode: 'TR',
    licenceContainerClassName: 'bg-black text-white font-semibold',
    codeContainers: [
      {
        position: 0,
        className: 'bg-black text-white',
        children: (props) => <>
          <TR className='w-7 h-7 px-1' />
          <span>{props.regionCode}</span>
        </>
      }
    ]
  }
}
