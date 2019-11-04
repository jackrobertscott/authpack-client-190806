import { createElement as create, FC } from 'react'
import { Theme, Toaster } from 'wga-theme'
import { RouterCentral } from './routers/RouterCentral'
import { useConfig } from './hooks/useConfig'

export const App: FC = () => {
  const config = useConfig()
  return create(Theme.Provider, {
    value: config.state.theme,
    children: [
      create(RouterCentral, {
        key: 'router',
      }),
      create(Toaster, {
        key: 'toaster',
      }),
    ],
  })
}
