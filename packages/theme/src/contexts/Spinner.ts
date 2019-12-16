import { createContext } from 'react'

export interface ISpinnerContext {
  loading: boolean
  begin: () => () => void
}

export const SpinnerContext = createContext<ISpinnerContext>({
  loading: false,
  begin: () => () => {},
})
