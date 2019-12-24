import { createElement as element, FC } from 'react'
import { Focus, Button, Root } from '@authpack/theme'
import { useAuthpack, useGadgets } from '../utils/authpack'
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
            label: 'Continue',
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
      : element(RouterCentral, {
          key: 'router',
        }),
  })
}
