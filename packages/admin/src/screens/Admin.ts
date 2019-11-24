import { createElement as create, FC, Fragment } from 'react'
import { useGadgets } from '../hooks/useGadgets'
import { useUniversal } from '../hooks/useUniversal'
import { useSetup } from '../hooks/useSetup'
import { RouterCentral } from './RouterCentral'
import { Unauthenticated } from '../screens/Unauthenticated'
import { Loading } from './Loading'

export const Admin: FC = () => {
  useSetup()
  const gadgets = useGadgets()
  const universal = useUniversal()
  return create(Fragment, {
    children: !Boolean(gadgets.ready && universal.ready)
      ? create(Loading)
      : gadgets.bearer && gadgets.user && gadgets.team
      ? create(RouterCentral, {
          key: 'router',
        })
      : create(Unauthenticated, {
          key: 'unauthenticated',
        }),
  })
}
