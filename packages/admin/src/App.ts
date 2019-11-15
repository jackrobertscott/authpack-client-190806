import { createElement as create, FC, Fragment } from 'react'
import { Toaster } from 'wga-theme'
import { RouterCentral } from './routers/RouterCentral'
import { useSetup } from './hooks/useSetup'
import { useGadgets } from './hooks/useGadgets'
import { Unauthenticated } from './screens/Unauthenticated'
import { useUniversal } from './hooks/useUniversal'

export const App: FC = () => {
  useSetup()
  const universal = useUniversal()
  const gadgets = useGadgets()
  return create(Fragment, {
    children: !gadgets.ready
      ? null
      : [
          gadgets.bearer &&
          gadgets.user &&
          gadgets.team &&
          universal.app_domain_key
            ? create(RouterCentral, {
                key: 'router',
              })
            : create(Unauthenticated, {
                key: 'unauthenticated',
                loading: !gadgets,
              }),
          create(Toaster, {
            key: 'toaster',
          }),
        ],
  })
}
