import {
  useEffect,
  useState,
  FC,
  createContext,
  createElement,
  useContext,
  ReactNode,
} from 'react'
import { Authpack, IPlugin } from '@authpack/sdk'
import { config } from '../config'

export const authpack = new Authpack({
  debug: true,
  key: config.gadgets_key_client,
  url: document.location.hostname.includes('localhost')
    ? 'http://localhost:3100'
    : undefined,
})

export const AuthpackContext = createContext<IPlugin>(undefined as any)

export const AuthpackProvider: FC<{
  children: ReactNode
}> = ({ children }) => {
  const [current, currentChange] = useState<IPlugin>(authpack.current())
  useEffect(() => authpack.listen(update => currentChange(update)), [])
  return createElement(AuthpackContext.Provider, {
    value: current,
    children,
  })
}

export const useAuthpackCurrent = () => {
  return useContext(AuthpackContext)
}
