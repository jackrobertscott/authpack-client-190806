import { createElement as create, FC, Fragment } from 'react'
import { useLocalRouter, Layout, IconBar } from 'wga-theme'
import { useSettings } from '../hooks/useSettings'
import { RouterSideBarUser } from './RouterSideBarUser'
import { RouterSideBarTeam } from './RouterSideBarTeam'
import { LogoutUser } from './LogoutUser'
import { ReconcileUser } from './ReconcileUser'

export const RouterModalOnauthed: FC<{
  close: () => void
}> = ({ close }) => {
  const settings = useSettings()
  const router = useLocalRouter({
    name: 'onauthed',
    nomatch: !settings.user || !settings.user.verified ? '/verified' : '/user',
    options: !settings.user
      ? []
      : [
          { key: '/user', children: create(RouterSideBarUser) },
          { key: '/team', children: create(RouterSideBarTeam) },
          {
            key: '/logout',
            nosave: true,
            children: create(LogoutUser),
          },
          {
            key: '/verify',
            nosave: true,
            children: create(ReconcileUser, {
              email: settings.user.email,
            }),
          },
        ],
  })
  if (!settings.bearer || !settings.user) return null
  return create(Layout, {
    grow: true,
    children: [
      create(IconBar, {
        key: 'iconBar',
        icons: [
          {
            icon: 'user-circle',
            label: 'User',
            focused: router.current && router.current.key.startsWith('/user'),
            click: () => router.change('/user'),
          },
          {
            icon: 'users',
            label: 'Team',
            focused: router.current && router.current.key.startsWith('/team'),
            click: () => router.change('/team'),
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
      }),
      router.current &&
        create(Fragment, {
          key: 'children',
          children: router.current.children,
        }),
    ],
  })
}
