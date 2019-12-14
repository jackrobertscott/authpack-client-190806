import { createElement as element, FC } from 'react'
import { Focus, Button, useMedia, Root } from '@authpack/theme'
import { useAuthpack, useGadgets } from '@authpack/react'
import { useUniversal } from '../hooks/useUniversal'
import { useSetup } from '../hooks/useSetup'
import { RouterCentral } from './RouterCentral'
import { Loading } from './Loading'
import { usePreferences } from '../utils/preferences'

export const Admin: FC = () => {
  useSetup()
  const gadgets = useGadgets()
  const authpack = useAuthpack()
  const universal = useUniversal()
  const preferences = usePreferences()
  const media = useMedia()
  return element(Root, {
    theme: preferences.theme,
    children: !Boolean(authpack.ready && universal.ready)
      ? element(Loading)
      : !Boolean(authpack.bearer && authpack.user)
      ? element(Focus, {
          icon: 'unlock',
          label: 'Welcome',
          helper: 'Supercharge your app with Authpack',
          children: element(Button, {
            key: 'login',
            icon: 'bolt',
            label: 'Start',
            click: () => gadgets.show(),
          }),
        })
      : !Boolean(authpack.team)
      ? element(Focus, {
          icon: 'users',
          label: 'Team Required',
          helper: 'Please create a team to get started',
          children: element(Button, {
            key: 'team',
            label: 'Continue',
            click: () => gadgets.show(),
          }),
        })
      : !Boolean(universal.cluster_id && universal.cluster_key_client)
      ? element(Loading)
      : media.width < 1120
      ? element(Focus, {
          icon: 'expand-arrows-alt',
          label: 'Dashboard',
          helper: 'Use a wider screen to see dashboard',
          children: element(Button, {
            label: 'Okay',
            click: () => gadgets.show(),
          }),
        })
      : element(RouterCentral, {
          key: 'router',
        }),
  })
}
