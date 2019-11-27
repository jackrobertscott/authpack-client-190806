import { createElement as create, FC, Fragment } from 'react'
import { Focus, Button } from 'wga-theme'
import { useGadgets } from '../hooks/useGadgets'
import { useUniversal } from '../hooks/useUniversal'
import { useSetup } from '../hooks/useSetup'
import { RouterCentral } from './RouterCentral'
import { Loading } from './Loading'
import { wga } from '../utils/wga'

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
      : gadgets.bearer && gadgets.user
      ? create(Focus, {
          icon: 'unlock',
          label: 'Team Required',
          helper: 'Please create a team to start',
          children: create(Button, {
            key: 'team',
            icon: 'users',
            label: 'Open Gadgets',
            click: () => wga.show(),
          }),
        })
      : create(Focus, {
          icon: 'unlock',
          label: 'Welcome',
          helper: 'User and Team API and Dashboard',
          children: create(Button, {
            key: 'login',
            icon: 'bolt',
            label: 'Get Started',
            click: () => wga.show(),
          }),
        }),
  })
}
