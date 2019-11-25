import { createElement as create, FC, Fragment, useState } from 'react'
import { Layout, IconBar, useRouter } from 'wga-theme'
import { wga } from '../utils/wga'
import { RouterSideBarHome } from './RouterSideBarHome'
import { RouterSideBarSettings } from './RouterSideBarSettings'
import { RouterSideBarDeveloper } from './RouterSideBarDeveloper'
import { RouterManagerCluster } from './RouterManagerCluster'

export const RouterCentral: FC = () => {
  const [apper, apperChange] = useState<boolean>(false)
  const router = useRouter({
    nomatch: '/app',
    options: [
      { path: '/app', children: create(RouterSideBarHome) },
      { path: '/settings', children: create(RouterSideBarSettings) },
      { path: '/developer', children: create(RouterSideBarDeveloper) },
    ],
  })
  return create(Layout, {
    grow: true,
    children: [
      create(IconBar, {
        key: 'iconBar',
        icons: [
          {
            icon: 'home',
            label: 'Home',
            focused: !!router.current && router.current.path === '/app',
            click: () => router.change('/app'),
          },
          {
            icon: 'cog',
            label: 'Settings',
            focused: !!router.current && router.current.path === '/settings',
            click: () => router.change('/settings'),
          },
          {
            icon: 'code',
            label: 'Developer',
            focused: !!router.current && router.current.path === '/developer',
            click: () => router.change('/developer'),
          },
          {
            icon: 'bars',
            label: 'Cluster',
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
