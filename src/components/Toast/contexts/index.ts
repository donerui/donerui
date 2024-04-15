import React from 'react'
import { defaultToasterContext } from '../constants'
import { type IToasterContext } from '../types'

const ToasterContext = React.createContext<IToasterContext>(defaultToasterContext)

export default ToasterContext
