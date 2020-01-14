import { createElement as element, FC, useEffect } from 'react'
import { Focus, Button, Root } from '@authpack/theme'
import { useAuthpack } from '@authpack/react'
import { useUniversal } from '../hooks/useUniversal'
import { useSetup } from '../hooks/useSetup'
import { RouterCentral } from './RouterCentral'
import { Loading } from './Loading'
import { usePreferences } from '../utils/preferences'
import { authpack } from '../utils/authpack'
import { useFullStory } from '../hooks/useFullStory'

export const Admin: FC = () => {
  useSetup()
  useFullStory()
  const universal = useUniversal()
  const preferences = usePreferences()
  const auth = useAuthpack()
  useEffect(() => {
    if (!authpack.current().bearer) authpack.open()
  }, [])
  return element(Root, {
    theme: preferences.theme,
    children: !Boolean(auth.ready && universal.ready)
      ? element(Loading)
      : !Boolean(auth.bearer && auth.user)
      ? element(Focus, {
          icon: 'unlock',
          label: 'Welcome',
          helper: 'Supercharge your app with Authpack',
          children: element(Button, {
            key: 'login',
            icon: 'bolt',
            label: 'Continue',
            click: () => authpack.open(),
          }),
        })
      : !Boolean(auth.team)
      ? element(Focus, {
          icon: 'users',
          label: 'Team Required',
          helper: 'Please create a team to get started',
          children: element(Button, {
            key: 'team',
            label: 'Continue',
            click: () => authpack.open(),
          }),
        })
      : !Boolean(universal.cluster_id && universal.cluster_key_client)
      ? element(Loading)
      : element(RouterCentral, {
          key: 'router',
        }),
  })
}
