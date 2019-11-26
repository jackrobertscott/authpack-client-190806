import { createElement as create, FC, Fragment, useState } from 'react'
import { Layout, IconBar, useRouter } from 'wga-theme'
import { wga } from '../utils/wga'
import { RouterSideBarUsers } from './RouterSideBarUsers'
import { RouterSideBarTeams } from './RouterSideBarTeams'
import { RouterSideBarDevelopers } from './RouterSideBarDevelopers'
import { RouterManagerCluster } from './RouterManagerCluster'

export const RouterCentral: FC = () => {
  const [apper, apperChange] = useState<boolean>(false)
  const router = useRouter({
    nomatch: '/users',
    options: [
      { path: '/users', children: create(RouterSideBarUsers) },
      { path: '/teams', children: create(RouterSideBarTeams) },
      { path: '/developers', children: create(RouterSideBarDevelopers) },
    ],
  })
  return create(Layout, {
    grow: true,
    children: [
      create(IconBar, {
        key: 'iconBar',
        icons: [
          {
            icon: 'users',
            label: 'Users',
            focused: !!router.current && router.current.path === '/users',
            click: () => router.change('/users'),
          },
          {
            icon: 'handshake',
            label: 'Teams',
            focused: !!router.current && router.current.path === '/teams',
            click: () => router.change('/teams'),
          },
          {
            icon: 'code',
            label: 'Developers',
            focused: !!router.current && router.current.path === '/developers',
            click: () => router.change('/developers'),
          },
          {
            icon: 'cog',
            label: 'Settings',
            click: () => apperChange(!apper),
            seperated: true,
          },
          {
            icon: 'user-circle',
            label: 'Account',
            click: () => wga.show(),
          },
        ],
      }),
      create(RouterManagerCluster, {
        key: 'cluster',
        visible: apper,
        close: () => apperChange(false),
      }),
      router.current &&
        create(Fragment, {
          key: 'children',
          children: router.current.children,
        }),
    ],
  })
}
