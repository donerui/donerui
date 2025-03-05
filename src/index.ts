import dayjs from 'dayjs'
import duration from 'dayjs/plugin/duration'
import localeData from 'dayjs/plugin/localeData'
import localizedFormat from 'dayjs/plugin/localizedFormat'

dayjs.extend(duration)
dayjs.extend(localeData)
dayjs.extend(localizedFormat)

export * from './components'
export * from './hooks'
export * from './utils'
