import { createElement as element, FC } from 'react'
import { useLocalRouter, IconBar } from '@authpack/theme'
import { useSettings } from '../hooks/useSettings'
import { RouterSideBarUser } from './RouterSideBarUser'
import { RouterSideBarTeam } from './RouterSideBarTeam'
import { LogoutUser } from './LogoutUser'
import { ReconcileUser } from './ReconcileUser'

export const RouterModalLoggedIn: FC<{
  close: () => void
}> = ({ close }) => {
  const settings = useSettings()
  const nomatch =
    !settings.user || !settings.user.verified
      ? '/verify'
      : settings.options.enable_teams &&
        settings.options.prompt_teams &&
        !settings.team
      ? '/teams'
      : '/users'
  const router = useLocalRouter({
    name: nomatch === '/users' ? 'onauthed' : undefined,
    nomatch,
    options: !settings.user
      ? []
      : [
          {
            key: '/users',
            children: element(RouterSideBarUser),
          },
          {
            key: '/teams',
            children: element(RouterSideBarTeam),
          },
          {
            key: '/logout',
            nosave: true,
            children: element(LogoutUser),
          },
          {
            key: '/verify',
            nosave: true,
            children: element(ReconcileUser, {
              email: settings.user.email,
            }),
          },
        ],
  })
  if (!settings.bearer || !settings.user) return null
  return element(IconBar, {
    children: router.current && router.current.children,
    icons: [
      {
        icon: 'user-circle',
        label: 'User',
        focused: router.current && router.current.key.startsWith('/users'),
        click: () => router.change('/users'),
      },
      !!settings.options.enable_teams && {
        icon: 'users',
        label: 'Team',
        focused: router.current && router.current.key.startsWith('/teams'),
        click: () => router.change('/teams'),
      },
      {
        icon: 'power-off',
        label: 'Logout',
        focused: router.current && router.current.key === '/logout',
        click: () => router.change('/logout'),
      },
      !settings.user.verified && {
        icon: 'exclamation-circle',
        label: 'Verify Email',
        focused: router.current && router.current.key === '/verify',
        click: () => router.change('/verify'),
        seperated: true,
      },
      {
        icon: 'times-circle',
        label: 'Close',
        click: close,
        prefix: 'far',
        seperated: !!settings.user.verified,
      },
    ],
  })
}
