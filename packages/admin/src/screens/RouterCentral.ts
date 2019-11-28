import { createElement as create, FC, Fragment, useState } from 'react'
import { Layout, IconBar, useRouter } from 'wga-theme'
import { wga } from '../utils/wga'
import { RouterSideBarUsers } from './RouterSideBarUsers'
import { RouterSideBarTeams } from './RouterSideBarTeams'
import { RouterManagerCluster } from './RouterManagerCluster'
import { Explorer } from './Explorer'
import { useUniversal } from '../hooks/useUniversal'

export const RouterCentral: FC = () => {
  const universal = useUniversal()
  const [apper, apperChange] = useState<boolean>(false)
  const router = useRouter({
    nomatch: '/users',
    options: [
      { path: '/users', children: create(RouterSideBarUsers) },
      { path: '/teams', children: create(RouterSideBarTeams) },
      { path: '/developers', children: create(Explorer) },
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
          !universal.subscribed && {
            icon: 'exclamation-circle',
            label: 'Limited Usage',
            helper:
              'Limited to a maximum of 50 users - add payment card to remove all limits',
            click: () => apperChange(!apper),
            seperated: true,
          },
          {
            icon: 'cog',
            label: 'Settings',
            click: () => apperChange(!apper),
            seperated: !!universal.subscribed,
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
