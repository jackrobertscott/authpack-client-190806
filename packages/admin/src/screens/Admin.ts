import { createElement as create, FC } from 'react'
import { Focus, Button, useMedia, Root, Toaster } from '@authpack/theme'
import { useGadgets } from '../hooks/useGadgets'
import { useUniversal } from '../hooks/useUniversal'
import { useSetup } from '../hooks/useSetup'
import { RouterCentral } from './RouterCentral'
import { Loading } from './Loading'
import { authpack } from '../utils/authpack'
import { usePreferences } from '../utils/preferences'

export const Admin: FC = () => {
  useSetup()
  const gadgets = useGadgets()
  const universal = useUniversal()
  const preferences = usePreferences()
  const media = useMedia()
  return create(Root, {
    theme: preferences.theme,
    children: create(Toaster, {
      children: !Boolean(gadgets.ready && universal.ready)
        ? create(Loading)
        : !Boolean(gadgets.bearer && gadgets.user)
        ? create(Focus, {
            icon: 'unlock',
            label: 'Welcome',
            helper: 'Supercharge your app with Authpack',
            children: create(Button, {
              key: 'login',
              icon: 'bolt',
              label: 'Start',
              click: () => authpack.show(),
            }),
          })
        : !Boolean(gadgets.team)
        ? create(Focus, {
            icon: 'users',
            label: 'Team Required',
            helper: 'Please create a team to get started',
            children: create(Button, {
              key: 'team',
              label: 'Continue',
              click: () => authpack.show(),
            }),
          })
        : !Boolean(universal.cluster_id && universal.cluster_key_client)
        ? create(Loading)
        : media.width < 1120
        ? create(Focus, {
            icon: 'expand-arrows-alt',
            label: 'Dashboard',
            helper: 'Use a wider screen to see dashboard',
            children: create(Button, {
              label: 'Okay',
              click: () => authpack.show(),
            }),
          })
        : create(RouterCentral, {
            key: 'router',
          }),
    }),
  })
}
