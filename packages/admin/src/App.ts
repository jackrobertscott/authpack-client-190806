import { createElement as create, FC, Fragment } from 'react'
import { Toaster } from 'wga-theme'
import { RouterCentral } from './routers/RouterCentral'
import { useSetup } from './hooks/useSetup'
import { useGadgets } from './hooks/useGadgets'
import { Unauthenticated } from './screens/Unauthenticated'
import { useUniversal } from './hooks/useUniversal'

export const App: FC = () => {
  useSetup()
  const gadgets = useGadgets()
  const universal = useUniversal()
  return create(Fragment, {
    children:
      gadgets.ready && universal.app_id && universal.app_domain_key
        ? [
            gadgets.bearer && gadgets.user && gadgets.team
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
          ]
        : null,
  })
}
