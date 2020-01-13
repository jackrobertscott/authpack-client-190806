import {
  useEffect,
  useState,
  FC,
  createContext,
  createElement,
  useContext,
  ReactNode,
  useMemo,
} from 'react'
import { Authpack, IAuthpackCurrent } from '@authpack/sdk'

const AuthpackContext = createContext<{
  current?: IAuthpackCurrent
}>({})

export const AuthpackProvider: FC<{
  children: ReactNode
  value: Authpack
}> = ({ children, value }) => {
  if (!value) {
    const message =
      'Property "value" is missing on <AuthpackProvider /> component.'
    throw new Error(message)
  }
  if (!(value instanceof Authpack)) {
    const message =
      'Property "value" on <AuthpackProvider /> must be an Authpack instance.'
    throw new Error(message)
  }
  const [current, currentChange] = useState<IAuthpackCurrent>(value.current())
  useEffect(() => value.listen(next => currentChange(next)), [value])
  const data = useMemo(() => current, [value, current])
  return createElement(AuthpackContext.Provider, {
    children,
    value: {
      current: data,
    },
  })
}

export const useAuthpack = (): IAuthpackCurrent => {
  const { current } = useContext(AuthpackContext)
  if (!current) {
    const message =
      'Please wrap Authpack hooks in the <AuthpackProvider /> component.'
    throw new Error(message)
  }
  return current
}
