import { createElement as create, FC, Fragment } from 'react'
import { useLocalRouter, Layout, IconBar, SideBar } from 'wga-theme'
import { useSettings } from '../hooks/useSettings'
import { RouterSideBarUser } from './RouterSideBarUser'
import { RouterSideBarTeam } from './RouterSideBarTeam'
import { LogoutUser } from './LogoutUser'

export const RouterModalOnauthed: FC<{
  close: () => void
}> = ({ close }) => {
  const settings = useSettings()
  const router = useLocalRouter({
    name: 'onauthed',
    nomatch: '/user',
    options: [
      { key: '/user', children: create(RouterSideBarUser) },
      { key: '/team', children: create(RouterSideBarTeam) },
      { key: '/logout', children: create(LogoutUser), nosave: true },
    ],
  })
  if (!settings.bearer) return null
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
          {
            icon: 'times-circle',
            label: 'Close',
            click: close,
            prefix: 'far',
            seperated: true,
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
