import { createContext } from 'react'

export interface ISpinnerContext {
  log: string[]
  loading: boolean
  begin: () => () => void
}

export const SpinnerContext = createContext<ISpinnerContext>({
  log: [],
  loading: false,
  begin: () => () => console.error('Spinner not configured'),
})
