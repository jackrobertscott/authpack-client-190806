import { createElement as create, FC, useEffect } from 'react'
import { Theme, Toaster } from 'wga-theme'
import { RouterCentral } from './routers/RouterCentral'
import { useConfig } from './hooks/useConfig'
import { useGadgets } from './hooks/useGadgets'
import { wga } from './utils/wga'

export const App: FC = () => {
  const config = useConfig()
  const gadgets = useGadgets()
  useEffect(() => {
    if (!gadgets.state && !gadgets.loading) wga.open()
  }, [gadgets.state, gadgets.loading])
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
