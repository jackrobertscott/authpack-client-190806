import { createElement as create, FC } from 'react'
import { Theme, Toaster } from 'wga-theme'
import { RouterCentral } from './routers/RouterCentral'
import { useConfig } from './hooks/useConfig'
import { useGadgets } from './hooks/useGadgets'
import { Unauthenticated } from './screens/Unauthenticated'

export const App: FC = () => {
  const config = useConfig()
  const gadgets = useGadgets()
  return create(Theme.Provider, {
    value: config.state.theme,
    children: [
      gadgets.loading || !gadgets.state || !gadgets.state.bearer
        ? create(Unauthenticated, {
            key: 'unauthenticated',
            loading: gadgets.loading,
          })
        : create(RouterCentral, {
            key: 'router',
          }),
      create(Toaster, {
        key: 'toaster',
      }),
    ],
  })
}
