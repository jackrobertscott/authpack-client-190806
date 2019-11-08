import { createElement as create, FC, Fragment } from 'react'
import { Toaster } from 'wga-theme'
import { RouterCentral } from './routers/RouterCentral'
import { useGadgets } from './hooks/useGadgets'
import { Unauthenticated } from './screens/Unauthenticated'

export const App: FC = () => {
  const gadgets = useGadgets()
  return create(Fragment, {
    children: [
      !gadgets || !gadgets.bearer
        ? create(Unauthenticated, {
            key: 'unauthenticated',
            loading: !gadgets,
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
