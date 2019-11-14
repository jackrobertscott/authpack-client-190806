import { createContext } from 'react'
import { UniversalStore } from '../utils/universal'

export const Universal = createContext(UniversalStore.current)
