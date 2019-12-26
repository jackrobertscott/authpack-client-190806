import { createContext } from 'react'

export type ToasterArray = Array<{
  id: string
  close: (id: string) => void
  icon?: string
  prefix?: string
  label: string
  helper?: string
}>

export interface IToasterContext {
  current: ToasterArray
  add: (toast: {
    icon?: string
    prefix?: string
    label: string
    helper?: string
    timer?: number
  }) => void
  remove: (id: string) => void
}

export const ToasterContext = createContext<IToasterContext>({
  current: [],
  add: () => console.error('Toaster not configured'),
  remove: () => console.error('Toaster not configured'),
})
