import { createContext } from 'react'
import { GlobalStore } from '../utils/global'

export const Global = createContext(GlobalStore.current)
